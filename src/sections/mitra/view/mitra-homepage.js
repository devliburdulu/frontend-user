'use client';

import { Container } from '@mui/system';
import MainLayout from 'src/layouts/main';
import MitraBanner from '../mitra-banner';
import MitraCollab from '../mitra-collab';
import { useCallback, useEffect, useState } from 'react';
import UserMitraProfile from '../user-mitra-profile';
import { getSellerBySKU, getSellerByShopUrl } from 'src/fetch-global';
import { getCollaboration } from 'src/rest/Collaboration';
import { NotFoundView } from 'src/sections/error';
import { SplashScreen } from 'src/components/loading-screen';
import Head from 'next/head';

export default function MitraHomepage({ mitra }) {
  const [currentTab, setCurrentTab] = useState('profile');
  const [dataSeller, setDataSeller] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [collabs, setCollabs] = useState();

  useEffect(() => {
    const fetchCollabs = async () => {
      const response = await getCollaboration();
      if (response) {
        const banner = `${process.env.NEXT_PUBLIC_IMAGE_EDU}${response.banner.url}`;
        setCollabs(banner);
      }
    };

    fetchCollabs();
  }, []);

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let sellerData = null;

        const dataByShopUrl = await getSellerByShopUrl(mitra);
        if (dataByShopUrl && dataByShopUrl.shop_title) {
          sellerData = dataByShopUrl;
        } else {
          const dataBySKU = await getSellerBySKU(mitra);
          if (dataBySKU && dataBySKU[0]?.seller) {
            sellerData = dataBySKU[0].seller;
          }
        }

        if (sellerData) {
          setDataSeller((prev) => {
            if (prev?.entity_id !== sellerData.entity_id) {
              // changeTitle(sellerData.shop_title);
              return sellerData;
            }
            return prev;
          });
        } else {
          setDataSeller(null);
        }
      } catch (error) {
        console.error('Error fetching seller data:', error);
        setDataSeller(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mitra]);

  if (loading) {
    return <SplashScreen />;
  }

  const metaTitle = `Mitra Liburdulu - ${dataSeller?.shop_title}`;
  const metaDesc = dataSeller?.company_description;
  const metaImage = `${process.env.NEXT_PUBLIC_MAGENTO_API}/media/${dataSeller?.logo_pic}`;

  return (
    <>
      {dataSeller === null ? (
        <NotFoundView />
      ) : (
        <MainLayout>
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
            <MitraBanner
              currentTab={currentTab}
              handleChangeTab={handleChangeTab}
              seller={dataSeller}
            />
            {dataSeller?.shop_title === 'Curaweda' && (
              <MitraCollab data={collabs} />
            )}
            <div className='py-4'>
              <UserMitraProfile
                sellerId={dataSeller?.seller_id}
                seller={dataSeller}
              />
              {/* {currentTab === 'products' && <UserMitraProduct />}
              {currentTab === 'reviews' && (
                <UserMitraReview id={dataSeller.seller_id} />
              )} */}
            </div>
          </Container>
        </MainLayout>
      )}
    </>
  );
}
