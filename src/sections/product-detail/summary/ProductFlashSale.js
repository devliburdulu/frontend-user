import { useState, useEffect } from 'react';
import { getHomePromo } from 'src/rest/HomePromo';
import Image from 'next/image';

export default function ProductFlashSale() {
  const [promo, setPromo] = useState([]);
  const [countdown, setCountdown] = useState('00:00:00');
  const [showCard, setShowCard] = useState(false);

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
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
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

  if (!showCard) return <div></div>;

  return (
    <div className='mt-0 mb-2 p-3 border-0 border-[#454F5B] bg-[#212B36] rounded-lg'>
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
        <div className='flex flex-col text-center'>
          <span className='block md:hidden text-[11px] mr-0 md:mr-1 mb-0.5 font-medium text-liburdulu-white'>
            Berakhir Dalam
          </span>
          <div className='flex flex-row items-center justify-center gap-0.5 ms-0 mb-0'>
            <span className='hidden md:block text-xs mr-0 md:mr-1 font-medium text-liburdulu-white'>
              Berakhir Dalam
            </span>
            {countdown.split(':').map((unit, idx) => (
              <div
                key={idx}
                className='bg-[#f99932] text-liburdulu-white px-0 md:px-2 py-1 rounded-md text-[11px] md:text-xs font-semibold w-[28px] md:w-[32px] text-center'>
                {unit}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
