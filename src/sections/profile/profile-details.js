"use client";
import { useState, useCallback } from "react";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import Iconify from "src/components/iconify";

import ProfileAccount from "./profile-account";
import ProfileSecurity from "./profile-security";

const TABS = [
  {
    value: "account",
    label: "My Account",
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: "security",
    label: "Security",
    icon: <Iconify icon="solar:bill-list-bold" width={24} />,
  },
  // {
  //   value: "history",
  //   label: "My History",
  //   icon: <Iconify icon="solar:bell-bing-bold" width={24} />,
  // },
];

export default function ProfileDetails() {
  const [currentTab, setCurrentTab] = useState("account");

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <div>
      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {TABS.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            icon={tab.icon}
            value={tab.value}
          />
        ))}
      </Tabs>

      {currentTab === "account" && <ProfileAccount />}
      {currentTab === "security" && <ProfileSecurity />}
      {/* {currentTab === "history" && <ProfileHistory />} */}
    </div>
  );
}
