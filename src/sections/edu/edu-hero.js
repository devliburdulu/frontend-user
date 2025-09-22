import { m } from "framer-motion";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { alpha, useTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

import { bgGradient } from "src/theme/css";

import Iconify from "src/components/iconify";
import { varFade, MotionContainer } from "src/components/animate";
import { Typography } from "@mui/material";

// ----------------------------------------------------------------------

export default function EduHero() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.grey[900], 0.8),
          imgUrl: "/bg-banner-edu-home.png",
        }),
        height: { md: 450 },
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
          <div>
            {/* <TextAnimate text="Welcome to Shop Academy" sx={{ color: "primary.main" }} variants={varFade().inRight} /> */}
            <Typography variant="h2" sx={{ color: "common.white" }}>
              Pusat Edukasi Mitra
            </Typography>
            <br />

            {/* <Stack spacing={2} display="inline-flex" direction="row" sx={{ color: "common.white" }}>
              <TextAnimate text="Learn how to boost sales and increase brand awareness as an e-commerce business and creator." />
            </Stack> */}
            <Typography variant="body1" sx={{ color: "common.white" }}>
              Pelajari berbagai panduan, tips, dan strategi terbaik anda dalam mengembangkan usaha Anda sebagai Mitra Liburdulu.
            </Typography>
          </div>
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
        typography: "h1",
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
