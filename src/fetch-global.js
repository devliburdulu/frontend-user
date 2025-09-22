import axios from "axios";
import { MAGENTO_API, MAGENTO_FORWARD_API, MAGENTO_STAGINGFORWARD_API, CMS_SELLER_URL } from "./config-global";
import { useAuthContext } from "src/auth/hooks";
import Cookies from "js-cookie";

// const TOKEN_USER

export const API = axios.create({
  baseURL: `${MAGENTO_API}`,
});

export const APIFORWARD = axios.create({
  baseURL: `${MAGENTO_FORWARD_API}`,
});

export const APISTAGINGFORWARD = axios.create({
  baseURL: `${MAGENTO_STAGINGFORWARD_API}`,
});

export const APICMS = axios.create({
  baseURL: `${CMS_SELLER_URL}`,
});

export const getProduct = async (page, perPage, filter) => {
  //
  var filterURL = "";
  // filterURL = filterURL + "searchCriteria[filterGroups][4][filters][0][field]=visibility&";
  // filterURL = filterURL + "searchCriteria[filterGroups][4][filters][0][value]=1&";
  // filterURL = filterURL + "searchCriteria[filterGroups][4][filters][0][conditionType]=eq&";

  // 1 GROUP 2 FILTER // tampilin visibility selain 1 dan 3 atau tampilkan yang 2 dan 4
  // filterURL =
  //     filterURL + "searchCriteria[filterGroups][4][filters][0][field]=status&";
  // filterURL =
  //     filterURL + "searchCriteria[filterGroups][4][filters][0][value]=1&";
  // filterURL =
  //     filterURL +
  //     "searchCriteria[filterGroups][4][filters][0][conditionType]=eq&";
  // filterURL =
  //     filterURL +
  //     "searchCriteria[filterGroups][4][filters][1][field]=visibility&";
  // filterURL =
  //     filterURL + "searchCriteria[filterGroups][4][filters][1][value]=1&";
  // filterURL =
  //     filterURL +
  //     "searchCriteria[filterGroups][4][filters][1][conditionType]=neq&";

  // 2 GROUP 2 FILTER
  filterURL = filterURL + "searchCriteria[filterGroups][4][filters][0][field]=status&";
  filterURL = filterURL + "searchCriteria[filterGroups][4][filters][0][value]=1&";
  filterURL = filterURL + "searchCriteria[filterGroups][4][filters][0][conditionType]=eq&";
  filterURL = filterURL + "searchCriteria[filterGroups][5][filters][0][field]=visibility&";
  filterURL = filterURL + "searchCriteria[filterGroups][5][filters][0][value]=1&";
  filterURL = filterURL + "searchCriteria[filterGroups][5][filters][0][conditionType]=neq&";
  filterURL = filterURL + "searchCriteria[filterGroups][6][filters][0][field]=visibility&";
  filterURL = filterURL + "searchCriteria[filterGroups][6][filters][0][value]=3&";
  filterURL = filterURL + "searchCriteria[filterGroups][6][filters][0][conditionType]=neq&";
  filterURL = filterURL + "searchCriteria[filterGroups][8][filters][0][field]=is_approve&";
  filterURL = filterURL + "searchCriteria[filterGroups][8][filters][0][value]=0&";
  filterURL = filterURL + "searchCriteria[filterGroups][8][filters][0][conditionType]=neq&";

  //
  if (filter.categoryId != 0 && !isNaN(filter.categoryId)) {
    filterURL = filterURL + "searchCriteria[filterGroups][0][filters][0][field]=category_id&";
    filterURL = filterURL + "searchCriteria[filterGroups][0][filters][0][value]=" + filter.categoryId + "&";
    filterURL = filterURL + "searchCriteria[filterGroups][0][filters][0][conditionType]=eq&";
  }
  if (filter.sellerId) {
    filterURL = filterURL + "searchCriteria[filterGroups][7][filters][0][field]=seller_id&";
    filterURL = filterURL + "searchCriteria[filterGroups][7][filters][0][value]=" + filter.sellerId + "&";
    filterURL = filterURL + "searchCriteria[filterGroups][7][filters][0][conditionType]=eq&";
  }
  if (filter.search != "" && filter.search != null) {
    filterURL = filterURL + "searchCriteria[filterGroups][1][filters][0][field]=name&";
    filterURL = filterURL + "searchCriteria[filterGroups][1][filters][0][value]=%" + filter.search + "%&";
    filterURL = filterURL + "searchCriteria[filterGroups][1][filters][0][conditionType]=like&";

    filterURL = filterURL + "searchCriteria[filterGroups][1][filters][1][field]=name&";
    filterURL = filterURL + "searchCriteria[filterGroups][1][filters][1][value]=" + filter.search + "%&";
    filterURL = filterURL + "searchCriteria[filterGroups][1][filters][1][conditionType]=like&";

    filterURL = filterURL + "searchCriteria[filterGroups][1][filters][2][field]=name&";
    filterURL = filterURL + "searchCriteria[filterGroups][1][filters][2][value]=%" + filter.search + "&";
    filterURL = filterURL + "searchCriteria[filterGroups][1][filters][2][conditionType]=like&";
  }
  if (filter.maxPrice >= 0 && isNaN(filter.minPrice) && !isNaN(filter.maxPrice)) {
    filterURL = filterURL + "searchCriteria[filterGroups][2][filters][0][field]=harga_max&";
    filterURL = filterURL + "searchCriteria[filterGroups][2][filters][0][value]=" + filter.maxPrice + "&";
    filterURL = filterURL + "searchCriteria[filterGroups][2][filters][0][conditionType]=lt&";
  }
  if (isNaN(filter.maxPrice) && filter.minPrice >= 0 && !isNaN(filter.minPrice)) {
    filterURL = filterURL + "searchCriteria[filterGroups][3][filters][0][field]=harga_min&";
    filterURL = filterURL + "searchCriteria[filterGroups][3][filters][0][value]=" + filter.minPrice + "&";
    filterURL = filterURL + "searchCriteria[filterGroups][3][filters][0][conditionType]=gt&";
  }
  if (filter.maxPrice >= 0 && filter.minPrice >= 0 && !isNaN(filter.maxPrice) && !isNaN(filter.minPrice) && filter.maxPrice >= filter.minPrice) {
    filterURL = filterURL + "searchCriteria[filterGroups][2][filters][0][field]=harga_max&";
    filterURL = filterURL + "searchCriteria[filterGroups][2][filters][0][value]=" + filter.maxPrice + "&";
    filterURL = filterURL + "searchCriteria[filterGroups][2][filters][0][conditionType]=lt&";

    filterURL = filterURL + "searchCriteria[filterGroups][3][filters][0][field]=harga_min&";
    filterURL = filterURL + "searchCriteria[filterGroups][3][filters][0][value]=" + filter.minPrice + "&";
    filterURL = filterURL + "searchCriteria[filterGroups][3][filters][0][conditionType]=gt&";
  }
  // coilterURL);
  try {
    const res = await API.get(`/products?searchCriteria[pageSize]=${perPage}&searchCriteria[currentPage]=${page}&${filterURL}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
  // const curdata = {
  //     url: `${MAGENTO_API}/products?searchCriteria[pageSize]=${perPage}&searchCriteria[currentPage]=${page}&${filterURL}`,
  //     token: process.env.NEXT_PUBLIC_ACCESS_TOKEN
  // }

  // try {
  //     const res = await APIFORWARD.post(`/custom-magento-get`, curdata);
  //     return res.data;
  // } catch (error) {
  //     console.error(error);
  // }
};

export const getProductBySKU = async (sku) => {
  try {
    const res = await API.get(`/products/${sku}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductHotelBySKU = async (sku) => {
  try {
    const res = await APIFORWARD.get(`get-hotel-booking/${sku}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSaleableBySKU = async (sku) => {
  try {
    const res = await API.get(`/stockStatuses/${sku}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductChildren = async (sku) => {
  // comasuk sini nih");
  try {
    const res = await API.get(`/configurable-products/${sku}/children`);
    // conssuk sini nih", res);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getListConfigurableOption = async (id) => {
  try {
    const res = await API.get(`/products/attributes/${id}/options`);
    // conssuk sini nih", res);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductChildrenHotel = async (id) => {
  // comasuk sini nih");
  try {
    const res = await APIFORWARD.get(`/get-hotel-product/${id}`);
    // conssuk sini nih", res);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductHotelDetail = async (sku, start, end) => {
  // comasuk sini nih");
  try {
    const res = await API.get(`/products/${sku}?start_date=${start}&end_date=${end}`);
    // conssuk sini nih", res);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSellerBySKU = async (sku) => {
  // comasuk sini oi ");
  try {
    const res = await API.get(`/mpapi/sellers/sellerbyproduct/${sku}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSellerReview = async (id, size, page) => {
  // comasuk sini oi ");
  try {
    const res = await API.get(`mpapi/sellers/${id}/reviews?pageSize=${size}&currentPage=${page}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductSellerByIdSeller = async (id) => {
  const curdata = {
    url: `${MAGENTO_API}/mpapi/admin/sellers/${id}/product`,
    token: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  };
  try {
    const res = await APIFORWARD.post(`/custom-magento-get`, curdata);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getDetailProductSeller = async (page, perPage, filter, sku) => {
  // comasuk masuk masuk");
  var filterURL = "";
  for (let index = 0; index < sku.length; index++) {
    // cons[index]);
    filterURL = filterURL + "searchCriteria[filterGroups][7][filters][" + index + "][field]=sku&";
    filterURL = filterURL + "searchCriteria[filterGroups][7][filters][" + index + "][value]=" + sku[index] + "&";
    filterURL = filterURL + "searchCriteria[filterGroups][7][filters][" + index + "][conditionType]=eq&";
  }

  // coilterURL);

  // 2 GROUP 2 FILTER
  filterURL = filterURL + "searchCriteria[filterGroups][4][filters][0][field]=status&";
  filterURL = filterURL + "searchCriteria[filterGroups][4][filters][0][value]=1&";
  filterURL = filterURL + "searchCriteria[filterGroups][4][filters][0][conditionType]=eq&";
  filterURL = filterURL + "searchCriteria[filterGroups][5][filters][0][field]=visibility&";
  filterURL = filterURL + "searchCriteria[filterGroups][5][filters][0][value]=1&";
  filterURL = filterURL + "searchCriteria[filterGroups][5][filters][0][conditionType]=neq&";
  filterURL = filterURL + "searchCriteria[filterGroups][6][filters][0][field]=visibility&";
  filterURL = filterURL + "searchCriteria[filterGroups][6][filters][0][value]=3&";
  filterURL = filterURL + "searchCriteria[filterGroups][6][filters][0][conditionType]=neq&";

  //
  if (filter.categoryId != 0 && !isNaN(filter.categoryId)) {
    filterURL = filterURL + "searchCriteria[filterGroups][0][filters][0][field]=category_id&";
    filterURL = filterURL + "searchCriteria[filterGroups][0][filters][0][value]=" + filter.categoryId + "&";
    filterURL = filterURL + "searchCriteria[filterGroups][0][filters][0][conditionType]=eq&";
  }
  if (filter.search != "" && filter.search != null) {
    filterURL = filterURL + "searchCriteria[filterGroups][1][filters][0][field]=name&";
    filterURL = filterURL + "searchCriteria[filterGroups][1][filters][0][value]=%" + filter.search + "%&";
    filterURL = filterURL + "searchCriteria[filterGroups][1][filters][0][conditionType]=like&";
  }
  if (filter.maxPrice >= 0 && isNaN(filter.minPrice) && !isNaN(filter.maxPrice)) {
    filterURL = filterURL + "searchCriteria[filterGroups][2][filters][0][field]=price&";
    filterURL = filterURL + "searchCriteria[filterGroups][2][filters][0][value]=" + filter.maxPrice + "&";
    filterURL = filterURL + "searchCriteria[filterGroups][2][filters][0][conditionType]=lt&";
  }
  if (isNaN(filter.maxPrice) && filter.minPrice >= 0 && !isNaN(filter.minPrice)) {
    filterURL = filterURL + "searchCriteria[filterGroups][3][filters][0][field]=price&";
    filterURL = filterURL + "searchCriteria[filterGroups][3][filters][0][value]=" + filter.minPrice + "&";
    filterURL = filterURL + "searchCriteria[filterGroups][3][filters][0][conditionType]=gt&";
  }
  if (filter.maxPrice >= 0 && filter.minPrice >= 0 && !isNaN(filter.maxPrice) && !isNaN(filter.minPrice) && filter.maxPrice >= filter.minPrice) {
    filterURL = filterURL + "searchCriteria[filterGroups][2][filters][0][field]=price&";
    filterURL = filterURL + "searchCriteria[filterGroups][2][filters][0][value]=" + filter.maxPrice + "&";
    filterURL = filterURL + "searchCriteria[filterGroups][2][filters][0][conditionType]=lt&";

    filterURL = filterURL + "searchCriteria[filterGroups][3][filters][0][field]=price&";
    filterURL = filterURL + "searchCriteria[filterGroups][3][filters][0][value]=" + filter.minPrice + "&";
    filterURL = filterURL + "searchCriteria[filterGroups][3][filters][0][conditionType]=gt&";
  }

  try {
    const res = await API.get(`/products?searchCriteria[pageSize]=${perPage}&searchCriteria[currentPage]=${page}&${filterURL}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }

  // const curdata = {
  //     url: `${MAGENTO_API}/products?searchCriteria[pageSize]=${perPage}&searchCriteria[currentPage]=${page}&${filterURL}`,
  //     token: process.env.NEXT_PUBLIC_ACCESS_TOKEN
  // }

  // try {
  //     const res = await APIFORWARD.post(`/custom-magento-get`, curdata);
  //     return res.data;
  // } catch (error) {
  //     console.error(error);
  // }
};

export const getCategory = async () => {
  try {
    const res = await API.get(`/categories`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCategoryById = async (id) => {
  try {
    const res = await API.get(`/categories/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// export const uploadFile = async (file) => {
//   const formData = new FormData();
//   formData.append("file", file);

//   try {
//     const res = await API.post("/upload/media", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     (res);
//     return res;
//   } catch (error) {
//     (error);
//     throw error;
//   }
// };

// export const becomePartner = async (data) => {
//   try {
//     const res = await API.post(`mpapi/sellers/me/becomepartner`, data, {
//       headers: {
//         Authorization: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
//       },
//     });
//     (res);
//     return res;
//   } catch (error) {
//     (error);
//   }
// };

export const addToCart = async (data, token, options, id, type) => {
  // coata);
  const curdata = {
    url: `${MAGENTO_API}/carts/mine/items`,
    body: data,
    token: token,
    data: {
      product_id: id,
      product_type: type,
      custom_options: options,
    },
  };
  const makeCart = {
    url: `${MAGENTO_API}/carts/mine`,
    body: {
      cartItem: {
        sku: "",
        qty: 0,
        quote_id: "",
      },
    },
    token: token,
    data: {
      product_id: id,
      product_type: type,
      custom_options: options,
    },
  };
  //

  try {
    // let res;
    await APIFORWARD.post(`/custom-magento-post`, makeCart);
    // const res = await APIFORWARD.post(`/custom-magento-post`, makeCart).then(await APIFORWARD.post(`/custom-magento-post`, curdata));
    const res = await APIFORWARD.post(`/cart/product`, curdata);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCart = async (token) => {
  const curdata = {
    url: `${MAGENTO_API}/carts/mine`,
    token: token,
  };

  try {
    // const res = await APIFORWARD.post(`/custom-magento-get`, curdata);
    const res = await APIFORWARD.post(`/get-cart-dependecy`, curdata);
    // cons);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCartMagento = async (token) => {
  const curdata = {
    url: `${MAGENTO_API}/carts/mine`,
    token: token,
  };

  try {
    const res = await APIFORWARD.post(`/custom-magento-get`, curdata);
    //   const res = await APIFORWARD.post(`/get-cart-dependecy`, curdata);
    // cons);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const createCart = async (token) => {
  const curdata = {
    url: `${MAGENTO_API}/carts/mine`,
    body: {
      cartItem: {
        sku: "",
        qty: 0,
        quote_id: "",
      },
    },
    token: token,
  };
  try {
    const res = await APIFORWARD.post(`/custom-magento-post`, curdata);
    return res.data;
  } catch (error) {
    window.location.href("/");
    console.error(error);
  }
};

export const getTotalsCart = async (token) => {
  const curdata = {
    url: `${MAGENTO_API}/carts/mine/totals`,
    token: token,
  };
  try {
    const res = await APIFORWARD.post(`/custom-magento-get`, curdata);
    // const res = await APIFORWARD.post(`/get-cart-dependecy`, curdata);
    // cons);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const addVoucher = async (token, kupon) => {
  const curdata = {
    url: `${MAGENTO_API}/carts/mine/coupons/${kupon}`,
    token: token,
  };
  try {
    const res = await APIFORWARD.post(`/custom-magento-put`, curdata);
    // const res = await API.put(`/carts/mine/coupons/${kupon}`, {
    //   headers: {
    //     Authorization: token,
    //   },
    // });
    // cons);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteVoucher = async (token) => {
  const curdata = {
    url: `${MAGENTO_API}/carts/mine/coupons`,
    token: token,
  };
  try {
    const res = await APIFORWARD.post(`/custom-magento-delete`, curdata);
    // const res = await API.put(`/carts/mine/coupons/${kupon}`, {
    //   headers: {
    //     Authorization: token,
    //   },
    // });
    // cons);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const addPoint = async (token, point) => {
  const curdata = {
    token: token,
  };
  try {
    const res = await APIFORWARD.post(`/cart/point/${point}`, curdata);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deletePoint = async (token) => {
  const curdata = {
    token: token,
  };
  try {
    const res = await APIFORWARD.post(`/cart/point/remove`, curdata);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteItemCart = async (token, id) => {
  const curdata = {
    url: `${MAGENTO_API}/carts/mine/items/${id}`,
    token: token,
  };
  try {
    const res = await APIFORWARD.post(`/custom-magento-delete`, curdata);
    // const res = await API.delete(`/carts/mine/items/${id}`, {
    //     headers: {
    //         Authorization: token,
    //     },
    // });
    // cons);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAttributeDetail = async (attribute) => {
  const curdata = {
    url: `${MAGENTO_API}/products/attributes/${attribute}/options`,
    token: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  };
  try {
    const res = await APIFORWARD.post(`/custom-magento-get`, curdata);
    // cons," ",res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllReview = async (sku) => {
  // coku);
  const curdata = {
    url: `${MAGENTO_API}/products/${sku}/reviews`,
    token: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  };
  try {
    const res = await APIFORWARD.post(`/custom-magento-get`, curdata);
    // cons," ",res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const addReview = async (data) => {
  const body = {
    review: {
      title: "Ini Review",
      detail: "Ini review datails!",
      nickname: "Customer",
      customer_id: 5,
      ratings: [
        {
          rating_name: "Rating",
          value: 1,
        },
      ],
      review_entity: "product",
      review_status: 2,
      entity_pk_value: 2071,
    },
  };
  const curdata = {
    url: `${MAGENTO_API}/reviews`,
    body: data,
    token: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  };
  try {
    const res = await APIFORWARD.post(`/custom-magento-post`, curdata);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await API.post("/upload/media", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // cons);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const becomePartner = async (data, token) => {
  const curdata = {
    url: `${MAGENTO_API}/mpapi/sellers/me/becomepartner`,
    body: data,
    token: token,
  };

  try {
    const res = await APIFORWARD.post(`/custom-magento-post`, curdata);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getHomepageProduct = async (id) => {
  var filterURL = "";
  filterURL = filterURL + "searchCriteria[filterGroups][4][filters][0][field]=status&";
  filterURL = filterURL + "searchCriteria[filterGroups][4][filters][0][value]=1&";
  filterURL = filterURL + "searchCriteria[filterGroups][4][filters][0][conditionType]=eq&";
  filterURL = filterURL + "searchCriteria[filterGroups][5][filters][0][field]=visibility&";
  filterURL = filterURL + "searchCriteria[filterGroups][5][filters][0][value]=1&";
  filterURL = filterURL + "searchCriteria[filterGroups][5][filters][0][conditionType]=neq&";
  filterURL = filterURL + "searchCriteria[filterGroups][6][filters][0][field]=visibility&";
  filterURL = filterURL + "searchCriteria[filterGroups][6][filters][0][value]=3&";
  filterURL = filterURL + "searchCriteria[filterGroups][6][filters][0][conditionType]=neq&";
  try {
    const res = await API.get(`/products?searchCriteria[filterGroups][0][filters][0][field]=category_id&searchCriteria[filterGroups][0][filters][0][value]=55&${filterURL}`);
    return res.data.items;
  } catch (error) {
    console.error(error);
  }
};

export const updatePassword = async (currentPassword, newPassword, confirmNewPassword) => {
  try {
    const token = Cookies.get("accessToken");
    const res = await API.put(
      `/customers/me/password`,
      {
        currentPassword: currentPassword,
        newPassword: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Failed to update password:", error);
    throw error;
  }
};

export const updateProfileUser = async (id, data) => {
  const curdata = {
    url: `${MAGENTO_API}/orders?searchCriteria[filterGroups][0][filters][0][field]=customer_id&searchCriteria[filterGroups]	[0][filters][0][value]=${id}`,
    body: data,
    token: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  };

  try {
    const res = await APIFORWARD.post(`/custom-magento-put`, curdata);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateCustomer = async (id, body) => {
  try {
    const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
    const res = await API.put(`/customers/${id}`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    //

    return res.data;
  } catch (error) {
    //

    console.error(error);
  }
};

export const requestTrip = async (formData) => {
  try {
    const res = await APIFORWARD.post(`/api/v1/private-trip`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error requesting trip:", error);
    throw error;
  }
};

export const getPageOrder = async (id) => {
  const curdata = {
    // url: `${MAGENTO_API}/orders?searchCriteria[filterGroups][0][filters][0][field]=customer_id&searchCriteria[filterGroups][0][filters][0][value]=${id}`,
    url: `${MAGENTO_API}/orders?searchCriteria[filterGroups][0][filters][0][field]=customer_id&searchCriteria[filterGroups][0][filters][0][value]=${id}&searchCriteria[sortOrders][0][direction]=desc&searchCriteria[sortOrders][0][field]=created_at`,
    token: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  };

  try {
    const res = await APIFORWARD.post(`/custom-magento-get`, curdata);
    //

    return res.data.items;
  } catch (error) {
    console.error(error);
  }
};

export const checkoutForm = async (quote_id, data) => {
  try {
    const body = {
      data: [
        {
          quote_id: quote_id,
          ...data,
        },
      ],
    };

    const res = await APIFORWARD.post(`/checkout-fields`, body);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const paymentRequest = async (token, body) => {
  try {
    const res = await APISTAGINGFORWARD.post(`/place-order`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    //
    return res;
  } catch (error) {
    console.error(error);
  }
};

// GET ITEM CART USING MAGENTO ENDPOINT
export const getItemsCart = async (token) => {
  const curdata = {
    url: `${MAGENTO_API}/carts/mine`,
    token: token,
  };

  try {
    const res = await APIFORWARD.post(`/custom-magento-get`, curdata);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getRewardPoint = async () => {
  try {
    const token = Cookies.get("accessToken");
    const res = await APIFORWARD.get(`/get-customer-point`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Failed to get reward point:", error);
    throw error;
  }
};

export const getDetailOrder = async (id, token) => {
  try {
    const res = await APIFORWARD.get(`get-order-detail/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getBanners = async () => {
  try {
    const res = await APIFORWARD.get("api/banners");

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// REGISTER
export const registerUser = async (data, config) => {
  try {
    const res = await APISTAGINGFORWARD.post(`register-customer`, data, config);
    return res;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const createSellerMitra = async (data) => {
  try {
    const res = await API.post(`/mpapi/sellers/create`, data);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const createAffiliate = async (data) => {
  try {
    const config = {
      token: data,
    };
    const res = await APIFORWARD.post(`/api/v1/affiliate/register`, config, {
      headers: {
        Authorization: `Bearer ${data}`,
      },
    });
    console.log("Success create affiliate :", res);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPromoPage = async () => {
  try {
    const res = await APIFORWARD.get("/api-promos");
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPromoPageByUrl = async (url) => {
  try {
    const res = await APIFORWARD.get(`/api-promos/${url}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getListBank = async () => {
  try {
    const res = await APIFORWARD.get(`/v2/payouts`);

    //

    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getBankAccount = async (id) => {
  try {
    const res = await APIFORWARD.get(`/api/rekening/${id}`);

    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteBankAccount = async (id) => {
  try {
    const res = await APIFORWARD.delete(`/api/rekenings/${id}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const createBankAccount = async (data) => {
  try {
    const res = await APIFORWARD.post(`/api/rekenings`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSellerByShopUrl = async (id) => {
  try {
    const res = await API.get(`mpapi/sellers?searchCriteria[filter_groups][0][filters][0][field]=shop_url&searchCriteria[filter_groups][0][filters][0][value]=${id}`);

    return res.data.items[1];
  } catch (error) {
    console.error(error);
  }
};

export const getArticleByCategory = async (id) => {
  try {
    const res = await APICMS.get(`/articles?filters[category][id][$eq]=${id}&populate=*&sort=order:asc`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllArticleCategories = async () => {
  try {
    const res = await APICMS.get("/categories");

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSingleArticle = async (id) => {
  try {
    const res = await APICMS.get(`/articles?filters[id]=${id}&populate=*`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getInternationalProducts = async () => {
  try {
    var filterURL = "";
    filterURL = filterURL + "searchCriteria[filterGroups][4][filters][0][field]=status&";
    filterURL = filterURL + "searchCriteria[filterGroups][4][filters][0][value]=1&";
    filterURL = filterURL + "searchCriteria[filterGroups][4][filters][0][conditionType]=eq&";
    filterURL = filterURL + "searchCriteria[filterGroups][5][filters][0][field]=visibility&";
    filterURL = filterURL + "searchCriteria[filterGroups][5][filters][0][value]=1&";
    filterURL = filterURL + "searchCriteria[filterGroups][5][filters][0][conditionType]=neq&";
    filterURL = filterURL + "searchCriteria[filterGroups][6][filters][0][field]=visibility&";
    filterURL = filterURL + "searchCriteria[filterGroups][6][filters][0][value]=3&";
    filterURL = filterURL + "searchCriteria[filterGroups][6][filters][0][conditionType]=neq&";

    const res = await API.get(`/products?searchCriteria[filterGroups][0][filters][0][field]=category_id&searchCriteria[filterGroups][0][filters][0][value]=73&${filterURL}`);

    return res.data.items;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
