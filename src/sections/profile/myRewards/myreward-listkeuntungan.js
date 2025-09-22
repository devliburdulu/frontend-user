"use client";

import { Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Container } from "@mui/system";
import Iconify from "src/components/iconify";
import ProfileSidebar from "../profile-sidebar";
import { useState } from "react";
import MyRewardListKeuntunganTableAtas from "./myreward-listkeuntungan-tableatas";
import MyRewardListKeuntunganTabKeuntungan from "./myreward-listkeuntungan-tabkeuntungan";

export default function MyRewardListKeuntungan() {
  const [level, setLevel] = useState("starter");

  return (
    <Card className="mt-3 p-6">
      <MyRewardListKeuntunganTableAtas />
      <MyRewardListKeuntunganTabKeuntungan />
    </Card>
  );
}

// return (
//   <Container
//     sx={{
//       mt: 6,
//       mb: 15,
//     }}
//   >
//     {/* <div className="grid grid-cols-4 mt-5 gap-5">
//       <div className="lg:col-span-3 col-span-4"> */}

//     {/* </div>
//     </div> */}
//   </Container>
// );
