import * as Yup from 'yup';
import { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { countries } from 'src/assets/data';
import Img from 'public/assets/images/profile-badge.png';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import { useAuthContext } from 'src/auth/hooks';
import { updateProfileUser } from 'src/fetch-global';
const BASE_URL = `${process.env.NEXT_PUBLIC_MAGENTO_API}/media/customer`;

export default function ProfileAccount() {
  const { user, loading } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const UpdateUserSchema = Yup.object().shape({
    firstname: Yup.string().required('Firstname is required'),
    lastname: Yup.string().required('Lastname is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
  });

  const defaultValues = {
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    email: user?.email || '',
    // image: user?.custom_attributes?.find(attr => attr.attribute_code === "profile_image")?.value || ""
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const updateData = {
      customer: {
        id: user?.id,
        firstname: data?.firstname,
        lastname: user?.lastname,
        email: data?.email,
      },
    };

    try {
      await updateProfileUser?.(user.id, updateData);
      enqueueSnackbar('Update success!');

      // window.location.reload();
    } catch (error) {
      enqueueSnackbar('Update failed!', { variant: 'error' });
      console.error('Update error:', error);
    }
  });
  //

  // const handleDrop = useCallback(
  //   (acceptedFiles) => {
  //     const file = acceptedFiles[0];

  //     const newFile = Object.assign(file, {
  //       preview: URL.createObjectURL(file),
  //     });

  //     if (file) {
  //       setValue("photoURL", newFile, { shouldValidate: true });
  //     }
  //   },
  //   [setValue]
  // );

  const [imgSrc, setImgSrc] = useState('');
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    if (defaultValues.image) {
      setImgSrc(`${BASE_URL}/${defaultValues.image}`);
    }
  }, [defaultValues.image]);

  // const reloadSrc = (e) => {
  //   if (fallback) {
  //     e.target.src = "/img/blank_profile.png";
  //   } else {
  //     e.target.src = imgSrc;
  //     setFallback(true);
  //   }
  // };
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Image src={Img} alt='image-badge' className='w-full mt-0' />
          <Card sx={{ pt: 2, pb: 5, px: 3, textAlign: 'center' }}></Card>
        </Grid>

        <Grid xs={12} md={8}>
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
