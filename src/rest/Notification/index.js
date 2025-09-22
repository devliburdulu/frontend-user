import { APICMS } from 'src/fetch-global';

export const getNotifications = async () => {
  try {
    const res = await APICMS.get('/notifications?populate=*');
    console.log('Data Notif:', res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};
