import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { useResponsive } from 'src/hooks/use-responsive';
import { bgGradient } from 'src/theme/css';
import Logo from 'src/components/logo';

export default function AuthClassicLayout({ children, image, title }) {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

  const renderLogo = (
    <Logo
      sx={{
        zIndex: 9,
        position: 'absolute',
        m: { xs: 2, md: 5 },
      }}
    />
  );

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: 480,
        px: { xs: 2, md: 4 },
        pt: { xs: 15, md: 14 },
        pb: { xs: 15, md: 0 },
      }}>
      {children}
    </Stack>
  );

  const renderSection = (
    <Stack
      flexGrow={1}
      spacing={10}
      alignItems='center'
      justifyContent='center'
      sx={{ maxWidth: 780, alignItems: 'flex-end' }}>
      <Typography
        variant='h4'
        sx={{ maxWidth: 600, textAlign: 'center', fontWeight: 600 }}>
        {title || ' Mau Liburan Seru? Cek Aja Di LiburDulu!'}
        <br />
        <span className='text-base font-normal'>
          Liburan asik tanpa ribet ke banyak destinasi di Indonesia
        </span>
      </Typography>

      <Box
        component='img'
        alt='auth'
        src={image || '/assets/illustrations/illustration_auth.svg'}
        sx={{
          maxWidth: {
            xs: 480,
            lg: 560,
            xl: 720,
          },
        }}
      />
    </Stack>
  );

  return (
    <Stack
      component='main'
      direction='row'
      sx={{
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.78 : 0.85
          ),
          imgUrl: '/assets/background/overlay_auth.jpg',
        }),
        minHeight: '100vh',
      }}>
      {mdUp && renderSection}
      {renderContent}
    </Stack>
  );
}

AuthClassicLayout.propTypes = {
  children: PropTypes.node,
  image: PropTypes.string,
  title: PropTypes.string,
};
