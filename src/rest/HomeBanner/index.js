import { APICMS } from 'src/fetch-global';

export const getHomeBanners = async () => {
  try {
    const res = await APICMS.get('/home-banners?populate=*');
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};
