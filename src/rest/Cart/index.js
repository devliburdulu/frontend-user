import { APIFORWARD } from 'src/fetch-global';
import { MAGENTO_API } from 'src/config-global';
import Cookies from 'js-cookie';

export const addToCart = async (data, token, options, id, type) => {
  const curdata = {
    url: `${MAGENTO_API}/carts/mine/items`,
    body: data,
    token: token,
    data: {
      product_id: id,
      product_type: type,
      custom_options: options,
    },
  };
  const makeCart = {
    url: `${MAGENTO_API}/carts/mine`,
    body: {
      cartItem: {
        sku: '',
        qty: 0,
        quote_id: '',
      },
    },
    token: token,
    data: {
      product_id: id,
      product_type: type,
      custom_options: options,
    },
  };
  try {
    await APIFORWARD.post(`/custom-magento-post`, makeCart);
    const res = await APIFORWARD.post(`/api/v1/cart/me/items`, curdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const CreateBuyNow = async (data, token, options, id, type) => {
  const curdata = {
    url: `${MAGENTO_API}/carts/mine/items`,
    body: data,
    token: token,
    data: {
      product_id: id,
      product_type: type,
      custom_options: options,
    },
  };
  const makeCart = {
    url: `${MAGENTO_API}/carts/mine`,
    body: {
      cartItem: {
        sku: '',
        qty: 0,
        quote_id: '',
      },
    },
    token: token,
    data: {
      product_id: id,
      product_type: type,
      custom_options: options,
    },
  };

  try {
    await APIFORWARD.post(`/custom-magento-post`, makeCart);
    const res = await APIFORWARD.post(`/api/v1/cart/buynow`, curdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

let cachedCartData = null;
let cacheTimestamp = null;
const CACHE_EXPIRATION_TIME = 5 * 60 * 1000;

export const getCartForward = async () => {
  try {
    const token = Cookies.get('accessToken');

    if (
      cachedCartData &&
      cacheTimestamp &&
      Date.now() - cacheTimestamp < CACHE_EXPIRATION_TIME
    ) {
      return cachedCartData;
    }

    const res = await APIFORWARD.get(`/api/v1/cart/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    cachedCartData = res.data;
    cacheTimestamp = Date.now();

    return cachedCartData;
  } catch (error) {
    console.error('Error fetching cart data:', error);
    throw error;
  }
};

// export const getCartForward = async () => {
//   try {
//     const token = Cookies.get('accessToken');
//     const res = await APIFORWARD.get(`/api/v1/cart/me`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return res.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const getItemsCart = async (token) => {
//   try {
//     const res = await APIFORWARD.get(`/api/v1/cart/me`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return res;
//   } catch (error) {
//     console.error(error);
//   }
// };

export const createCart = async (token) => {
  const curdata = {
    url: `${MAGENTO_API}/carts/mine`,
    body: {
      cartItem: {
        sku: '',
        qty: 0,
        quote_id: '',
      },
    },
    token: token,
  };
  try {
    const res = await APIFORWARD.post(`/custom-magento-post`, curdata);
    return res.data;
  } catch (error) {
    window.location.href('/');
    console.error(error);
  }
};

export const deleteProduct = async (token, id) => {
  try {
    const res = await APIFORWARD.delete(`/api/v1/cart/me/items/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
