import { Avatar, Card } from '@mui/material';
import { useState, useEffect } from 'react';
import { getExclusivePartners } from 'src/rest/ExclusivePartner';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';
import SuperMitraCard from '../reuseable/supermitra-card';

export default function HomepageSupermitra() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      const response = await getExclusivePartners();
      if (response) {
        const formattedPartners = response
          .map((partner) => ({
            id: partner.order,
            coverMitra: partner.background_mitra.url
              ? `${process.env.NEXT_PUBLIC_IMAGE_EDU}${partner.background_mitra.url}`
              : 'https://via.placeholder.com/600x300?text=No+Image+Available',
            iconMitra: partner.icon_mitra.url
              ? `${process.env.NEXT_PUBLIC_IMAGE_EDU}${partner.icon_mitra.url}`
              : 'https://via.placeholder.com/60x60?text=No+Image+Available',
            title: partner.name,
            category: partner.category,
            route: partner.url_mitra,
          }))
          .sort((a, b) => a.id - b.id);

        setPartners(formattedPartners);
      }
    };

    fetchPartners();
  }, []);

  return (
    <Card
      className='super-mitra drop-shadow p-5 pr-0 my-4'
      sx={{ borderRadius: '20px' }}>
      <p className='font-semibold ps-1 mb-4 text-lg md:text-xl'>
        Exclusive Partner
      </p>

      <Swiper
        slidesPerView={4.4}
        spaceBetween={10}
        freeMode={true}
        modules={[FreeMode]}
        breakpoints={{
          1025: { slidesPerView: 4.5 },
          720: { slidesPerView: 3.5 },
          550: { slidesPerView: 2.6 },
          120: { slidesPerView: 1.6 },
        }}
        className='mt-2'>
        {partners.map((item, index) => (
          <SwiperSlide key={index}>
            <SuperMitraCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Card>
  );
}
