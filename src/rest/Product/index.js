import { API } from 'src/fetch-global';

export const getProduct = async (page, perPage, filter) => {
  //
  var filterURL = '';
  // 2 GROUP 2 FILTER
  filterURL =
    filterURL + 'searchCriteria[filterGroups][4][filters][0][field]=status&';
  filterURL =
    filterURL + 'searchCriteria[filterGroups][4][filters][0][value]=1&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][4][filters][0][conditionType]=eq&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][5][filters][0][field]=visibility&';
  filterURL =
    filterURL + 'searchCriteria[filterGroups][5][filters][0][value]=1&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][5][filters][0][conditionType]=neq&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][6][filters][0][field]=visibility&';
  filterURL =
    filterURL + 'searchCriteria[filterGroups][6][filters][0][value]=3&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][6][filters][0][conditionType]=neq&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][8][filters][0][field]=is_approve&';
  filterURL =
    filterURL + 'searchCriteria[filterGroups][8][filters][0][value]=0&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][8][filters][0][conditionType]=neq&';
  filterURL = filterURL + 'searchCriteria[sortOrders][0][field]=created_at&';
  filterURL = filterURL + 'searchCriteria[sortOrders][0][direction]=DESC&';

  //
  if (filter.categoryId != 0 && !isNaN(filter.categoryId)) {
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][0][filters][0][field]=category_id&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][0][filters][0][value]=' +
      filter.categoryId +
      '&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][0][filters][0][conditionType]=eq&';
  }
  if (filter.sellerId) {
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][7][filters][0][field]=seller_id&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][7][filters][0][value]=' +
      filter.sellerId +
      '&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][7][filters][0][conditionType]=eq&';
  }
  if (filter.search != '' && filter.search != null) {
    filterURL =
      filterURL + 'searchCriteria[filterGroups][1][filters][0][field]=name&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][1][filters][0][value]=%25' +
      filter.search +
      '%25&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][1][filters][0][conditionType]=like&';

    filterURL =
      filterURL + 'searchCriteria[filterGroups][1][filters][1][field]=name&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][1][filters][1][value]=%25' +
      filter.search +
      '%25&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][1][filters][1][conditionType]=like&';

    filterURL =
      filterURL + 'searchCriteria[filterGroups][1][filters][2][field]=name&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][1][filters][2][value]=%25' +
      filter.search +
      '%25&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][1][filters][2][conditionType]=like&';
  }
  if (
    filter.maxPrice >= 0 &&
    isNaN(filter.minPrice) &&
    !isNaN(filter.maxPrice)
  ) {
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][2][filters][0][field]=harga_max&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][2][filters][0][value]=' +
      filter.maxPrice +
      '&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][2][filters][0][conditionType]=lt&';
  }
  if (
    isNaN(filter.maxPrice) &&
    filter.minPrice >= 0 &&
    !isNaN(filter.minPrice)
  ) {
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][3][filters][0][field]=harga_min&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][3][filters][0][value]=' +
      filter.minPrice +
      '&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][3][filters][0][conditionType]=gt&';
  }
  if (
    filter.maxPrice >= 0 &&
    filter.minPrice >= 0 &&
    !isNaN(filter.maxPrice) &&
    !isNaN(filter.minPrice) &&
    filter.maxPrice >= filter.minPrice
  ) {
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][2][filters][0][field]=harga_max&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][2][filters][0][value]=' +
      filter.maxPrice +
      '&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][2][filters][0][conditionType]=lt&';

    filterURL =
      filterURL +
      'searchCriteria[filterGroups][3][filters][0][field]=harga_min&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][3][filters][0][value]=' +
      filter.minPrice +
      '&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][3][filters][0][conditionType]=gt&';
  }
  try {
    const res = await API.get(
      `/products?searchCriteria[pageSize]=${perPage}&searchCriteria[currentPage]=${page}&${filterURL}`
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductByCat1 = async (page, perPage, filter) => {
  //
  var filterURL = '';
  // 2 GROUP 2 FILTER
  filterURL =
    filterURL + 'searchCriteria[filterGroups][4][filters][0][field]=status&';
  filterURL =
    filterURL + 'searchCriteria[filterGroups][4][filters][0][value]=1&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][4][filters][0][conditionType]=eq&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][5][filters][0][field]=visibility&';
  filterURL =
    filterURL + 'searchCriteria[filterGroups][5][filters][0][value]=1&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][5][filters][0][conditionType]=neq&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][6][filters][0][field]=visibility&';
  filterURL =
    filterURL + 'searchCriteria[filterGroups][6][filters][0][value]=3&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][6][filters][0][conditionType]=neq&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][8][filters][0][field]=is_approve&';
  filterURL =
    filterURL + 'searchCriteria[filterGroups][8][filters][0][value]=0&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][8][filters][0][conditionType]=neq&';
  filterURL = filterURL + 'searchCriteria[sortOrders][0][field]=created_at&';
  filterURL = filterURL + 'searchCriteria[sortOrders][0][direction]=DESC&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][0][filters][0][field]=category_id&';
  filterURL =
    filterURL + 'searchCriteria[filterGroups][0][filters][0][value]=41&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][0][filters][0][conditionType]=eq&';

  //
  if (filter.categoryId != 0 && !isNaN(filter.categoryId)) {
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][0][filters][0][field]=category_id&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][0][filters][0][value]=' +
      filter.categoryId +
      '&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][0][filters][0][conditionType]=eq&';
  }
  if (filter.sellerId) {
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][7][filters][0][field]=seller_id&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][7][filters][0][value]=' +
      filter.sellerId +
      '&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][7][filters][0][conditionType]=eq&';
  }
  if (filter.search != '' && filter.search != null) {
    filterURL =
      filterURL + 'searchCriteria[filterGroups][1][filters][0][field]=name&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][1][filters][0][value]=%25' +
      filter.search +
      '%25&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][1][filters][0][conditionType]=like&';

    filterURL =
      filterURL + 'searchCriteria[filterGroups][1][filters][1][field]=name&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][1][filters][1][value]=%25' +
      filter.search +
      '%25&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][1][filters][1][conditionType]=like&';

    filterURL =
      filterURL + 'searchCriteria[filterGroups][1][filters][2][field]=name&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][1][filters][2][value]=%25' +
      filter.search +
      '%25&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][1][filters][2][conditionType]=like&';
  }
  if (
    filter.maxPrice >= 0 &&
    isNaN(filter.minPrice) &&
    !isNaN(filter.maxPrice)
  ) {
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][2][filters][0][field]=harga_max&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][2][filters][0][value]=' +
      filter.maxPrice +
      '&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][2][filters][0][conditionType]=lt&';
  }
  if (
    isNaN(filter.maxPrice) &&
    filter.minPrice >= 0 &&
    !isNaN(filter.minPrice)
  ) {
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][3][filters][0][field]=harga_min&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][3][filters][0][value]=' +
      filter.minPrice +
      '&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][3][filters][0][conditionType]=gt&';
  }
  if (
    filter.maxPrice >= 0 &&
    filter.minPrice >= 0 &&
    !isNaN(filter.maxPrice) &&
    !isNaN(filter.minPrice) &&
    filter.maxPrice >= filter.minPrice
  ) {
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][2][filters][0][field]=harga_max&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][2][filters][0][value]=' +
      filter.maxPrice +
      '&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][2][filters][0][conditionType]=lt&';

    filterURL =
      filterURL +
      'searchCriteria[filterGroups][3][filters][0][field]=harga_min&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][3][filters][0][value]=' +
      filter.minPrice +
      '&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][3][filters][0][conditionType]=gt&';
  }
  try {
    const res = await API.get(
      `/products?searchCriteria[pageSize]=${perPage}&searchCriteria[currentPage]=${page}&${filterURL}`
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductCategoryHotel = async (page, perPage, filter) => {
  //
  var filterURL = '';
  // 2 GROUP 2 FILTER
  filterURL =
    filterURL + 'searchCriteria[filterGroups][4][filters][0][field]=status&';
  filterURL =
    filterURL + 'searchCriteria[filterGroups][4][filters][0][value]=1&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][4][filters][0][conditionType]=eq&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][5][filters][0][field]=visibility&';
  filterURL =
    filterURL + 'searchCriteria[filterGroups][5][filters][0][value]=1&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][5][filters][0][conditionType]=neq&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][6][filters][0][field]=visibility&';
  filterURL =
    filterURL + 'searchCriteria[filterGroups][6][filters][0][value]=3&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][6][filters][0][conditionType]=neq&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][8][filters][0][field]=is_approve&';
  filterURL =
    filterURL + 'searchCriteria[filterGroups][8][filters][0][value]=0&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][8][filters][0][conditionType]=neq&';
  filterURL = filterURL + 'searchCriteria[sortOrders][0][field]=created_at&';
  filterURL = filterURL + 'searchCriteria[sortOrders][0][direction]=DESC&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][0][filters][0][field]=category_id&';
  filterURL =
    filterURL + 'searchCriteria[filterGroups][0][filters][0][value]=44&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][0][filters][0][conditionType]=eq&';

  //
  if (filter.categoryId != 0 && !isNaN(filter.categoryId)) {
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][0][filters][0][field]=category_id&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][0][filters][0][value]=' +
      filter.categoryId +
      '&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][0][filters][0][conditionType]=eq&';
  }
  if (filter.sellerId) {
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][7][filters][0][field]=seller_id&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][7][filters][0][value]=' +
      filter.sellerId +
      '&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][7][filters][0][conditionType]=eq&';
  }
  if (filter.search != '' && filter.search != null) {
    filterURL =
      filterURL + 'searchCriteria[filterGroups][1][filters][0][field]=name&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][1][filters][0][value]=%25' +
      filter.search +
      '%25&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][1][filters][0][conditionType]=like&';

    filterURL =
      filterURL + 'searchCriteria[filterGroups][1][filters][1][field]=name&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][1][filters][1][value]=%25' +
      filter.search +
      '%25&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][1][filters][1][conditionType]=like&';

    filterURL =
      filterURL + 'searchCriteria[filterGroups][1][filters][2][field]=name&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][1][filters][2][value]=%25' +
      filter.search +
      '%25&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][1][filters][2][conditionType]=like&';
  }
  if (
    filter.maxPrice >= 0 &&
    isNaN(filter.minPrice) &&
    !isNaN(filter.maxPrice)
  ) {
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][2][filters][0][field]=harga_max&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][2][filters][0][value]=' +
      filter.maxPrice +
      '&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][2][filters][0][conditionType]=lt&';
  }
  if (
    isNaN(filter.maxPrice) &&
    filter.minPrice >= 0 &&
    !isNaN(filter.minPrice)
  ) {
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][3][filters][0][field]=harga_min&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][3][filters][0][value]=' +
      filter.minPrice +
      '&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][3][filters][0][conditionType]=gt&';
  }
  if (
    filter.maxPrice >= 0 &&
    filter.minPrice >= 0 &&
    !isNaN(filter.maxPrice) &&
    !isNaN(filter.minPrice) &&
    filter.maxPrice >= filter.minPrice
  ) {
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][2][filters][0][field]=harga_max&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][2][filters][0][value]=' +
      filter.maxPrice +
      '&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][2][filters][0][conditionType]=lt&';

    filterURL =
      filterURL +
      'searchCriteria[filterGroups][3][filters][0][field]=harga_min&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][3][filters][0][value]=' +
      filter.minPrice +
      '&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][3][filters][0][conditionType]=gt&';
  }
  try {
    const res = await API.get(
      `/products?searchCriteria[pageSize]=${perPage}&searchCriteria[currentPage]=${page}&${filterURL}`
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getFlahsaleProduct = async (categoryId) => {
  try {
    const res = await API.get(
      `/products?searchCriteria[filterGroups][0][filters][0][field]=category_id&searchCriteria[filterGroups][0][filters][0][value]=${categoryId}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductBySKU = async (sku) => {
  try {
    const res = await API.get(`/products/${sku}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductChildren = async (sku) => {
  try {
    const res = await API.get(`/configurable-products/${sku}/children`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductSearch = async (page, perPage, filter) => {
  var filterURL = '';
  filterURL =
    filterURL + 'searchCriteria[filterGroups][4][filters][0][field]=status&';
  filterURL =
    filterURL + 'searchCriteria[filterGroups][4][filters][0][value]=1&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][4][filters][0][conditionType]=eq&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][5][filters][0][field]=visibility&';
  filterURL =
    filterURL + 'searchCriteria[filterGroups][5][filters][0][value]=1&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][5][filters][0][conditionType]=neq&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][6][filters][0][field]=visibility&';
  filterURL =
    filterURL + 'searchCriteria[filterGroups][6][filters][0][value]=3&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][6][filters][0][conditionType]=neq&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][8][filters][0][field]=is_approve&';
  filterURL =
    filterURL + 'searchCriteria[filterGroups][8][filters][0][value]=0&';
  filterURL =
    filterURL +
    'searchCriteria[filterGroups][8][filters][0][conditionType]=neq&';
  filterURL = filterURL + 'searchCriteria[sortOrders][0][field]=created_at&';
  filterURL = filterURL + 'searchCriteria[sortOrders][0][direction]=DESC&';

  if (filter.search != '' && filter.search != null) {
    filterURL =
      filterURL + 'searchCriteria[filterGroups][1][filters][0][field]=name&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][1][filters][0][value]=%25' +
      filter.search +
      '%25&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][1][filters][0][conditionType]=like&';

    filterURL =
      filterURL + 'searchCriteria[filterGroups][1][filters][1][field]=sku&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][1][filters][1][value]=%25' +
      filter.search +
      '%25&';
    filterURL =
      filterURL +
      'searchCriteria[filterGroups][1][filters][1][conditionType]=like&';
  }
  try {
    const res = await API.get(
      `/products?searchCriteria[pageSize]=${perPage}&searchCriteria[currentPage]=${page}&${filterURL}`
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSellerBySKU = async (sku) => {
  try {
    const res = await API.get(`/mpapi/sellers/sellerbyproduct/${sku}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
