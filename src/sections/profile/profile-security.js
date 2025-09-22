import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { getCustomer, updatePassword } from 'src/fetch-global';

// ----------------------------------------------------------------------

export default function ProfileSecurity() {
  const { enqueueSnackbar } = useSnackbar();
  const [customerId, setCustomerId] = useState(null);
  const password = useBoolean();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
      .required('New Password is required')
      .min(6, 'Password must be at least 6 characters')
      .test(
        'no-match',
        'New password must be different than old password',
        (value, { parent }) => value !== parent.oldPassword
      ),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .min(6, 'Password must be at least 6 characters')
      .required('New Password is required'),
  });

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customer = await getCustomer();
        setCustomerId(customer.id);
      } catch (error) {
        console.error('Failed to fetch customer data:', error);
      }
    };

    fetchCustomer();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updatePassword(
        data.oldPassword,
        data.newPassword,
        data.confirmNewPassword
      );
      enqueueSnackbar('Password updated successfully!');
      reset();
    } catch (error) {
      enqueueSnackbar('Failed to update password', { variant: 'error' });
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack component={Card} spacing={3} sx={{ p: 3 }}>
        <RHFTextField
          name='oldPassword'
          type={password.value ? 'text' : 'password'}
          label='Old Password'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={password.onToggle} edge='end'>
                  <Iconify
                    icon={
                      password.value
                        ? 'solar:eye-bold'
                        : 'solar:eye-closed-bold'
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

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
                      password.value
                        ? 'solar:eye-bold'
                        : 'solar:eye-closed-bold'
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          helperText={
            <Stack component='span' direction='row' alignItems='center'>
              <Iconify icon='eva:info-fill' width={16} sx={{ mr: 0.5 }} />{' '}
              Password must be minimum 6+
            </Stack>
          }
        />

        <RHFTextField
          name='confirmNewPassword'
          label='Confirm New Password'
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={password.onToggle} edge='end'>
                  <Iconify
                    icon={
                      password.value
                        ? 'solar:eye-bold'
                        : 'solar:eye-closed-bold'
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          type='submit'
          variant='contained'
          loading={isSubmitting}
          sx={{ ml: 'auto', fontWeight: 600 }}>
          Save Changes
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
