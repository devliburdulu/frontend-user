'use client';

import Head from 'next/head';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useEffect, useRef } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { useSettingsContext } from 'src/components/settings';
import { paths } from 'src/routes/paths';
import { ProductDetailsSkeleton } from '../product-skeleton';
import { useFetchCategoryNames } from '../summary/fetchCategoryNames';
import { getAllReview } from 'src/fetch-global';
import { getSellerBySKU, getProductHotelBySKU } from 'src/fetch-global';
import { useStockManagement } from '../summary/stockManagement';
import { usePriceManagement } from '../summary/priceManagement';
import { useCartManagement } from '../summary/cartManagement';
import { useOptionHandlers } from '../summary/optionHandlers';
import { getListCustomOptions } from '../summary/customOptionHotel';
import { getHomePromo } from 'src/rest/HomePromo';
import { handleAddToCart, handleBuyNow } from '../summary/cardActions';
import moment from 'moment';
import { useCartContext } from 'src/context/CartContext';
import Cookies from 'js-cookie';

import ProductHeader from '../product-header';
import ProductDetailsCarousel from '../gallery/product-detail-carousel';
import ProductContent from '../product-content';
import ProductRelated from '../product-related';

function stripHtmlAndTrim(text = '', maxLength = 160) {
  const plainText = text.replace(/<[^>]*>/g, '').trim();
  if (plainText.length <= maxLength) return plainText;

  const trimmed = plainText.slice(0, maxLength);
  const lastSpaceIndex = trimmed.lastIndexOf(' ');
  return trimmed.slice(0, lastSpaceIndex) + '...';
}

export default function DetailProductView({ id }) {
  const router = useRouter();
  const settings = useSettingsContext();
  const [data, setData] = useState(null);
  const [seller, setSeller] = useState(null);
  const [value, setValue] = useState(1);
  const [valueMin, setValueMin] = useState(1);
  const [valueMinCur, setValueMinCur] = useState(1);
  const [valueMax, setValueMax] = useState(Infinity);
  const [currentSku, setCurrentSku] = useState(id);
  const [subSku, setSubSku] = useState(id);
  const [currentTab, setCurrentTab] = useState('description');
  const [review, setReview] = useState();
  const [reviewCount, setReviewCount] = useState(0);
  const [categoryNames, setCategoryNames] = useState([]);
  const [subSkuCode, setSubSkuCode] = useState(0);
  const [promo, setPromo] = useState([]);
  const [price, setPrice] = useState(0);
  const [pricePlus, setPricePlus] = useState(0);
  const [specialPrice, setSpecialPrice] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [childrenProduct, setChildrenProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddToCart, setIsAddToCart] = useState(false);
  const [isBuyNow, setIsBuyNow] = useState(false);
  const [isCountQty, setIsCountQty] = useState(true);
  const [qty, setQty] = useState(0);
  const [label, setLabel] = useState('');
  const [attributeid, setAttributeid] = useState(0);
  const time = moment();
  const timeForDateType = moment();
  const { setItemCount } = useCartContext();
  const TOKEN_USER = Cookies.get('accessToken');

  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Initialize custom hooks (after data loaded)
  const { getChildrenProduct, getQty, countQtyHotel } = data
    ? useStockManagement(data)
    : {};
  const { calculateInitialPrice, calculateChildrenProductPrice } = data
    ? usePriceManagement()
    : {};
  const { createInitialCart, updateCart } = data
    ? useCartManagement(data, time, timeForDateType)
    : {};

  // Cart state initialization
  const [cart, setCart] = useState(() =>
    data
      ? createInitialCart(subSkuCode, currentSku, subSku, value, attributeid)
      : null
  );

  // Cart update function
  const handleUpdateCart = (customOptions = [], configurableOptions = []) => {
    setCart((prevCart) =>
      updateCart(
        prevCart,
        subSkuCode,
        currentSku,
        subSku,
        value,
        customOptions,
        configurableOptions
      )
    );
  };

  // Initialize option handlers
  const { handleChange, handleChangeCustomOption } = data
    ? useOptionHandlers(
        childrenProduct,
        setSubSku,
        setSubSkuCode,
        pricePlus,
        attributeid,
        handleUpdateCart,
        (sku, isChangeValue) =>
          getQty(
            sku,
            isChangeValue,
            setQty,
            setValue,
            setValueMin,
            setValueMinCur,
            setValueMax,
            setIsCountQty
          ),
        subSku,
        data,
        setPricePlus,
        setSpecialPrice,
        setPrice,
        cart,
        countQtyHotel,
        getListCustomOptions(data),
        value,
        valueMinCur,
        setValueMin,
        setValue,
        label
      )
    : {};

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
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

  // Cart state reset when product data changes
  useEffect(() => {
    if (data && createInitialCart) {
      const newInitialCart = createInitialCart(0, data.sku, data.sku, 1, 0);
      setCart(newInitialCart);
    }
  }, [data?.sku]);

  // Initialize price calculation
  useEffect(() => {
    if (data && calculateInitialPrice) {
      calculateInitialPrice(data, setPrice, setSpecialPrice, setPricePlus);
      setIsLoading(false);
    }
  }, [data]);

  // Calculate children product price
  useEffect(() => {
    if (data && calculateChildrenProductPrice) {
      calculateChildrenProductPrice(
        childrenProduct,
        data,
        setPrice,
        setSpecialPrice,
        setPricePlus,
        setSubSku,
        setSubSkuCode,
        handleUpdateCart,
        attributeid,
        label
      );
      setIsLoading(false);
    }
  }, [childrenProduct, label]);

  // Fetch children products
  useEffect(() => {
    if (data && getChildrenProduct) {
      getChildrenProduct(
        currentSku,
        setChildrenProduct,
        setLabel,
        setAttributeid
      );
    }
  }, [currentSku, data]);

  useEffect(() => {
    if (data && getQty) {
      getQty(
        subSku,
        false,
        setQty,
        setValue,
        setValueMin,
        setValueMinCur,
        setValueMax,
        setIsCountQty
      );
    }
  }, [data, subSku]);

  useEffect(() => {
    if (data && getQty) {
      getQty(
        subSku,
        true,
        setQty,
        setValue,
        setValueMin,
        setValueMinCur,
        setValueMax,
        setIsCountQty
      );
    }
    if (
      countQtyHotel &&
      data &&
      cart &&
      getListCustomOptions &&
      typeof countQtyHotel === 'function'
    ) {
      countQtyHotel(
        data,
        getListCustomOptions(data),
        cart,
        value,
        valueMinCur,
        setValueMin,
        setValue
      );
    }
  }, [value, subSku, data]);

  // Review count
  const fetchReviewCount = async (value) => {
    try {
      const data = await getAllReview(value);
      setReview(data.length);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data?.sku) {
      fetchReviewCount(data.sku);
    }
  }, [data?.sku]);

  // Analytics functions
  function moveToMitraProfile(search) {
    localStorage.setItem('idMitra', 0);
    localStorage.setItem('searchMitra', 'Semua Produk');
    router.push(paths.mitra.root(search));

    if (typeof window !== 'undefined' && window.dataLayer && isVisible) {
      window.dataLayer.push({
        event: 'mitraClick',
        mitraDetail: {
          mitraName: seller?.shop_title,
          mitraFrom: 'Single Page',
          mitraURL: search,
        },
      });
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.dataLayer && isVisible) {
      window.dataLayer.push({
        event: 'mitraImpression',
        mitraDetail: {
          mitraName: seller?.shop_title,
          mitraFrom: 'Home Page',
          mitraURL: data?.sku,
        },
      });
    }
  }, [isVisible, seller, data?.sku]);

  // Fetch category names
  useFetchCategoryNames(data?.custom_attributes || [], setCategoryNames);

  // Down payment calculation
  useEffect(() => {
    if (data?.custom_attributes) {
      const amount_dp = data.custom_attributes.find(
        (attr) => attr.attribute_code === 'down_payment'
      );

      if (amount_dp?.value) {
        setDownPayment(parseFloat(amount_dp.value));
      } else {
        setDownPayment(0);
      }
    }
  }, [data?.custom_attributes]);

  // Fetch promo data
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const promoResponse = await getHomePromo();
        const flashSale = promoResponse.find(
          (prom) => prom.url === 'flashsale'
        );

        if (flashSale) {
          setPromo([
            {
              id: flashSale.id,
              logo: `${process.env.NEXT_PUBLIC_IMAGE_EDU}${flashSale.desktop_image.url}`,
              startDate: flashSale.start_date,
              endDate: flashSale.end_date,
            },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchAllData();
  }, []);

  // Action handlers
  const handleAddToCartClick = () => {
    handleUpdateCart();
    handleAddToCart({
      TOKEN_USER,
      // cart,
      cart: {
        ...cart,
        cartItem: {
          ...cart?.cartItem,
          qty: value,
        },
      },
      listCustomOptions: getListCustomOptions(data),
      data,
      setIsAddToCart,
      setItemCount,
      handleUpdateCart,
      router,
    });
  };

  const handleBuyNowClick = () => {
    handleUpdateCart();
    handleBuyNow({
      TOKEN_USER,
      cart: {
        ...cart,
        cartItem: {
          ...cart?.cartItem,
          qty: value,
        },
      },
      listCustomOptions: getListCustomOptions(data),
      data,
      setIsBuyNow,
      router,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProductHotelBySKU(id);
        setData(result);
        const sellerResult = await getSellerBySKU(id);
        if (sellerResult && sellerResult.length > 0) {
          setSeller(sellerResult[0].seller);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await getAllReview(id);
        setReviewCount(reviews.length || 0);
        setReview(reviews);
      } catch (error) {
        console.error(error);
        setReviewCount(0);
      }
    };
    fetchReviews();
  }, [id]);

  // Render skeleton while loading data
  if (!data || isLoading) {
    return (
      <Container
        sx={{ mt: { xs: 2, md: 5 }, mb: 4, px: { xs: 0, md: 2 } }}
        maxWidth={settings.themeStretch ? false : 'lg'}>
        <ProductDetailsSkeleton />
      </Container>
    );
  }

  const totalSales = data?.custom_attributes?.find(
    (attr) => attr.attribute_code === 'total_sales'
  );

  const metaTitle = `${data.name}`;
  const rawDesc = data?.custom_attributes?.find(
    (attr) => attr.attribute_code === 'short_description'
  )?.value;
  const metaDesc = stripHtmlAndTrim(rawDesc, 160);
  const metaImage = `${process.env.NEXT_PUBLIC_MAGENTO_API}/pub/media/catalog/product${data?.media_gallery_entries[0].file}`;

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name='description' content={metaDesc} />
        <meta property='og:title' content={metaTitle} />
        <meta property='og:description' content={metaDesc} />
        <meta property='og:image' content={metaImage} />
        <meta name='twitter:title' content={metaTitle} />
        <meta name='twitter:description' content={metaDesc} />
        <meta name='twitter:image' content={metaImage} />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <Container
        maxWidth={settings.themeStretch ? false : 'lg'}
        sx={{
          mt: 4,
          display: { xs: 'none', md: 'block' },
        }}>
        <div className='my-0'>
          <span className='text-[13px] font-medium text-liburdulu-darkGray'>
            <button
              onClick={() => router.push(paths.homepage)}
              className='mx-1'>
              Beranda
            </button>{' '}
            /{' '}
            <button
              onClick={() => router.push(paths.product.root)}
              className='mx-1'>
              Produk
            </button>{' '}
            /{' '}
            <button className='mx-1 font-semibold text-liburdulu-black'>
              {data.name}
            </button>
          </span>
          <div className='mb-1 hidden sm:block'>
            <ProductHeader
              data={data}
              seller={seller}
              category={categoryNames}
              moveToMitraProfile={moveToMitraProfile}
              elementRef={elementRef}
              review={reviewCount}
              sales={totalSales?.value || 0}
            />
          </div>
        </div>
      </Container>
      <Container
        maxWidth={settings.themeStretch ? false : 'lg'}
        sx={{
          mt: { xs: 2, md: 1 },
          mb: 10,
          padding: {
            xs: '0',
            md: '0.25rem 1.5rem',
          },
          position: 'relative',
        }}>
        <Grid container spacing={{ xs: 0, md: 5, lg: 4 }} sx={{ margin: 0 }}>
          <Grid xs={12} sx={{ padding: 0 }}>
            {data && (
              <ProductDetailsCarousel
                media={
                  data.media_gallery_entries ? data.media_gallery_entries : null
                }
              />
            )}
          </Grid>
          <Grid xs={12} sx={{ padding: 0 }}>
            <div className='mt-4 px-3 block md:hidden'>
              <ProductHeader
                data={data}
                seller={seller}
                category={categoryNames}
                review={reviewCount}
                sales={totalSales?.value || 0}
                moveToMitraProfile={moveToMitraProfile}
                elementRef={elementRef}
              />
            </div>
          </Grid>
        </Grid>
        <ProductContent
          data={data}
          category={categoryNames}
          seller={seller}
          sku={id}
          image={data.custom_attributes}
          review={reviewCount}
          childrenProduct={childrenProduct}
          subSkuCode={subSkuCode}
          subSku={subSku}
          handleChange={handleChange}
          label={label}
          time={time}
          handleChangeCustomOption={handleChangeCustomOption}
          cart={cart}
          timeForDateType={timeForDateType}
          // nameCategory={nameCategory}
          downPayment={downPayment}
          price={price}
          specialPrice={specialPrice}
          // Props untuk ProductQuantity
          value={value}
          valueMin={valueMin}
          valueMax={valueMax}
          qty={qty}
          setValue={setValue}
          // Props untuk ProductActions
          isAddToCart={isAddToCart}
          isBuyNow={isBuyNow}
          handleAddToCart={handleAddToCartClick}
          handleBuyNow={handleBuyNowClick}
        />
        <ProductRelated
          category={data?.custom_attributes.find(
            (attr) => attr.attribute_code === 'category_ids'
          )}
        />
      </Container>
    </>
  );
}

DetailProductView.propTypes = {
  id: PropTypes.string,
};
