"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { paths } from "src/routes/paths";
import { useSearchParams } from "src/routes/hooks";
import { RouterLink } from "src/routes/components";

import Image from "next/image";

import Iconify from "src/components/iconify";
import { bgGradient } from "src/theme/css";
import { alpha, useTheme } from "@mui/material/styles";
// ----------------------------------------------------------------------

export default function ThankyouView({ title, desc }) {
  const searchParams = useSearchParams();
  const theme = useTheme();
  const email = searchParams.get("email");

  const renderHead = (
    <Stack alignItems="center" justifyContent="center">
      {/* <EmailInboxIcon sx={{ mb: 5, height: 96 }} /> */}
      <Image src="/assets/illustrations/illustration_auth.svg" width={300} height={300} alt="auth_image" className="mb-5" />

      <Typography variant="h4" sx={{ mb: 1 }}>
        Selamat anda berhasil mendaftar menjadi Mitra
      </Typography>

      <Stack spacing={1} alignItems="center" justifyContent="center" sx={{ color: "text.secondary", typography: "body2", mb: 5 }}>
        <Box component="span"> Harap menunggu konfirmasi dari tim kami untuk status pengajuan Anda!</Box>
        <Box component="strong" sx={{ color: "text.primary" }}>
          {email}
        </Box>
      </Stack>
    </Stack>
  );

  return (
    <Container component="main">
      <Stack
        flexGrow={1}
        spacing={10}
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, theme.palette.mode === "light" ? 0.78 : 0.85),
            imgUrl: "/assets/background/overlay_auth.jpg",
          }),
          py: 12,
          m: "auto",
          maxWidth: 700,
          minHeight: "100vh",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Container>
          {renderHead}
          <Button component={RouterLink} href="/" size="large" color="inherit" variant="contained" startIcon={<Iconify icon="eva:arrow-ios-back-fill" />} sx={{ alignSelf: "center" }}>
            Kembali ke home
          </Button>
        </Container>
      </Stack>
    </Container>
  );
}
