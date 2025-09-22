import calculateSpecialPrice from './calcuateSpecialPrice';

export const useOptionHandlers = (
  childrenProduct,
  //   setPrice,
  setSubSku,
  setSubSkuCode,
  //   setSpecialPrice,
  pricePlus,
  attributeid,
  updateCart,
  getQty,
  subSku,
  data,
  setPricePlus,
  setSpecialPrice,
  setPrice,
  cart,
  countQtyHotel,
  listCustomOptions,
  value,
  valueMinCur,
  setValueMin,
  setValue,
  label
) => {
  const handleChange = (event) => {
    const selectedValue = event.target.value;

    const prod = childrenProduct.find((p) => {
      const child = p.custom_attributes.find(
        (attr) => attr.attribute_code === label
      );
      return (
        (child && child.value === selectedValue) || p.sku === selectedValue
      );
    });

    if (!prod) {
      return;
    }

    setSubSku(prod.sku);
    setSubSkuCode(selectedValue);

    const special = prod.custom_attributes.find(
      (attr) => attr.attribute_code === 'special_price'
    );
    const dateFrom = prod.custom_attributes.find(
      (attr) => attr.attribute_code === 'special_from_date'
    );
    const dateTo = prod.custom_attributes.find(
      (attr) => attr.attribute_code === 'special_to_date'
    );

    const calculatedSpecialPrice = calculateSpecialPrice(
      special,
      dateFrom,
      dateTo
    );

    if (calculatedSpecialPrice > 0) {
      setSpecialPrice(calculatedSpecialPrice + pricePlus);
      setPrice(calculatedSpecialPrice + pricePlus);
    } else {
      setSpecialPrice(0);
      setPrice(prod.price + pricePlus);
    }

    updateCart([], [{ option_id: attributeid, option_value: selectedValue }]);
    getQty(subSku, false);
  };

  const handleChangeCustomOption = (event, optionId, keranjang) => {
    let selectedOptionValue = event.target ? event.target.value : event;
    let plusPrice = 0;

    if (
      !cart ||
      !cart.cartItem ||
      !cart.cartItem.product_option ||
      !cart.cartItem.product_option.extension_attributes
    ) {
      console.error('Cart structure is not properly initialized');
      return;
    }

    const updatedCustomOptions = JSON.parse(
      JSON.stringify(
        cart.cartItem.product_option.extension_attributes.custom_options
      )
    );

    const existingOptionIndex = updatedCustomOptions.findIndex(
      (option) => option.option_id === optionId
    );

    if (existingOptionIndex !== -1) {
      updatedCustomOptions[existingOptionIndex].option_id = optionId;
      updatedCustomOptions[existingOptionIndex].option_value =
        selectedOptionValue;
    } else {
      updatedCustomOptions.push({
        option_id: optionId,
        option_value: selectedOptionValue,
      });
    }

    const optionMeta = data.options.find((opt) => opt.option_id === optionId);
    if (
      optionMeta &&
      (optionMeta.type === 'date' ||
        optionMeta.title === 'Booking Dari' ||
        optionMeta.title === 'Booking Sampai')
    ) {
      if (data.type_id === 'configurable' && childrenProduct.length > 0) {
        const minPriceProduct = childrenProduct.reduce(
          (min, prod) => (prod.price < min.price ? prod : min),
          childrenProduct[0]
        );
        setPrice(minPriceProduct.price);
      }
      updateCart(updatedCustomOptions, []);
      return;
    }

    updateCart(updatedCustomOptions, []);

    data.options.forEach((opt) => {
      const recentOpt = updatedCustomOptions.find(
        (option) => option.option_id == opt.option_id
      );

      if (opt.values) {
        opt.values.forEach((prod) => {
          if (prod.option_type_id === recentOpt?.option_value) {
            if (opt.title !== 'Dewasa' && opt.title !== 'Anak Anak') {
              plusPrice += prod.price;
            }
          }
        });
      }
    });

    setPricePlus(plusPrice);
    let selectedProductPrice = data.price;
    let productForPrice = data;

    if (data.type_id === 'configurable' && childrenProduct.length > 0) {
      const selectedProduct = childrenProduct.find(
        (prod) => prod.sku === subSku
      );
      if (selectedProduct) {
        selectedProductPrice = selectedProduct.price;
        productForPrice = selectedProduct;
      }
    }

    const special = productForPrice.custom_attributes.find(
      (attr) => attr.attribute_code === 'special_price'
    );
    const dateFrom = productForPrice.custom_attributes.find(
      (attr) => attr.attribute_code === 'special_from_date'
    );
    const dateTo = productForPrice.custom_attributes.find(
      (attr) => attr.attribute_code === 'special_to_date'
    );

    const calculatedSpecialPrice = calculateSpecialPrice(
      special,
      dateFrom,
      dateTo
    );

    if (calculatedSpecialPrice > 0) {
      setSpecialPrice(calculatedSpecialPrice + plusPrice);
      setPrice(calculatedSpecialPrice + plusPrice);
    } else {
      setSpecialPrice(0);
      setPrice(() => {
        if (
          data.type_id === 'configurable' &&
          data.options.some((opt) => opt.type === 'drop_down')
        ) {
          return selectedProductPrice + plusPrice;
        } else if (
          data.options.some(
            (opt) => opt.title === 'Dewasa' || opt.title === 'Anak Anak'
          )
        ) {
          return selectedProductPrice;
        } else {
          return data.price + plusPrice;
        }
      });
    }

    getQty(subSku, true);
    countQtyHotel(
      data,
      listCustomOptions,
      cart,
      value,
      valueMinCur,
      setValueMin,
      setValue
    );
  };

  return {
    handleChange,
    handleChangeCustomOption,
  };
};
