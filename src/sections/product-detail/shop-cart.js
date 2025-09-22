import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Iconify from 'src/components/iconify';

export default function ShopCart({ totalItems }) {
  const handleClick = (event) => {
    event.preventDefault();
    window.location.href = '/checkout/cart';
  };

  return (
    <Box
      component='div'
      onClick={handleClick}
      sx={{
        display: 'flex',
        cursor: 'pointer',
        color: 'text.primary',
        padding: { xs: '4px 16px 4px 4px', md: '4px 20px 4px 8px' },
      }}>
      <Badge badgeContent={totalItems} color='error' max={99}>
        <Iconify icon='solar:cart-3-linear' width={24} />
      </Badge>
    </Box>
  );
}

ShopCart.propTypes = {
  totalItems: PropTypes.number,
};
