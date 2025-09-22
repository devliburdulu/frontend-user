'use client';

import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import CheckoutCardProduct from './checkout-card-product';
import Button from '@mui/material/Button';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function CheckoutCardListProduct({
  cart,
  onDelete,
  deletingItemId,
}) {
  return (
    <Scrollbar>
      <Box sx={{ px: 0, pt: 2, pb: 0 }}>
        <Grid container rowSpacing={{ xs: 2, md: 3 }}>
          {cart?.map((row) => (
            <Grid item xs={12} key={row.id} sx={{ height: 'auto' }}>
              <CheckoutCardProduct
                row={row}
                onDelete={() => onDelete(row.id)}
                isDeleting={deletingItemId === row.id}
              />
            </Grid>
          ))}
        </Grid>
        <Button
          href={paths.product.root}
          color='inherit'
          startIcon={<Iconify icon='eva:arrow-ios-back-fill' />}
          sx={{ fontWeight: 600, mt: '10px' }}>
          Lanjut Belanja
        </Button>
      </Box>
    </Scrollbar>
  );
}

CheckoutCardListProduct.propTypes = {
  onDelete: PropTypes.func,
  products: PropTypes.array,
  deletingItemId: PropTypes.string,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
};
