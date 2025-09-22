"use client";

import PropTypes from "prop-types";
import { useState, useCallback } from "react";

import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { alpha } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import { useSettingsContext } from "src/components/settings";

import { paths } from "src/routes/paths";

import CustomBreadcrumbs from "src/components/custom-breadcrumbs";

import ProfileSidebar from "../profile-sidebar";
import ProfileDetails from "../myAccount/profile-details";
import MyOrderMain from "../myOrder/myorder-main";
import MyRewardMain from "../myRewards/myreward-main";

export default function ProfileView() {
  const settings = useSettingsContext();

//   const [filter, setFilter] = useState({
//     // categoryId: parseInt(localStorage.id),
//     menu: "My Rewards",
// });

  return (
    <Container
      maxWidth={settings.themeStretch ? false : "lg"}
      sx={{
        mt: 5,
        mb: 15,
      }}
    >
      <div className="mb-7">
        <CustomBreadcrumbs
          links={[
            {
              name: "Components",
              href: paths.components,
            },
            { name: "My Account" },
          ]}
        />
      </div>

      <div className="grid grid-cols-4 mt-5 gap-5">
        <div className="hidden lg:block">
          <ProfileSidebar />
        </div>

        <div className="lg:col-span-3 col-span-4">
          <ProfileDetails />
          {/* {filter.menu == "My Account" && <ProfileDetails />}
          {filter.menu == "My Orders" && <MyOrderMain />}
          {filter.menu == "My Rewards" && <MyRewardMain />}
          {filter.menu == "My Wishlist" && <ProfileDetails />} */}
        </div>
      </div>
    </Container>
  );
}
