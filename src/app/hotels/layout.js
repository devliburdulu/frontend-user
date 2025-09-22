'use client';

import PropTypes from 'prop-types';
import MainLayout from 'src/layouts/main';
import { FilterProvider } from 'src/sections/hotels/context/search-context';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <FilterProvider>
      <MainLayout>{children}</MainLayout>
    </FilterProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
