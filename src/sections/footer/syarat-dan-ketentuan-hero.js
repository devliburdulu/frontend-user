import { m } from "framer-motion";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";

import { bgGradient } from "src/theme/css";

import { varFade, MotionContainer } from "src/components/animate";

// ----------------------------------------------------------------------

const CONTACTS = [
  {
    country: "Bali",
    address: "508 Bridle Avenue Newnan, GA 30263",
    phoneNumber: "(239) 555-0108",
  },
  {
    country: "London",
    address: "508 Bridle Avenue Newnan, GA 30263",
    phoneNumber: "(319) 555-0115",
  },
  {
    country: "Prague",
    address: "508 Bridle Avenue Newnan, GA 30263",
    phoneNumber: "(252) 555-0126",
  },
  {
    country: "Moscow",
    address: "508 Bridle",
    phoneNumber: "(307) 555-0133",
  },
];

// ----------------------------------------------------------------------

export default function SyaratDanKetentuanHero() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.grey[900], 0.8),
          imgUrl: "/Banner-S&K2.png",
        }),
        height: { md: 420 },
        py: { xs: 10, md: 0 },
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Container component={MotionContainer}>
        <Box
          sx={{
            bottom: { md: 80 },
            position: { md: "absolute" },
            textAlign: { xs: "center", md: "unset" },
          }}
        >
          <Stack
            spacing={2}
            display="inline-flex"
            direction="row"
            sx={{ color: "common.white" }}
          >
            <TextAnimate text="Syarat" />
            <TextAnimate text="dan" />
            <TextAnimate text="Ketentuan" />
          </Stack>

          <Stack
            spacing={5}
            alignItems={{ xs: "center", md: "unset" }}
            direction={{ xs: "column", md: "row" }}
            sx={{ mt: 5, color: "common.white" }}
          ></Stack>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function TextAnimate({ text, variants, sx, ...other }) {
  return (
    <Box
      component={m.div}
      sx={{
        typography: "h2",
        overflow: "hidden",
        display: "inline-flex",
        ...sx,
      }}
      {...other}
    >
      {text.split("").map((letter, index) => (
        <m.span key={index} variants={variants || varFade().inUp}>
          {letter}
        </m.span>
      ))}
    </Box>
  );
}

TextAnimate.propTypes = {
  sx: PropTypes.object,
  text: PropTypes.string,
  variants: PropTypes.object,
};
