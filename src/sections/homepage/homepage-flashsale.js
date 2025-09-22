import { useState, useEffect } from 'react';
import { getHomePromo } from 'src/rest/HomePromo';
import { getFlahsaleProduct } from 'src/rest/Product';
import 'swiper/css';
import 'swiper/css/free-mode';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { useResponsive } from 'src/hooks/use-responsive';
import Skeleton from '@mui/material/Skeleton';
import ProductCard from '../reuseable/product-card';
import Image from 'next/image';

const LoadingSkeleton = () => {
  const mdUp = useResponsive('up', 'md');
  const skeletonItems = mdUp ? Array(5).fill(0) : Array(3).fill(0);

  return (
    <div className='mt-8 mb-4 px-1'>
      <div className='flex flex-row justify-between md:justify-start items-center mb-3'>
        <Skeleton variant='rounded' width={200} height={50} />
        <div className='box-count flex items-center gap-1 md:gap-1.5 ms-0 md:ms-4 mb-1 md:mb-2'>
          <Skeleton variant='rounded' width={40} height={40} />
          <Skeleton variant='rounded' width={40} height={40} />
          <Skeleton variant='rounded' width={40} height={40} />
        </div>
      </div>
      <div className='flex space-x-3 gap-1 py-4'>
        {skeletonItems.map((_, index) => (
          <div key={index} className='flex flex-col items-center space-y-2'>
            <Skeleton variant='rounded' width={220} height={80} />
            <Skeleton variant='rounded' width={220} height={80} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function HomepageFlashSale() {
  const [data, setData] = useState([]);
  const [promo, setPromo] = useState([]);
  const [countdown, setCountdown] = useState('00:00:00');
  const [showCard, setShowCard] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const promoResponse = await getHomePromo();
        const flashSale = promoResponse.find(
          (prom) => prom.url === 'flashsale'
        );

        if (flashSale) {
          const categoryId = flashSale.category;

          setPromo([
            {
              id: flashSale.id,
              coverUrl: `${process.env.NEXT_PUBLIC_IMAGE_EDU}${flashSale.banner_image.url}`,
              logo: `${process.env.NEXT_PUBLIC_IMAGE_EDU}${flashSale.desktop_image.url}`,
              title: flashSale.title,
              subtitle: flashSale.subtitle,
              category: categoryId,
              startDate: flashSale.start_date,
              endDate: flashSale.end_date,
            },
          ]);

          const productResponse = await getFlahsaleProduct(categoryId);
          // console.log('Cek Dulu:', productResponse);
          setData(productResponse.items || []);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const logo = promo[0]?.logo;
  const startDate = promo[0]?.startDate;
  const endDate = promo[0]?.endDate;

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

  if (loading) return <LoadingSkeleton />;
  if (!showCard) return null;

  return (
    <div className='mt-8 mb-4 bg-[#212B36] rounded-2xl md:rounded-3xl p-6 pr-0 pb-8 md:pb-10'>
      <div className='flex flex-row justify-between items-center mb-4'>
        <div className='block md:hidden'>
          <Image
            src={logo}
            width={150}
            height={80}
            quality={100}
            priority
            alt='logo flash sale'
          />
        </div>
        <div className='hidden md:block'>
          <Image
            src={logo}
            width={200}
            height={80}
            quality={100}
            priority
            alt='logo flash sale'
          />
        </div>
        <div className='flex flex-col text-left mr-3'>
          <span className='block md:hidden text-[13px] mb-0 font-medium text-liburdulu-white'>
            Berakhir Dalam
          </span>
          <div className='flex flex-row items-center justify-center gap-0.5 ms-0 mb-0 mr-0 md:mr-4'>
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

      <Swiper
        slidesPerView={4.6}
        spaceBetween={10}
        freeMode={true}
        modules={[FreeMode]}
        breakpoints={{
          1025: { slidesPerView: 4.5 },
          720: { slidesPerView: 3.6 },
          550: { slidesPerView: 2.8 },
          400: { slidesPerView: 1.7 },
          360: { slidesPerView: 1.5 },
          320: { slidesPerView: 1.2 },
          120: { slidesPerView: 1.1 },
        }}
        style={{ paddingBottom: '4px', zIndex: 0 }}
        className='mt-2 pb-5'>
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            <ProductCard
              image={item.custom_attributes}
              key={item.id}
              id={item.sku}
              idProduct={item.id}
              name={item.name}
              price={item.price}
              from={'Flash Sale'}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
