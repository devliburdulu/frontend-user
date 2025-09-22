import { paths } from "src/routes/paths";
import { PATH_AFTER_LOGIN } from "src/config-global";
import Iconify from "src/components/iconify";

export const navConfig = [
  {
    id: 41,
    title: 'Paket Wisata',
    // path: paths.product.root,
    path: '/products/paket-wisata',
  },
  {
    id: 44,
    title: "Hotel",
    path: paths.hotel,
  },
  {
    id: 45,
    title: 'Villa',
    // path: paths.product.root,
    path: '/products/villa',
  },
  {
    id: 47,
    title: 'Transportasi',
    // path: paths.product.root,
    path: '/products/transportasi',
  },
  {
    id: 46,
    title: 'Objek Wisata',
    // path: paths.product.root,
    path: '/products/objek-wisata',
  },
  {
    id: 48,
    title: 'Relaksasi',
    // path: paths.product.root,
    path: '/products/relaksasi',
  },
  // {
  //   id: 49,
  //   title: "Request Trip",
  //   path: "/request/trip",
  // },
  // {
  //   title: "Group Trip",
  //   icon: <Iconify icon="solar:home-2-bold-duotone" />,
  //   path: paths.product.root,
  // },
  // {
  //   title: "Pages",
  //   path: "/pages",
  //   icon: <Iconify icon="solar:file-bold-duotone" />,
  //   children: [
  //     {
  //       subheader: "Other",
  //       items: [
  //         { title: "About us", path: paths.product.root },
  //         { title: "Contact us", path: paths.product.root },
  //         { title: "FAQs", path: paths.product.root },
  //         { title: "Pricing", path: paths.product.root },
  //         { title: "Payment", path: paths.product.root },
  //         { title: "Maintenance", path: paths.product.root },
  //         { title: "Coming Soon", path: paths.product.root },
  //       ],
  //     },
  //   ],
  // },
];
