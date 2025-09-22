import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { usePathname } from 'src/routes/hooks';
import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import NavList from './nav-list';
import Iconify from 'src/components/iconify/iconify';

// ----------------------------------------------------------------------

export default function NavMobile({ data }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    if (openMenu) {
      handleCloseMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenMenu = useCallback(() => {
    setOpenMenu(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  return (
    <>
      <IconButton onClick={handleOpenMenu} sx={{ ml: 0.5, pr: 0 }}>
        <Iconify icon='ri:menu-3-fill' />
      </IconButton>

      <Drawer
        open={openMenu}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: {
            pb: 5,
            width: 260,
          },
        }}>
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          {data.map((list) => (
            <NavList key={list.title} data={list} />
          ))}
        </Scrollbar>
      </Drawer>
    </>
  );
}

NavMobile.propTypes = {
  data: PropTypes.array,
};
