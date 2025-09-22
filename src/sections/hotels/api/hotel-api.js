import axios from 'axios';
import { MAGENTO_FORWARD_API } from 'src/config-global';

export const API_FORWARD = axios.create({
  baseURL: `${MAGENTO_FORWARD_API}`,
});

export const getCities = async (query) => {
  try {
    const res = await API_FORWARD.get(`/get-cities-opsigo?keyword=${query}`);

    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPopularHotels = async (cityKey) => {
  try {
    // const body = {
    //   city: id,
    // };

    // const res = await API_FORWARD.post(`/hotel-popular`, body);
    const res = await API_FORWARD.get(`/hotel-popular?city=${cityKey}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getHotels = async (
  isoID,
  city,
  checkin,
  checkout,
  totalRoom,
  totalGuest,
  minPrice,
  maxPrice,
  hotelName,
  sortBy,
  starRating,
  page,
  correlationId
) => {
  try {
    isoID = 'ID';

    // Ensure sortBy has a default value
    const finalSortBy = sortBy || 'price_asc';

    let url = `/get-hotel-opsigo?isoCountry=${isoID}
      &city=${city}
      &checkInDate=${checkin}
      &checkOutDate=${checkout}
      &totalRoom=${totalRoom}
      &totalGuest=${totalGuest}
      &minPrice=${minPrice}
      &maxPrice=${maxPrice}
      &hotelName=${hotelName}
      &sortBy=${finalSortBy}
      &page=${page}
      `;

    if (starRating) {
      url += `&starRating=${starRating}`;
    }

    // Add correlationId for page 2 and onwards
    if (page > 1 && correlationId) {
      url += `&correlationId=${correlationId}`;
    }

    // &starRating=${starRating}
    const res = await API_FORWARD.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getDetailHotel = async (correlationId, hotelKey) => {
  try {
    const body = {
      correlationId: correlationId,
      hotelKey: hotelKey,
    };

    const res = await API_FORWARD.post(`get-detail-hotel-opsigo`, body);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const searchHotelDetail = async (
  city,
  checkin,
  checkout,
  totalRoom,
  totalGuest,
  hotelName
) => {
  try {
    let url = `/get-hotel-opsigo?isoCountry=ID
      &city=${city}
      &checkInDate=${checkin}
      &checkOutDate=${checkout}
      &totalRoom=${totalRoom}
      &totalGuest=${totalGuest}
      &hotelName=${hotelName}
      &sortBy=price_asc
      &page=1`;

    const res = await API_FORWARD.get(url);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const hotelConfirmation = async (body) => {
  try {
    const res = await API_FORWARD.post(`/get-hotel-confirm-opsigo`, body);
    //

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
