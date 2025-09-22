'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { enqueueSnackbar } from 'notistack';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CheckoutCardListProduct from '../checkout-card-list-product';
import SummaryOrder from '../summary-order';
import { getCartForward, deleteProduct } from 'src/rest/Cart';
import { paths } from 'src/routes/paths';
import { useCartContext } from 'src/context/CartContext';

export default function ShoppingCartView() {
  const TOKEN_USER = Cookies.get('accessToken');
  const [empty, setEmpty] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState({});
  const [subtotals, setSubTotals] = useState({});
  const [discount, setDiscount] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const { itemCount, setItemCount } = useCartContext();

  useEffect(() => {
    const fetchCartData = async () => {
      setIsLoading(true);
      try {
        const cartData = await getCartForward(TOKEN_USER);
        console.log('Cek Data Cart :', cartData);
        const items = cartData?.data?.items || [];
        const grandTotal = cartData?.data?.grand_total || {};
        const grandSubtotal = cartData?.data?.subtotal || {};
        const discountItem = cartData?.data?.discount || {};
        const itemCountFromAPI = cartData?.data?.total_item_count || 0;

        setCartItems(items);
        setEmpty(items.length === 0);
        setTotals(grandTotal);
        setSubTotals(grandSubtotal);
        setDiscount(discountItem);
        setItemCount(itemCountFromAPI);
        localStorage.setItem('itemCount', itemCountFromAPI);
      } catch (error) {
        console.error('Failed to fetch cart data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartData();
  }, [TOKEN_USER, setItemCount]);

  const handleDelete = async (productId) => {
    setDeletingItemId(productId);
    try {
      const deleteResponse = await deleteProduct(TOKEN_USER, productId);
      if (deleteResponse) {
        const updatedItems = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedItems);
        setEmpty(updatedItems.length === 0);

        enqueueSnackbar('Berhasil hapus item dari keranjang', {
          variant: 'success',
        });

        const updatedTotals = deleteResponse.data.grand_total;
        const updatedGrandSubtotal = deleteResponse.data.subtotal;
        const updatedDiscount = deleteResponse.data.discount;
        setTotals(updatedTotals);
        setSubTotals(updatedGrandSubtotal);
        setDiscount(updatedDiscount);

        const newItemCount = deleteResponse.data.total_item_count;
        setItemCount(newItemCount);
        localStorage.setItem('itemCount', newItemCount);
      } else {
        enqueueSnackbar('Gagal hapus item dari keranjang', {
          variant: 'error',
        });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      enqueueSnackbar('Error deleting item. Please try again.', {
        variant: 'error',
      });
    } finally {
      setDeletingItemId(null);
    }
  };

  return (
    <Container sx={{ mt: 7, mb: 10 }}>
      {/* Hide this block checkout summary when cart is empty */}
      {empty && (
        <Grid container spacing={3}>
          <Grid xs={12}>
            <Typography variant='h5' sx={{ fontWeight: 600, mb: 1 }}>
              Keranjang
            </Typography>
            {isLoading ? (
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='50vh'
                flexDirection='column'>
                <CircularProgress size={30} color='inherit' />
                <Typography variant='h5' sx={{ mt: 2, fontWeight: 500 }}>
                  Mohon Tunggu...
                </Typography>
              </Box>
            ) : (
              <EmptyContent
                title='Keranjang Belanja Masih Kosong'
                description='Yuk, isi dengan produk-produk menarik dari Mitra Liburdulu.id'
                imgUrl='/assets/icons/empty/ic_cart.svg'
                sx={{ pt: 0, pb: 5, height: 'auto' }}
              />
            )}
            <Button
              href={paths.product.root}
              color='inherit'
              startIcon={<Iconify icon='eva:arrow-ios-back-fill' />}
              sx={{ fontWeight: 600 }}>
              Lanjut Belanja
            </Button>
          </Grid>
        </Grid>
      )}

      {/* Show checkout summary when cart is not empty */}
      {!empty && (
        <Grid container spacing={3} sx={{ position: 'relative' }}>
          <Grid xs={12} md={8}>
            <Typography variant='h5' sx={{ fontWeight: 600, mb: 1 }}>
              Keranjang
            </Typography>

            {isLoading ? (
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='50vh'
                flexDirection='column'>
                <CircularProgress size={30} color='inherit' />
                <Typography variant='h5' sx={{ mt: 2, fontWeight: 500 }}>
                  Mohon Tunggu...
                </Typography>
              </Box>
            ) : empty ? (
              <EmptyContent
                title='Keranjang Belanja Masih Kosong'
                description='Yuk, isi dengan produk-produk menarik dari Mitra Liburdulu.id'
                imgUrl='/assets/icons/empty/ic_cart.svg'
                sx={{ pt: 0, pb: 5, height: 'auto' }}
              />
            ) : (
              <CheckoutCardListProduct
                cart={cartItems}
                onDelete={handleDelete}
                deletingItemId={deletingItemId}
              />
            )}
          </Grid>
          <Grid xs={12} md={4} sx={{ position: 'relative' }}>
            <div style={{ position: 'sticky', top: 190 }}>
              <SummaryOrder
                item={cartItems}
                total={totals}
                subtotal={subtotals}
                discount={discount}
              />
            </div>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
