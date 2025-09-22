import { Link, Typography, RouterLink } from "@mui/material";
import { Stack } from "@mui/system";
import { useAuthContext } from "src/auth/hooks";

export default function ResetPassword() {
  //   const { login } = useAuthContext();
  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Login ke Liburdulu</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">Belum punya akun?</Typography>

        <Link component={RouterLink} href={"/register"} variant="subtitle2">
          Daftar akun
        </Link>
      </Stack>
    </Stack>
  );

  return (
    <>
      {renderHead}
      {/* <div>ini page</div> */}

      {/* <Alert severity="info" sx={{ mb: 3 }}>
        Use username : <strong>admin</strong> / password :
        <strong> admin123</strong>
      </Alert> */}
    </>
  );
}
