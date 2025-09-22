import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { fCurrency, fPoin } from 'src/utils/format-number';
import Iconify from 'src/components/iconify';
import { useEffect, useState } from 'react';
import { getRewardPoint } from 'src/fetch-global';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';

// ----------------------------------------------------------------------
export default function SummaryCheckout({
  total,
  discount,
  subTotal,
  isGetCart,
  isGetTotals,
  point,
  coupon,
  onApplyDiscount,
  onApplyPoint,
  item,
  payment,
  defaultPaymentMethod,
}) {
  const [discountCode, setDiscountCode] = useState(coupon);
  const [pointUse, setPointUse] = useState(point);
  const [rewardPoints, setRewardPoints] = useState(0);
  const [isLoadingDisc, setIsLoadingDisc] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setValue, watch } = useFormContext();
  const selectedPaymentMethod = watch('payment_method');
  const calculatedAmount = watch('calculated_amount') || 0;
  const subtotalAmount = watch('subtotal_amount') || 0;

  const creditCard = payment?.data['Credit Card'] || [];
  const virtualAccount = payment?.data['Virtual Account'] || [];
  const eWallet = payment?.data['e-Wallet'] || [];
  const overTheCounter = payment?.data['Over the Counter'] || [];
  const payLater = payment?.data['PayLater'] || [];
  const qris = payment?.data['QRIS'] || [];

  const allPayments = [
    ...virtualAccount.map((item) => ({
      ...item,
      category: 'Virtual Account',
    })),
    ...eWallet.map((item) => ({
      ...item,
      category: 'Uang Elektronik',
    })),
    ...qris.map((item) => ({
      ...item,
      category: 'QRIS',
    })),
    ...creditCard.map((item) => ({
      ...item,
      category: 'Kartu Kredit / Debit / Cicilan',
    })),
    ...payLater.map((item) => ({
      ...item,
      category: 'Paylater',
    })),
    ...overTheCounter.map((item) => ({
      ...item,
      category: 'Gerai Retail',
    })),
  ];

  const selectedPaymentData = allPayments.find(
    (item) => item.code === selectedPaymentMethod
  );

  useEffect(() => {
    if (!selectedPaymentMethod && defaultPaymentMethod) {
      setValue('payment_method', defaultPaymentMethod);
    }
  }, [defaultPaymentMethod, selectedPaymentMethod]);

  useEffect(() => {
    if (selectedPaymentData) {
      const { calculated_amount, subtotal_amount } = selectedPaymentData;
      setValue('calculated_amount', calculated_amount);
      setValue('subtotal_amount', subtotal_amount);
    }
  }, [selectedPaymentMethod, payment]);

  const handlePointChange = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value)) {
      event.target.value = value;
    } else {
      event.target.value = value.replace(/[^0-9]/g, '');
    }
    setPointUse(event.target.value);
  };

  const fetchRewardPoints = async () => {
    try {
      const data = await getRewardPoint();
      if (data && data.customerRewardDetail) {
        setRewardPoints(data.customerRewardDetail.remaining_reward_point);
      } else {
        setRewardPoints(0);
      }
    } catch (error) {
      console.error('Error fetching reward points:', error);
    }
  };

  const handleApplyDiscount = async (code, remove) => {
    setIsLoadingDisc(true);
    await onApplyDiscount(code, remove);
    setIsLoadingDisc(false);

    if (selectedPaymentData) {
      const { calculated_amount, subtotal_amount } = selectedPaymentData;
      setValue('calculated_amount', calculated_amount);
      setValue('subtotal_amount', subtotal_amount);
    }
  };

  const handleApplyPoint = async (points, remove) => {
    setIsLoading(true);
    await onApplyPoint(points, remove);
    setIsLoading(false);

    if (selectedPaymentData) {
      const { calculated_amount, subtotal_amount } = selectedPaymentData;
      setValue('calculated_amount', calculated_amount);
      setValue('subtotal_amount', subtotal_amount);
    }
  };

  useEffect(() => {
    setDiscountCode(coupon);
    setPointUse(Math.abs(point));
    fetchRewardPoints();
  }, [coupon, point]);

  return (
    <Stack
      spacing={2}
      sx={{
        position: { xs: 'inherit', md: 'sticky' },
        top: { xs: 0, md: '120px' },
      }}>
      <Card sx={{ mb: 2 }}>
        <CardHeader
          title='Ringkasan Pembayaran'
          titleTypographyProps={{ fontWeight: '600' }}
          sx={{ px: 2 }}
        />
        <CardContent sx={{ py: 1.75, px: 2 }}>
          {isGetCart && isGetTotals ? (
            <div className='grid grid-cols-1 h-[200px] place-content-center'>
              <div className='place-self-center'>
                <Iconify
                  icon='line-md:loading-loop'
                  sx={{ fontSize: 24, color: '#000000', mb: 0.5 }}
                />
              </div>
              <p className='place-self-center text-lg md:text-xl font-semibold'>
                Mohon Tunggu
              </p>
            </div>
          ) : (
            <Stack spacing={{ xs: 1, md: 2 }}>
              <div className='-mb-2'>
                <p className='text-[13px] font-semibold'>
                  Gunakan Kode Voucher
                </p>
              </div>
              {onApplyDiscount && (
                <TextField
                  fullWidth
                  placeholder='Kode Voucher'
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  disabled={coupon !== ''}
                  defaultValue={coupon}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        {coupon === '' && (
                          <Button
                            variant='contained'
                            color='primary'
                            onClick={() =>
                              handleApplyDiscount(discountCode, false)
                            }
                            sx={{
                              mr: -0.5,
                              fontWeight: 600,
                              color: '#FFF',
                              backgroundColor: '#1D9CAB',
                              '&:hover': {
                                backgroundColor: '#128391',
                              },
                              '&.Mui-disabled': {
                                backgroundColor: '#cccccc',
                                color: '#666666',
                              },
                            }}
                            disabled={isLoadingDisc}>
                            {isLoadingDisc ? (
                              <Iconify
                                icon='line-md:loading-loop'
                                sx={{ fontSize: 20 }}
                              />
                            ) : (
                              'Gunakan'
                            )}
                          </Button>
                        )}
                        {coupon !== '' && (
                          <Button
                            variant='contained'
                            color='primary'
                            onClick={() =>
                              handleApplyDiscount(discountCode, true)
                            }
                            sx={{
                              mr: -0.5,
                              fontWeight: 600,
                              color: '#FFF',
                              backgroundColor: '#1D9CAB',
                              '&:hover': {
                                backgroundColor: '#128391',
                              },
                              '&.Mui-disabled': {
                                backgroundColor: '#cccccc',
                                color: '#666666',
                              },
                            }}
                            disabled={isLoadingDisc}>
                            {isLoadingDisc ? (
                              <Iconify
                                icon='line-md:loading-loop'
                                sx={{ fontSize: 20 }}
                              />
                            ) : (
                              'Hapus'
                            )}
                          </Button>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              <div className='mt-3 -mb-2'>
                <p className='text-[13px] font-semibold'>Gunakan Libur Point</p>
              </div>
              <div className='-mb-2'>
                <p className='text-[13px] font-medium'>
                  Anda Memiliki{' '}
                  <Image
                    src='/icon-logo-rounded-fill.png'
                    height={20}
                    width={20}
                    style={{
                      objectFit: 'contain',
                      marginLeft: 1,
                      marginRight: 1,
                    }}
                  />{' '}
                  <span className='text-liburdulu-orange text-[13px] font-semibold'>
                    {fPoin(rewardPoints)}
                  </span>
                </p>
              </div>
              {onApplyPoint && (
                <TextField
                  fullWidth
                  placeholder='Masukan Point'
                  value={pointUse || ''}
                  onChange={handlePointChange}
                  disabled={point !== ''}
                  defaultValue={point}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        {point === '' && (
                          <Button
                            variant='contained'
                            color='primary'
                            onClick={() => handleApplyPoint(pointUse, false)}
                            sx={{
                              mr: -0.5,
                              fontWeight: 600,
                              color: '#FFF',
                              backgroundColor: '#1D9CAB',
                              '&:hover': {
                                backgroundColor: '#128391',
                              },
                              '&.Mui-disabled': {
                                backgroundColor: '#cccccc',
                                color: '#666666',
                              },
                            }}
                            disabled={isLoading}>
                            {isLoading ? (
                              <Iconify
                                icon='line-md:loading-loop'
                                sx={{ fontSize: 20 }}
                              />
                            ) : (
                              'Gunakan'
                            )}
                          </Button>
                        )}
                        {point !== '' && (
                          <Button
                            variant='contained'
                            color='primary'
                            onClick={() => handleApplyPoint(pointUse, true)}
                            sx={{
                              mr: -0.5,
                              fontWeight: 600,
                              color: '#FFF',
                              backgroundColor: '#1D9CAB',
                              '&:hover': {
                                backgroundColor: '#128391',
                              },
                              '&.Mui-disabled': {
                                backgroundColor: '#cccccc',
                                color: '#666666',
                              },
                            }}
                            disabled={isLoading}>
                            {isLoading ? (
                              <Iconify
                                icon='line-md:loading-loop'
                                sx={{ fontSize: 20 }}
                              />
                            ) : (
                              'Hapus'
                            )}
                          </Button>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              <Divider sx={{ borderStyle: 'dashed', mt: 1 }} />
              <div
                className={`max-h-none md:max-h-[280px] ${
                  Array.isArray(item) && item.length > 5
                    ? 'overflow-visible md:overflow-y-auto h-auto md:h-[260px]'
                    : ''
                }`}>
                {Array.isArray(item) &&
                  item.map((row, index) => (
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
              <Divider sx={{ borderStyle: 'dashed', mt: '-8px' }} />
              <Stack direction='row' justifyContent='space-between'>
                <Typography
                  variant='body2'
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '12px', md: '14px' },
                  }}>
                  Subtotal
                </Typography>
                <Typography
                  variant='subtitle2'
                  sx={{ fontSize: { xs: '12px', md: '14px' } }}>
                  {fCurrency(subTotal)}
                </Typography>
              </Stack>
              {total !== 0 && (
                <Stack direction='row' justifyContent='space-between'>
                  <Typography
                    variant='body2'
                    sx={{
                      color: 'text.secondary',
                      fontSize: { xs: '12px', md: '14px' },
                    }}>
                    Biaya Layanan
                  </Typography>
                  <Typography
                    variant='subtitle2'
                    sx={{ fontSize: { xs: '12px', md: '14px' } }}>
                    {fCurrency(calculatedAmount)}
                  </Typography>
                </Stack>
              )}
              {discount < 0 && (
                <Stack direction='row' justifyContent='space-between'>
                  <Typography
                    variant='body2'
                    sx={{
                      color: 'text.secondary',
                      fontSize: { xs: '12px', md: '14px' },
                    }}>
                    Voucher Diskon
                  </Typography>
                  <Typography
                    variant='subtitle2'
                    sx={{ fontSize: { xs: '12px', md: '14px' } }}>
                    {fCurrency(discount)}
                  </Typography>
                </Stack>
              )}
              {point < 0 && (
                <Stack direction='row' justifyContent='space-between'>
                  <Typography
                    variant='body2'
                    sx={{
                      color: 'text.secondary',
                      fontSize: { xs: '12px', md: '14px' },
                    }}>
                    Poin Digunakan
                  </Typography>
                  <Typography
                    variant='subtitle2'
                    sx={{ fontSize: { xs: '12px', md: '14px' } }}>
                    {fCurrency(point)}
                  </Typography>
                </Stack>
              )}
              <Divider
                sx={{ borderStyle: 'dashed', mb: { xs: '8px', md: 0 } }}
              />
              <Stack direction='row' justifyContent='space-between'>
                <Typography
                  variant='subtitle1'
                  sx={{ fontSize: { xs: '14px', md: '16px' } }}>
                  Total Pembayaran
                </Typography>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography
                    variant='subtitle1'
                    sx={{
                      color: '#e52424',
                      fontSize: { xs: '14px', md: '16px' },
                      fontWeight: 'bold',
                    }}>
                    {fCurrency(total === 0 ? total : subtotalAmount)}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          )}
        </CardContent>
      </Card>
    </Stack>
  );
}

SummaryCheckout.propTypes = {
  total: PropTypes.number,
  discount: PropTypes.number,
  point: PropTypes.number,
  subTotal: PropTypes.number,
  coupon: PropTypes.string,
  isGetCart: PropTypes.bool,
  isGetTotals: PropTypes.bool,
  onApplyDiscount: PropTypes.func,
  onApplyPoint: PropTypes.func,
  item: PropTypes.array,
  payment: PropTypes.object,
};
