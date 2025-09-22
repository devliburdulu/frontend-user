import { APIFORWARD, APISTAGINGFORWARD } from 'src/fetch-global';
import { MAGENTO_API } from 'src/config-global';

export const paymentRequest = async (token, body) => {
  try {
    const res = await APISTAGINGFORWARD.post(`/place-order`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    //
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getPaymentMethod = async (token) => {
  try {
    const res = await APIFORWARD.get(`/api/v1/cart/payment`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log('Cek Data Respon: ', res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCartCheckout = async (token) => {
  try {
    const res = await APIFORWARD.get(`/api/v1/cart/checkout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message; // Mengembalikan pesan kesalahan yang spesifik
    } else {
      console.error('Terjadi kesalahan yang tidak terduga', error);
      return 'Terjadi kesalahan yang tidak terduga'; // Pesan kesalahan default
    }
  }
};

export const getCartMagento = async (token) => {
  const curdata = {
    url: `${MAGENTO_API}/carts/mine`,
    token: token,
  };

  try {
    const res = await APIFORWARD.post(`/custom-magento-get`, curdata);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

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

export const getTotalsCart = async (token) => {
  const curdata = {
    url: `${MAGENTO_API}/carts/mine/totals`,
    token: token,
  };
  try {
    const res = await APIFORWARD.post(`/custom-magento-get`, curdata);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const addVoucher = async (token, kupon) => {
  const curdata = {
    url: `${MAGENTO_API}/carts/mine/coupons/${kupon}`,
    token: token,
  };
  try {
    const res = await APIFORWARD.post(`/custom-magento-put`, curdata);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteVoucher = async (token) => {
  const curdata = {
    url: `${MAGENTO_API}/carts/mine/coupons`,
    token: token,
  };
  try {
    const res = await APIFORWARD.post(`/custom-magento-delete`, curdata);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const addPoint = async (token, point) => {
  const curdata = {
    token: token,
  };
  try {
    const res = await APIFORWARD.post(`/cart/point/${point}`, curdata);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deletePoint = async (token) => {
  const curdata = {
    token: token,
  };
  try {
    const res = await APIFORWARD.post(`/cart/point/remove`, curdata);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
