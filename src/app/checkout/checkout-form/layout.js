'use client';

import PropTypes from 'prop-types';

import { AuthGuard } from 'src/auth/guard';
import CheckoutLayout from 'src/layouts/checkout';
// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <AuthGuard>
      <CheckoutLayout>{children}</CheckoutLayout>
    </AuthGuard>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
