import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { alpha, useTheme } from '@mui/material/styles';
import { bgGradient } from 'src/theme/css';
import { varFade, MotionContainer } from 'src/components/animate';

export default function KebijakanPrivasiHero({ policy }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.grey[900], 0.8),
          imgUrl: `${policy.banner}`,
        }),
        height: { md: 420 },
        py: { xs: 10, md: 0 },
        overflow: 'hidden',
        position: 'relative',
      }}>
      <Container component={MotionContainer}>
        <Box
          sx={{
            bottom: { md: 80 },
            position: { md: 'absolute' },
            textAlign: { xs: 'center', md: 'unset' },
          }}>
          <Stack
            spacing={{ xs: 1, md: 2 }}
            display='inline-flex'
            direction='row'
            sx={{ color: 'common.white' }}>
            <TextAnimate text={policy.title} />
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

KebijakanPrivasiHero.propTypes = {
  policy: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
  }),
};

// ----------------------------------------------------------------------

function TextAnimate({ text, variants, sx, ...other }) {
  return (
    <Box
      component={m.div}
      sx={{
        typography: { xs: 'h3', md: 'h2' },
        overflow: 'hidden',
        display: 'inline-flex',
        ...sx,
      }}
      {...other}>
      <m.span variants={variants || varFade().inUp}>{text}</m.span>
    </Box>
  );
}

TextAnimate.propTypes = {
  sx: PropTypes.object,
  text: PropTypes.string,
  variants: PropTypes.object,
};
