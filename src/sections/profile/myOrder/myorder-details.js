'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Cookies from 'js-cookie';
import ProfileSidebar from '../profile-sidebar';
import MyOrderDetailsItemsView from './my-order-details-item';
import { getDetailOrder, getOptionsOrder } from 'src/rest/Order';
import { Box } from '@mui/material';

// Dynamically import the PDF component to avoid SSR issues
const DynamicPDFDownloadButton = dynamic(
  () => import('./OrderDetailsPDF').then((mod) => mod.DownloadPDFButton),
  { ssr: false }
);

export default function MyOrderDetailsView({ id }) {
  const TOKEN = Cookies.get('accessToken');
  const [detail, setDetail] = useState(null);
  const [parsedOptions, setParsedOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const orderId = id?.['my-orderId'] ? parseInt(id['my-orderId'], 10) : null;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setDetail(null);
      setParsedOptions([]);

      if (!orderId || !TOKEN) {
        setError('Order ID atau Token tidak valid.');
        setLoading(false);
        return;
      }

      try {
        const [detailResponse, optionsResponse] = await Promise.all([
          getDetailOrder(orderId, TOKEN),
          getOptionsOrder(orderId, TOKEN),
        ]);

        // --- Proses Detail Response ---
        if (detailResponse?.data?.data) {
          setDetail(detailResponse.data.data);
        } else {
          console.warn('Struktur data detail tidak sesuai:', detailResponse);
        }

        // --- Proses Options Response ---
        if (optionsResponse && Array.isArray(optionsResponse.options)) {
          setParsedOptions(optionsResponse.options);
        } else {
          console.warn(
            'Struktur data options tidak sesuai (expected { options: [...] }):',
            optionsResponse
          );
          setParsedOptions([]);
        }
      } catch (err) {
        console.error('Gagal mengambil data:', err);
        setError(err.message || 'Terjadi kesalahan saat memuat data pesanan.');
        setDetail(null);
        setParsedOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId, TOKEN]);

  // Show PDF download button only if order has hotel information
  const showPDFButton = !loading && detail && detail.hotel_order;

  const renderHead = (
    <Stack
      spacing={2}
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      mb={1.5}>
      <Stack direction='row' alignItems='center' spacing={1}>
        {' '}
        <IconButton
          component={RouterLink}
          href='/profile/my-order/'
          aria-label='Back to My Orders'>
          <Iconify icon='eva:arrow-ios-back-fill' />
        </IconButton>
        <Typography
          variant='h4'
          sx={{
            fontSize: { xs: '1rem', md: '1.25rem' },
            fontWeight: 600,
          }}>
          Detail Pesanan
        </Typography>
      </Stack>

      <Box sx={{ flexShrink: 0 }}>
        {showPDFButton && (
          <DynamicPDFDownloadButton detail={detail} options={parsedOptions} />
        )}
      </Box>
    </Stack>
  );

  return (
    <Container sx={{ mt: 5, mb: { xs: 8, md: 10 } }}>
      <div className='grid grid-cols-4 mt-5 pt-0 md:pt-5 gap-5'>
        <div className='hidden lg:block sticky top-[140px] max-h-[420px]'>
          <ProfileSidebar />
        </div>
        <div className='lg:col-span-3 col-span-4'>
          <div>
            {renderHead}
            {loading && (
              <Stack spacing={2} sx={{ mt: 2 }}>
                <Skeleton variant='rectangular' height={150} animation='wave' />
                <Skeleton variant='rectangular' height={250} animation='wave' />
              </Stack>
            )}

            {!loading && !error && detail && (
              <MyOrderDetailsItemsView
                detail={detail}
                options={parsedOptions}
                loading={false}
              />
            )}
            {!loading && !error && !detail && (
              <Typography sx={{ mt: 2 }}>
                Data detail pesanan tidak ditemukan atau gagal dimuat.
              </Typography>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
