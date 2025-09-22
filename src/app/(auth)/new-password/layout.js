"use client";

import PropTypes from "prop-types";

import { GuestGuard } from "src/auth/guard";
import MainLayout from "src/layouts/main";

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <GuestGuard>
      <MainLayout>{children}</MainLayout>
    </GuestGuard>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
