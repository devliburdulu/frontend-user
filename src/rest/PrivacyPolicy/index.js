import { APICMS } from 'src/fetch-global';

export const getPrivacyPolicy = async () => {
  try {
    const res = await APICMS.get('/privacy-policy?populate=*');
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};
