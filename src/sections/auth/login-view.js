// LoginView.jsx - Main component file
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";

import { RouterLink } from "src/routes/components";
import { useRouter } from "src/routes/hooks";
import { useBoolean } from "src/hooks/use-boolean";
import { useAuthContext } from "src/auth/hooks";
import Iconify from "src/components/iconify";
import FormProvider, { RHFTextField } from "src/components/hook-form";
import { useGoogleLogin } from "src/hooks/use-google-auth"; // Import the custom hook

export default function LoginView() {
  const { login } = useAuthContext();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const password = useBoolean();

  // Use the custom Google login hook
  const { isGoogleSubmitting, errorMsg: googleErrorMsg, handleGoogleLogin, setErrorMsg: setGoogleErrorMsg } = useGoogleLogin();

  // Combine error messages
  const combinedErrorMsg = errorMsg || googleErrorMsg;

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required").min(3, "Username must be at least 3 characters long"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    username: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login?.(data.username, data.password);
      const lastVisitedPage = localStorage.getItem("lastVisitedPage") || "/";
      router.push(lastVisitedPage);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(error.message);
      setGoogleErrorMsg(""); // Clear any Google login errors
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 3 }}>
      <Typography variant="h4" sx={{ mb: -2, fontWeight: 600 }}>
        Login ke Liburdulu
      </Typography>
      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">Belum punya akun?</Typography>
        <Link component={RouterLink} href={"/register"} variant="subtitle2">
          Daftar akun
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      <RHFTextField
        name="username"
        type="text"
        label="Alamat email"
        sx={{
          "& .MuiOutlinedInput-root": { color: "#333" },
          "& .MuiInputLabel-outlined": { color: "#2e2e2e" },
        }}
      />
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
        sx={{
          "& .MuiOutlinedInput-root": { color: "#33" },
          "& .MuiInputLabel-outlined": { color: "#2e2e2e" },
        }}
      />
      <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: "flex-end", fontWeight: 600 }} href="/forgot-password">
        Lupa password?
      </Link>
      <LoadingButton fullWidth color="inherit" size="large" type="submit" variant="contained" loading={isSubmitting}>
        Masuk
      </LoadingButton>
    </Stack>
  );

  const renderGoogleButton = (
    <LoadingButton fullWidth sx={{ color: "#333" }} size="large" onClick={handleGoogleLogin} startIcon={<Iconify icon="eva:google-fill" />} variant="outlined" loading={isGoogleSubmitting}>
      Masuk dengan Google
    </LoadingButton>
  );

  return (
    <Card sx={{ boxShadow: 3, mt: { xs: 0, md: 5 } }}>
      <CardContent>
        {renderHead}
        {!!combinedErrorMsg && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {combinedErrorMsg}
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
      </CardContent>
    </Card>
  );
}
