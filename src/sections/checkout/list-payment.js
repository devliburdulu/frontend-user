import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import Iconify from 'src/components/iconify';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import PaymentMethod from './payment-method';

// ----------------------------------------------------------------------

export default function ListPayment({
  isGetCart,
  isGetTotals,
  total,
  payment,
  defaultPaymentMethod,
}) {
  const { setValue, watch } = useFormContext();
  const selectedPaymentMethod = watch('payment_method');

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
  }, [defaultPaymentMethod]);

  useEffect(() => {
    if (selectedPaymentData) {
      const { calculated_amount, subtotal_amount } = selectedPaymentData;
      setValue('calculated_amount', calculated_amount);
      setValue('subtotal_amount', subtotal_amount);
    }
  }, [selectedPaymentMethod]);

  console.log('Cek Harga Total:', total);

  return (
    <Stack spacing={2}>
      <Card sx={{ mb: 2 }}>
        <CardHeader
          title='Metode Pembayaran'
          titleTypographyProps={{ fontWeight: '600' }}
          sx={{ px: 2 }}
        />

        <CardContent sx={{ pt: 1, pb: 0, px: 2, textAlign: 'center' }}>
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
            <PaymentMethod
              allPayments={allPayments}
              selectedPaymentMethod={selectedPaymentMethod}
              setValue={setValue}
              total={total}
            />
          )}
        </CardContent>
      </Card>
    </Stack>
  );
}

ListPayment.propTypes = {
  isGetCart: PropTypes.bool,
  isGetTotals: PropTypes.bool,
  payment: PropTypes.object,
  defaultPaymentMethod: PropTypes.string,
};
