'use client';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import MyOrderCard from './myorder-card';
import ProfileSidebar from '../profile-sidebar';

export default function MyOrderMain() {
  return (
    <Container
      sx={{
        mt: 5,
        mb: { xs: 7, md: 10 },
      }}>
      <div className='grid grid-cols-4 mt-1 lg:mt-5 pt-0 lg:pt-5 gap-5'>
        <div className='hidden lg:block sticky top-[140px] max-h-[420px]'>
          <ProfileSidebar />
        </div>

        <div className='lg:col-span-3 col-span-4'>
          <Card
            className='px-0 lg:px-8 pt-0 md:pt-2 pb-5'
            sx={{ boxShadow: { xs: 0, lg: 2 } }}>
            <CardHeader
              title='Daftar Pesanan'
              titleTypographyProps={{ fontWeight: '600' }}
              sx={{
                mb: 2,
                px: 0,
                pt: { xs: 0, lg: 3 },
                fontSize: { xs: '20px', md: '22px' },
              }}
            />
            <MyOrderCard />
          </Card>
        </div>
      </div>
    </Container>
  );
}
