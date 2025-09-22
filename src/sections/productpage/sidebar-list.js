import { useEffect, useMemo, useState } from 'react';

import { paths } from 'src/routes/paths';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { getCategory } from 'src/fetch-global';

// ----------------------------------------------------------------------

export function useNavData() {
  const [sidebar, setSidebar] = useState([]);
  const [dataSidebar, setDataSidebar] = useState();

  // useEffect(() => {
  const fetchDataCategory = async () => {
    try {
      const result = await getCategory();

      const newSidebarItems = result.children_data
        .filter((item) => item.is_active)
        .map((item) => ({
          title: item.name,
          path: paths.product.root,
          id: item.id,
          // children: [
          //   { title: 'Barber Shop 1', path: paths.product.root, id: 11 },
          //   { title: 'Barber Shop 2', path: paths.product.root, id: 12 },
          //   { title: 'Barber Shop 3', path: paths.product.root, id: 13 },
          //   { title: 'Barber Shop 4', path: paths.product.root, id: 14 },
          //   { title: 'Barber Shop 5', path: paths.product.root, id: 15 },
          // ],
        }));
      setSidebar(newSidebarItems);
      //
    } catch (error) {
      console.error(error);
    }
  };
  fetchDataCategory();
  // coba = dataSidebar.map(item => {
  //   setSidebar([...sidebar, {
  //     title: item.name,
  //     path: paths.product.root,
  //     id: item.id,
  //     // children: [
  //     //   { title: ('Barber Shop 1'), path: paths.product.root, id: 11 },
  //     //   { title: ('Barber Shop 2'), path: paths.product.root, id: 12 },
  //     //   { title: ('Barber Shop 3'), path: paths.product.root, id: 13 },
  //     //   { title: ('Barber Shop 4'), path: paths.product.root, id: 14 },
  //     //   { title: ('Barber Shop 5'), path: paths.product.root, id: 15 },
  //     // ],
  //   }]);
  // });

  // });

  const data = [
    {
      subheader: 'Category',
      items: sidebar,
    },
  ];

  return data;
}
