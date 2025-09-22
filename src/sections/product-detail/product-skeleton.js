import PropTypes from 'prop-types';
import { useMediaQuery, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';

// ----------------------------------------------------------------------

export function ProductItemSkeleton({ sx, ...other }) {
  return (
    <Paper
      variant='outlined'
      sx={{
        borderRadius: 2,
        ...sx,
      }}
      {...other}>
      <Stack sx={{ p: 0 }}>
        <Skeleton sx={{ paddingTop: '100%', borderRadius: '1rem 1rem 0 0' }} />
      </Stack>

      <Stack spacing={2} sx={{ p: 3, pt: 2 }}>
        <Skeleton sx={{ width: 0.5, height: 16 }} />
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'>
          <Stack direction='row'>
            <Skeleton variant='circular' sx={{ width: 16, height: 16 }} />
            <Skeleton variant='circular' sx={{ width: 16, height: 16 }} />
            <Skeleton variant='circular' sx={{ width: 16, height: 16 }} />
          </Stack>
          <Skeleton sx={{ width: 40, height: 16 }} />
        </Stack>
      </Stack>
    </Paper>
  );
}

ProductItemSkeleton.propTypes = {
  sx: PropTypes.object,
};

// ----------------------------------------------------------------------

export function ProductDetailsSkeleton({ ...other }) {
  // const theme = useTheme && useTheme();
  // const isMobile =
  //   typeof window !== 'undefined' &&
  //   useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box {...other}>
      {/* Breadcrumb */}
      <Box sx={{ mb: 0, display: { xs: 'none', md: 'block' } }}>
        <Skeleton variant='text' width={360} height={32} sx={{ mb: 0 }} />
      </Box>
      {/* Product Header Skeleton */}
      <Box sx={{ mb: 3, display: { xs: 'none', md: 'block' } }}>
        {/* ProductName Skeleton */}
        <Box className='pt-0 px-1 pb-1'>
          <Box className='flex items-center gap-2 mb-0'>
            <Skeleton
              variant='text'
              width={1240}
              height={72}
              sx={{ mb: 0.5 }}
            />
          </Box>
        </Box>
        {/* ProductAttribute Skeleton */}
        <Box className='box-items mx-1'>
          <Box className='mb-3 flex flex-col-reverse md:flex-row justify-start items-start md:items-center'>
            <Box
              className='mb-0'
              sx={{ display: 'flex', flexDirection: 'row' }}>
              <Skeleton
                variant='rounded'
                width={90}
                height={28}
                sx={{ mr: 1 }}
              />
              <Skeleton variant='rounded' width={90} height={28} />
            </Box>
            <Box
              className='text-liburdulu-blue text-sm sm:text-xs font-medium flex items-center mb-1.5 md:mb-0'
              sx={{ display: 'flex', alignItems: 'center', ml: { md: 2 } }}>
              <Skeleton
                variant='circular'
                width={20}
                height={21}
                sx={{ mr: 1 }}
              />
              <Skeleton variant='text' width={100} height={24} />
            </Box>
          </Box>
          {/* <Box className='mb-3 flex flex-row justify-start items-center'>
            <Skeleton variant='text' width={80} height={20} sx={{ mr: 1 }} />
            <Skeleton variant='text' width={100} height={20} />
          </Box> */}
        </Box>
      </Box>
      {/* Carousel & Info Skeleton */}
      <Box sx={{ mb: { xs: 1, md: 4 } }}>
        {/* Mobile: Swiper Skeleton */}
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <Swiper
            slidesPerView={1}
            spaceBetween={16}
            pagination={{ clickable: true }}>
            {[...Array(2)].map((_, idx) => (
              <SwiperSlide key={idx}>
                <Box
                  sx={{
                    width: '100%',
                    aspectRatio: '1/1',
                    borderRadius: 2,
                    overflow: 'hidden',
                    mb: 2,
                  }}>
                  <Skeleton
                    variant='rectangular'
                    width='100%'
                    height='100%'
                    sx={{ height: 220 }}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Pagination bulat (dummy) */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            {[...Array(2)].map((_, idx) => (
              <Box
                key={idx}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: 'grey.400',
                  mx: 0.5,
                }}
              />
            ))}
          </Box>
        </Box>
        {/* Desktop: Grid Skeleton */}
        <Grid
          container
          spacing={2}
          sx={{ display: { xs: 'none', sm: 'flex' }, padding: 0 }}>
          <Grid item xs={12} sm={8} sx={{ paddingLeft: 0, paddingTop: 0 }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: { xs: '400px', md: '500px' },
                borderRadius: 2,
                overflow: 'hidden',
              }}>
              <Skeleton
                variant='rectangular'
                width='100%'
                height='100%'
                sx={{ height: { xs: 400, md: 500 } }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} container direction='column' spacing={2}>
            {[...Array(2)].map((_, idx) => (
              <Grid item key={idx}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: { xs: 194, md: 240 },
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}>
                  <Skeleton
                    variant='rectangular'
                    width='100%'
                    height='100%'
                    sx={{ height: { xs: 194, md: 240 } }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
      {/* Product Header Skeleton */}
      <Box
        sx={{
          mb: 3,
          px: { xs: 2, md: 0 },
          display: { xs: 'block', md: 'none' },
        }}>
        {/* ProductName Skeleton */}
        <Box className='pt-0 px-1 pb-1'>
          <Box className='flex items-center gap-2 mb-0'>
            <Skeleton
              variant='text'
              width={1240}
              height={72}
              sx={{ mb: 0.5 }}
            />
          </Box>
        </Box>
        {/* ProductAttribute Skeleton */}
        <Box className='box-items mx-1'>
          <Box className='mb-3 flex flex-col-reverse md:flex-row justify-start items-start md:items-center'>
            <Box
              className='mb-0'
              sx={{ display: 'flex', flexDirection: 'row' }}>
              <Skeleton
                variant='rounded'
                width={90}
                height={28}
                sx={{ mr: 1 }}
              />
              <Skeleton variant='rounded' width={90} height={28} />
            </Box>
            <Box
              className='text-liburdulu-blue text-sm sm:text-xs font-medium flex items-center mb-1.5 md:mb-0'
              sx={{ display: 'flex', alignItems: 'center', ml: { md: 2 } }}>
              <Skeleton
                variant='circular'
                width={20}
                height={21}
                sx={{ mr: 1 }}
              />
              <Skeleton variant='text' width={100} height={24} />
            </Box>
          </Box>
          {/* <Box className='mb-3 flex flex-row justify-start items-center'>
            <Skeleton variant='text' width={80} height={20} sx={{ mr: 1 }} />
            <Skeleton variant='text' width={100} height={20} />
          </Box> */}
        </Box>
      </Box>
      {/* Tab Navigation */}
      <Stack
        direction='row'
        spacing={1}
        sx={{ mt: 4, mb: 2, px: { xs: 2, md: 0 } }}>
        {[...Array(6)].map((_, idx) => (
          <Skeleton key={idx} variant='rounded' width={110} height={32} />
        ))}
      </Stack>
      {/* Form Pilihan Paket */}
      <Paper
        variant='outlined'
        sx={{
          p: 3,
          m: { xs: '0 1rem 1.25rem', md: '0 0 1.5rem' },
          borderRadius: 2,
        }}>
        <Skeleton variant='text' width={180} height={24} sx={{ mb: 2 }} />
        <Skeleton
          variant='rectangular'
          width='100%'
          height={40}
          sx={{ mb: 2, borderRadius: 1 }}
        />
        <Skeleton
          variant='rectangular'
          width='100%'
          height={40}
          sx={{ mb: 2, borderRadius: 1 }}
        />
        <Skeleton
          variant='rectangular'
          width='100%'
          height={40}
          sx={{ borderRadius: 1 }}
        />
      </Paper>
      {/* Itinerary */}
      <Paper
        variant='outlined'
        sx={{
          p: 3,
          m: { xs: '0 1rem 1.25rem', md: '0 0 1.5rem' },
          borderRadius: 2,
        }}>
        <Skeleton variant='text' width={140} height={24} sx={{ mb: 2 }} />
        {[...Array(6)].map((_, idx) => (
          <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Skeleton
              variant='circular'
              width={16}
              height={16}
              sx={{ mr: 2 }}
            />
            <Skeleton variant='text' width='80%' height={18} />
          </Box>
        ))}
        <Skeleton variant='text' width={120} height={20} sx={{ mt: 1 }} />
      </Paper>
      {/* Produk Lainnya */}
      <Box sx={{ mt: 4, mb: 2, px: { xs: 2, md: 0 } }}>
        <Skeleton variant='text' width={240} height={48} sx={{ mb: 2 }} />
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          sx={{
            justifyContent: { xs: 'center', md: 'flex-start' },
            // flexWrap: 'wrap',
          }}>
          {[...Array(4)].map((_, idx) => (
            <ProductItemSkeleton
              key={idx}
              sx={{ minWidth: 260, maxWidth: 360 }}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
