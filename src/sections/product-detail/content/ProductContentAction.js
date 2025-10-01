import ProductDetail from '../summary/ProductDetail';
import ProductActions from '../summary/ProductActions';
import moment from 'moment';
import { useState, useEffect } from 'react';

export default function ProductContentAction({
  data,
  seller,
  image,
  price,
  specialPrice,
  downPayment,
  qty,
  cart,
  value,
  valueMin,
  valueMax,
  setValue,
  handleChange,
  handleChangeCustomOption,
  isAddToCart,
  isBuyNow,
  handleAddToCart,
  handleBuyNow,
  isHotelConvention,
  isLiburTiket,
  childrenProduct,
  subSku,
}) {
  const [error, setError] = useState('');
  const [isBookingDateInvalid, setIsBookingDateInvalid] = useState(false);

  // Update isBookingDateInvalid ketika error berubah
  useEffect(() => {
    setIsBookingDateInvalid(error !== '');
  }, [error]);

  // Logic validate booking date yang hanya berlaku jika produk memiliki custom options Booking Dari dan Booking Sampai
  useEffect(() => {
    if (cart && data && data.options) {
      // Check if product has custom options Booking Dari dan Booking Sampai
      const hasBookingDari = data.options.some(
        (opt) => opt.title === 'Booking Dari'
      );
      const hasBookingSampai = data.options.some(
        (opt) => opt.title === 'Booking Sampai'
      );

      // Only apply validation if both custom options exist
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
        } else {
          setError('');
        }
      } else {
        setError('');
      }
    }
  }, [cart, data]);

  return (
    <>
      <ProductDetail
        data={data}
        price={price}
        specialPrice={specialPrice}
        isHotelConvention={isHotelConvention}
        childrenProduct={childrenProduct}
        subSku={subSku}
      />
      <ProductActions
        qty={qty}
        downPayment={downPayment}
        isAddToCart={isAddToCart}
        isBuyNow={isBuyNow}
        handleAddToCart={handleAddToCart}
        handleBuyNow={handleBuyNow}
        value={value}
        valueMin={valueMin}
        valueMax={valueMax}
        setValue={setValue}
        handleChange={handleChange}
        handleChangeCustomOption={handleChangeCustomOption}
        isHotelConvention={isHotelConvention}
        isLiburTiket={isLiburTiket}
        cart={cart}
        data={data}
        setError={setError}
        isBookingDateInvalid={isBookingDateInvalid}
      />
    </>
  );
}
