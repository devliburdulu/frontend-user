import { APICMS } from 'src/fetch-global';

export const getHomePopup = async () => {
  try {
    const res = await APICMS.get('/popups?populate=*');
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};
