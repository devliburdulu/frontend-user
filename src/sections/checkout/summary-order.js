import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { fCurrency } from 'src/utils/format-number';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCartCheckout } from 'src/rest/Checkout';
// import { enqueueSnackbar } from 'notistack';
import { useSnackbar } from 'src/components/snackbar';

export default function SummaryOrder({
  total,
  subtotal,
  discount,
  isGetCart,
  isGetTotals,
  item,
}) {
  const TOKEN_USER = Cookies.get('accessToken');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const onNextStep = async () => {
    setIsLoading(true);
    try {
      const response = await getCartCheckout(TOKEN_USER);

      if (response && response.status === 200) {
        // enqueueSnackbar('Berhasil checkout order', { variant: 'success' });
        router.push('/checkout/checkout-form');
      } else {
        const errorMessage =
          response || 'Gagal memproses pesanan. Silakan coba lagi.';
        enqueueSnackbar(errorMessage, {
          variant: 'error',
        });
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      const errorMessage =
        error?.response?.data?.message ||
        'Gagal memproses pesanan. Cek koneksi Anda atau coba lagi nanti.';
      enqueueSnackbar(errorMessage, {
        variant: 'error',
      });

      if (!error?.response) {
        console.error('Network error or unexpected issue:', error);
        enqueueSnackbar('Kesalahan jaringan. Silakan coba lagi.', {
          variant: 'error',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card sx={{ mb: 0 }}>
      <CardHeader
        title='Ringkasan Pesanan'
        titleTypographyProps={{ fontWeight: '600' }}
        sx={{ px: 2, py: 2 }}
      />

      <CardContent sx={{ px: 2, py: 1 }}>
        {isGetCart && isGetTotals ? (
          <div className='grid grid-cols-1 h-[200px] place-content-center'>
            <div className='place-self-center'>
              <CircularProgress />
            </div>
            <p className='place-self-center text-3xl font-semibold'>
              Mohon Tunggu
            </p>
          </div>
        ) : (
          <Stack spacing={1.5}>
            <div
              className={`max-h-none md:max-h-[280px] ${
                item?.length > 5
                  ? 'overflow-visible md:overflow-y-auto h-auto md:h-[260px]'
                  : ''
              }`}>
              {item?.map((row, index) => (
                <Stack
                  key={index}
                  direction='row'
                  justifyContent='space-between'>
                  <div className='box-item w-full pr-0 md:pr-2 mb-2 md:mb-0'>
                    <div className='font-semibold text-[13px] sm:text-sm mb-0 md:mb-[2px]'>
                      {row.name}
                    </div>
                    <div className='flex flex-row justify-between mb-2'>
                      <div className='box-price'>
                        <span className='text-[11px] sm:text-xs opacity-90 mr-[2px]'>
                          {row.qty}
                        </span>
                        {/* <span className='text-[11px] sm:text-xs opacity-90'>
                          {row.price_unit}
                        </span> */}
                        <span className='text-[11px] sm:text-xs opacity-90 mx-1'>
                          x
                        </span>
                        <span className='text-[11px] sm:text-xs opacity-90'>
                          {fCurrency(row.price)}
                        </span>
                      </div>
                      <div className='box-totals'>
                        <span className='font-semibold text-[11px] sm:text-xs'>
                          {fCurrency(row.price * row.qty)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Stack>
              ))}
            </div>
            <Divider sx={{ borderStyle: 'dashed' }} />
            {discount < 0 && (
              <>
                <Stack direction='row' justifyContent='space-between'>
                  <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    Sub Total
                  </Typography>
                  <Typography variant='subtitle2'>
                    {fCurrency(subtotal)}
                  </Typography>
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                  <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    Diskon
                  </Typography>
                  <Typography variant='subtitle2'>
                    {fCurrency(discount)}
                  </Typography>
                </Stack>
                <Divider sx={{ borderStyle: 'dashed' }} />
              </>
            )}
            {/* <Stack direction='row' justifyContent='space-between'>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                Sub Total
              </Typography>
              <Typography variant='subtitle2'>{fCurrency(subtotal)}</Typography>
            </Stack>
            <Stack direction='row' justifyContent='space-between'>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                Diskon
              </Typography>
              <Typography variant='subtitle2'>{fCurrency(discount)}</Typography>
            </Stack> */}

            <Stack direction='row' justifyContent='space-between'>
              <Typography variant='subtitle1'>Total Harga</Typography>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant='subtitle1' sx={{ color: 'error.main' }}>
                  {fCurrency(total)}
                </Typography>
              </Box>
            </Stack>

            <Stack>
              <Button
                fullWidth
                size='large'
                type='submit'
                variant='contained'
                onClick={onNextStep}
                sx={{ fontWeight: 600, mt: '12px' }}
                disabled={isLoading}>
                {isLoading ? (
                  <CircularProgress size={24} sx={{ color: '#333' }} />
                ) : (
                  'Lanjutkan Pesanan'
                )}
              </Button>
            </Stack>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}

SummaryOrder.propTypes = {
  total: PropTypes.number,
  subTotal: PropTypes.number,
};
