"use client";

import { Box, Typography, Grid, Paper, Button, Divider } from "@mui/material";
import Rating from "@mui/material/Rating";
import Iconify from "src/components/iconify/iconify";
import { useResponsive } from "src/hooks/use-responsive";
import { fCurrency } from "src/utils/format-number";

export default function HotelInfo({ hotelName, description, rating, address, onJumpToRoom, lowestPrice }) {
  const isDesktop = useResponsive("up", "md");
  return (
    <Paper
      elevation={1}
      sx={{
        display: "flex",
        flexDirection: isDesktop ? "row" : "column",
        borderRadius: "12px",
        my: 3,
        overflow: "hidden",
        border: "1px solid #e9ecee",
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Left Section */}
      <Box sx={{ flex: 3, p: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          {hotelName}
        </Typography>

        {/* Rating and Location */}
        <Box sx={{ display: "flex", flexDirection: isDesktop ? "row" : "column", alignItems: isDesktop ? "center" : "start", mt: 1, gap: 2 }}>
          <Rating name="read-only" value={rating} readOnly precision={0.5} size="small" />
          <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "12px", lineClamp: 1 }}>
            {/* (9.12k reviews) */} {!address ? "Alamat tidak ditemukan" : address}
          </Typography>
        </Box>

        {/* Description */}
        <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
          {!description ? "Informasi singkat untuk hotel ini tidak tersedia" : description}
        </Typography>
      </Box>

      {/* Right Section */}
      <Divider orientation="vertical" flexItem />

      <Box
        sx={{
          flex: 1.5,
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          textAlign: "start",
        }}
      >
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Mulai dari
        </Typography>
        <Typography variant="h5" fontWeight="bold" sx={{ color: "#000" }}>
          {fCurrency(lowestPrice) || "Rp. 0"}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {/* Harga per malam */}
          Total Harga
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            mt: 5,
            borderRadius: "8px",
            textTransform: "none",
            backgroundColor: "#1D9CAB",
          }}
          onClick={onJumpToRoom}
        >
          <Box component="span" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Iconify icon="uil:cart" width={24} /> Lihat Kamar
          </Box>
        </Button>
      </Box>
    </Paper>
  );
}
