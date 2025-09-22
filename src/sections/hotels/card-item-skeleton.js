import { Card, Skeleton, Typography, Grid } from '@mui/material';
import Iconify from 'src/components/iconify';

// Individual Card Skeleton Component
export function ShopCardSkeleton() {
  return (
    <div className='relative drop-shadow'>
      <Card
        className='p-2 rounded-[20px]'
        sx={{
          height: { xs: 375, md: 400 },
          minHeight: 320,
        }}>
        {/* Product Image Skeleton */}
        <Card
          className='rounded-[10px] relative'
          sx={{
            aspectRatio: '1 / 1',
            width: '100%',
            maxHeight: '50%',
          }}>
          <Skeleton
            variant='rectangular'
            width='100%'
            height='100%'
            animation='wave'
          />
        </Card>

        {/* Product Details Skeleton */}
        <div className='flex flex-col justify-between h-2/4 pt-2'>
          <div className='grid grid-flow-row p-1'>
            {/* Location */}
            <div className='flex justify-between gap-4'>
              <div className='text-liburdulu-blue flex items-center'>
                <Skeleton
                  variant='circular'
                  width={25}
                  height={21}
                  animation='wave'
                />
                <Skeleton
                  variant='text'
                  width={80}
                  height={20}
                  animation='wave'
                  sx={{ ml: 1 }}
                />
              </div>
              <div className='flex'>
                {[...Array(5)].map((_, index) => (
                  <Skeleton
                    key={index}
                    variant='rectangular'
                    width={19}
                    height={19}
                    animation='wave'
                    sx={{
                      mx: 0.5,
                      borderRadius: 1,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Product Name */}
            <div className='px-1'>
              <Skeleton
                variant='text'
                width='100%'
                height={50}
                animation='wave'
              />
            </div>

            {/* Rating */}
            <div className='flex items-center'>
              <Skeleton
                variant='text'
                width={60}
                height={24}
                animation='wave'
              />
            </div>
          </div>

          {/* Prices */}
          <div className='grid grid-flow-row p-1 justify-items-start'>
            <Skeleton variant='text' width={100} height={30} animation='wave' />
          </div>
        </div>
      </Card>
    </div>
  );
}

// Grid Container Component with 4 Skeletons and Loading Message
export function ShopCardSkeletonGrid() {
  return (
    <div className='relative w-full'>
      <Grid item xs={12}>
        <div className='w-full text-center mt-4 mb-8'>
          <Typography
            variant='body2'
            className='text-liburdulu-blue'
            sx={{ px: { xs: 2, sm: 10, lg: 24 } }}>
            <div className='flex items-center justify-center mb-4'>
              <div className='flex items-center'>
                <Iconify
                  icon='eos-icons:bubble-loading'
                  sx={{
                    color: '#1D9CAB',
                    width: { xs: 40, md: 60 },
                    height: { xs: 40, md: 60 },
                  }}
                />
              </div>
            </div>
            <span className='text-base md:text-lg font-medium'>
              Halo Liburians mohon ditunggu ya kami sedang mencari hotel terbaik
              untuk kamu
            </span>
          </Typography>
        </div>
      </Grid>
    </div>
  );
}
