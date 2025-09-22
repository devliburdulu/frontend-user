'use client';

import * as Yup from 'yup';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useCountdownSeconds } from 'src/hooks/use-countdown';

import { SentIcon } from 'src/assets/icons';
import { useAuthContext } from 'src/auth/hooks';

import { bgGradient } from 'src/theme/css';
import { alpha, useTheme } from '@mui/material/styles';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFCode, RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

export default function NewPasswordView() {
  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();
  const { newPassword, forgotEmail, forgotPassword } = useAuthContext();

  const router = useRouter();

  const searchParams = useSearchParams();

  const token_email = searchParams.get('token');
  const email_user = searchParams.get('email');
  const password = useBoolean();

  const { countdown, counting, startCountdown } = useCountdownSeconds(60);

  const VerifySchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    token_email: Yup.string()
      .min(6, 'Token must be at least 6 characters')
      .required('Token is required'),
    newPassword: Yup.string()
      .required('New password is required')
      .oneOf([Yup.ref('confirmPassword')], 'Passwords must match'),
    confirmPassword: Yup.string().required('Confirm password is required'),
  });

  const defaultValues = {
    email: email_user || '',
    token_email: token_email,
    newPassword: '',
    confirmPassword: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifySchema),
    defaultValues,
  });

  const {
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await newPassword?.(data.email, data.token_email, data.newPassword);

      enqueueSnackbar('Success update password!', { variant: 'success' });

      // router.push("/login");
    } catch (error) {
      if (error.response && error.status === 400) {
        enqueueSnackbar(error.message || 'Failed to update password.', {
          variant: 'error',
        });
      } else {
        enqueueSnackbar(error.message || 'An unexpected error occurred.', {
          variant: 'error',
        });
      }
      console.error(error);
    }
  });

  const handleResendCode = useCallback(async () => {
    try {
      startCountdown();
      await forgotPassword?.(values.email);
    } catch (error) {
      console.error(error);
    }
  }, [forgotPassword, startCountdown, values.email]);

  const renderForm = (
    <Stack spacing={3} alignItems='center'>
      {/* <RHFTextField name="email" label="Email" placeholder={forgotEmail} InputLabelProps={{ shrink: true }} />

      <RHFTextField name="token_email" label="Token" type={"text"} /> */}

      <RHFTextField
        name='newPassword'
        label='New Password'
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={password.onToggle} edge='end'>
                <Iconify
                  icon={
                    password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'
                  }
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <RHFTextField
        name='confirmPassword'
        label='Confirm New Password'
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={password.onToggle} edge='end'>
                <Iconify
                  icon={
                    password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'
                  }
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
        fullWidth
        size='large'
        type='submit'
        variant='contained'
        loading={isSubmitting}>
        Update Password
      </LoadingButton>

      <Typography variant='body2'>
        {`Don’t have a code? `}
        <Link
          variant='subtitle2'
          onClick={handleResendCode}
          sx={{
            cursor: 'pointer',
            ...(counting && {
              color: 'text.disabled',
              pointerEvents: 'none',
            }),
          }}>
          Resend code {counting && `(${countdown}s)`}
        </Link>
      </Typography>

      <Link
        component={RouterLink}
        href={'/login'}
        color='inherit'
        variant='subtitle2'
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}>
        <Iconify icon='eva:arrow-ios-back-fill' width={16} />
        Return to sign in
      </Link>
    </Stack>
  );

  const renderHead = (
    <>
      <SentIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ mt: 3, mb: 5 }}>
        <Typography variant='h3' sx={{ fontWeight: 600 }}>
          Request sent successfully!
        </Typography>

        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          We&apos;ve sent a 6-digit confirmation email to your email.
          <br />
          Please enter the code in below box to verify your email.
        </Typography>
      </Stack>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.78 : 0.85
          ),
          imgUrl: '/assets/background/overlay_auth.jpg',
        }),
      }}>
      <Container>
        <Stack
          flexGrow={1}
          spacing={10}
          sx={{
            py: 8,
            m: 'auto',
            maxWidth: 700,
            minHeight: '10vh',
            textAlign: 'center',
            justifyContent: 'center',
            gap: '0px',
          }}>
          {renderHead}

          <FormProvider methods={methods} onSubmit={onSubmit}>
            {renderForm}
          </FormProvider>
        </Stack>
      </Container>
    </Box>
  );
}
