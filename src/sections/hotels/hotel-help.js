import { Box, Typography, Button, Paper, useMediaQuery, useTheme } from "@mui/material";
import Iconify from "src/components/iconify/iconify";

export default function HotelHelp() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const PHONE_WA = "6287824059090";
  const TEXT_WA = "Hello how can we help you?";

  return (
    <Paper
      elevation={1}
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #e9ecee",
        backgroundColor: "#1a4b8a",
        color: "white",
        maxWidth: "100%",
        position: "relative",
      }}
    >
      {/* Left Section with Character - Uncomment if you want to add the character */}
      {/* <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        p: 2,
        justifyContent: isMobile ? "center" : "flex-start"
      }}>
        <Box
          component="img"
          src="/path-to-your-character.png"
          alt="Help Character"
          sx={{ width: 60, height: 60 }}
        />
      </Box> */}

      {/* Middle Section with Text */}
      <Box
        sx={{
          flex: 1,
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          {/* Butuh Bantuan? */}
          Ada kendala dengan pesanan kamu?
        </Typography>
        {/* <Typography variant="body2">Kami siap membantu Anda dengan segala kebutuhan anda.</Typography> */}
        <Typography variant="body2">Jangan khawatir! Tim Customer Service kami siap membantu. Hubungi kami untuk mendapatkan solusi cepat dan mudah.</Typography>
      </Box>

      {/* Right Section with Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isMobile ? "center" : "flex-end",
          p: 2,
          width: isMobile ? "100%" : "auto",
        }}
      >
        <Button
          variant="contained"
          fullWidth={isMobile}
          onClick={() => window.open(`https://wa.me/${PHONE_WA}?text=${TEXT_WA}`, "_blank")}
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            backgroundColor: "#FFFFFF",
            color: "#1a4b8a",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
            px: 2,
            py: 1,
            maxWidth: isMobile ? "100%" : "auto",
          }}
        >
          Hubungi Kami
        </Button>
      </Box>

      {/* Red Arrow/Triangle on top - Hide on mobile if desired */}
      {!isMobile && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: "16%",
            width: 0,
            height: 0,
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderBottom: "12px solid #1a4b8a",
            transform: "translateY(-100%)",
          }}
        />
      )}
    </Paper>
  );
}
