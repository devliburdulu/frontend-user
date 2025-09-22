"use client";

import PropTypes from "prop-types";

import MainLayout from "src/layouts/main";
import AuthClassicLayout from "src/layouts/auth/classic";
import { GuestGuard } from "src/auth/guard";

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <GuestGuard>
      <MainLayout>
        <AuthClassicLayout title="Bekerja Secukupnya Liburan Sepuasnya">
          {children}
        </AuthClassicLayout>
      </MainLayout>
    </GuestGuard>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
