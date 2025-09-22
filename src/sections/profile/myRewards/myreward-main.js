"use client";

import { Container } from "@mui/system";
import MyRewardKeuntungan from "./myreward-keuntungan";
import MyRewardMengumpulkan from "./myreward-mengumpulkan";
import MyRewardListKeuntungan from "./myreward-listkeuntungan";
import ProfileSidebar from "../profile-sidebar";

export default function MyRewardMain() {
  return (
    <Container
      sx={{
        mt: 5,
        mb: 15,
      }}
    >
      <div className="grid grid-cols-4 mt-5 gap-5">
        <div className="hidden lg:block">
          <ProfileSidebar />
        </div>

        <div className="lg:col-span-3 col-span-4">
          <div className="flex flex-col gap-3">
            <MyRewardKeuntungan />
            {/* <MyRewardMengumpulkan /> */}
            <MyRewardListKeuntungan />
          </div>
        </div>
      </div>
    </Container>
  );
}
