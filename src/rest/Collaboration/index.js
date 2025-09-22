import { APICMS } from 'src/fetch-global';

export const getCollaboration = async () => {
  try {
    const res = await APICMS.get('/curaweda?populate=*');
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};
