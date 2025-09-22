import { APICMS } from 'src/fetch-global';

export const getExclusivePartners = async () => {
  try {
    const res = await APICMS.get('/partners?populate=*');
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};
