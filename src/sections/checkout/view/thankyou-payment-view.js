"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Unstable_Grid2";

import { paths } from "src/routes/paths";
import { useSearchParams } from "src/routes/hooks";
import { RouterLink } from "src/routes/components";

import { useResponsive } from "src/hooks/use-responsive";
import Cookies from "js-cookie";
import Image from "next/image";
import { useAuthContext } from "src/auth/hooks";
import Iconify from "src/components/iconify";
import { bgGradient } from "src/theme/css";
import { useBoolean } from "src/hooks/use-boolean";
import { alpha, useTheme } from "@mui/material/styles";
import { paymentRequest, getTotalsCart, getItemsCart } from "src/fetch-global";
import { useCheckoutContext } from "../context";
import { useRouter } from "next/navigation";
// ----------------------------------------------------------------------

export default function ThankyouPaymentView() {
  const dialog = useBoolean();
  const mdUp = useResponsive("up", "md");
  const { checkoutResponse } = useCheckoutContext();
  const router = useRouter();
  // const [total, setTotal] = useState("");
  // const [items, setItems] = useState();
  // const [totalsFetched, setTotalsFetched] = useState(false);
  // const [itemsFetched, setItemsFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const { user } = useAuthContext();

  // const searchParams = useSearchParams();
  const theme = useTheme();
  const { email } = user;

  const TOKEN_USER = Cookies.get("accessToken");

  // const handleGetTotals = async () => {
  //   try {
  //     const res = await getTotalsCart(TOKEN_USER);
  //     setTotal(res.grand_total);
  //
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleGetItemCart = async () => {
  //   try {
  //     const res = await getItemsCart(TOKEN_USER);
  //     setItems(res);
  //
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handlePaymentRequest = async () => {
    // const skus = items.map((item) => item.sku).join(", ");

    const billing_address = {
      address: {
        region: "New York",
        region_id: 43,
        region_code: "NY",
        country_id: "US",
        street: ["123 Oak Ave"],
        postcode: "10577",
        city: "Purchase",
        firstname: "Jane",
        lastname: "Doe",
        customer_id: 4,
        email: "jdoe@example.com",
        telephone: "(512) 555-1111",
        same_as_billing: 1,
      },
    };

    const body = {
      token: TOKEN_USER,
      billing_address,
    };

    try {
      const res = await paymentRequest(body);

      setLoading(true);

      if (res.data.message === 200) {
        setUrl(res.data.data.invoice_url);
      }
    } catch (error) {
      console.error("Payment Request Failed:", error);
    }
  };

  //

  useEffect(() => {
    handlePaymentRequest();
    if (checkoutResponse) {
      setUrl(checkoutResponse.data.invoice_url);
    }
  }, [checkoutResponse]);

  const renderHead = (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={4}
      direction={{
        xs: "column",
        md: "row-reverse",
      }}
    >
      {/* <EmailInboxIcon sx={{ mb: 5, height: 96 }} /> */}
      <div>
        <Image src="/assets/illustrations/illustration_auth.svg" width={500} height={500} alt="auth_image" className="mb-5" />
      </div>

      <div className="flex flex-col items-start">
        <Typography variant="h3" sx={{ mb: 1 }}>
          Thank you for your purchase
        </Typography>

        {/* <Typography variant="h4" sx={{ mb: 1 }}>
          Your Order # is: {checkoutResponse.external_id}
        </Typography> */}

        <Stack spacing={1} alignItems="center" justifyContent="center" sx={{ color: "text.secondary", typography: "body2", mb: 5 }}>
          <Box component="span"> We’ll email you an order confirmation with details and tracking info.</Box>
          <Box component="strong" sx={{ color: "text.primary" }}>
            {email}
          </Box>
        </Stack>

        {url === null ? (
          <Button
            size="large"
            color="inherit"
            variant="contained"
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
            sx={{ alignSelf: "start", opacity: url === "" ? 0.5 : 1 }}
            onClick={() => {
              router.push("/");
            }}
          >
            Kembali ke home
          </Button>
        ) : (
          <Button
            size="large"
            color="inherit"
            variant="contained"
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
            sx={{ alignSelf: "start", opacity: url === "" ? 0.5 : 1 }}
            // onClick={url !== null ? dialog.onTrue : null}
            disabled={url === ""}
          >
            <Link key={url} href={url} color="inherit" variant="contained" target="_blank" rel="noopener">
              Pembayaran
            </Link>
          </Button>
        )}
      </div>
    </Stack>
  );

  const renderDialog = (
    <Dialog open={dialog.value} maxWidth={mdUp && "xl"} onClose={dialog.onFalse} fullWidth={true} fullScreen={!mdUp}>
      <DialogTitle>Pembayaran</DialogTitle>

      {/* <Typography sx={{ color: "text.secondary" }}>You can set my maximum width and whether to adapt or not.</Typography> */}

      <iframe className="w-full h-full aspect-video" src={url} frameborder="0"></iframe>
      <Box
        component="form"
        noValidate
        sx={{
          margin: "auto",
          display: "flex",
          width: "fit-content",
          flexDirection: "column",
        }}
      >
        {/* <FormControl sx={{ my: 3, minWidth: 160 }}>
            <InputLabel htmlFor="max-width">maxWidth</InputLabel>
            <Select
              autoFocus
              value={maxWidth}
              onChange={handleMaxWidthChange}
              label="maxWidth"
              inputProps={{
                name: "max-width",
                id: "max-width",
              }}
            >
              <MenuItem value={false}>false</MenuItem>
              <MenuItem value="xs">xs</MenuItem>
              <MenuItem value="sm">sm</MenuItem>
              <MenuItem value="md">md</MenuItem>
              <MenuItem value="lg">lg</MenuItem>
              <MenuItem value="xl">xl</MenuItem>
            </Select>
          </FormControl> */}
      </Box>

      <DialogActions>
        <Button onClick={dialog.onFalse} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );

  return loading === false ? (
    <Container>
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
          maxWidth: 1200,
          minHeight: "70vh",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <div className="flex-col lg:flex-row items-center justify-between lg:gap-5">
          <div className="flex flex-col gap-5">
            <Skeleton variant="rounded" width={350} height={60} />
            <Skeleton variant="rounded" width={310} height={30} />
            <Skeleton variant="rounded" width={350} height={20} />

            <div className="flex items-center mt-9">
              <Skeleton variant="rounded" width={150} height={50} />
            </div>
          </div>
          <div className="hidden lg:block">
            <Skeleton variant="rounded" width={350} height={500} />
          </div>
        </div>
      </Stack>
    </Container>
  ) : (
    <Container component="main">
      {renderDialog}
      <Stack
        flexGrow={1}
        spacing={10}
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, theme.palette.mode === "light" ? 0.88 : 0.94),
            // imgUrl: "/assets/background/overlay_auth.jpg",
          }),
          py: 12,
          m: "auto",
          maxWidth: 1200,
          minHeight: "70vh",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Container>{renderHead}</Container>
      </Stack>
    </Container>
  );

  // return (
  //   <>
  //     <Container>
  //       <Stack
  //         flexGrow={1}
  //         spacing={10}
  //         sx={{
  //           ...bgGradient({
  //             color: alpha(theme.palette.background.default, theme.palette.mode === "light" ? 0.88 : 0.94),
  //             // imgUrl: "/assets/background/overlay_auth.jpg",
  //           }),
  //           py: 12,
  //           m: "auto",
  //           maxWidth: 1200,
  //           minHeight: "70vh",
  //           textAlign: "center",
  //           justifyContent: "center",
  //         }}
  //       >
  //         <div className="flex items-center justify-between gap-10">
  //           <div className="flex flex-col gap-5">
  //             <Skeleton variant="rounded" width={320} height={60} />
  //             <Skeleton variant="rounded" width={210} height={40} />
  //             <Skeleton variant="rounded" width={320} height={20} />

  // <div className="flex items-center">
  //   <Skeleton variant="rounded" width={100} height={20} />
  // </div>
  //           </div>
  //           <div>
  //             <Skeleton variant="rounded" width={500} height={500} />
  //           </div>
  //         </div>
  //       </Stack>
  //     </Container>
  //   </>
  // );
}
