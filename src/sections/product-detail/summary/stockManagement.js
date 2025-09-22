import { getProductChildren, getSaleableBySKU } from 'src/fetch-global';

export const useStockManagement = (data, cart, setCart) => {
  const getChildrenProduct = async (
    currentSku,
    setChildrenProduct,
    setLabel,
    setAttributeid
  ) => {
    try {
      if (data.type_id === 'hotelbooking') {
        const datas = await getProductChildren(currentSku);
        const option =
          data.extension_attributes.configurable_product_options[0].label;
        const convertedString = option.replace(/\s+/g, '_').toLowerCase();

        setLabel(convertedString);
        setAttributeid(
          data.extension_attributes.configurable_product_options[0].attribute_id
        );
        setChildrenProduct(datas);
      } else {
        const datas = await getProductChildren(currentSku);
        const option =
          data.extension_attributes.configurable_product_options[0].label;
        const convertedString = option.replace(/\s+/g, '_').toLowerCase();

        setLabel(convertedString);
        setAttributeid(
          data.extension_attributes.configurable_product_options[0].attribute_id
        );
        setChildrenProduct(datas);
      }
    } catch (error) {
      console.error('Error fetching children products:', error);
    }
  };

  const getQty = async (
    subSku,
    isChangeValue,
    setQty,
    setValue,
    setValueMin,
    setValueMinCur,
    setValueMax,
    setIsCountQty
  ) => {
    try {
      setIsCountQty(true);
      const getqty = await getSaleableBySKU(subSku);
      setQty(getqty.qty);

      if (!isChangeValue) {
        setValue(getqty.stock_item.min_sale_qty);
        setValueMin(getqty.stock_item.min_sale_qty);
        setValueMinCur(getqty.stock_item.min_sale_qty);
        setValueMax(getqty.stock_item.max_sale_qty);
      }

      setIsCountQty(false);
    } catch (error) {
      console.error('Error fetching quantity:', error);
    }
  };

  const countQtyHotel = (
    data,
    listCustomOptions,
    cart,
    value,
    valueMinCur,
    setValueMin,
    setValue
  ) => {
    const maxAdults = data.custom_attributes.find(
      (attr) => attr.attribute_code === 'max_adults'
    )?.value;

    const idAdults = listCustomOptions.find(
      (attr) => attr.option_title === 'Dewasa'
    )?.option_id;

    const valueAdults =
      cart.cartItem.product_option.extension_attributes.custom_options.find(
        (attr) => attr.option_id === idAdults
      )?.option_value;

    const calculatedMin =
      parseInt(valueAdults / 2) + (valueAdults % 2 !== 0 ? 1 : 0);
    if (calculatedMin >= valueMinCur && value >= valueMinCur) {
      setValueMin(calculatedMin);
    }

    if (value < valueAdults / 2) {
      setValue(value + 1);
    }
  };

  return {
    getChildrenProduct,
    getQty,
    countQtyHotel,
  };
};
