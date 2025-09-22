import { Card, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getHomePromo } from 'src/rest/HomePromo';
import Iconify from 'src/components/iconify';
import PromoCard from '../reuseable/promo-card';

export default function HomepagePromo() {
  const [isDragging, setIsDragging] = useState(false);
  const [bannerPromo, setBannerPromo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleBeforeChange = () => {
    setIsDragging(true);
  };

  const handleAfterChange = () => {
    setIsDragging(false);
  };

  const settings = {
    className: 'mt-5 py-2',
    infinite: false,
    speed: 100,
    slidesToShow: 3.7,
    focusOnSelect: true,
    swipeToSlide: true,
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
    responsive: [
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3.5,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2.2,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1.2,
          swipeToSlide: true,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let promo = [];
        const data = await getHomePromo();

        data.forEach((prom) => {
          if (prom.status_promo) {
            promo.push({
              background: `url(${process.env.NEXT_PUBLIC_IMAGE_EDU}${prom.desktop_image.url})`,
              route: `${prom.url}`,
              id: prom.id,
              title: prom.title,
              category_id: prom.category_id,
              status: prom.status_promo,
            });
          }
        });
        setBannerPromo(promo);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Hide card if the promo not available
  if (!isLoading && bannerPromo.length === 0) {
    return null;
  }

  return (
    <Card className='drop-shadow p-5 pr-0 my-5' sx={{ borderRadius: '20px' }}>
      <Typography variant='h5' component='div' sx={{ fontWeight: 600 }}>
        Cek Promo Sebelum Liburan
      </Typography>
      <Typography variant='body1' sx={{ color: '#828282' }}>
        Dapatkan harga terbaik dari Liburdulu
      </Typography>
      {isLoading ? (
        <div className='grid grid-cols-1 h-[300px] place-content-center'>
          <div className='place-self-center'>
            <Iconify
              icon='line-md:loading-loop'
              sx={{ fontSize: 20, color: '#000000' }}
            />
          </div>
          <p className='place-self-center text-xl font-semibold'>
            Mohon Tunggu
          </p>
        </div>
      ) : (
        <Slider {...settings}>
          {bannerPromo.map((item, index) => (
            <span className='px-1' key={index}>
              <PromoCard
                isDragging={isDragging}
                setIsDragging={setIsDragging}
                item={item}
              />
            </span>
          ))}
        </Slider>
      )}
    </Card>
  );
}
