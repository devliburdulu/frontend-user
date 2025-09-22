import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const logo = (
    <Box
      component='div'
      sx={{
        width: 120,
        height: 60,
        display: 'inline-flex',
        paddingY: 1,
        ...sx,
      }}>
      <img src='/logo.png' className='object-contain' alt='' />
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href='/' sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
