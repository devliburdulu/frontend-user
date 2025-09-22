'use client';

import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ListProduct from '../list-product';
import { useResponsive } from 'src/hooks/use-responsive';
import { getProduct } from 'src/fetch-global';
import { getHomePromo } from 'src/rest/HomePromo';
import { getFlahsaleProduct } from 'src/rest/Product';
import Iconify from 'src/components/iconify/iconify';
import Head from 'next/head';
import Image from 'next/image';

export default function PromoFlashsaleView({ promo }) {
  const [filter, setFilter] = useState({
    categoryName: 'Semua Produk',
    categoryId: 9999,
    search: '',
    maxPrice: -1,
    minPrice: -1,
  });

  const [mockBanner, setMockBanner] = useState([]);
  const [description, setDescription] = useState([]);
  const [product, setProduct] = useState();
  const [countdown, setCountdown] = useState('00:00:00');
  const [showCard, setShowCard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const mdUp = useResponsive('up', 'md');

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
              logoUrl: `${process.env.NEXT_PUBLIC_IMAGE_EDU}${prom.desktop_image.url}`,
              startDate: prom.start_date,
              endDate: prom.end_date,
              title: prom.title,
              subtitle: prom.subtitle,
              category: prom.category,
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

  const logo = mockBanner[0]?.logoUrl;
  const banner = mockBanner[0]?.coverUrl;
  const categoryId = mockBanner[0]?.category;
  const startDate = mockBanner[0]?.startDate;
  const endDate = mockBanner[0]?.endDate;

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const result = await getFlahsaleProduct(categoryId)
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

  useEffect(() => {
    if (filter.categoryId !== 0) {
      setIsFirstLaunch(true);
      setSearchValue('');
    }
  }, [filter.categoryId]);

  useEffect(() => {
    if (!startDate || !endDate) return;

    const interval = setInterval(() => {
      const now = new Date();
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (now >= start && now <= end) {
        setShowCard(true);
        const diff = Math.floor((end.getTime() - now.getTime()) / 1000);
        const hours = String(Math.floor(diff / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
        const seconds = String(diff % 60).padStart(2, '0');
        setCountdown(`${hours}:${minutes}:${seconds}`);
      } else {
        setShowCard(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  const metaTitle = `Promo Liburdulu - ${mockBanner?.[0]?.title}`;
  const metaDesc = mockBanner?.[0]?.subtitle;
  const metaImage = mockBanner?.[0]?.coverUrl;

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

      <Container sx={{ mt: 5, mb: 10 }}>
        <div className='mt-8 mb-8'>
          <Image
            src={banner}
            width={1920}
            height={500}
            quality={100}
            priority
            alt='banner flash sale'
            className='rounded-xl'
          />
        </div>

        {!showCard && (
          <div className='grid grid-cols-1 h-[200px] place-content-center'>
            <p className='place-self-center text-xl md:text-2xl font-semibold mb-3'>
              Oops Maaf Semua Produk
            </p>
            <div className='place-self-center'>
              <Image
                src={logo}
                width={260}
                height={80}
                quality={100}
                priority
                alt='logo flash sale'
              />
            </div>
            <p className='place-self-center text-sm md:text-base font-medium mt-1'>
              belum tersedia saat ini...
            </p>
          </div>
        )}

        {showCard && (
          <>
            <div className='mt-0 mb-2.5 p-3 border-0 border-[#454F5B] bg-[#212B36] rounded-lg'>
              <div className='flex flex-row justify-between items-center'>
                <div className='block md:hidden'>
                  <Image
                    src={logo}
                    width={140}
                    height={80}
                    quality={100}
                    priority
                    alt='logo flash sale'
                  />
                </div>
                <div className='hidden md:block'>
                  <Image
                    src={logo}
                    width={150}
                    height={80}
                    quality={100}
                    priority
                    alt='logo flash sale'
                  />
                </div>
                <div className='flex flex-col text-left mr-0'>
                  <span className='block md:hidden text-[13px] mb-0 font-medium text-liburdulu-white'>
                    Berakhir Dalam
                  </span>
                  <div className='flex flex-row items-center justify-center gap-0.5 ms-0 mb-0'>
                    <span className='hidden md:block text-xs mr-0 md:mr-1 font-medium text-liburdulu-white'>
                      Berakhir Dalam
                    </span>
                    {countdown.split(':').map((unit, idx, arr) => (
                      <div key={idx} className='flex items-center'>
                        <div className='bg-liburdulu-orange text-liburdulu-white px-0 md:px-2.5 py-0.5 md:py-1 rounded-md text-[11px] md:text-sm font-semibold w-[28px] md:w-[36px] text-center'>
                          {unit}
                        </div>
                        {idx < arr.length - 1 && (
                          <span className='mx-0.5 md:mx-1 text-liburdulu-white font-semibold'>
                            :
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {mdUp && (
              <div className='grid grid-cols-4 mt-5 mb-3'>
                <div className='col-span-4'>
                  {!isLoading && (
                    <ListProduct product={product} isLoading={isLoading} />
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
                  <ListProduct product={product} isLoading={isLoading} />
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

            {description.map((item) => (
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
            ))}
          </>
        )}
      </Container>
    </>
  );
}
