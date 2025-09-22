'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { PasswordIcon } from 'src/assets/icons';
import { useSnackbar } from 'src/components/snackbar';
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import { bgGradient } from 'src/theme/css';
import { alpha, useTheme } from '@mui/material/styles';

import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export default function ForgotPasswordView() {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { forgotPassword } = useAuthContext();

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await forgotPassword?.(data.email);
      enqueueSnackbar('Cek email untuk melanjutkan');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Silahkan masukan email yang benar', {
        variant: 'error',
      });
    }
  });

  const renderForm = (
    <Stack alignItems='center' spacing={3}>
      <RHFTextField name='email' label='Email address' />

      <LoadingButton
        fullWidth
        size='large'
        type='submit'
        variant='contained'
        loading={isSubmitting}>
        Send Request
      </LoadingButton>

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
      <PasswordIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ mt: 3, mb: 5 }}>
        <Typography variant='h3' sx={{ fontWeight: 600 }}>
          Forgot your password?
        </Typography>

        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          Please enter the email address associated with your account and We
          will email you a link to reset your password.
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
            py: 12,
            m: 'auto',
            maxWidth: 700,
            minHeight: '10vh',
            textAlign: 'center',
            justifyContent: 'center',
          }}>
          <FormProvider methods={methods} onSubmit={onSubmit}>
            {renderHead}

            {renderForm}
          </FormProvider>
        </Stack>
      </Container>
    </Box>
  );
}
