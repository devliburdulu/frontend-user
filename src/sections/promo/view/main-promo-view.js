'use client';

import { useEffect, useState } from 'react';
import { _mock } from '../../../_mock';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Container';
import Banner from 'src/sections/reuseable/banner';
import ProductList from '../product-list';
import ProductWow from '../product-wow';
import { useResponsive } from 'src/hooks/use-responsive';
import { getProduct } from 'src/fetch-global';
import { getHomePromo } from 'src/rest/HomePromo';
import { getWomanOnWander } from 'src/rest/Campaign';
import { getPromoEvent } from 'src/rest/Event';
import Iconify from 'src/components/iconify/iconify';
import Image from 'next/image';
import Head from 'next/head';

const MetaTags = ({ title, description, image }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
      <meta name='twitter:card' content='summary_large_image' />
    </Head>
  );
};

export default function MainPromoView({ promo }) {
  // console.log('promo url:', promo);
  const [campaign, setCampaign] = useState();
  // THIS VAR FOR ALL FILTER
  const [filter, setFilter] = useState({
    categoryName: 'Semua Produk',
    categoryId: 9999,
    search: '',
    maxPrice: -1,
    minPrice: -1,
    // page: 1,
  });
  const [mockBanner, setMockBanner] = useState([]);
  const [description, setDescription] = useState([]);
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [priceValue, setPriceValue] = useState({
    min: '',
    max: '',
  });
  const [debouncedInputValue, setDebouncedInputValue] = useState('');
  const mdUp = useResponsive('up', 'md');

  // Check if this is the dieng-culture-festival promo
  const isDiengCultureFestival = promo === 'dieng-culture-festival';

  // THIS USE EFFECT FOR REFRESH NEW DATA BASE ON FILTER CHANGE
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const result = await getProduct(filter.page, 12, filter)
          .then((data) => {
            setProduct(data);
          })
          .finally(() => setIsLoading(false));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    setIsFirstLaunch(false);
  }, [filter]);

  // THIS USE EFFECT FOR MAKE USEEFFECT GET DATA NOT TRIGGER WHEN SEARCH SET "" BECAUSE USER SELECT CATEGORY
  useEffect(() => {
    if (filter.categoryId != 0) {
      setIsFirstLaunch(true);
      setSearchValue('');
    }
  }, [filter.categoryId]);

  // THIS USE EFFECT FOR REFRESH FILTER BASE ON SEARCH
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(searchValue);
      if (isFirstLaunch) {
        setIsFirstLaunch(false);
      } else {
        if (searchValue) {
          setFilter((filter) => ({
            ...filter,
            categoryName: `Search "${searchValue}"`,
            categoryId: 0,
            search: searchValue,
            page: 1,
          }));
        } else {
          setFilter((filter) => ({
            ...filter,
            categoryName: `All Product`,
            search: '',
            page: 1,
          }));
        }
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchValue, 1000]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(priceValue);
      if (isFirstLaunch) {
        setIsFirstLaunch(false);
      } else {
        if (priceValue.min && priceValue.max) {
          setFilter((filter) => ({
            ...filter,
            minPrice: parseInt(priceValue.min),
            maxPrice: parseInt(priceValue.max),
            page: 1,
          }));
        } else {
          setFilter((filter) => ({
            ...filter,
            minPrice: -1,
            maxPrice: -1,
            page: 1,
          }));
        }
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [priceValue, 1000]);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedId = localStorage.getItem('id');
      if (storedId) {
        setFilter((filter) => ({
          ...filter,
          categoryId: parseInt(storedId, 10),
          page: 1,
        }));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let banner = [];
        let desc = [];
        const data = await getHomePromo();
        // console.log('Cek Data Promo', data);

        data.forEach((prom) => {
          if (prom.url === decodeURIComponent(promo)) {
            setFilter((filter) => ({
              ...filter,
              categoryName: `${prom.title}`,
              categorySubName: `${prom.subtitle}`,
              categoryId: prom.category,
              search: '',
              page: 1,
            }));
            banner.push({
              id: prom.id,
              coverUrl: `${process.env.NEXT_PUBLIC_IMAGE_EDU}${prom.banner_image.url}`,
              title: prom.title,
              subtitle: prom.subtitle,
            });
            desc.push({
              id: prom.id,
              description: prom.description,
            });
          }
        });
        setMockBanner(banner);
        setDescription(desc);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [promo]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await getPromoEvent();
        const formattedCampaign = {
          logo: response.logo?.url
            ? `${process.env.NEXT_PUBLIC_IMAGE_EDU}${response.logo.url}`
            : undefined,
          video: response.link_video,
          title: response.title,
          description: response.content_desc,
          content_img_1: response.content_1?.url
            ? `${process.env.NEXT_PUBLIC_IMAGE_EDU}${response.content_1.url}`
            : undefined,
          content_img_2: response.content_2?.url
            ? `${process.env.NEXT_PUBLIC_IMAGE_EDU}${response.content_2.url}`
            : undefined,
          content_img_3: response.content_3?.url
            ? `${process.env.NEXT_PUBLIC_IMAGE_EDU}${response.content_3.url}`
            : undefined,
          content_img_4: response.content_4?.url
            ? `${process.env.NEXT_PUBLIC_IMAGE_EDU}${response.content_4.url}`
            : undefined,
          contentImages: [
            response.content_1?.url,
            response.content_2?.url,
            response.content_3?.url,
            response.content_4?.url,
          ]
            .filter(Boolean)
            .map((img) => `${process.env.NEXT_PUBLIC_IMAGE_EDU}${img}`),
        };

        setCampaign(formattedCampaign);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCampaigns();
  }, []);

  const renderCampaign = (
    <div className='my-5 md:my-10'>
      <Typography
        variant='subtitle1'
        paragraph
        sx={{
          fontSize: {
            xs: '1rem',
            sm: '1.25rem',
            md: '1.5rem',
          },
          fontWeight: 700,
          paddingLeft: '0 !important',
          paddingRight: '0 !important',
          textAlign: 'center',
          color: '#212b36',
          marginBottom: { xs: '0.75rem', md: '1rem' },
        }}>
        {campaign?.title}
      </Typography>
      {campaign?.video && (
        <div className='relative w-full h-[208px] sm:h-[240px] md:h-[560px] 2xl:h-[650px] mt-1 mb-3 md:mb-8'>
          <iframe
            title='Video Woman on Wander'
            src={campaign?.video}
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            className='w-full h-full rounded-2xl'></iframe>
        </div>
      )}
    </div>
  );

  const renderDesc = (
    <Typography
      variant='caption'
      paragraph
      sx={{
        fontSize: {
          xs: '13px',
          md: '16px',
        },
        paddingLeft: '0 !important',
        paddingRight: '0 !important',
        textAlign: { xs: 'center', md: 'left' },
        marginBottom: { xs: '1.5rem', md: '0' },
        color: '#637381',
        '& p strong': { fontWeight: '700', color: '#212b36' },
      }}
      dangerouslySetInnerHTML={{ __html: campaign?.description }}
    />
  );

  const renderGallery = (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 my-5 md:my-8 px-5 md:px-0'>
      {campaign?.content_img_1 && (
        <div className='col-span-1 md:col-span-1'>
          <Image
            src={campaign.content_img_1}
            alt='wow-content'
            width={600}
            height={600}
            quality={100}
            priority={true}
            className='object-contain rounded-2xl'
          />
        </div>
      )}
      {campaign?.content_img_2 && (
        <div className='col-span-1 md:col-span-1'>
          <Image
            src={campaign.content_img_2}
            alt='wow-content'
            width={600}
            height={600}
            quality={100}
            priority={true}
            className='object-contain rounded-2xl'
          />
        </div>
      )}
      {campaign?.content_img_3 && (
        <div className='col-span-1 md:col-span-1'>
          <Image
            src={campaign.content_img_3}
            alt='wow-content'
            width={600}
            height={600}
            quality={100}
            priority={true}
            className='object-contain rounded-2xl'
          />
        </div>
      )}
      {campaign?.content_img_4 && (
        <div className='col-span-1 md:col-span-1'>
          <Image
            src={campaign.content_img_4}
            alt='wow-content'
            width={600}
            height={600}
            quality={100}
            priority={true}
            className='object-contain rounded-2xl'
          />
        </div>
      )}
    </div>
  );

  const metaTitle = `Promo Liburdulu - ${mockBanner?.[0]?.title}`;
  const metaDesc = mockBanner?.[0]?.subtitle;
  const metaImage = mockBanner?.[0]?.coverUrl;

  if (isDiengCultureFestival) {
    return (
      <>
        <MetaTags title={metaTitle} description={metaDesc} image={metaImage} />
        <Container sx={{ mt: 5, mb: { xs: 5, md: 8 } }}>
          {mockBanner.length != 0 && <Banner data={mockBanner} />}
          {mdUp && (
            <div className='mt-0'>
              {!isLoading && (
                <div className='mt-8 mb-2'>
                  {renderCampaign}
                  <div className='flex flex-row'>
                    <div className='w-3/4 pr-10'>
                      {campaign?.logo && (
                        <div className='d-flex justify-center text-center'>
                          <Image
                            src={campaign?.logo}
                            alt='wow-logo'
                            width={320}
                            height={320}
                            quality={100}
                            priority={true}
                            className='object-contain mb-4'
                          />
                        </div>
                      )}
                      {renderDesc}
                    </div>
                    <div className='w-1/4'>
                      <ProductWow
                        filter={filter}
                        setFilter={setFilter}
                        product={product}
                        isLoading={isLoading}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        priceValue={priceValue}
                        setPriceValue={setPriceValue}
                      />
                    </div>
                  </div>
                  {renderGallery}
                </div>
              )}
              {isLoading && (
                <div className='grid grid-cols-1 h-[600px] place-content-center'>
                  <div className='place-self-center'>
                    <Iconify
                      icon='line-md:loading-loop'
                      sx={{ fontSize: 20, color: '#000000' }}
                    />
                  </div>
                  <p className='place-self-center text-3xl font-semibold'>
                    Mohon Tunggu
                  </p>
                </div>
              )}
            </div>
          )}
          {!mdUp && (
            <div className='mb-0'>
              {!isLoading && (
                <div className='mt-8 mb-2'>
                  {renderCampaign}
                  <div className='flex flex-col'>
                    <div className='w-full'>
                      {campaign?.logo && (
                        <div className='d-flex justify-center text-center'>
                          <Image
                            src={campaign?.logo}
                            alt='wow-logo'
                            width={300}
                            height={300}
                            quality={100}
                            priority={true}
                            className='object-contain mb-3'
                          />
                        </div>
                      )}
                      {renderDesc}
                    </div>
                    <div className='w-full px-5'>
                      <ProductWow
                        filter={filter}
                        setFilter={setFilter}
                        product={product}
                        isLoading={isLoading}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        priceValue={priceValue}
                        setPriceValue={setPriceValue}
                      />
                    </div>
                  </div>
                  {renderGallery}
                </div>
              )}
              {isLoading && (
                <div className='grid grid-cols-1 h-[600px] place-content-center'>
                  <div className='place-self-center'>
                    <Iconify
                      icon='line-md:loading-loop'
                      sx={{ fontSize: 20, color: '#000000' }}
                    />
                  </div>
                  <p className='place-self-center text-3xl font-semibold'>
                    Mohon Tunggu
                  </p>
                </div>
              )}
            </div>
          )}
        </Container>
      </>
    );
  }
  return (
    <>
      <MetaTags title={metaTitle} description={metaDesc} image={metaImage} />
      <Container sx={{ mt: 5, mb: 10 }}>
        {mockBanner.length != 0 && <Banner data={mockBanner} />}
        {mdUp && (
          <div className='grid grid-cols-4 mt-5 mb-3'>
            <div className='col-span-4'>
              {!isLoading && (
                <ProductList
                  filter={filter}
                  setFilter={setFilter}
                  product={product}
                  isLoading={isLoading}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  priceValue={priceValue}
                  setPriceValue={setPriceValue}
                />
              )}
              {isLoading && (
                <div className='grid grid-cols-1 h-[600px] place-content-center'>
                  <div className='place-self-center'>
                    <Iconify
                      icon='line-md:loading-loop'
                      sx={{ fontSize: 20, color: '#000000' }}
                    />
                  </div>
                  <p className='place-self-center text-3xl font-semibold'>
                    Mohon Tunggu
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        {!mdUp && (
          <div className='mb-0'>
            {!isLoading && (
              <ProductList
                filter={filter}
                setFilter={setFilter}
                product={product}
                isLoading={isLoading}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                priceValue={priceValue}
                setPriceValue={setPriceValue}
              />
            )}
            {isLoading && (
              <div className='grid grid-cols-1 h-[600px] place-content-center'>
                <div className='place-self-center'>
                  <Iconify
                    icon='line-md:loading-loop'
                    sx={{ fontSize: 20, color: '#000000' }}
                  />
                </div>
                <p className='place-self-center text-3xl font-semibold'>
                  Mohon Tunggu
                </p>
              </div>
            )}
          </div>
        )}
        {description.map((item) => {
          return (
            <div className='my-2' key={item.id}>
              <Typography
                variant='body2'
                color='text.primary'
                paragraph
                sx={{
                  fontSize: {
                    xs: '0.875rem',
                    md: '1rem',
                    paddingLeft: '0 !important',
                    paddingRight: '0 !important',
                  },
                }}
                dangerouslySetInnerHTML={{
                  __html: item?.description,
                }}></Typography>
            </div>
          );
        })}
      </Container>
    </>
  );
}
