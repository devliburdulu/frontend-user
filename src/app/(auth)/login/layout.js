'use client';

import PropTypes from 'prop-types';

import { GuestGuard } from 'src/auth/guard';
import AuthClassicLayout from 'src/layouts/auth/classic';
import MainLayout from 'src/layouts/main';
import { bgGradient } from 'src/theme/css';
// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <GuestGuard>
      <MainLayout>
        <AuthClassicLayout>{children}</AuthClassicLayout>
      </MainLayout>
    </GuestGuard>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
