import { getDynamicCustomOptions } from './customOptionHotel';

export const useCartManagement = (data, time, timeForDateType) => {
  const createInitialCart = (
    subSkuCode,
    currentSku,
    subSku,
    value,
    attributeid
  ) => {
    const dynamicCustomOptions = getDynamicCustomOptions(
      data,
      time,
      timeForDateType
    );

    return {
      cartItem: {
        sku: subSkuCode !== 0 ? currentSku : subSku,
        qty: value,
        quote_id: '',
        product_option: {
          extension_attributes: {
            configurable_item_options: [
              {
                option_id: attributeid,
                option_value: subSkuCode,
              },
            ],
            custom_options: dynamicCustomOptions,
          },
        },
      },
    };
  };

  const updateCart = (
    prevCart,
    subSkuCode,
    currentSku,
    subSku,
    value,
    customOptions = [],
    configurableOptions = []
  ) => {
    return {
      ...prevCart,
      cartItem: {
        ...prevCart.cartItem,
        sku: subSkuCode !== 0 ? currentSku : subSku,
        qty: value,
        product_option: {
          ...prevCart.cartItem.product_option,
          extension_attributes: {
            ...prevCart.cartItem.product_option.extension_attributes,
            configurable_item_options:
              configurableOptions.length > 0
                ? configurableOptions
                : prevCart.cartItem.product_option.extension_attributes
                    .configurable_item_options,
            custom_options:
              customOptions.length > 0
                ? customOptions
                : prevCart.cartItem.product_option.extension_attributes
                    .custom_options,
          },
        },
      },
    };
  };

  const updateCustomOptions = (cart, optionId, selectedOptionValue) => {
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

    return updatedCustomOptions;
  };

  return {
    createInitialCart,
    updateCart,
    updateCustomOptions,
  };
};
