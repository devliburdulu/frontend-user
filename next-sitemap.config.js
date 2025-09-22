/** @type {import('next-sitemap').IConfig} */
const { listMitra } = require('./src/sections/mitra/list-mitra');
const axios = require('axios');

// ✅ Helper function to format date
// function formatDate(date) {
//   const d = new Date(date);
//   const pad = (n) => n.toString().padStart(2, '0');
//   return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
//     d.getHours()
//   )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
// }

function formatDate(date) {
  return new Date(date).toISOString();
}

async function getPromoUrls() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CMS_SELLER_CENTER}/promos`
    );

    console.log('[PROMO DATA]', res.data.data);
    console.log(
      '[PROMO URL]',
      `${process.env.NEXT_PUBLIC_CMS_SELLER_CENTER}/promos`
    );
    const promos = res.data.data;

    return promos
      .filter((promo) => promo?.url)
      .map((promo) => ({
        loc: `/promo/${promo.url}`,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: formatDate(promo.createdAt || new Date()),
      }));
  } catch (err) {
    console.error('Error fetching promo URLs:', err.message);
    return [];
  }
}

async function getProductUrls() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_MAGENTO_API}/rest/V1/products`,
      {
        params: {
          'searchCriteria[pageSize]': 100,
          'searchCriteria[filterGroups][0][filters][0][field]': 'status',
          'searchCriteria[filterGroups][0][filters][0][value]': '1',
          'searchCriteria[filterGroups][0][filters][0][conditionType]': 'eq',
          'searchCriteria[filterGroups][5][filters][0][field]': 'visibility',
          'searchCriteria[filterGroups][5][filters][0][value]': '1',
          'searchCriteria[filterGroups][5][filters][0][conditionType]': 'neq',
          'searchCriteria[filterGroups][6][filters][0][field]': 'visibility',
          'searchCriteria[filterGroups][6][filters][0][value]': '3',
          'searchCriteria[filterGroups][6][filters][0][conditionType]': 'neq',
          'searchCriteria[filterGroups][8][filters][0][field]': 'is_approve',
          'searchCriteria[filterGroups][8][filters][0][value]': '0',
          'searchCriteria[filterGroups][8][filters][0][conditionType]': 'neq',
          'searchCriteria[sortOrders][0][field]': 'created_at',
          'searchCriteria[sortOrders][0][direction]': 'DESC',
        },
        headers: {
          Authorization: `Bearer ${process.env.NEXT_MAGENTO_TOKEN}`,
        },
      }
    );

    const products = res.data.items;
    return products
      .filter((item) => item?.sku)
      .map((item) => ({
        loc: `/products/${item.sku}`,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: formatDate(item.created_at || new Date()),
      }));
  } catch (err) {
    console.error('Error fetching Products URLs:', err.message);
    return [];
  }
}

module.exports = {
  siteUrl: `${process.env.NEXT_PUBLIC_BASE_URL}` || 'http://localhost:3000',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: [
    '/admin/*',
    '/category',
    '/homepage',
    '/promo/Beli-2-gratis-2',
    '/promo/diskon-22-persen',
    '/promo/promo-liburan-tinggal-gas',
    '/promo/promo-gas-miracle-hotel',
    '/promo/flash-sale',
    '/promo/promo-open-trip-pulau-seribu',
    '/checkout/confirm-payment-failed',
    '/checkout/confirm-payments',
    '/checkout/confirmation-payments',
    '/mitraProfile',
    '/error/404',
    '/error/403',
    '/error/500',
    '/greetings/register',
    '/greetings/trip',
    '/auth/google/callback',
  ],
  async additionalPaths(config) {
    const mitraPaths = listMitra
      .filter((item) => item.shop_url)
      .map((item) => ({
        loc: `/${item.shop_url}`,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: formatDate(item.updated_at || new Date()),
      }));

    const promoPaths = await getPromoUrls();
    const productPaths = await getProductUrls();

    return [...mitraPaths, ...promoPaths, ...productPaths];
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '',
      },
    ],
    additionalSitemaps: ['https://liburdulu.id/sitemap.xml'],
  },
};
