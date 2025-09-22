// import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { usePathname } from 'src/routes/hooks';
import Footer from './footer';
import Header from './header';
import { GoogleTagManager } from '@next/third-parties/google';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
export default function CheckoutLayout({ children }) {
  // const [cart, setCart] = useState({ items_count: 0, items: [] });
  const pathname = usePathname();
  const homePage = pathname === '/';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Header />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          ...(!homePage && {
            pt: { xs: 8, md: 10 },
          }),
        }}>
        {children}
        <GoogleTagManager gtmId={GTM_ID} />
      </Box>
      <Footer />
    </Box>
  );
}

CheckoutLayout.propTypes = {
  children: PropTypes.node,
};
