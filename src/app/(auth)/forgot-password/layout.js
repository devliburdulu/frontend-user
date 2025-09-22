"use client";

import PropTypes from "prop-types";

import { GuestGuard } from "src/auth/guard";
import AuthClassicLayout from "src/layouts/auth/classic";
import MainLayout from "src/layouts/main";
import CompactLayout from "src/layouts/compact";
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
