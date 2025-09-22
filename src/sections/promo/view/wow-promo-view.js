'use client';

import { useEffect, useState } from 'react';
// import { _mock } from '../../../_mock';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Container';
import Banner from 'src/sections/reuseable/banner';
import ProductWow from '../product-wow';
import { useResponsive } from 'src/hooks/use-responsive';
import { getProduct } from 'src/fetch-global';
import { getHomePromo } from 'src/rest/HomePromo';
import { getWomanOnWander } from 'src/rest/Campaign';
import Iconify from 'src/components/iconify/iconify';
import Image from 'next/image';
import Head from 'next/head';

export default function WowPromoView({ promo }) {
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

  // THIS VAR FOR PRODUCT
  const [product, setProduct] = useState();

  // THIS VAR FOR CONDITION
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  // THIS VAR FOR SEARCH & PRICE TEXTFIELD
  const [searchValue, setSearchValue] = useState('');
  const [priceValue, setPriceValue] = useState({
    min: '',
    max: '',
  });

  // THIS VAR FOR DEBOUNCE
  const [debouncedInputValue, setDebouncedInputValue] = useState('');

  // THIS VAR FOR CONSITION RESPONSIVE
  const mdUp = useResponsive('up', 'md');

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let banner = [];
        let desc = [];
        const data = await getHomePromo();

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
        const response = await getWomanOnWander();
        const formattedCampaign = {
          logo: `${process.env.NEXT_PUBLIC_IMAGE_EDU}${response.logo?.url}`,
          video: response.link_video,
          title: response.title,
          description: response.content_desc,
          content_img_1: `${process.env.NEXT_PUBLIC_IMAGE_EDU}${response.content_1?.url}`,
          content_img_2: `${process.env.NEXT_PUBLIC_IMAGE_EDU}${response.content_2?.url}`,
          content_img_3: `${process.env.NEXT_PUBLIC_IMAGE_EDU}${response.content_3?.url}`,
          content_img_4: `${process.env.NEXT_PUBLIC_IMAGE_EDU}${response.content_4?.url}`,
          contentImages: [
            response.content_1?.url,
            response.content_2?.url,
            response.content_3?.url,
            response.content_4?.url,
          ].map((img) => `${process.env.NEXT_PUBLIC_IMAGE_EDU}${img}`),
        };

        setCampaign(formattedCampaign);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCampaigns();
  }, []);

  const metaTitle = `Promo Liburdulu - ${mockBanner?.[0]?.title}`;
  const metaDesc = mockBanner?.[0]?.subtitle;
  const metaImage = mockBanner?.[0]?.coverUrl;

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
          color: '#a6563d',
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
        '& p strong': { fontWeight: '700', color: '#a6563d' },
      }}
      dangerouslySetInnerHTML={{ __html: campaign?.description }}
    />
  );

  const renderGallery = (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 my-5 md:my-8 px-5 md:px-0'>
      <div className='col-span-1 md:col-span-1'>
        <Image
          src={campaign?.content_img_1}
          alt='wow-content'
          width={600}
          height={600}
          quality={100}
          priority={true}
          className='object-contain rounded-2xl'
        />
      </div>
      <div className='col-span-1 md:col-span-1'>
        <Image
          src={campaign?.content_img_2}
          alt='wow-content'
          width={600}
          height={600}
          quality={100}
          priority={true}
          className='object-contain rounded-2xl'
        />
      </div>
      <div className='col-span-1 md:col-span-1'>
        <Image
          src={campaign?.content_img_3}
          alt='wow-content'
          width={600}
          height={600}
          quality={100}
          priority={true}
          className='object-contain rounded-2xl'
        />
      </div>
      <div className='col-span-1 md:col-span-1'>
        <Image
          src={campaign?.content_img_4}
          alt='wow-content'
          width={600}
          height={600}
          quality={100}
          priority={true}
          className='object-contain rounded-2xl'
        />
      </div>
    </div>
  );

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
      <Container sx={{ mt: 5, mb: { xs: 5, md: 8 } }}>
        {mockBanner.length != 0 && <Banner data={mockBanner} />}
        {mdUp && (
          <div className='mt-0'>
            {!isLoading && (
              <div className='mt-8 mb-2'>
                {renderCampaign}
                <div className='flex flex-row'>
                  <div className='w-3/4 pr-10'>
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
