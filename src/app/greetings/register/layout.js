"use client";

import PropTypes from "prop-types";

// import { GuestGuard } from "src/auth/guard";
// import AuthClassicLayout from "src/layouts/auth/classic";
import MainLayout from "src/layouts/main";
// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return <MainLayout>{children}</MainLayout>;
}

Layout.propTypes = {
  children: PropTypes.node,
};
