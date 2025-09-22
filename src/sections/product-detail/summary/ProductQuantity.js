import { Stack, Typography } from '@mui/material';
import IncrementerButton from '../incrementer-button';

const ProductQuantity = ({
  data,
  value,
  valueMin,
  valueMax,
  qty,
  setValue,
  isHotelOrVilla,
  // price,
  // specialPrice,
}) => {
  const priceStatus =
    data.custom_attributes.find(
      (attr) => attr.attribute_code === 'price_status'
    )?.value || '';

  // const showSpecial = specialPrice && specialPrice !== 0;
  // const displayPrice = price !== undefined ? price : data.price;

  return (
    <Stack direction='column'>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        spacing={0.5}
        sx={{
          mb: '4px',
          padding: '0.5rem 0.75rem',
          border: '1px solid #212b36',
          borderRadius: 1,
          backgroundColor: '#FFFFFF',
        }}>
        <Typography
          variant='caption'
          component='div'
          sx={{ color: '#212b36', fontSize: '14px', fontWeight: 600 }}>
          {isHotelOrVilla ? 'Jumlah Kamar' : `Jumlah ${priceStatus}`}
        </Typography>
        <IncrementerButton
          name='quantity'
          quantity={value}
          disabledDecrease={value <= valueMin}
          disabledIncrease={value >= (valueMax > qty ? qty : valueMax)}
          onIncrease={() => setValue(value + 1)}
          onDecrease={() => setValue(value - 1)}
        />
      </Stack>
      <Typography
        variant='caption'
        component='div'
        sx={{
          textAlign: 'right',
          color: '#212b36',
          fontSize: '12px',
          fontWeight: 500,
          paddingRight: 1,
        }}>
        {valueMin > 1 && <>Min beli : {valueMin} </>}
      </Typography>
      <Typography
        variant='caption'
        component='div'
        sx={{
          textAlign: 'right',
          color: '#212b36',
          fontSize: '12px',
          fontWeight: 500,
          paddingRight: 1,
        }}>
        {qty === 0 ? (
          <span className='text-liburdulu-red'>Stock Habis</span>
        ) : (
          <>Tersisa : {qty}</>
        )}
      </Typography>
    </Stack>
  );
};

export default ProductQuantity;
