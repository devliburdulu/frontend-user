'use client';

import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import { useResponsive } from 'src/hooks/use-responsive';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useAuthContext } from 'src/auth/hooks';
import Iconify from 'src/components/iconify';
import { bgGradient } from 'src/theme/css';
import { alpha, useTheme } from '@mui/material/styles';
import { paymentRequest } from 'src/fetch-global';
import { useCheckoutContext } from '../context';
import { useRouter } from 'next/navigation';

export default function ConfirmPaymentView() {
  const mdUp = useResponsive('up', 'md');
  const { checkoutResponse } = useCheckoutContext();
  const router = useRouter();
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

      // Check if payment was successful
      if (res.data.message === 200) {
        setUrl(res.data.data.invoice_url);
      } else {
        // Set URL if payment failed and allow retry button to show
        setUrl(res.data.data.invoice_url);
      }
    } catch (error) {
      console.error('Payment Request Failed:', error);
    }
  };

  useEffect(() => {
    handlePaymentRequest();
    if (checkoutResponse && checkoutResponse.status !== 200) {
      // If the response indicates a failure, set the URL for the payment retry link
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
      <Card>
        <CardHeader
          title='Payment By Xendit'
          sx={{
            '& .MuiCardHeader-title': {
              fontWeight: 600,
              fontSize: { xs: 24, md: 28 },
            },
          }}
        />
        <CardContent>
          <div className='flex flex-col items-center text-center'>
            <dix className='w-60 md:w-72 mb-6'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='-252.3 356.1 163 80.9'
                class='zjrzY'>
                <path
                  fill='none'
                  stroke='#1D9CAB'
                  stroke-miterlimit='10'
                  stroke-width='2'
                  d='M-108.9 404.1v30c0 1.1-.9 2-2 2H-231c-1.1 0-2-.9-2-2v-75c0-1.1.9-2 2-2h120.1c1.1 0 2 .9 2 2v37m-124.1-29h124.1'></path>
                <circle cx='-227.8' cy='361.9' r='1.8' fill='#1D9CAB'></circle>
                <circle cx='-222.2' cy='361.9' r='1.8' fill='#1D9CAB'></circle>
                <circle cx='-216.6' cy='361.9' r='1.8' fill='#1D9CAB'></circle>
                <path
                  fill='none'
                  stroke='#1D9CAB'
                  stroke-miterlimit='10'
                  stroke-width='2'
                  d='M-128.7 400.1H-92m-3.6-4.1 4 4.1-4 4.1'></path>
              </svg>
            </dix>
            <div className='w-[90%] md:w-3/4 text-sm md:text-base mb-5'>
              Setelah klik{' '}
              <span className='font-semibold'>"Bayar Sekarang"</span>, kamu akan
              diarahkan ke halaman Xendit untuk menyelesaikan pembayaran dengan
              aman.
            </div>
            <Button
              size='large'
              color='inherit'
              variant='contained'
              endIcon={<Iconify icon='eva:arrow-ios-forward-fill' />}
              sx={{ alignSelf: 'center' }}
              disabled={url === ''}>
              <Link
                key={url}
                href={url}
                color='inherit'
                variant='contained'
                target='_self'
                rel='noopener'>
                Bayar Sekarang
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Stack>
  );

  return (
    <Container component='main'>
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
        }}>
        <Container>{renderHead}</Container>
      </Stack>
    </Container>
  );
}
