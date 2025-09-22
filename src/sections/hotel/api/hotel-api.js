import axios from "axios";
import { MAGENTO_API, MAGENTO_FORWARD_API, MAGENTO_STAGINGFORWARD_API, CMS_SELLER_URL } from "src/config-global";

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

export const getHotels = async (isoID, city, checkin, checkout, totalRoom, totalGuest, minPrice, maxPrice, hotelName, sort, sortBy, starRating, page) => {
  try {
 
    isoID = "ID";

    let url = `/get-hotel-opsigo?isoCountry=${isoID}
      &limit=9
      &city=${city}
      &checkInDate=${checkin}
      &checkOutDate=${checkout}
      &totalRoom=${totalRoom}
      &totalGuest=${totalGuest}
      &minPrice=${minPrice}
      &maxPrice=${maxPrice}
      &hotelName=${hotelName}
      &sort=${sort}
      &sortBy=${sortBy}
      &page=${page}
      `;

    if (starRating) {
      url += `&starRating=${starRating}`;
    }

    // &starRating=${starRating}

    const res = await API_FORWARD.get(url);

    //
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

export const searchHotelDetail = async (city, checkin, checkout, totalRoom, totalGuest, hotelName) => {
  try {
    let url = `/get-hotel-opsigo?isoCountry=ID
      &city=${city}
      &checkInDate=${checkin}
      &checkOutDate=${checkout}
      &totalRoom=${totalRoom}
      &totalGuest=${totalGuest}
      &hotelName=${hotelName}
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
