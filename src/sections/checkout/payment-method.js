'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  useTheme,
  useMediaQuery,
  Drawer,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { LOGO_PAYMENT } from 'src/_mock/_logo';

const PaymentMethod = ({
  allPayments = [],
  selectedPaymentMethod,
  setValue,
  total,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFromDialog, setSelectedFromDialog] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getLogoUrl = (code) => {
    const urlOption = LOGO_PAYMENT.find((option) => option.value === code);
    return urlOption ? urlOption.url : code;
  };

  const isValidPayment = (item) => {
    const min = item.min_payment ?? 0;
    const max = item.max_payment ?? Infinity;
    return total >= min && total <= max;
  };

  const handleSelectPayment = (item) => {
    setValue('payment_method', item.code);
  };

  const groupedPayments = allPayments.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const displayedPayments = selectedFromDialog
    ? allPayments.filter((item) => item.code === selectedPaymentMethod)
    : allPayments.filter((item) =>
        ['bca', 'mandiri', 'qris', 'shopeepay'].includes(
          item.code.toLowerCase()
        )
      );

  const renderPaymentItem = (item) => {
    const isValid = isValidPayment(item);
    return (
      <label
        key={item.code}
        className={`flex items-center justify-between py-2 px-2 pr-5 border rounded-lg cursor-pointer ${
          selectedPaymentMethod === item.code
            ? 'border-2 border-[#1D9CAB]'
            : 'border-[#d8dce8]'
        } w-full ${displayedPayments.length >= 2 ? 'md:w-[49%]' : ''} ${
          !isValid ? 'opacity-50 cursor-not-allowed' : ''
        }`}>
        <div className='flex items-center justify-start'>
          <Image
            src={getLogoUrl(item.code)}
            height={60}
            width={60}
            quality={100}
            priority={true}
            className='object-none'
            alt={item.name}
          />
          <div className='ml-2 text-left'>
            <p className='font-medium text-sm md:text-base'>{item.name}</p>
            <p className='text-xs text-gray-500'>{item.category}</p>
          </div>
        </div>
        <input
          type='radio'
          name='payment'
          value={item.code}
          checked={selectedPaymentMethod === item.code}
          onChange={() => isValid && handleSelectPayment(item)}
          className='form-radio h-4 w-4 text-[#1D9CAB] accent-[#1D9CAB]'
          disabled={!isValid}
        />
      </label>
    );
  };

  return (
    <>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={1}
        sx={{ flexWrap: 'wrap' }}>
        {displayedPayments.map(renderPaymentItem)}
      </Stack>

      {Object.keys(groupedPayments).length > 0 && (
        <Button
          variant='outlined'
          onClick={() => setDialogOpen(true)}
          sx={{
            mt: 2,
            textTransform: 'none',
            borderColor: '#1D9CAB',
            color: '#1D9CAB',
            fontWeight: 600,
            width: { xs: '100%', md: 'auto' },
          }}>
          Lihat Semua Pembayaran
        </Button>
      )}

      {!isMobile ? (
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          fullWidth
          maxWidth='sm'>
          <DialogTitle sx={{ p: '1.5rem 1.5rem 1rem' }}>
            Metode Pembayaran
          </DialogTitle>
          <DialogContent sx={{ padding: '0 0.5rem 1rem' }} dividers>
            {Object.entries(groupedPayments).map(([category, payments]) => (
              <Accordion
                key={category}
                defaultExpanded={category
                  .toLowerCase()
                  .includes('virtual account')}
                disableGutters
                sx={{
                  boxShadow: 'none',
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': {
                    boxShadow: 'none',
                    borderRadius: 0,
                    margin: 0,
                  },
                }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ mb: 1 }}>
                  <Typography sx={{ fontWeight: 600 }}>{category}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0 }}>
                  <Stack spacing={1}>
                    {payments.map((item) => {
                      const isValid = isValidPayment(item);
                      return (
                        <label
                          key={item.code}
                          className={`flex items-center justify-between py-2 px-2 pr-5 border rounded-lg cursor-pointer ${
                            selectedPaymentMethod === item.code
                              ? 'border-2 border-[#1D9CAB]'
                              : 'border-[#d8dce8]'
                          } ${
                            !isValid ? 'opacity-50 cursor-not-allowed' : ''
                          }`}>
                          <div className='flex items-center justify-start'>
                            <Image
                              src={getLogoUrl(item.code)}
                              height={60}
                              width={60}
                              quality={100}
                              priority={true}
                              className='object-none'
                              alt={item.name}
                            />
                            <div className='ml-2'>
                              <p className='font-medium text-sm md:text-base'>
                                {item.name}
                              </p>
                              <p className='text-xs text-gray-500'>
                                {item.category}
                              </p>
                            </div>
                          </div>
                          <input
                            type='radio'
                            name='payment'
                            value={item.code}
                            checked={selectedPaymentMethod === item.code}
                            onChange={() => {
                              isValid && handleSelectPayment(item);
                              setSelectedFromDialog(true);
                              setDialogOpen(false);
                            }}
                            className='form-radio h-4 w-4 text-[#1D9CAB] accent-[#1D9CAB]'
                            disabled={!isValid}
                          />
                        </label>
                      );
                    })}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            ))}
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer
          anchor='bottom'
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}>
          <div className='px-0 py-5 bg-liburdulu-white'>
            <div className='flex items-center justify-between mb-3 px-4'>
              <Typography variant='h6'>Metode Pembayaran</Typography>
              <IconButton onClick={() => setDialogOpen(false)}>
                <CloseIcon />
              </IconButton>
            </div>
            {Object.entries(groupedPayments).map(([category, payments]) => (
              <Accordion
                key={category}
                defaultExpanded={category
                  .toLowerCase()
                  .includes('virtual account')}
                disableGutters
                sx={{
                  boxShadow: 'none',
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': {
                    boxShadow: 'none',
                    borderRadius: 0,
                    margin: 0,
                  },
                }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ mb: 1 }}>
                  <Typography sx={{ fontWeight: 600 }}>{category}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0 }}>
                  <Stack spacing={1}>
                    {payments.map((item) => {
                      const isValid = isValidPayment(item);
                      return (
                        <label
                          key={item.code}
                          className={`flex items-center justify-between py-2 px-2 pr-5 border rounded-lg cursor-pointer ${
                            selectedPaymentMethod === item.code
                              ? 'border-2 border-[#1D9CAB]'
                              : 'border-[#d8dce8]'
                          } ${
                            !isValid ? 'opacity-50 cursor-not-allowed' : ''
                          }`}>
                          <div className='flex items-center justify-start'>
                            <Image
                              src={getLogoUrl(item.code)}
                              height={60}
                              width={60}
                              quality={100}
                              priority={true}
                              className='object-none'
                              alt={item.name}
                            />
                            <div className='ml-2'>
                              <p className='font-medium text-sm md:text-base'>
                                {item.name}
                              </p>
                              <p className='text-xs text-gray-500'>
                                {item.category}
                              </p>
                            </div>
                          </div>
                          <input
                            type='radio'
                            name='payment'
                            value={item.code}
                            checked={selectedPaymentMethod === item.code}
                            onChange={() => {
                              isValid && handleSelectPayment(item);
                              setSelectedFromDialog(true);
                              setDialogOpen(false);
                            }}
                            className='form-radio h-4 w-4 text-[#1D9CAB] accent-[#1D9CAB]'
                            disabled={!isValid}
                          />
                        </label>
                      );
                    })}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </Drawer>
      )}
    </>
  );
};

export default PaymentMethod;
