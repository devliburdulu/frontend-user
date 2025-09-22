import { APIFORWARD } from 'src/fetch-global';

export const createPaymentXendit = async (TOKEN_USER, orderId) => {
  try {
    const payload = {
      order_id: orderId,
    };
    const res = await APIFORWARD.post(`/order/payment`, payload, {
      headers: {
        Authorization: `Bearer ${TOKEN_USER}`,
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error during API call:', error);
    throw error;
  }
};
