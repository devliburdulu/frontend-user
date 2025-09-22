import axios from "axios";

export default async function handler() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_MAGENTO_API}/rest/V1/products?searchCriteria[filterGroups][0][filters][0][field]=category_id&searchCriteria[filterGroups][0][filters][0][value]=43&searchCriteria[filterGroups][0][filters][0][conditionType]=eq&searchCriteria[filterGroups][1][filters][0][field]=name&searchCriteria[filterGroups][1][filters][0][value]=%Hotel%&searchCriteria[filterGroups][1][filters][0][conditionType]=like&searchCriteria[filterGroups][2][filters][0][field]=type_id&searchCriteria[filterGroups][2][filters][0][value]=virtual&searchCriteria[filterGroups][2][filters][0][conditionType]=eq&searchCriteria[pageSize]=10&searchCriteria[currentPage]=1&searchCriteria[sortOrders][0][field]=price&searchCriteria[sortOrders][0][direction]=ASC`
    );
    return res.data.items;
  } catch (error) {
    console.error(error);
  }
}
