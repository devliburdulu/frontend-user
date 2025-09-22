// "use client";
// import { useState, useCallback } from "react";
// import { styled } from "@mui/material/styles";

// import Tab from "@mui/material/Tab";
// import Tabs from "@mui/material/Tabs";
// import Container from "@mui/material/Container";

// import Iconify from "src/components/iconify";

// import ProfileAccount from "./profile-account";
// import ProfileSecurity from "./profile-security";
// import ProfileBank from "./profile-bank";
// import { useAuthContext } from "src/auth/hooks";

// const TABS = [
//   {
//     value: "account",
//     label: "My Account",
//     icon: <Iconify icon="solar:user-id-bold" width={24} />,
//   },
//   {
//     value: "security",
//     label: "Security",
//     icon: <Iconify icon="solar:bill-list-bold" width={24} />,
//   },
//   {
//     value: "rekening",
//     label: "Bank Account",
//     icon: <Iconify icon="mingcute:bank-card-fill" width={24} />,
//   },
// ];

// // Create a custom styled Tab component
// const CustomTab = styled(Tab)(({ theme }) => ({
//   color: `${theme.palette.grey[200]}`,
//   "&.Mui-selected": {
//     color: "#1D9CAB",
//   },
// }));

// export default function ProfileDetails() {
//   const [currentTab, setCurrentTab] = useState("account");

//   const { user } = useAuthContext();

//

//   const handleChangeTab = useCallback((event, newValue) => {
//     setCurrentTab(newValue);
//   }, []);

//   return (
//     <div>
//       <Tabs
//         value={currentTab}
//         onChange={handleChangeTab}
//         sx={{
//           mb: { xs: 2, md: 3 },
//           "& .MuiTabs-indicator": {
//             backgroundColor: "#1D9CAB", // Custom indicator color
//           },
//         }}
//       >
//         {TABS.map((tab) => (
//           <CustomTab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
//         ))}
//       </Tabs>

//       {currentTab === "account" && <ProfileAccount />}
//       {currentTab === "security" && <ProfileSecurity />}
//       {currentTab === "rekening" && <ProfileBank />}
//       {/* {currentTab === "history" && <ProfileHistory />} */}
//     </div>
//   );
// }

"use client";
import { useState, useCallback, useMemo } from "react";
import { styled } from "@mui/material/styles";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Container from "@mui/material/Container";

import Iconify from "src/components/iconify";

import ProfileAccount from "./profile-account";
import ProfileSecurity from "./profile-security";
import ProfileBank from "./profile-bank";
import { useAuthContext } from "src/auth/hooks";

// Create a custom styled Tab component
const CustomTab = styled(Tab)(({ theme }) => ({
  color: `${theme.palette.grey[200]}`,
  "&.Mui-selected": {
    color: "#1D9CAB",
  },
}));

export default function ProfileDetails() {
  const { user } = useAuthContext();

  // Use useMemo to determine which tabs to show based on user data
  const TABS = useMemo(() => {
    // Default tabs array
    const defaultTabs = [
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
      {
        value: "rekening",
        label: "Bank Account",
        icon: <Iconify icon="mingcute:bank-card-fill" width={24} />,
      },
    ];

    // Check if user exists and has custom_attributes
    if (user && user.custom_attributes) {
      // Find the social_login_provider attribute
      const socialLoginProvider = user.custom_attributes.find((attr) => attr.attribute_code === "social_login_provider");

      // If the provider is Google, filter out the security tab
      if (socialLoginProvider && socialLoginProvider.value === "google") {
        return defaultTabs.filter((tab) => tab.value !== "security");
      }
    }

    // If no conditions are met, return all tabs
    return defaultTabs;
  }, [user]);

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
          mb: { xs: 2, md: 3 },
          "& .MuiTabs-indicator": {
            backgroundColor: "#1D9CAB", // Custom indicator color
          },
        }}
      >
        {TABS.map((tab) => (
          <CustomTab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>

      {currentTab === "account" && <ProfileAccount />}
      {currentTab === "security" && <ProfileSecurity />}
      {currentTab === "rekening" && <ProfileBank />}
    </div>
  );
}
