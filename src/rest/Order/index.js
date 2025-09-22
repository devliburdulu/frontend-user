import { APIFORWARD, API } from 'src/fetch-global';
import { MAGENTO_API } from 'src/config-global';

export const getDetailOrder = async (id, token) => {
  try {
    const res = await APIFORWARD.get(`get-order-detail/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.error('Error fetching detail order:', error);
    throw error;
  }
};

export const getOptionsOrder = async (id, token) => {
  try {
    const res = await API.get(`/liburdulu/order/${id}/options`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res && res.data && typeof res.data === 'string') {
      try {
        const parsedData = JSON.parse(res.data);
        if (
          parsedData &&
          typeof parsedData === 'object' &&
          Object.keys(parsedData).length > 0
        ) {
          const innerData = Object.values(parsedData)[0];

          if (
            innerData &&
            typeof innerData === 'object' &&
            Array.isArray(innerData.options)
          ) {
            return innerData;
          } else {
            console.warn(
              'Parsed data does not contain a valid "options" array:',
              innerData
            );
            return { options: [] };
          }
        } else {
          console.warn('Parsed JSON is empty or not an object:', parsedData);
          return { options: [] };
        }
      } catch (parseError) {
        console.error(
          'Failed to parse JSON response from getOptionsOrder:',
          parseError,
          res.data
        );
        return { options: [] };
      }
    } else {
      console.warn(
        'Unexpected or missing data in getOptionsOrder response:',
        res?.data
      );
      if (
        res &&
        res.data &&
        typeof res.data === 'object' &&
        Object.keys(res.data).length > 0
      ) {
        const innerData = Object.values(res.data)[0];
        if (
          innerData &&
          typeof innerData === 'object' &&
          Array.isArray(innerData.options)
        ) {
          console.log('Processed pre-parsed options:', innerData);
          return innerData;
        }
      }
      return { options: [] };
    }
  } catch (error) {
    console.error('API call failed for getOptionsOrder:', error);
    return { options: [] };
  }
};
