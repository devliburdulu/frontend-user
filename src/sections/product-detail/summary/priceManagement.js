import calculateSpecialPrice from './calcuateSpecialPrice';

export const usePriceManagement = () => {
  const calculateInitialPrice = (
    data,
    setPrice,
    setSpecialPrice,
    setPricePlus
  ) => {
    let plusPrice = 0;
    const special = data.custom_attributes.find(
      (attr) => attr.attribute_code === 'special_price'
    );
    const dateFrom = data.custom_attributes.find(
      (attr) => attr.attribute_code === 'special_from_date'
    );
    const dateTo = data.custom_attributes.find(
      (attr) => attr.attribute_code === 'special_to_date'
    );

    const calculatedSpecialPrice = calculateSpecialPrice(
      special,
      dateFrom,
      dateTo
    );
    setSpecialPrice(calculatedSpecialPrice);

    if (calculatedSpecialPrice !== 0) {
      setPrice(calculatedSpecialPrice);
    } else {
      setPrice(data.price);
    }

    data.options.forEach((opt) => {
      if (opt.values) {
        opt.values.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        plusPrice += opt.values[0].price;
      } else {
        plusPrice += opt.price;
      }
    });

    setPricePlus(plusPrice);
  };

  const calculateChildrenProductPrice = (
    childrenProduct,
    data,
    setPrice,
    setSpecialPrice,
    setPricePlus,
    setSubSku,
    setSubSkuCode,
    updateCart,
    attributeid,
    label
  ) => {
    let plusPrice = 0;
    let basePrice = data.price;
    let calculatedSpecialPrice = 0;

    if (childrenProduct.length === 0) {
      const special = data.custom_attributes.find(
        (attr) => attr.attribute_code === 'special_price'
      );
      const dateFrom = data.custom_attributes.find(
        (attr) => attr.attribute_code === 'special_from_date'
      );
      const dateTo = data.custom_attributes.find(
        (attr) => attr.attribute_code === 'special_to_date'
      );

      calculatedSpecialPrice = calculateSpecialPrice(special, dateFrom, dateTo);
      setSpecialPrice(calculatedSpecialPrice);

      data.options.forEach((opt) => {
        if (opt.values && opt.values.length > 0) {
          opt.values.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          plusPrice += opt.values[0].price;
        } else {
          plusPrice += opt.price || 0;
        }
      });

      setPricePlus(plusPrice);
      setPrice(
        data.type_id === 'hotelbooking' ? plusPrice : basePrice + plusPrice
      );
    } else {
      let lowestPrice = Infinity;
      let selectedSku = '';
      let selectedSubSkuCode = '';

      childrenProduct.forEach((prod) => {
        if (prod.price !== 0 && prod.price < lowestPrice) {
          lowestPrice = prod.price;
          selectedSku = prod.sku;
          selectedSubSkuCode = prod.custom_attributes.find(
            (attr) => attr.attribute_code === label
          )?.value;

          calculatedSpecialPrice = calculateSpecialPrice(
            prod.custom_attributes.find(
              (attr) => attr.attribute_code === 'special_price'
            ),
            prod.custom_attributes.find(
              (attr) => attr.attribute_code === 'special_from_date'
            ),
            prod.custom_attributes.find(
              (attr) => attr.attribute_code === 'special_to_date'
            )
          );
        }
      });

      setSpecialPrice(calculatedSpecialPrice);

      data.options.forEach((opt) => {
        plusPrice += opt.values ? opt.values[0].price : 0;
      });

      setPricePlus(plusPrice);
      setPrice(
        data.type_id === 'hotelbooking' ? plusPrice : lowestPrice + plusPrice
      );
      setSubSku(selectedSku);
      setSubSkuCode(selectedSubSkuCode);

      updateCart(
        [],
        [{ option_id: attributeid, option_value: selectedSubSkuCode }]
      );
    }
  };

  const calculateCustomOptionPrice = (
    data,
    updatedCustomOptions,
    specialPrice,
    setPricePlus,
    setSpecialPrice,
    setPrice,
    subSku,
    childrenProduct
  ) => {
    let plusPrice = 0;

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

    if (data.type_id === 'configurable' && childrenProduct.length > 0) {
      const selectedProduct = childrenProduct.find(
        (prod) => prod.sku === subSku
      );
      if (selectedProduct) {
        selectedProductPrice = selectedProduct.price;
      }
    }

    if (specialPrice !== 0) {
      const special = data.custom_attributes.find(
        (attr) => attr.attribute_code === 'special_price'
      );
      const dateFrom = data.custom_attributes.find(
        (attr) => attr.attribute_code === 'special_from_date'
      );
      const dateTo = data.custom_attributes.find(
        (attr) => attr.attribute_code === 'special_to_date'
      );

      const calculatedSpecialPrice = calculateSpecialPrice(
        special,
        dateFrom,
        dateTo
      );
      setSpecialPrice(calculatedSpecialPrice + plusPrice);
    } else {
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
  };

  return {
    calculateInitialPrice,
    calculateChildrenProductPrice,
    calculateCustomOptionPrice,
  };
};
