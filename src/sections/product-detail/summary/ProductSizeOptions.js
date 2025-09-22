import { Stack, Typography, Select, MenuItem } from '@mui/material';
import moment from 'moment';

const ProductSizeOptions = ({
  subSkuCode,
  subSku,
  handleChange,
  childrenProduct,
  label,
  time,
  isHotelOrVilla,
}) => {
  return (
    <Stack className='mb-5'>
      <Typography variant='subtitle2' sx={{ flexGrow: 1 }}>
        {isHotelOrVilla ? 'Pilihan Kamar' : 'Pilihan'}
      </Typography>
      <Stack spacing={1} className='w-full'>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={subSkuCode !== 0 ? subSkuCode : subSku}
          onChange={(event) => handleChange(event)}
          defaultValue={subSkuCode !== 0 ? subSkuCode : subSku}
          sx={{
            '& .MuiSelect-select': {
              border: '1px solid #212b36',
              backgroundColor: '#FFFFFF',
            },
          }}>
          {childrenProduct.map((prod) => {
            let isInTime = false;
            const child = prod.custom_attributes.find(
              (img) => img.attribute_code === label
            );
            const special = prod.custom_attributes.find(
              (attr) => attr.attribute_code === 'special_price'
            );
            const dateFrom = prod.custom_attributes.find(
              (attr) => attr.attribute_code === 'special_from_date'
            );
            const dateTo = prod.custom_attributes.find(
              (attr) => attr.attribute_code === 'special_to_date'
            );

            if (special && dateFrom && dateTo) {
              if (
                time.isBetween(moment(dateFrom.value), moment(dateTo.value))
              ) {
                isInTime = true;
              }
            } else if (special && dateFrom) {
              if (time.isSameOrAfter(moment(dateFrom.value))) {
                isInTime = true;
              }
            } else if (special && dateTo) {
              if (time.isSameOrBefore(moment(dateTo.value))) {
                isInTime = true;
              }
            }

            return (
              <MenuItem key={prod.sku} value={child ? child.value : prod.sku}>
                {isInTime ? (
                  <>
                    {prod.name} |{' '}
                    <span className='line-through'>
                      Rp. {parseInt(prod.price).toLocaleString()}{' '}
                    </span>{' '}
                    ( Rp. {parseInt(special.value).toLocaleString()} )
                  </>
                ) : (
                  <>
                    {prod.name} | Rp. {parseInt(prod.price).toLocaleString()}
                  </>
                )}
              </MenuItem>
            );
          })}
        </Select>
      </Stack>
    </Stack>
  );
};

export default ProductSizeOptions;
