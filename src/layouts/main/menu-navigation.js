import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';

export const menuConfig = [
  {
    id: 44,
    title: 'Hotel',
    path: paths.hotel,
  },
  {
    title: 'Produk Lainnya',
    path: '/pages',
    children: [
      {
        // subheader: 'Other',
        items: [
          {
            id: 41,
            title: 'Paket Wisata',
            path: '/products/paket-wisata',
          },
          {
            id: 45,
            title: 'Villa',
            path: '/products/villa',
          },
          {
            id: 47,
            title: 'Transportasi',
            path: '/products/transportasi',
          },
          {
            id: 46,
            title: 'Objek Wisata',
            path: '/products/objek-wisata',
          },
          {
            id: 48,
            title: 'Relaksasi',
            path: '/products/relaksasi',
          },
        ],
      },
    ],
  },
];
