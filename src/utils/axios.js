import axios from "axios";

import { MAGENTO_API, MAGENTO_FORWARD_API } from "src/config-global";
// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: MAGENTO_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || "Something went wrong")
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  const res = await axiosInstance.get(url, { ...config });
  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: "/api/chat",
  kanban: "/api/kanban",
  calendar: "/api/calendar",
  auth: {
    me: "/customers/me",
    // login: '/api/auth/login',
    login: "/integration/customer/token",
    login_admin: "/integration/admin/token",
    register: "/customers",
    // register: "/register-customer",
    forgot: "/customers/password",
    new_password: "/customers/resetPassword",
  },
  mail: {
    list: "/api/mail/list",
    details: "/api/mail/details",
    labels: "/api/mail/labels",
  },
  post: {
    list: "/api/post/list",
    details: "/api/post/details",
    latest: "/api/post/latest",
    search: "/api/post/search",
  },
  product: {
    list: "/api/product/list",
    details: "/api/product/details",
    search: "/api/product/search",
  },
};
