import { Stack, Button } from '@mui/material';
import Iconify from 'src/components/iconify';
import PropTypes from 'prop-types';
import moment from 'moment';

const ProductActions = ({
  qty,
  isHotelConvention,
  isAddToCart,
  isBuyNow,
  handleAddToCart,
  handleBuyNow,
  downPayment,
  isBookingDateInvalid,
  cart,
  data,
  setError,
}) => {
  const shouldShowAddToCart = !isHotelConvention && downPayment === 0;

  const handleAddToCartWithValidation = () => {
    const hasBookingDari = data.options.some(
      (opt) => opt.title === 'Booking Dari'
    );
    const hasBookingSampai = data.options.some(
      (opt) => opt.title === 'Booking Sampai'
    );

    if (hasBookingDari && hasBookingSampai) {
      const customOptions =
        cart.cartItem.product_option.extension_attributes.custom_options;
      const bookingDariOpt = data.options.find(
        (opt) => opt.title === 'Booking Dari'
      );
      const bookingSampaiOpt = data.options.find(
        (opt) => opt.title === 'Booking Sampai'
      );
      const bookingDari = customOptions.find(
        (opt) => opt.option_id === bookingDariOpt?.option_id
      )?.option_value;
      const bookingSampai = customOptions.find(
        (opt) => opt.option_id === bookingSampaiOpt?.option_id
      )?.option_value;

      if (
        bookingDari &&
        bookingSampai &&
        moment(bookingSampai).isBefore(moment(bookingDari), 'day')
      ) {
        setError('Tanggal Booking Sampai tidak boleh sebelum Booking Dari');
        return;
      }
      setError('');
    }
    handleAddToCart();
  };
  return (
    <>
      <Stack
        direction={{ xs: 'row', sm: 'column' }}
        spacing={{ xs: 1.5, sm: 1 }}
        className='mt-3 mb-3 md:mb-0'>
        {qty === 0 ? (
          <Button
            fullWidth
            size='large'
            variant='contained'
            disabled
            sx={{ whiteSpace: 'nowrap', fontWeight: 500, fontSize: '14px' }}>
            Stok Habis
          </Button>
        ) : (
          <>
            {shouldShowAddToCart && (
              <Button
                fullWidth
                size='large'
                variant='outlined'
                startIcon={
                  !isAddToCart && (
                    <Iconify
                      icon='solar:cart-plus-broken'
                      width={24}
                      sx={{ display: { xs: 'none', sm: 'block' } }}
                    />
                  )
                }
                onClick={handleAddToCartWithValidation}
                sx={{
                  whiteSpace: 'nowrap',
                  fontWeight: 500,
                  fontSize: { xs: '12px', sm: '14px' },
                  border: '2px solid',
                }}
                disabled={isBookingDateInvalid}>
                {isAddToCart ? (
                  <Iconify
                    icon='line-md:loading-loop'
                    sx={{ fontSize: 20, color: '#000000' }}
                  />
                ) : (
                  'Masukkan Keranjang'
                )}
              </Button>
            )}
            <Button
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              onClick={handleBuyNow}
              sx={{
                whiteSpace: 'nowrap',
                fontWeight: 500,
                fontSize: { xs: '12px', sm: '14px' },
              }}
              disabled={isBookingDateInvalid}>
              {isBuyNow ? (
                <Iconify
                  icon='line-md:loading-loop'
                  sx={{ fontSize: 20, color: '#FFF' }}
                />
              ) : (
                'Pesan Sekarang'
              )}
            </Button>
          </>
        )}
      </Stack>
      {isBookingDateInvalid && (
        <span style={{ color: 'red', fontSize: '12px', marginTop: 4 }}>
          Tanggal <i>Booking Sampai</i> harus melebihi atau sama dengan tanggal{' '}
          <i>Booking Dari</i>.
        </span>
      )}
    </>
  );
};

export default ProductActions;

ProductActions.propTypes = {
  qty: PropTypes.number.isRequired,
  isHotelConvention: PropTypes.bool,
  isAddToCart: PropTypes.bool,
  isBuyNow: PropTypes.bool,
  handleAddToCart: PropTypes.func.isRequired,
  handleBuyNow: PropTypes.func.isRequired,
  downPayment: PropTypes.number.isRequired,
  isBookingDateInvalid: PropTypes.bool,
  cart: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  setError: PropTypes.func.isRequired,
};

ProductActions.defaultProps = {
  isHotelConvention: false,
  isAddToCart: false,
  isBuyNow: false,
};
