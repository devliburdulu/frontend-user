import { APICMS } from 'src/fetch-global';

export const getWomanOnWander = async () => {
  try {
    const res = await APICMS.get('/wow?populate=*');
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};
