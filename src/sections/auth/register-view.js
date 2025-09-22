"use client";

import * as Yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";

import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/components";
import { useRouter, useSearchParams } from "src/routes/hooks";
import { useBoolean } from "src/hooks/use-boolean";
import { useAuthContext } from "src/auth/hooks";
import Iconify from "src/components/iconify";
import FormProvider, { RHFTextField } from "src/components/hook-form";
import { useSnackbar } from "src/components/snackbar";
import { useGoogleLogin } from "src/hooks/use-google-auth";
// ----------------------------------------------------------------------

export default function RegisterView() {
  const { register } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const password = useBoolean();

  const { isGoogleSubmitting, errorMsg: googleErrorMsg, handleGoogleLogin, setErrorMsg: setGoogleErrorMsg } = useGoogleLogin();

  // Combine error messages
  const combinedErrorMsg = errorMsg || googleErrorMsg;

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("First name required"),
    lastName: Yup.string().required("Last name required"),
    email: Yup.string().required("Email is required").email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await register?.(data.email, data.password, data.firstName, data.lastName);
      enqueueSnackbar("Berhasil daftar akun", { variant: "success" });
      setTimeout(() => {
        router.push(paths.auth.jwt.login);
      }, 1000);
    } catch (error) {
      //

      // Display the error message from the response
      const errorMessage = error.message || "An unexpected error occurred";
      enqueueSnackbar(errorMessage, { variant: "error" });

      reset();
      setErrorMsg(errorMessage);
      setGoogleErrorMsg("");
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 2, position: "relative" }}>
      <Typography variant="h4" sx={{ mb: -1, fontWeight: 600 }}>
        Buat akun untuk memudahkan Liburanmu
      </Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> Sudah punya akun? </Typography>

        <Link href={paths.auth.jwt.login} component={RouterLink} variant="subtitle2">
          Masuk
        </Link>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        mt: 2.5,
        textAlign: "center",
        typography: "caption",
        color: "text.secondary",
      }}
    >
      {"Dengan mendaftar, saya setuju dengan ketentuan dan "}
      <Link underline="always" color="text.primary" target="_blank" href="/syarat-dan-ketentuan">
        kebijakan privasi
      </Link>
      {""} yang berlaku.
    </Typography>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <RHFTextField name="firstName" label="Nama depan" />
        <RHFTextField name="lastName" label="Nama belakang" />
      </Stack>

      <RHFTextField name="email" label="Alamat email" />

      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? "solar:eye-bold" : "solar:eye-closed-bold"} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton fullWidth color="inherit" size="large" type="submit" variant="contained" loading={isSubmitting}>
        Buat akun
      </LoadingButton>
    </Stack>
  );

  const renderGoogleButton = (
    <LoadingButton fullWidth sx={{ color: "#333" }} size="large" onClick={handleGoogleLogin} startIcon={<Iconify icon="eva:google-fill" />} variant="outlined" loading={isGoogleSubmitting}>
      Daftar dengan Google
    </LoadingButton>
  );

  return (
    <Card sx={{ boxShadow: 3 }}>
      <CardContent>
        {renderHead}
        {!!errorMsg && (
          <Alert severity="error" sx={{ m: 3 }}>
            {errorMsg}
          </Alert>
        )}
        <FormProvider methods={methods} onSubmit={onSubmit}>
          {renderForm}
        </FormProvider>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ my: 2 }}>
          <Divider sx={{ flexGrow: 1 }} />
          <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
            OR
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Stack>
        {renderGoogleButton}
        {renderTerms}
      </CardContent>
    </Card>
  );
}
