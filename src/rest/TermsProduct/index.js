import { APICMS } from 'src/fetch-global';

export const getTerms = async () => {
  try {
    const res = await APICMS.get('/terms-condition?populate=*');
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};
