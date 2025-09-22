import { APICMS } from 'src/fetch-global';

export const getPromoIndependent = async () => {
  try {
    const res = await APICMS.get('/independent?populate=*');
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};
