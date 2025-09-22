'use client';

import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import LoadingButton from '@mui/lab/LoadingButton';
import Cookies from 'js-cookie';
import { useSnackbar } from 'src/components/snackbar';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SummaryCheckout from '../summary-checkout';
import ListPayment from '../list-payment';
import { useAuthContext } from 'src/auth/hooks';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useCheckoutContext } from '../context';
import {
  addPoint,
  addVoucher,
  deletePoint,
  deleteVoucher,
  getCartMagento,
  getTotalsCart,
  createCart,
  paymentRequest,
  getPaymentMethod,
} from 'src/rest/Checkout';
import { useSearchParams } from 'src/routes/hooks';
// ----------------------------------------------------------------------

export default function CheckoutFormView() {
  const TOKEN_USER = Cookies.get('accessToken');
  const [totals, setTotals] = useState();
  const [payment, setPayment] = useState();
  const [selectedPaymentCode, setSelectedPaymentCode] = useState('');
  const [empty, setEmpty] = useState(true);
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGetCart, setIsGetCart] = useState(true);
  const [isGetTotals, setIsGetTotals] = useState(true);
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const { setCheckoutResponse } = useCheckoutContext();
  const router = useRouter();
  const { user } = useAuthContext();

  const CheckoutSchema = Yup.object().shape({
    title: Yup.string()
      .oneOf(['Mr', 'Ms', 'Mrs'], 'Please select a valid title')
      .required('Title is required'),
    firstname: Yup.string()
      .min(2, 'First name must be at least 2 characters')
      .max(15, 'First name must be at most 15 characters')
      .matches(/^[A-Za-z]+$/, 'First name must contain only letters')
      .required('First name is required'),
    lastname: Yup.string()
      .min(2, 'Last name must be at least 2 characters')
      .max(15, 'Last name must be at most 15 characters')
      .matches(/^[A-Za-z]+$/, 'Last name must contain only letters')
      .required('Last name is required'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'Phone number must be only digits')
      .required('Phone number is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    street: Yup.string(),
    region: Yup.string(),
    city: Yup.string(),
    postcode: Yup.string().matches(
      /^[0-9]+$/,
      'Postal code must be only digits'
    ),
    payment_method: Yup.string().required('Payment method is required'),
  });

  const defaultValues = {
    title: 'Mr',
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    phone: user?.addresses?.[0]?.telephone || '',
    email: user?.email || '',
    payment_method: 'BCA',
  };

  const methods = useForm({
    resolver: yupResolver(CheckoutSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    const getItem = async () => {
      try {
        await createCart(TOKEN_USER);
        const data = await getCartMagento(TOKEN_USER);
        const items = data?.items || [];
        const dataTotal = await getTotalsCart(TOKEN_USER);
        const dataPayment = await getPaymentMethod(TOKEN_USER);
        // console.log('Payment List: ', dataPayment);

        if (items) {
          setItem(items);
          setEmpty(items.length === 0);
        } else {
          setEmpty(true);
        }
        setTotals(dataTotal);
        setPayment(dataPayment);
        setIsLoading(false);
        setIsGetCart(false);
        setIsGetTotals(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    getItem();
  }, [TOKEN_USER]);

  const onApplyDiscount = async (value, isDelete) => {
    try {
      let statusDelete;
      let statusAdd;
      setIsLoading(true);
      if (isDelete) {
        const voucherDelete = await deleteVoucher(TOKEN_USER);
        statusDelete = voucherDelete;
      } else {
        const voucherAdd = await addVoucher(TOKEN_USER, value);
        statusAdd = voucherAdd;
      }

      const updatedTotals = await getTotalsCart(TOKEN_USER);
      const updatedPayment = await getPaymentMethod(TOKEN_USER);
      setTotals({ ...updatedTotals });
      setPayment({ ...updatedPayment });
      if (isDelete) {
        if (statusDelete === true) {
          enqueueSnackbar('Berhasil hapus voucher!');
        } else {
          enqueueSnackbar('Gagal hapus voucher!', { variant: 'error' });
        }
      } else {
        if (statusAdd === true) {
          enqueueSnackbar('Berhasil gunakan voucher!');
        } else {
          enqueueSnackbar('Gagal gunakan voucher! cek ulang voucher', {
            variant: 'error',
          });
        }
      }
    } catch (error) {
      console.error('Error applying voucher:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onApplyPoint = async (value, isDelete) => {
    try {
      setIsLoading(true);
      let statusDeletePoin;
      let statusAddPoin;

      if (isDelete) {
        const pointDelete = await deletePoint(TOKEN_USER);
        statusDeletePoin = pointDelete;
      } else {
        const pointAdd = await addPoint(TOKEN_USER, value);
        statusAddPoin = pointAdd;
      }

      const updatedCart = await getCartMagento(TOKEN_USER);
      const items = updatedCart?.items || [];
      const updatedTotals = await getTotalsCart(TOKEN_USER);
      const updatedPayment = await getPaymentMethod(TOKEN_USER);
      setItem(items);
      setEmpty(items.length === 0);
      setTotals(updatedTotals);
      setPayment(updatedPayment);
      if (isDelete) {
        if (statusDeletePoin) {
          enqueueSnackbar('Berhasil hapus poin!');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          enqueueSnackbar('Gagal hapus poin!', { variant: 'error' });
        }
      } else {
        if (statusAddPoin) {
          enqueueSnackbar('Berhasil gunakan poin!');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          enqueueSnackbar('Gagal gunakan poin! cek ulang poin', {
            variant: 'error',
          });
        }
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Terjadi kesalahan! Silakan coba lagi.', {
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummary = async () => {
    try {
      const res = await getTotalsCart(TOKEN_USER);
      setLoading(false);
      setTotals(res);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const handlePayment = async () => {
    try {
      const res = await getPaymentMethod(TOKEN_USER);
      setLoading(false);
      setPayment(res);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    const correlationId = searchParams.get('correlationId') || '';
    const isFreeOrder = totals?.grand_total === 0;

    const submissionData = {
      ...data,
      payment_method: isFreeOrder ? 'BCA' : data.payment_method,
      region: user?.addresses?.[0]?.region?.region || 'Indonesia',
      street: user?.addresses?.[0]?.street?.[0] || 'Permata Hijau',
      city: user?.addresses?.[0]?.city || 'Jakarta',
      postcode: user?.addresses?.[0]?.postcode || '10577',
      correlationId: correlationId,
    };

    try {
      const response = await paymentRequest(TOKEN_USER, submissionData);

      if (response && response.status === 200) {
        enqueueSnackbar('Berhasil Checkout order', { variant: 'success' });
        setCheckoutResponse(response.data);
        setTimeout(() => {
          router.push('/checkout/processing');
        }, 1500);
      } else {
        enqueueSnackbar('Gagal Checkout Pembayaran', { variant: 'error' });
        console.error('Failed to place order. Status:', response.status);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    handleSummary();
    handlePayment();
  }, []);

  const renderForm = (
    <div>
      <Card sx={{ py: 1, px: 2, mb: 3 }}>
        <CardHeader
          title='Detail Pemesanan'
          sx={{
            px: 1,
            '& .MuiCardHeader-title': {
              fontWeight: 600,
              fontSize: { xs: 18, md: 20 },
            },
          }}
        />
        <CardContent sx={{ py: 0, px: 1 }}>
          <p className='text-gray-800 text-[14px] font-normal mt-1 mb-8'>
            Isi formulir ini dengan benar karena e-tiket akan dikirim ke alamat
            email sesuai data pemesan.
          </p>
          <Stack spacing={2.5}>
            <RHFTextField
              select
              name='title'
              label='Title'
              SelectProps={{
                native: true,
              }}>
              <option value='Mr'>Mr</option>
              <option value='Ms'>Ms</option>
              <option value='Mrs'>Mrs</option>
            </RHFTextField>
            <RHFTextField name='firstname' type='text' label='Nama depan' />
            <RHFTextField name='lastname' type='text' label='Nama belakang' />
            <RHFTextField
              name='phone'
              pattern='[0-9]*'
              type='number'
              label='Nomor ponsel'
            />
            <RHFTextField name='email' type='email' label='Email' />
          </Stack>
        </CardContent>
      </Card>
      <ListPayment
        item={item}
        payment={payment}
        defaultPaymentMethod={selectedPaymentCode}
        isGetCart={isGetCart}
        isGetTotals={isGetTotals}
        total={totals?.grand_total}
      />
      <LoadingButton
        fullWidth
        color='inherit'
        sx={{ my: 2, fontWeight: 600, display: { xs: 'none', md: 'block' } }}
        size='large'
        type='submit'
        variant='contained'
        loading={isSubmitting}>
        Bayar Sekarang
      </LoadingButton>
    </div>
  );

  return (
    <Container sx={{ mt: 5, mb: 0 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid xs={12} md={8}>
            {renderForm}
          </Grid>

          <Grid xs={12} md={4}>
            {loading ? (
              <Card
                sx={{
                  position: 'sticky',
                  top: 16,
                  zIndex: 1,
                  padding: 3,
                }}>
                <Stack spacing={2}>
                  <Skeleton animation='wave' variant='rounded' height={28} />
                  <Skeleton
                    animation='wave'
                    variant='rounded'
                    height={28}
                    sx={{ mb: 2 }}
                  />
                </Stack>
                <Stack spacing={2}>
                  <Skeleton animation='wave' variant='rounded' height={28} />
                  <Skeleton animation='wave' variant='rounded' height={28} />
                  <Skeleton animation='wave' variant='rounded' height={28} />
                  <Skeleton animation='wave' variant='rounded' height={62} />
                </Stack>
              </Card>
            ) : (
              <Stack spacing={0.5} sx={{ height: { xs: 'auto', md: '150vh' } }}>
                <SummaryCheckout
                  item={item}
                  payment={payment}
                  defaultPaymentMethod={selectedPaymentCode}
                  total={totals?.grand_total}
                  discount={totals?.discount_amount}
                  subTotal={totals?.subtotal}
                  isGetCart={isGetCart}
                  isGetTotals={isGetTotals}
                  coupon={totals?.coupon_code ? totals.coupon_code : ''}
                  point={
                    totals?.total_segments?.find(
                      (attr) => attr.code === 'reward_amount'
                    )?.value || ''
                  }
                  onApplyDiscount={onApplyDiscount}
                  onApplyPoint={onApplyPoint}
                />
                <LoadingButton
                  fullWidth
                  color='inherit'
                  sx={{
                    mt: 0.5,
                    mb: 0,
                    fontWeight: 600,
                    display: { xs: 'block', md: 'none' },
                  }}
                  size='large'
                  type='submit'
                  variant='contained'
                  loading={isSubmitting}>
                  Bayar Sekarang
                </LoadingButton>
              </Stack>
            )}
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}
