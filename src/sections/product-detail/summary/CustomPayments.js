import { useState } from 'react';
import {
  Stack,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Drawer,
} from '@mui/material';
import ProductDetailsTerms from '../product-details-terms';
import Iconify from 'src/components/iconify';

const CustomPayments = ({
  value,
  data,
  price,
  handleChangeCustomOption,
  downPayment,
  specialPrice,
}) => {
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (openDrawer) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpenDrawer(openDrawer);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let defaultValue = '';
  if (value.type === 'radio' && value.values?.length > 0) {
    const fullPaymentOption = value.values.find(
      (opt) => opt.title === 'Full Payment'
    );
    defaultValue = fullPaymentOption?.option_type_id || '';
  }

  return (
    <>
      {value.values && (
        <Stack className='mb-5'>
          <Typography variant='subtitle2' sx={{ flexGrow: 1 }}>
            Pilih {value.title}
          </Typography>

          <RadioGroup
            defaultValue={defaultValue}
            onChange={(event) =>
              handleChangeCustomOption(event.target.value, value.option_id)
            }>
            <Box
              sx={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #212b36',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                marginBottom: '6px',
                '&:hover': { borderColor: '#212B36' },
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
              }}>
              <FormControlLabel
                key={value.values[1].option_type_id}
                value={value.values[1].option_type_id}
                control={
                  <Radio
                    sx={{
                      '&.Mui-checked': {
                        color: '#212B36',
                      },
                    }}
                  />
                }
                label={
                  <Box>
                    {`${value.values[1].title} | Rp. ${parseInt(
                      downPayment
                    ).toLocaleString()}`}
                  </Box>
                }
              />
              {specialPrice && specialPrice !== 0 ? (
                <Typography variant='caption' sx={{ color: '#637381' }}>
                  {`Jika kamu memilih pembayaran Down Payment, maka sisa pembayaran kamu adalah Rp. ${parseInt(
                    specialPrice - downPayment
                  ).toLocaleString()}.`}
                </Typography>
              ) : (
                <Typography variant='caption' sx={{ color: '#637381' }}>
                  {`Jika kamu memilih pembayaran Down Payment, maka sisa pembayaran kamu adalah Rp. ${parseInt(
                    (price || data.price) - downPayment
                  ).toLocaleString()}.`}
                </Typography>
              )}
              <Typography variant='caption' sx={{ color: '#637381' }}>
                <div className='hidden md:flex'>
                  <Button
                    variant='caption'
                    onClick={handleOpen}
                    endIcon={
                      <Iconify
                        icon='ph:info-bold'
                        sx={{
                          width: '16px',
                          height: '16px',
                          marginLeft: '-5px',
                        }}
                      />
                    }
                    sx={{
                      textTransform: 'none',
                      color: '#637381',
                      padding: '0',
                      justifyContent: 'flex-start',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        textDecoration: 'underline',
                      },
                    }}>
                    Baca syarat & ketentuan DP
                  </Button>
                </div>
                <div className='d-flex md:hidden'>
                  <Button
                    onClick={toggleDrawer(true)}
                    variant='caption'
                    endIcon={
                      <Iconify
                        icon='ph:info-bold'
                        sx={{
                          width: '16px',
                          height: '16px',
                          marginLeft: '-5px',
                        }}
                      />
                    }
                    sx={{
                      textTransform: 'none',
                      color: '#637381',
                      padding: '0',
                      justifyContent: 'flex-start',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        textDecoration: 'underline',
                      },
                    }}>
                    Baca syarat & ketentuan DP
                  </Button>
                </div>
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #212b36',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                marginBottom: '6px',
                '&:hover': { borderColor: '#212B36' },
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
              }}>
              {specialPrice && specialPrice !== 0 ? (
                <>
                  <FormControlLabel
                    key={value.values[0].option_type_id}
                    value={value.values[0].option_type_id}
                    control={
                      <Radio
                        sx={{
                          '&.Mui-checked': {
                            color: '#212B36',
                          },
                        }}
                      />
                    }
                    label={`${value.values[0].title} | Rp. ${parseInt(
                      specialPrice
                    ).toLocaleString()}`}
                  />
                  <Typography variant='caption' sx={{ color: '#637381' }}>
                    {`Jika kamu memilih pembayaran Full Payment, maka kamu akan melakukan pembayaran penuh sejumlah Rp. ${parseInt(
                      specialPrice
                    ).toLocaleString()}.`}
                  </Typography>
                </>
              ) : (
                <>
                  <FormControlLabel
                    key={value.values[0].option_type_id}
                    value={value.values[0].option_type_id}
                    control={
                      <Radio
                        sx={{
                          '&.Mui-checked': {
                            color: '#212B36',
                          },
                        }}
                      />
                    }
                    label={`${value.values[0].title} | Rp. ${parseInt(
                      price || data.price
                    ).toLocaleString()}`}
                  />
                  <Typography variant='caption' sx={{ color: '#637381' }}>
                    {`Jika kamu memilih pembayaran Full Payment, maka kamu akan melakukan pembayaran penuh sejumlah Rp. ${parseInt(
                      price || data.price
                    ).toLocaleString()}.`}
                  </Typography>
                </>
              )}
            </Box>
          </RadioGroup>
        </Stack>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '30px 24px 10px',
          }}>
          Syarat & Ketentuan DP
        </DialogTitle>
        <DialogContent sx={{ padding: '12px 10px', overflow: 'initial' }}>
          <Typography variant='body2'>
            <ProductDetailsTerms />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant='contained'
            sx={{
              fontWeight: 600,
              backgroundColor: '#1D9CAB',
              color: '#FFF',
              '&:hover': {
                backgroundColor: '#128391',
              },
              '&.Mui-disabled': {
                backgroundColor: '#cccccc',
                color: '#666666',
              },
            }}>
            Tutup Informasi
          </Button>
        </DialogActions>
      </Dialog>
      <Drawer
        anchor='bottom'
        open={openDrawer}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            overflow: 'hidden',
          },
        }}>
        <Typography
          variant='h5'
          sx={{ padding: '2rem 0 0.5rem', textAlign: 'center' }}>
          Syarat & Ketentuan DP
        </Typography>
        <ProductDetailsTerms />
      </Drawer>
    </>
  );
};

export default CustomPayments;
