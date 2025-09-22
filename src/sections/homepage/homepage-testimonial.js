import { m } from 'framer-motion';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { _testimonials } from 'src/_mock/_others';
import { bgGradient, hideScrollY } from 'src/theme/css';
import Iconify from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export function HomepageTestimonial() {
  const theme = useTheme();

  const renderDescription = (
    <Box
      sx={{ maxWidth: { lg: 360 }, textAlign: { xs: 'center', lg: 'unset' } }}>
      <m.div variants={varFade().inUp}>
        <Typography
          sx={{
            mt: { xs: 0, lg: 3 },
            mb: 1.5,
            color: 'common.white',
            fontSize: { xs: '1.3rem', md: '2rem', lg: '2.5rem' },
            lineHeight: { xs: '2rem', md: '2.5rem', lg: '3rem' },
            fontWeight: 600,
          }}>
          Kata mereka tentang Mitra-Mitra Liburdulu.id
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography sx={{ color: 'common.white', fontSize: '14px' }}>
          Bergabunglah dengan mitra liburdulu dan menjadi bagian dari keluarga
          kami, temukan tamu wisatamu dengan berbagai kemudahan yang menarik
          untuk usahamu!
        </Typography>
      </m.div>
    </Box>
  );

  const renderContent = (
    <Box
      sx={{
        ...hideScrollY,
        py: { lg: 10 },
        height: { md: 1 },
        overflowY: { xs: 'unset', md: 'auto' },
      }}>
      <Masonry spacing={2} columns={{ xs: 1, md: 2 }} sx={{ ml: 0 }}>
        {_testimonials.map((testimonial) => (
          <m.div key={testimonial.name} variants={varFade().inUp}>
            <TestimonialCard testimonial={testimonial} />
          </m.div>
        ))}
      </Masonry>
    </Box>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.08 : 0.15
          ),
          imgUrl: '/assets/home/bg-home-testimonial.png',
        }),
        overflow: 'hidden',
        height: { lg: 650 },
        py: { xs: 4.5, md: 4, lg: 0 },
        mt: { xs: 5, md: 6, lg: 5 },
        borderRadius: '20px',
      }}>
      <Container
        component={MotionViewport}
        sx={{ position: 'relative', height: 1 }}>
        <Grid
          container
          spacing={3}
          alignItems='center'
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ height: 1 }}>
          <Grid
            xs={12}
            lg={5}
            sx={{ px: { xs: '2rem', md: '4rem', lg: '5.5rem' }, py: '2rem' }}>
            {renderDescription}
          </Grid>

          <Grid xs={12} lg={7} alignItems='center' sx={{ height: 1 }}>
            {renderContent}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function TestimonialCard({ testimonial, sx, ...other }) {
  const { name, ratingNumber, content, avatarUrl } = testimonial;

  return (
    <Stack
      spacing={1}
      sx={{
        backgroundColor: '#67717c',
        p: 3,
        borderRadius: 2.5,
        color: '#FFF',
        ...sx,
      }}
      {...other}>
      <Iconify
        icon='mingcute:quote-left-fill'
        width={40}
        sx={{ opacity: 0.48 }}
      />
      <Typography variant='body2'>{content}</Typography>
      <Rating value={ratingNumber} readOnly size='small' />
      <Stack direction='row' alignItems='center'>
        <Avatar alt={name} src={avatarUrl} sx={{ mr: 1.5 }} />
        <ListItemText
          primary={name}
          primaryTypographyProps={{ typography: 'subtitle2', mb: 0 }}
        />
      </Stack>
    </Stack>
  );
}
