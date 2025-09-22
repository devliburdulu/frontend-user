import { APICMS } from 'src/fetch-global';

export const getHomePromo = async () => {
  try {
    const res = await APICMS.get('/promos?populate=*');
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};
