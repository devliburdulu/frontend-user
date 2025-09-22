import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useAuthContext } from 'src/auth/hooks';
import { updateCustomer } from 'src/fetch-global';

const BASE_URL = `${process.env.NEXT_PUBLIC_MAGENTO_API}/media/customer`;

export default function ProfileAccount() {
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const UpdateUserSchema = Yup.object().shape({
    firstname: Yup.string().required('Firstname is required'),
    lastname: Yup.string().required('Lastname is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    street: Yup.string().required('Street is required'),
    city: Yup.string().required('City is required'),
    postcode: Yup.string().required('Postal code is required'),
    telephone: Yup.string().required('Telephone is required'),
    region: Yup.string().required('Region is required'),
  });

  const defaultValues = {
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    email: user?.email || '',
    street: user?.addresses?.[0]?.street?.[0] || '',
    city: user?.addresses?.[0]?.city || '',
    postcode: user?.addresses?.[0]?.postcode || '',
    region: user?.addresses?.[0]?.region?.region || '',
    telephone: user?.addresses?.[0]?.telephone || '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const updateData = {
      customer: {
        id: user.id, // ID pelanggan
        firstname: data?.firstname,
        lastname: data?.lastname,
        email: data?.email,
        addresses: [
          {
            // id: user.addresses[0].id,
            customer_id: user.id,
            // region_id: 0,
            country_id: 'ID', // Static country ID
            street: [data?.street],
            telephone: data?.telephone,
            region: {
              region: data?.region,
            },
            // region: data?.region.region,
            postcode: data?.postcode,
            city: data?.city,
            firstname: data?.firstname,
            lastname: data?.lastname,
            default_shipping: true,
            default_billing: true,
          },
        ],
      },
    };

    try {
      await updateCustomer(user.id, updateData);

      enqueueSnackbar('Update success!');
    } catch (error) {
      enqueueSnackbar('Update failed!', { variant: 'error' });
      console.error('Update error:', error);
    }
  });

  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    if (user?.image) {
      setImgSrc(`${BASE_URL}/${user.image}`);
    }
  }, [user?.image]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display='grid'
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}>
              <RHFTextField name='firstname' label='Firstname' />
              <RHFTextField name='lastname' label='Lastname' />
              <RHFTextField name='telephone' label='Telephone' />
              <RHFTextField name='street' label='Street Address' />
              <RHFTextField name='city' label='City' />
              <RHFTextField name='postcode' label='Postal Code' />
              <RHFTextField name='region' label='Region' />
            </Box>

            <Stack spacing={3} alignItems='flex-end' sx={{ mt: 3 }}>
              <RHFTextField
                name='email'
                label='Email Address'
                InputProps={{
                  readOnly: true,
                }}
                disabled={true}
              />
              <LoadingButton
                type='submit'
                variant='contained'
                loading={isSubmitting}
                sx={{ fontWeight: 600 }}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
