'use client';

import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { bgGradient } from 'src/theme/css';
import { alpha, useTheme } from '@mui/material/styles';
import { useCheckoutContext } from '../context';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorIcon from '@mui/icons-material/Error';

export default function ProcessPaymentView() {
  const { checkoutResponse } = useCheckoutContext();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (checkoutResponse) {
      if (checkoutResponse.message === 'Success') {
        const invoiceUrl = checkoutResponse.data?.invoice_url;

        if (invoiceUrl !== null && invoiceUrl !== undefined) {
          setUrl(invoiceUrl);
          setLoading(true);
          setTimeout(() => {
            window.location.href = invoiceUrl;
          }, 4000);
        } else {
          setLoading(true);
          setTimeout(() => {
            window.location.href = '/checkout/confirm-payment-success';
          }, 3000);
        }
      } else {
        setError(true);
        setLoading(false);
        setTimeout(() => {
          window.location.href = '/checkout/checkout-form';
        }, 2000);
      }
    }
  }, [checkoutResponse]);

  return (
    <Container component='main'>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: theme.zIndex.drawer + 1,
          display: 'flex',
          flexDirection: 'column',
          px: { xs: 8, md: 4 },
        }}
        open>
        {loading && !error ? (
          <>
            <CircularProgress color='inherit' size='4rem' />
            <Typography
              variant='h3'
              sx={{ mt: 2, fontWeight: 600, textAlign: 'center' }}>
              Pembayaran Sedang Diproses
            </Typography>
          </>
        ) : error ? (
          <>
            <ErrorIcon
              color='error'
              sx={{ fontSize: '4rem', marginBottom: 2 }}
            />
            <Typography
              variant='h3'
              sx={{
                fontWeight: 600,
                textAlign: 'center',
                color: 'error.main',
              }}>
              Proses Pembayaran Gagal
            </Typography>
          </>
        ) : null}
      </Backdrop>
      <Stack
        flexGrow={1}
        spacing={10}
        sx={{
          ...bgGradient({
            color: alpha(
              theme.palette.background.default,
              theme.palette.mode === 'light' ? 0.78 : 0.85
            ),
            imgUrl: '/assets/background/overlay_auth.jpg',
          }),
          py: 12,
          m: 'auto',
          minHeight: { xs: 'auto', md: '70vh' },
          textAlign: 'center',
          justifyContent: 'center',
        }}
      />
    </Container>
  );
}
