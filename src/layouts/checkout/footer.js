import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// ----------------------------------------------------------------------

export default function Footer() {
  //   const pathname = usePathname();
  //   const homePage = pathname === '/';
  const mainFooter = (
    <Box
      component='footer'
      sx={{
        position: 'relative',
        // bgcolor: 'background.default',
      }}>
      <Typography
        variant='body2'
        sx={{ mt: { xs: 8, md: 10 }, py: 2, fontSize: 14 }}
        className='text-center bg-liburdulu-blue text-liburdulu-white'>
        Copyright by © PT Liburnesia Digital Nusantara
      </Typography>
    </Box>
  );

  return mainFooter;
}
