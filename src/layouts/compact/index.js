import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

import Header from "../common/header-simple";
import MainLayout from "src/layouts/main";

// ----------------------------------------------------------------------

export default function CompactLayout({ children }) {
  return (
    <>
      {/* <Header /> */}
      <MainLayout>
        <Container component="main">
          <Stack
            sx={{
              py: 12,
              m: "auto",
              maxWidth: 400,
              minHeight: "100vh",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            {children}
          </Stack>
        </Container>
      </MainLayout>
    </>
  );
}

CompactLayout.propTypes = {
  children: PropTypes.node,
};
