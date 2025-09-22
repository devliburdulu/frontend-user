import { useState, useEffect } from 'react';
import {
  Avatar,
  Divider,
  Typography,
  Stack,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
} from '@mui/material';
import Iconify from 'src/components/iconify';

export default function DetailProduct({
  data,
  price,
  specialPrice,
  priceDP,
  seller,
  moveToMitraProfile,
  elementRef,
  handleChangeCustomOption,
  handleChangePayment,
  paymentOptions,
  isPaketWisata,
}) {
  // console.log('Cek Data: ', data);
  // console.log('Cek Price Ori 1: ', data.price);
  // console.log('Cek Price Ori 2: ', price);
  // console.log('Special Price: ', specialPrice);
  // console.log('Cek Price DP:', priceDP);

  // const [selectedPayment, setSelectedPayment] = useState(() => {
  //   return data.options?.title === 'Opsi Pembayaran' &&
  //     data.options?.values?.title === 'Full Payment'
  //     ? specialPrice || data.price
  //     : priceDP;
  // });

  const [selectedPayment, setSelectedPayment] = useState(() => {
    return specialPrice || data.price;
  });

  const [displayPrice, setDisplayPrice] = useState(
    selectedPayment === priceDP ? priceDP : specialPrice || price || data.price
  );

  useEffect(() => {
    if (selectedPayment === (specialPrice || data.price)) {
      setDisplayPrice(specialPrice || price || data.price);
    } else {
      setDisplayPrice(priceDP);
    }
  }, [selectedPayment, specialPrice, price, priceDP, data.price]);

  if (!seller) return null;

  return (
    <div>
      <p className='text-[24px] font-semibold'>{data.name}</p>

      {specialPrice && specialPrice !== 0 ? (
        <>
          <span className='text-[19px] font-[400] liburdulu-through mt-5'>
            Rp. {parseInt(data.price).toLocaleString()}
          </span>
          <p className='text-[24px] font-semibold mb-5 text-[#e52424]'>
            Rp. {parseInt(displayPrice).toLocaleString()}{' '}
            {data.custom_attributes.find(
              (attr) => attr.attribute_code === 'price_status'
            ) && (
              <span className='font-semibold text-[13px] text-liburdulu-black'>
                /{' '}
                {data.custom_attributes.find(
                  (attr) => attr.attribute_code === 'price_status'
                )?.value || ''}
              </span>
            )}
          </p>
        </>
      ) : (
        <p className='text-[24px] font-semibold my-3 text-[#e52424]'>
          Rp. {parseInt(displayPrice).toLocaleString()}{' '}
          {data.custom_attributes.find(
            (attr) => attr.attribute_code === 'price_status'
          ) && (
            <span className='font-semibold text-[13px] text-liburdulu-black'>
              /{' '}
              {data.custom_attributes.find(
                (attr) => attr.attribute_code === 'price_status'
              )?.value || ''}
            </span>
          )}
        </p>
      )}

      <Typography
        variant='body2'
        sx={{ color: 'text.secondary' }}
        fontSize={13}
        marginTop={1}
        dangerouslySetInnerHTML={{
          __html:
            (data.custom_attributes &&
              data.custom_attributes.find(
                (attr) => attr.attribute_code === 'short_description'
              )?.value) ||
            '',
        }}></Typography>

      <div>
        <Divider sx={{ borderStyle: 'dashed', mt: 1, mb: 1.5 }} />
        <div className='flex items-start justify-start gap-4'>
          {seller?.logo_pic === null ? (
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: 'rgba(29, 156, 171, 0.2)',
              }}
              className='shadow'>
              {seller?.shop_title?.charAt(0)}
            </Avatar>
          ) : (
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: 'rgba(29, 156, 171, 0.2)',
              }}
              className='shadow'
              src={`${process.env.NEXT_PUBLIC_MAGENTO_API}/media/${seller?.logo_pic}`}
            />
          )}
          <div className='flex flex-col items-start'>
            <button
              className='text-[16px] font-semibold ms-[5px]'
              onClick={() => moveToMitraProfile(data.sku)}>
              {seller?.shop_title}
            </button>

            <div ref={elementRef} className='flex items-center gap-4'>
              <div className='flex items-center gap-2 max-w-xs'>
                <Iconify
                  icon='mdi:location-on-outline'
                  width={24}
                  height={24}
                  style={{ color: '#1D9CAB' }}
                />
                <p className='text-[13px] font-light'>
                  {seller?.company_locality}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Divider sx={{ borderStyle: 'dashed', mt: 1, mb: 2 }} />
      </div>

      {paymentOptions.length > 0 && isPaketWisata && (
        <Stack fullWidth sx={{ marginTop: 2, marginBottom: 2.5 }}>
          <Typography variant='subtitle2' sx={{ flexGrow: 1 }}>
            Pilih Opsi Pembayaran
          </Typography>
          <RadioGroup
            value={selectedPayment}
            onChange={(e) => {
              setSelectedPayment(e.target.value);
              handleChangePayment(e.target.value, 'payment_option');
            }}>
            {paymentOptions.map((option, index) => (
              <Paper
                key={index}
                variant='outlined'
                sx={{ padding: 1.5, marginBottom: 1 }}>
                <FormControlLabel
                  value={option.value}
                  control={<Radio />}
                  label={`${option.label} - Rp ${parseInt(
                    option.value
                  ).toLocaleString()}`}
                />
              </Paper>
            ))}
          </RadioGroup>
        </Stack>
      )}
    </div>
  );
}
