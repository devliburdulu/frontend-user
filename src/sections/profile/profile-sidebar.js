'use client';

import { useState, useCallback } from 'react';
import Stack from '@mui/material/Stack';
import Iconify from 'src/components/iconify';
import NavSectionVertical from './vertical/nav-section-vertical';

const defaultConfig = {
  gap: 4,
  icon: 24,
  currentRole: 'admin',
  rootItemHeight: 44,
  subItemHeight: 36,
  padding: '4px 8px 4px 12px',
  radius: 8,
  hiddenLabel: false,
  hiddenSubheader: false,
};

export default function ProfileSidebar({ filter, setFilter }) {
  const NAV_ITEMS = [
    {
      // subheader: "Account",
      items: [
        {
          title: 'Akun Saya',
          path: '/profile',
          icon: <Iconify icon='hugeicons:user-account' width={1} />,
        },
        {
          title: 'Pesanan Saya',
          path: '/profile/my-order',
          icon: <Iconify icon='solar:cart-3-linear' width={1} />,
        },
        {
          title: 'Poin Saya',
          path: '/profile/my-reward',
          icon: <Iconify icon='clarity:coin-bag-line' width={1} />,
          // roles: ["admin", "user"],
        },
      ],
    },
  ];

  const [config, setConfig] = useState(defaultConfig);

  // const handleChangeConfig = useCallback((name, value) => {
  //   setConfig((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // }, []);

  // const handleReset = useCallback(() => {
  //   setConfig(defaultConfig);
  // }, []);

  const renderNavVertical = (
    <Stack spacing={2}>
      <NavSectionVertical
        data={NAV_ITEMS}
        filter={filter}
        setFilter={setFilter}
        sx={{
          py: 2,
          borderRadius: 2,
          bgcolor: 'background.paper',
          // boxShadow: (theme) => theme.customShadows.z20,
          boxShadow: 2,
        }}
        slotProps={{
          gap: config.gap,
          currentRole: config.currentRole,
          rootItem: {
            padding: config.padding,
            minHeight: config.rootItemHeight,
            borderRadius: `${config.radius}px`,
            '& .icon, .sub-icon': {
              width: config.icon,
              height: config.icon,
              ...(!config.icon && { display: 'none' }),
            },
            ...(config.hiddenLabel && {
              '& .label, .caption': {
                display: 'none',
              },
            }),
          },
          subItem: {
            padding: config.padding,
            minHeight: config.subItemHeight,
            borderRadius: `${config.radius}px`,
            '& .icon, .sub-icon': {
              width: config.icon,
              height: config.icon,
              ...(!config.icon && { display: 'none' }),
            },
            ...(config.hiddenLabel && {
              '& .label, .caption': {
                display: 'none',
              },
            }),
          },
          subheader: {
            ...(config.hiddenSubheader && {
              display: 'none',
            }),
          },
        }}
      />
    </Stack>
  );

  return <>{renderNavVertical}</>;
}
