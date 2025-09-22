import { useEffect, useRef, useState } from 'react';
import { Card, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import Rating from '@mui/material/Rating';
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

export default function ShopCard({
  id,
  idProduct,
  rating,
  location,
  name,
  category,
  price,
  discount,
  image,
  from,
}) {
  //
  const [value, setValue] = useState(-1);
  const mdUp = useResponsive('up', 'md');
  const [hasThumbnail, setHasThumbnail] = useState(false);
  const [sourceThumbnail, setSourceThumbnail] = useState();
  const [lowestPrice, setLowestPrice] = useState(0);
  const [specialPrice, setSpecialPrice] = useState(0);
  const [nameCategory, setNameCategory] = useState([]);
  const [cardHeight, setCardHeight] = useState('auto');

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

    // Clean up the observer
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
      (img) =>
        // (img.attribute_code === "city" || img.attribute_code === "location") && img.value != null
        img.attribute_code === 'city' && img.value != null
    );
  };

  const handleOnClick = () => {
    //

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
          // if (special) {
          //     specialPrice = parseInt(special.value);
          // }
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
        // if (special) {
        //     specialPrice = parseInt(special.value);
        // }
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
      className='relative drop-shadow'
      onClick={() => handleOnClick()}
      ref={elementRef}>
      <Card
        className='p-2 rounded-[20px] h-fit absolute'
        sx={{
          height: { xs: 375, md: 400 },
          // Sets a minimum height of 300px on mobile, but allows it to grow if needed, with fixed 400px on desktop
          minHeight: 320,
          // Ensures a consistent minimum height across all instances
        }}>
        <Card
          className='rounded-[10px] relative'
          sx={{
            aspectRatio: '1 / 1',
            width: '100%',
            maxHeight: '50%',
          }}>
          {hasThumbnailImage() &&
            image.map((img) => {
              if (img.attribute_code == 'thumbnail' && img.value != null) {
                const [image, setImage] = useState(
                  `${process.env.NEXT_PUBLIC_MAGENTO_API}/pub/media/catalog/product${img.value}`
                );
                const [css, setCss] = useState('h-full w-full object-cover');
                // let curimage = `https://old.backend.liburdulu.id/pub/media/catalog/product${img.value}`;
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
              {/* <img src="default image 1.png" alt="" className="bg-liburdulu-gray h-[100px] w-full object-contain p-3" /> */}
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
              <span className='text-[14px] font-semibold text-liburdulu-white'>
                {
                  image.find((img) => img.attribute_code === 'badge_product')
                    ?.value
                }
              </span>
            </div>
          )}
          {/* <Image src="/iconvilla.png" alt='' width={600} height={195} style={{
                        // width: "100%",
                        // height: "195px",
                        objectFit: "contain",
                    }} /> */}
          {/* <img src="iconvilla.png" alt="" className='bg-liburdulu-blue h-[195px] object-contain' /> */}
        </Card>
        <div className='flex flex-col justify-between h-2/4 pt-2'>
          <div className='grid grid-flow-row p-1'>
            <div className='flex justify-between'>
              <span className='text-liburdulu-blue text-[12px] font-[400] flex items-center'>
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
                {/* {location} */}
                {hasLocation() &&
                  image.map((img) => {
                    if (img.attribute_code == 'city' && img.value != null) {
                      return (
                        <span className='line-clamp-1' key={img.value}>
                          {img.value}
                        </span>
                      );
                    }
                    // else
                    // if (img.attribute_code == "location" && img.value != null) {
                    //     return <span className="line-clamp-1" key={img.value}>{img.value}</span>;
                    // }
                  })}
                {!hasLocation() && (
                  <span className='line-clamp-1'>Indonesia</span>
                )}
              </span>
              {/* {mdUp && <Rating icon={<Iconify icon="line-md:star-filled" sx={{ fontSize: 13 }} />} emptyIcon={<Iconify icon="line-md:star-twotone" sx={{ fontSize: 13 }} />} name="read-only" value={value} readOnly />}
                            {!mdUp && ( */}
              {mdUp && (
                <div className='flex items-center'>
                  {/* <Iconify icon="line-md:star-filled" sx={{ fontSize: 13, color: "#ffaa00" }} /> */}
                  {/* {value < 0 ? "Hitung..." : value} Ulasan */}

                  {/* Total Sales */}
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
                    <p className='text-[10px] font-semibold'>0 Terjual</p>
                  )}
                </div>
              )}
            </div>
            {!mdUp && (
              <div className='flex px-1 pb-2'>
                {/* <Iconify icon="line-md:star-filled" sx={{ fontSize: 13, color: "#ffaa00" }} /> */}
                {/* <p className="text-[10px] font-semibold">
                                    {value < 0 ? "Hitung..." : value} Ulasan
                                </p> */}

                {/* Total Sales */}
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
                  <p className='text-[10px] font-semibold'>0 Terjual</p>
                )}
              </div>
            )}
            <div className='flex justify-between px-1'>
              {mdUp && (
                <span className='text-[16px] font-[500] line-clamp-2 mb-1'>
                  {name}
                </span>
              )}
              {!mdUp && (
                <span className='text-[16px] font-[500] line-clamp-2 mb-1'>
                  {name}
                </span>
              )}
            </div>
            <div className='px-1'>
              {mdUp && (
                <span className='text-liburdulu-blue text-[12px] font-[400] line-clamp-2'>
                  {/* {category} */}
                  {/* {image &&
                                    image.map((img) => {
                                        if (img.attribute_code == "category_ids" && img.value != null) {
                                            
                                            // img.value.map(cat => {
                                            //     nameCategoryCheck(cat);
                                            // })
                                            nameCategoryCheck(img.value);
                                            return nameCategory;
                                        }
                                    })} */}
                  {nameCategory.length > 0 ? nameCategory.join(', ') : ''}
                </span>
              )}
              {!mdUp && (
                <span className='text-liburdulu-blue text-[12px] font-[400] line-clamp-1'>
                  {/* {category} */}
                  {/* {image &&
                                    image.map((img) => {
                                        if (img.attribute_code == "category_ids" && img.value != null) {
                                            
                                            // img.value.map(cat => {
                                            //     nameCategoryCheck(cat);
                                            // })
                                            nameCategoryCheck(img.value);
                                            return nameCategory;
                                        }
                                    })} */}
                  {nameCategory.length > 0 ? nameCategory.join(', ') : ''}
                </span>
              )}
            </div>
          </div>
          {mdUp && (
            <div className='grid grid-flow-row p-1 justify-items-start'>
              {specialPrice == 0 && (
                <div className='grid px-1 justify-items-start'>
                  {lowestPrice != 0 && (
                    <span className='text-[12px] font-[500]'>Mulai Dari </span>
                  )}
                  {/* <span className="text-gray-400 text-[13px] font-[400] line-through">Rp. {parseInt(lowestPrice).toLocaleString()}</span> */}
                  <span className='text-liburdulu-orange text-[16px] font-[600]'>
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
                    {/* {lowestPrice != 0 && <span className="text-[10px] font-[600]">Mulai Dari </span>} */}
                    <span className='text-gray-400 text-[13px] font-[400] line-through'>
                      Rp.{' '}
                      {parseInt(
                        lowestPrice != 0 ? lowestPrice : price
                      ).toLocaleString()}
                    </span>
                    <span className='text-liburdulu-orange text-[16px] font-[600]'>
                      Rp. {parseInt(specialPrice).toLocaleString()}
                    </span>
                  </div>
                </>
              )}
            </div>
          )}
          {!mdUp && (
            <div className='grid grid-flow-row p-1 justify-items-start'>
              {specialPrice == 0 && (
                <div className='grid px-1 justify-items-start'>
                  {lowestPrice != 0 && (
                    <span className='text-[11px] font-[600]'>Mulai Dari </span>
                  )}
                  {/* <span className="text-gray-400 text-[13px] font-[400] line-through">Rp. {parseInt(lowestPrice).toLocaleString()}</span> */}
                  <span className='text-liburdulu-orange text-[13px] font-[600]'>
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
                    {/* {lowestPrice != 0 && <span className="text-[10px] font-[600]">Mulai Dari </span>} */}
                    <span className='text-gray-400 text-[11px] font-[400] line-through'>
                      Rp.{' '}
                      {parseInt(
                        lowestPrice != 0 ? lowestPrice : price
                      ).toLocaleString()}
                    </span>
                    <span className='text-liburdulu-orange text-[13px] font-[600]'>
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
