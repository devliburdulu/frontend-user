import {
  Stack,
  Typography,
  Select,
  MenuItem,
  InputAdornment,
  TextareaAutosize,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import IncrementerButton from '../incrementer-button';
import moment from 'moment';
import { useState, useEffect } from 'react';

const CustomOptions = ({
  value,
  handleChangeCustomOption,
  cart,
  timeForDateType,
}) => {
  const customOptions =
    cart?.cartItem?.product_option?.extension_attributes?.custom_options || [];
  let defaultValue = customOptions.find(
    (attr) => attr.option_id === value.option_id
  )?.option_value;

  const [fieldValue, setFieldValue] = useState(defaultValue || '');
  useEffect(() => {
    setFieldValue(
      customOptions.find((attr) => attr.option_id === value.option_id)
        ?.option_value || ''
    );
  }, [cart?.cartItem?.sku, value.option_id]);

  const handleFieldChange = (event) => {
    const newValue = event.target.value;
    setFieldValue(newValue);
    handleChangeCustomOption(newValue, value.option_id, cart);
  };

  return (
    <>
      {value.values && (
        <Stack className='mb-5'>
          <Typography variant='subtitle2' sx={{ flexGrow: 1 }}>
            {value.title}
          </Typography>

          {value.values && (
            <Stack spacing={1} className='w-full'>
              <Select
                labelId={`select-label-${value.option_id}`}
                id={`select-${value.option_id}`}
                onChange={(event) => {
                  handleChangeCustomOption(
                    event.target.value,
                    value.option_id,
                    cart
                  );
                }}
                value={defaultValue ?? ''}
                sx={{
                  '& .MuiSelect-select': {
                    border: '1px solid #212b36',
                    backgroundColor: '#FFFFFF',
                  },
                }}>
                {value.values
                  .slice()
                  .sort(
                    (a, b) => parseInt(a.sort_order) - parseInt(b.sort_order)
                  )
                  .map((prod) => (
                    <MenuItem
                      key={prod.option_type_id}
                      value={prod.option_type_id}>
                      {prod.title}{' '}
                      {parseInt(prod.price) !== 0
                        ? ' | + Rp. ' + parseInt(prod.price).toLocaleString()
                        : ''}
                    </MenuItem>
                  ))}
              </Select>
            </Stack>
          )}
        </Stack>
      )}

      {!value.values && (
        <Stack direction='column' className='mb-5'>
          {!(value.title === 'Dewasa' || value.title === 'Anak Anak') && (
            <Typography variant='subtitle2' sx={{ flexGrow: 1, mb: '4px' }}>
              {value.title}
            </Typography>
          )}

          {!value.values && value.title == 'Dewasa' ? (
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              spacing={2}
              sx={{
                padding: '0.5rem 0.75rem',
                border: '1px solid #212b36',
                backgroundColor: '#FFFFFF',
                borderRadius: 1,
              }}>
              <Typography variant='subtitle2' sx={{ flexGrow: 1, mb: 0 }}>
                {value.title}
              </Typography>
              <IncrementerButton
                name='quantity'
                quantity={parseInt(
                  customOptions.find(
                    (attr) => attr.option_id === value.option_id
                  )?.option_value
                )}
                disabledDecrease={
                  parseInt(
                    customOptions.find(
                      (attr) => attr.option_id === value.option_id
                    )?.option_value
                  ) <= 1
                }
                onIncrease={() =>
                  handleChangeCustomOption(
                    parseInt(
                      customOptions.find(
                        (attr) => attr.option_id === value.option_id
                      )?.option_value
                    ) + 1,
                    value.option_id
                  )
                }
                onDecrease={() =>
                  handleChangeCustomOption(
                    parseInt(
                      customOptions.find(
                        (attr) => attr.option_id === value.option_id
                      )?.option_value
                    ) - 1,
                    value.option_id
                  )
                }
              />
            </Stack>
          ) : !value.values && value.title == 'Anak Anak' ? (
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              spacing={2}
              sx={{
                padding: '0.5rem 0.75rem',
                border: '1px solid #212b36',
                backgroundColor: '#FFFFFF',
                borderRadius: 1,
              }}>
              <Typography variant='subtitle2' sx={{ flexGrow: 1, mb: 0 }}>
                {value.title}
              </Typography>
              <IncrementerButton
                name='quantity'
                quantity={parseInt(
                  customOptions.find(
                    (attr) => attr.option_id === value.option_id
                  )?.option_value
                )}
                disabledDecrease={
                  parseInt(
                    customOptions.find(
                      (attr) => attr.option_id === value.option_id
                    )?.option_value
                  ) <= 0
                }
                onIncrease={() =>
                  handleChangeCustomOption(
                    parseInt(
                      customOptions.find(
                        (attr) => attr.option_id === value.option_id
                      )?.option_value
                    ) + 1,
                    value.option_id
                  )
                }
                onDecrease={() =>
                  handleChangeCustomOption(
                    parseInt(
                      customOptions.find(
                        (attr) => attr.option_id === value.option_id
                      )?.option_value
                    ) - 1,
                    value.option_id
                  )
                }
              />
            </Stack>
          ) : (
            <>
              {!value.values && value.type === 'date' && (
                <Stack spacing={1}>
                  <DatePicker
                    defaultValue={
                      defaultValue ? moment(defaultValue).toDate() : undefined
                    }
                    onChange={(event) =>
                      handleChangeCustomOption(
                        moment(event).format('YYYY-MM-DD HH:mm:ss'),
                        value.option_id
                      )
                    }
                    minDate={
                      value.title === 'Booking Sampai' &&
                      customOptions.find(
                        (attr) =>
                          attr.option_id !== value.option_id &&
                          attr.option_value
                      )?.option_value
                        ? moment(
                            customOptions.find(
                              (attr) =>
                                attr.option_id !== value.option_id &&
                                attr.option_value
                            )?.option_value
                          ).toDate()
                        : timeForDateType.toDate()
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                      },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        border: '1px solid #212b36',
                        backgroundColor: '#FFFFFF',
                      },
                    }}
                  />
                </Stack>
              )}

              {!value.values && value.type === 'field' && (
                <Stack spacing={1}>
                  <TextareaAutosize
                    id='field'
                    minRows={1}
                    value={fieldValue}
                    onChange={handleFieldChange}
                    className='w-full'
                    style={{
                      border: '1px solid #212b36',
                      backgroundColor: '#FFFFFF',
                      borderRadius: 4,
                      padding: '16.5px 14px',
                      fontSize: 16,
                      fontFamily: 'inherit',
                      resize: 'vertical',
                    }}
                  />
                </Stack>
              )}
            </>
          )}
        </Stack>
      )}
    </>
  );
};

export default CustomOptions;
