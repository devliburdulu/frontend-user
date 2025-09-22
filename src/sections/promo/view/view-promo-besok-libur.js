"use client";

import { Container, Grid, Typography, Box } from "@mui/material";
import TripCard from "../TripCard";
import Image from "next/image";
import MainLayout from "src/layouts/main";
const trips = [
  {
    image: "/bg-hitraveler.png",
    title: "Eksotika Bromo",
    location: "Jawa Timur",
    price: "Rp.2.150.000",
  },
  {
    image: "/5.jpg",
    title: "Labuan Bajo Private Cabin",
    location: "Nusa Tenggara Timur",
    price: "Rp.3.265.000",
  },
  {
    image: "/4.jpg",
    title: "Labuan Bajo Sharing Cabin",
    location: "Nusa Tenggara Timur",
    price: "Rp.3.435.000",
  },
  {
    image: "/3.jpg",
    title: "Nusa Penida (West Trip)",
    location: "Bali",
    price: "Rp.575.000",
  },
  {
    image: "/2.jpg",
    title: "Nusa Penida (Mix Destination)",
    location: "Bali",
    price: "Rp.690.000",
  },
  {
    image: "/1.jpg",
    title: "Dieng Culture Festival",
    location: "Central Java",
    price: "Rp.2.150.000",
  },
];

export default function PromoBesokLibur() {
  return (
    <MainLayout>
      <Box sx={{ minHeight: "100vh", padding: { xs: 1, md: 2 } }}>
        <Container
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: 4,
            padding: { xs: 2, md: 4 },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Image
              src="/Besok-Libur.png"
              alt="Besok Libur"
              width={600}
              height={300}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            sx={{
              marginTop: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            Buat Liburanmu makin seru dengan paket kolaborasi LiburDulu bersama
            Mitra Terbaik kami!
            <Box sx={{ ml: 1, display: "flex", alignItems: "center" }}>
              <Image
                src="/Besok-Libur.png"
                alt="Logo"
                width={24}
                height={24}
                style={{ verticalAlign: "middle" }}
              />
            </Box>
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 4,
            }}
          >
            <Typography
              variant="body1"
              align="center"
              gutterBottom
              sx={{ maxWidth: "800px", px: { xs: 2, md: 0 } }}
            >
              Paket Perjalanan ini dirancang untuk memberikan rasa aman dan
              berkesan dengan destinasi yang diseleksi dengan baik hingga
              penawaran yang menarik. Kolaborasi liburdulu.id bersama
              mitra-mitra kami diharapkan akan memberikan dampak positif bagi
              pariwisata di Indonesia dan pengalaman yang menyenangkan bagi
              wisatawan. Selamat melepas penat dengan teman terbaik liburanmu!
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {trips.map((trip, index) => (
              <Grid item key={index} xs={6} sm={6} md={4} lg={3}>
                <TripCard {...trip} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </MainLayout>
  );
}
