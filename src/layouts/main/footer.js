import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { _socials } from 'src/_mock';

import Logo from 'src/components/logo';
import Image from 'next/image';

// ----------------------------------------------------------------------
const PHONE_WA = '6287824059090';
const TEXT_WA = 'Hello how can we help you?';

const LINKS = [
  {
    headline: 'Tentang LiburDulu',
    children: [
      { name: 'Pendaftaran Mitra', href: '/register-mitra', target: '' },
      {
        name: 'Hubungi Kami',
        href: `https://wa.me/${PHONE_WA}?text=${TEXT_WA}`,
        target: '_blank',
      },
      { name: 'Cara Pemesanan', href: '/cara-pemesanan', target: '' },
      { name: 'Syarat & Ketentuan', href: '/syarat-dan-ketentuan', target: '' },
      {
        name: 'Kebijakan Privasi',
        href: '/kebijakan-privasi',
        target: '_self',
      },
    ],
  },
  {
    headline: 'Ikuti kami',
    children: [
      {
        name: 'Instagram',
        href: 'https://www.instagram.com/liburdulu.id/',
        target: '_blank',
      },
      {
        name: 'Tiktok',
        href: 'https://www.tiktok.com/@liburdulu.id',
        target: '_blank',
      },
      {
        name: 'Facebook',
        href: 'https://www.facebook.com/liburduluindonesia/',
        target: '_blank',
      },
      {
        name: 'Youtube',
        href: 'https://www.youtube.com/@LiburDuluIDofficial/featured',
        target: '_blank',
      },
      { name: 'X', href: 'https://x.com/idLiburDulu', target: '_blank' },
    ],
  },
];

// ----------------------------------------------------------------------

export default function Footer() {
  const pathname = usePathname();
  const homePage = pathname === '/';

  const mainFooter = (
    <Box
      component='footer'
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
      }}>
      <Divider />

      <Container
        sx={{
          pt: 5,
          pb: 0,
          textAlign: { xs: 'center', md: 'unset' },
        }}>
        <Grid
          container
          justifyContent={{
            xs: 'center',
            md: 'center',
          }}
          spacing={4}>
          <Grid xs={12} md={3}>
            <Logo sx={{ mb: 1 }} />
            <Typography
              variant='body2'
              sx={{
                maxWidth: 200,
                mx: { xs: 'auto', md: 'unset' },
              }}>
              <span className='font-semibold text-base'>
                Partner dengan Liburdulu.id
              </span>
              <br />
              <span className='flex flex-row justify-center md:justify-start items-center mt-2 md:mt-2.5'>
                <Image
                  src='/logo-aspperwi.png'
                  alt='Logo ASPPERWI'
                  width={70}
                  height={70}
                  className='object-contain'
                />
                <Image
                  src='/logo-kemberin.webp'
                  alt='Logo KEMBERIN'
                  width={50}
                  height={50}
                  className='object-contain ml-2'
                />
              </span>
            </Typography>
          </Grid>

          <Grid xs={12} md={9}>
            <Stack direction={{ xs: 'row', md: 'row' }}>
              {LINKS.map((list) => (
                <Stack
                  key={list.headline}
                  spacing={2}
                  alignItems={{ xs: 'center', md: 'flex-start' }}
                  sx={{ width: 1 }}>
                  <Typography
                    component='div'
                    variant='overline'
                    sx={{ fontSize: { xs: 13, md: 14 }, fontWeight: 600 }}>
                    {list.headline}
                  </Typography>

                  {list.children.map((link) => {
                    if (link.href == '#') {
                      return (
                        <div
                          key={link.name}
                          color='inherit'
                          className='text-[14px]'>
                          {link.name}
                        </div>
                      );
                    } else {
                      return (
                        <Link
                          key={link.name}
                          component={RouterLink}
                          href={link.href}
                          target='{link.target}'
                          color='inherit'
                          variant='body2'>
                          {link.name}
                        </Link>
                      );
                    }
                  })}
                </Stack>
              ))}

              <Stack
                key='Payment Partner'
                spacing={2}
                alignItems={{ xs: 'center', md: 'flex-start' }}
                sx={{ width: 1, display: { xs: 'none', md: 'block' } }}>
                <Typography
                  component='div'
                  variant='overline'
                  sx={{ fontSize: { xs: 13, md: 14 }, fontWeight: 600 }}>
                  Partner Pembayaran
                </Typography>
                <Image
                  src='/partner-payment.png'
                  className='object-contain'
                  alt='Partner Payment'
                  width={300}
                  height={300}
                  style={{ marginTop: 20 }}
                />
              </Stack>
            </Stack>

            {/* Mobile */}
            <Stack
              key='Payment Partner'
              spacing={2}
              alignItems={{ xs: 'center', md: 'flex-start' }}
              sx={{
                width: 1,
                display: { xs: 'block', md: 'none' },
                marginTop: 5,
              }}>
              <Typography
                component='div'
                variant='overline'
                sx={{ fontSize: { xs: 13, md: 12 }, fontWeight: 600 }}>
                Payment Partner
              </Typography>
              <Image
                width={300}
                height={300}
                src='/partner-payment.png'
                alt='Partner Payment'
                className='object-contain px-0 md:px-12 mt-3'
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Typography
        variant='body2'
        sx={{ mt: { xs: 8, md: 10 }, py: 2, fontSize: 14 }}
        className='text-center bg-liburdulu-blue text-liburdulu-white'>
        Copyright by © PT Liburnesia Digital Nusantara
      </Typography>
    </Box>
  );

  return homePage ? mainFooter : mainFooter;
}
