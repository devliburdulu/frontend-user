import { APICMS } from 'src/fetch-global';

export const getPromoEvent = async () => {
  try {
    const res = await APICMS.get('/event?populate=*');
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};
