'use client';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Skeleton from '@mui/material/Skeleton';
import { useResponsive } from 'src/hooks/use-responsive';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useAuthContext } from 'src/auth/hooks';
import Iconify from 'src/components/iconify';
import { bgGradient } from 'src/theme/css';
import { useBoolean } from 'src/hooks/use-boolean';
import { alpha, useTheme } from '@mui/material/styles';
import { paymentRequest, getTotalsCart, getItemsCart } from 'src/fetch-global';
import { useCheckoutContext } from '../context';
import { useRouter } from 'next/navigation';

export default function SuccessPaymentView() {
  const { checkoutResponse } = useCheckoutContext();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const { user } = useAuthContext();
  const theme = useTheme();
  const { email } = user;

  const TOKEN_USER = Cookies.get('accessToken');

  const handlePaymentRequest = async () => {
    const billing_address = {
      address: {
        region: 'New York',
        region_id: 43,
        region_code: 'NY',
        country_id: 'US',
        street: ['123 Oak Ave'],
        postcode: '10577',
        city: 'Purchase',
        firstname: 'Jane',
        lastname: 'Doe',
        customer_id: 4,
        email: 'jdoe@example.com',
        telephone: '(512) 555-1111',
        same_as_billing: 1,
      },
    };

    const body = {
      token: TOKEN_USER,
      billing_address,
    };

    try {
      const res = await paymentRequest(body);

      setLoading(true);

      if (res.data.message === 200) {
        setUrl(res.data.data.invoice_url);
      }
    } catch (error) {
      console.error('Payment Request Failed:', error);
    }
  };

  useEffect(() => {
    handlePaymentRequest();
    if (checkoutResponse) {
      setUrl(checkoutResponse.data.invoice_url);
    }
  }, [checkoutResponse]);

  const renderHead = (
    <Stack
      alignItems='center'
      justifyContent='center'
      spacing={4}
      direction={{
        xs: 'column',
        md: 'row-reverse',
      }}>
      <div>
        <Image
          src='/assets/illustrations/illustration_auth.svg'
          width={500}
          height={500}
          alt='auth_image'
          className='mb-5'
        />
      </div>

      <div className='flex flex-col items-center'>
        <Typography variant='h3' sx={{ mb: 1 }}>
          Pembayaran Anda Telah Berhasil!
        </Typography>

        <Stack
          spacing={1}
          alignItems='center'
          justifyContent='center'
          sx={{ color: 'text.secondary', typography: 'body2', mb: 5 }}>
          <Box component='span'>
            {' '}
            Kami akan mengirimkan konfirmasi pesanan beserta detail produk ke
            email.
          </Box>
          <Box component='strong' sx={{ color: 'text.primary' }}>
            {email}
          </Box>
        </Stack>
        <Button
          size='large'
          color='inherit'
          variant='contained'
          endIcon={<Iconify icon='eva:arrow-ios-forward-fill' />}
          sx={{ alignSelf: 'center' }}>
          <Link
            href={'/profile/my-order'}
            color='inherit'
            variant='contained'
            target='_self'
            rel='noopener'>
            Lihat Daftar Pesanan
          </Link>
        </Button>
      </div>
    </Stack>
  );

  return (
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
        minHeight: '70vh',
        textAlign: 'center',
        justifyContent: 'center',
      }}>
      <Container>{renderHead}</Container>
    </Stack>
  );
}
