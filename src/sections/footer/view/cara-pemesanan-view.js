"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import FaqsHero from "../cara-pemesanan-hero";
// import FaqsList from "../faqs-list";
import FaqsForm from "../faqs-form";
import CaraPemesananCategory from "../cara-pemesanan-category";

// ----------------------------------------------------------------------

export default function CaraPemesananView() {
  return (
    <>
      <FaqsHero />

      <Container
        sx={{
          pb: 10,
          pt: { xs: 3, md: 3 },
          position: "relative",
        }}
      >
        <CaraPemesananCategory />

        <Box
          gap={10}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
          }}
        ></Box>
      </Container>
    </>
  );
}
