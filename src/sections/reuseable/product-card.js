import { useEffect, useRef, useState } from 'react';
import { Card, Typography } from '@mui/material';
import Link from 'next/link';
import { paths } from 'src/routes/paths';
import { useResponsive } from 'src/hooks/use-responsive';
import Image from 'next/image';
import {
  getAllReview,
  getCategoryById,
  getProductChildren,
} from 'src/fetch-global';
import moment from 'moment';
import { sendGAEvent } from '@next/third-parties/google';

export default function ProductCard({
  id,
  idProduct,
  name,
  price,
  image,
  from,
}) {
  const [value, setValue] = useState(-1);
  const mdUp = useResponsive('up', 'md');
  const [lowestPrice, setLowestPrice] = useState(0);
  const [specialPrice, setSpecialPrice] = useState(0);
  const [nameCategory, setNameCategory] = useState([]);
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null, // viewport
        rootMargin: '0px', // no margin
        threshold: 0.5, // 50% of target visible
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  // Checks if there is a total sales
  const hasTotalSales = () => {
    return image.some(
      (img) => img.attribute_code === 'total_sales' && img.value != null
    );
  };

  // Checks if there is a thumbnail image
  const hasThumbnailImage = () => {
    return image.some(
      (img) => img.attribute_code === 'thumbnail' && img.value != null
    );
  };

  // Checks if there is a city or location value
  const hasLocation = () => {
    return image.some(
      (img) => img.attribute_code === 'city' && img.value != null
    );
  };

  const handleOnClick = () => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'productClick',
        productDetail: {
          productId: idProduct,
          productSku: id,
          productTitle: name,
          productFrom: from,
        },
      });
      // window.dataLayer.pop({})
    }
    sendGAEvent('event', 'buttonClicked', { value: 'xyz' });
  };

  // Fetches and sets category names based on category IDs
  const fetchCategoryNames = async (categoryIds) => {
    try {
      const categoryNames = await Promise.all(
        categoryIds.map(async (id) => {
          const data = await getCategoryById(id);
          return data ? data.name : null;
        })
      );
      setNameCategory(categoryNames.filter(Boolean));
    } catch (error) {
      console.error('Error fetching category names:', error);
    }
  };

  // Fetches and sets the review count
  const fetchReviewCount = async (productId) => {
    try {
      const data = await getAllReview(productId);
      setValue(data.length ?? 0);
    } catch (error) {
      console.error('Error fetching review count:', error);
      setValue(0);
    }
  };

  // Fetches and sets the lowest price and special price
  const fetchPrices = async (productId) => {
    try {
      const time = moment();
      const data = await getProductChildren(productId);

      let lowestPrice = Infinity;
      let specialPrice = Infinity;

      data.forEach((product) => {
        if (
          product.price &&
          product.status == 1 &&
          product.price < lowestPrice &&
          specialPrice == Infinity
        ) {
          lowestPrice = product.price;
          const special = product.custom_attributes.find(
            (attr) => attr.attribute_code === 'special_price'
          );
          const dateFrom = product.custom_attributes.find(
            (attr) => attr.attribute_code === 'special_from_date'
          );
          const dateTo = product.custom_attributes.find(
            (attr) => attr.attribute_code === 'special_to_date'
          );
          //
          if (special && dateFrom && dateTo) {
            if (time.isBetween(moment(dateFrom.value), moment(dateTo.value))) {
              //
              specialPrice = parseInt(special.value);
            }
          } else if (special && dateFrom) {
            if (time.isSameOrAfter(moment(dateFrom.value))) {
              specialPrice = parseInt(special.value);
            }
          } else if (special && dateTo) {
            if (time.isSameOrBefore(moment(dateTo.value))) {
              specialPrice = parseInt(special.value);
            }
          } else {
            specialPrice = Infinity;
          }
        }
      });

      if (data.length === 0) {
        const special = image.find(
          (img) => img.attribute_code === 'special_price'
        );
        const dateFrom = image.find(
          (attr) => attr.attribute_code === 'special_from_date'
        );
        const dateTo = image.find(
          (attr) => attr.attribute_code === 'special_to_date'
        );
        if (special && dateFrom && dateTo) {
          if (time.isBetween(moment(dateFrom.value), moment(dateTo.value))) {
            specialPrice = parseInt(special.value);
          }
        } else if (special && dateFrom) {
          if (time.isSameOrAfter(moment(dateFrom.value))) {
            specialPrice = parseInt(special.value);
          }
        } else if (special && dateTo) {
          if (time.isSameOrBefore(moment(dateTo.value))) {
            specialPrice = parseInt(special.value);
          }
        } else {
          specialPrice = Infinity;
        }
      }

      setLowestPrice(lowestPrice === Infinity ? 0 : lowestPrice);
      setSpecialPrice(specialPrice === Infinity ? 0 : specialPrice);
    } catch (error) {
      console.error('Error fetching prices:', error);
      setLowestPrice(0);
      setSpecialPrice(0);
    }
  };

  // Runs once when the image array changes to fetch category names
  useEffect(() => {
    const category = image.find((img) => img.attribute_code === 'category_ids');
    if (category && category.value) {
      fetchCategoryNames(category.value);
    }
  }, [image]);

  // Runs when the `id` changes to fetch review count and prices
  useEffect(() => {
    fetchReviewCount(id);
    fetchPrices(id);
    if (typeof window !== 'undefined' && window.dataLayer && isVisible) {
      window.dataLayer.push({
        event: 'productImpression',
        productDetail: {
          productId: idProduct,
          productSku: id,
          productTitle: name,
          productFrom: from,
        },
      });
    }
  }, [id]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.dataLayer && isVisible) {
      window.dataLayer.push({
        event: 'productImpression',
        productDetail: {
          productId: idProduct,
          productSku: id,
          productTitle: name,
          productFrom: from,
        },
      });
    }
  }, [isVisible]);

  return (
    <Link
      href={paths.product.details(id)}
      className='relative'
      onClick={() => handleOnClick()}
      ref={elementRef}>
      <Card
        sx={{
          height: { xs: 350, sm: 360, lg: 385 },
          minHeight: 340,
          borderRadius: { xs: '10px', lg: '14px' },
          boxShadow: 2,
        }}>
        <Card
          sx={{
            aspectRatio: '1 / 1',
            width: '100%',
            maxHeight: '50%',
            borderRadius: '6px 6px 2px 2px',
          }}>
          {hasThumbnailImage() &&
            image.map((img) => {
              if (img.attribute_code == 'thumbnail' && img.value != null) {
                const [image, setImage] = useState(
                  `${process.env.NEXT_PUBLIC_MAGENTO_API}/pub/media/catalog/product${img.value}`
                );
                const [css, setCss] = useState('h-full w-full object-cover');
                return (
                  <div
                    className='h-full w-full bg-liburdulu-gray flex flex-col justify-center absolute'
                    key={img.value}>
                    <img
                      src={image}
                      onError={() => {
                        setImage('default image 1.png');
                        setCss(
                          'bg-liburdulu-gray h-[100px] w-full object-contain p-3'
                        );
                      }}
                      alt='image'
                      className={css}
                    />
                  </div>
                );
              }
            })}
          {!hasThumbnailImage() && (
            <div className='h-[195px] w-full bg-liburdulu-gray flex flex-col justify-center absolute'>
              <Image
                src='/default image 1.png'
                alt='thumbnail'
                height={100}
                width={100}
                style={{ objectFit: 'contain', padding: 3 }}
                className='place-self-center'
              />
            </div>
          )}
          {image.find((img) => img.attribute_code === 'badge_product') && (
            <div className='absolute bg-liburdulu-orange end-0 p-1 md:px-5 px-2 rounded-bl-[10px]'>
              <span className='text-xs xs:text-sm font-semibold text-liburdulu-white'>
                {
                  image.find((img) => img.attribute_code === 'badge_product')
                    ?.value
                }
              </span>
            </div>
          )}
        </Card>
        <div className='flex flex-col justify-between h-[200px] s:h-[180px] xxs:h-[170px] xs:h-3/5 lg:h-2/4 pt-3 pb-2 xs:pb-10 sm:pb-12 lg:pb-3 px-2 md:px-2.5'>
          <div className='grid grid-flow-row p-0'>
            <div className='hidden xxs:flex justify-between pb-2.5 md:pb-1.5'>
              <span className='text-liburdulu-blue text-[10px] lg:text-xs font-[400] flex items-center'>
                {mdUp && (
                  <Image
                    src='/libur_dulu_logo_only_Converted.png'
                    alt='logo-converted'
                    height={21}
                    width={25}
                    style={{
                      objectFit: 'contain',
                      marginRight: 1,
                    }}
                  />
                )}
                {!mdUp && (
                  <Image
                    src='/libur_dulu_logo_only_Converted.png'
                    alt='logo-converted'
                    height={18}
                    width={20}
                    style={{
                      objectFit: 'contain',
                      marginRight: 1,
                    }}
                  />
                )}
                {hasLocation() &&
                  image.map((img) => {
                    if (img.attribute_code == 'city' && img.value != null) {
                      return (
                        <span className='line-clamp-1' key={img.value}>
                          {img.value}
                        </span>
                      );
                    }
                  })}
                {!hasLocation() && (
                  <span className='line-clamp-1'>Indonesia</span>
                )}
              </span>
              <div className='flex items-center'>
                {hasTotalSales() &&
                  image.map((img) => {
                    if (
                      img.attribute_code == 'total_sales' &&
                      img.value != null
                    ) {
                      return (
                        <p className='text-[10px] font-semibold'>
                          {img.value} Terjual
                        </p>
                      );
                    }
                  })}
                {!hasTotalSales() && (
                  <p className='text-[10px] font-semibold'></p>
                )}
              </div>
            </div>
            <div className='flex xxs:hidden justify-between pb-1.5'>
              <span className='text-liburdulu-blue text-[10px] lg:text-xs font-[400] flex items-center'>
                {mdUp && (
                  <Image
                    src='/libur_dulu_logo_only_Converted.png'
                    alt='logo-converted'
                    height={21}
                    width={25}
                    style={{
                      objectFit: 'contain',
                      marginRight: 1,
                    }}
                  />
                )}
                {!mdUp && (
                  <Image
                    src='/libur_dulu_logo_only_Converted.png'
                    alt='logo-converted'
                    height={18}
                    width={20}
                    style={{
                      objectFit: 'contain',
                      marginRight: 1,
                    }}
                  />
                )}
                {hasLocation() &&
                  image.map((img) => {
                    if (img.attribute_code == 'city' && img.value != null) {
                      return (
                        <span className='line-clamp-1' key={img.value}>
                          {img.value}
                        </span>
                      );
                    }
                  })}
                {!hasLocation() && (
                  <span className='line-clamp-1'>Indonesia</span>
                )}
              </span>
            </div>
            <div className='flex xxs:hidden px-1 pb-3'>
              {hasTotalSales() &&
                image.map((img) => {
                  if (
                    img.attribute_code == 'total_sales' &&
                    img.value != null
                  ) {
                    return (
                      <p className='text-[10px] font-semibold'>
                        {img.value} Terjual
                      </p>
                    );
                  }
                })}
              {!hasTotalSales() && (
                <p className='text-[10px] font-semibold'></p>
              )}
            </div>

            <div className='flex justify-between px-1'>
              <span className='text-sm lg:text-base mb-1 lg:mb-0 font-[500] line-clamp-2'>
                {name}
              </span>
            </div>
            <div className='px-1'>
              <span className='text-liburdulu-blue text-[11px] lg:text-xs font-normal line-clamp-3 xs:line-clamp-2 md:line-clamp-1'>
                {nameCategory.length > 0 ? nameCategory.join(', ') : ''}
              </span>
            </div>
          </div>
          {mdUp && (
            <div className='grid grid-flow-row p-0 justify-items-start'>
              {specialPrice == 0 && (
                <div className='grid px-1 justify-items-start'>
                  {lowestPrice != 0 && (
                    <span className='text-[12px] font-[500]'>Mulai Dari </span>
                  )}
                  <span className='text-[#e52424] text-[16px] font-[600]'>
                    Rp{' '}
                    {parseInt(
                      lowestPrice != 0 ? lowestPrice : price
                    ).toLocaleString()}
                  </span>
                </div>
              )}
              {specialPrice != 0 && (
                <>
                  <div className='grid px-1 justify-items-start'>
                    <span className='text-gray-400 text-[13px] font-[400] liburdulu-through'>
                      Rp.{' '}
                      {parseInt(
                        lowestPrice != 0 ? lowestPrice : price
                      ).toLocaleString()}
                    </span>
                    <span className='text-[#e52424] text-[16px] font-[600]'>
                      Rp. {parseInt(specialPrice).toLocaleString()}
                    </span>
                  </div>
                </>
              )}
            </div>
          )}
          {!mdUp && (
            <div className='grid grid-flow-row p-0 justify-items-start'>
              {specialPrice == 0 && (
                <div className='grid px-1 justify-items-start'>
                  {lowestPrice != 0 && (
                    <span className='text-[11px] font-[600]'>Mulai Dari </span>
                  )}
                  <span className='text-[#e52424] text-[13px] font-[600]'>
                    Rp{' '}
                    {parseInt(
                      lowestPrice != 0 ? lowestPrice : price
                    ).toLocaleString()}
                  </span>
                </div>
              )}
              {specialPrice != 0 && (
                <>
                  <div className='grid px-1 justify-items-start'>
                    <span className='text-gray-400 text-[11px] font-[400] liburdulu-through'>
                      Rp.{' '}
                      {parseInt(
                        lowestPrice != 0 ? lowestPrice : price
                      ).toLocaleString()}
                    </span>
                    <span className='text-[#e52424] text-[13px] font-[600]'>
                      Rp. {parseInt(specialPrice).toLocaleString()}
                    </span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </Card>
      <div className='absolute h-full w-full top-0' id={id}></div>
    </Link>
  );
}
