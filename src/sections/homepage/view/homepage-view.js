'use client';

import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import MainLayout from 'src/layouts/main';
import Banner from 'src/sections/reuseable/banner';
import HomepageCategory from '../homepage-category';
import HomepageSupermitra from '../homepage-supermitra';
import HomepageAbout from '../homepage-about';
import HomepageWhyus from '../homepage-whyus';
import { HomepageTestimonial } from '../homepage-testimonial';
import HomepageFlashSale from '../homepage-flashsale';
import HomepagePromo from '../homepage-promo';
import HomepageMitra from '../homepage-mitra';
import HomepageRecomprod from '../homepage-recomprod';
import HomepagePopUp from '../homepage-popup';
import PopupPromo from '../popup-promo';
import { getHomeBanners } from 'src/rest/HomeBanner';
import { getHomePopup } from 'src/rest/HomePopup';
import { useMediaQuery, useTheme } from '@mui/material';
import SearchBar from 'src/layouts/main/search/searchBar';

export default function HomepageView() {
  const [banners, setBanners] = useState([]);
  const [showPromoPopup, setShowPromoPopup] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.down('xl'));

  useEffect(() => {
    const fetchBanners = async () => {
      const response = await getHomeBanners();
      if (response) {
        const formattedBanners = response
          .map((banner) => ({
            id: banner.order,
            coverUrl: banner.image_desktop.url
              ? `${process.env.NEXT_PUBLIC_IMAGE_EDU}${banner.image_desktop.url}`
              : 'https://via.placeholder.com/600x300?text=No+Image+Available',
            title: banner.title,
            route: banner.url,
          }))
          .sort((a, b) => a.id - b.id); // Sort by id in ascending order

        setBanners(formattedBanners);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    const decidePopup = async () => {
      try {
        const data = await getHomePopup();
        let popupItem = null;
        if (Array.isArray(data)) {
          for (const item of data) {
            const attrs = item?.attributes || item || {};
            const page = attrs.page || attrs.Page || '';
            if (page !== 'Home') continue;
            popupItem = {
              startDate: attrs.start_date || attrs.startDate,
              endDate: attrs.end_date || attrs.endDate,
            };
            break;
          }
        }

        const currentDate = new Date();
        const popupStartDate = popupItem?.startDate
          ? new Date(popupItem.startDate)
          : null;
        const popupEndDate = popupItem?.endDate
          ? new Date(popupItem.endDate)
          : null;

        const withinRange =
          !!popupStartDate &&
          !!popupEndDate &&
          currentDate >= popupStartDate &&
          currentDate <= popupEndDate;

        setShowPromoPopup(withinRange);
      } catch (error) {
        console.error(error);
        setShowPromoPopup(false);
      }
    };

    decidePopup();
  }, []);
  return (
    <MainLayout>
      <Container sx={{ mt: { xs: 2, md: 5 }, mb: 10 }}>
        {showPromoPopup ? <PopupPromo /> : <HomepagePopUp />}
        {isDesktop && (
          <div className='mb-5 block xl:hidden'>
            <SearchBar />
          </div>
        )}
        {isMobile && <Banner data={banners} />}
        <HomepageCategory />
        {!isMobile && <Banner data={banners} />}
        <HomepageSupermitra />
        <HomepageFlashSale />
        <HomepageRecomprod />
        <HomepageWhyus />
        <HomepageMitra />
        <HomepageAbout />
        <HomepageTestimonial />
        {/* <HomepagePromo /> */}
      </Container>
    </MainLayout>
  );
}
