import { CreateBuyNow, addToCart } from 'src/rest/Cart';
import { paths } from 'src/routes/paths';
import { enqueueSnackbar } from 'notistack';

export const handleAddToCart = async ({
  TOKEN_USER,
  cart,
  listCustomOptions,
  data,
  setIsAddToCart,
  setItemCount,
  handleUpdateCart,
  router,
}) => {
  if (!TOKEN_USER) {
    router.push(paths.auth.jwt.login);
    return;
  }

  setIsAddToCart(true);
  handleUpdateCart();

  try {
    const addCart = await addToCart(
      cart,
      TOKEN_USER,
      listCustomOptions,
      data.id,
      data.type_id
    );

    if (addCart) {
      if (!addCart.message || addCart.message === 'Success') {
        setItemCount(addCart?.data?.total_item_count || 0);
        enqueueSnackbar('Berhasil tambah ke keranjang');
      } else {
        enqueueSnackbar(addCart.message || 'Gagal tambah ke keranjang', {
          variant: 'error',
        });
      }
    } else {
      enqueueSnackbar('Gagal tambah ke keranjang', { variant: 'error' });
    }
  } catch (error) {
    console.error(error);
    if (error?.response?.status === 400) {
      enqueueSnackbar('Gagal tambah ke keranjang', { variant: 'error' });
    } else {
      enqueueSnackbar('Gagal tambah ke keranjang', { variant: 'error' });
    }
  } finally {
    setIsAddToCart(false);
  }
};

export const handleBuyNow = async ({
  TOKEN_USER,
  cart,
  listCustomOptions,
  data,
  setIsBuyNow,
  router,
}) => {
  if (!TOKEN_USER) {
    router.push(paths.auth.jwt.login);
    return;
  }

  setIsBuyNow(true);

  try {
    const addBuyNow = await CreateBuyNow(
      cart,
      TOKEN_USER,
      listCustomOptions,
      data.id,
      data.type_id
    );

    if (addBuyNow) {
      if (!addBuyNow.message || addBuyNow.message === 'Success') {
        router.push('/checkout/checkout-form');
      } else {
        enqueueSnackbar(addBuyNow.message || 'Gagal Pesan Sekarang', {
          variant: 'error',
        });
      }
    } else {
      enqueueSnackbar('Gagal Pesan Sekarang', { variant: 'error' });
    }
  } catch (error) {
    console.error(error);
    if (error?.response?.status === 400) {
      enqueueSnackbar('Gagal Pesan Sekarang', { variant: 'error' });
    } else {
      enqueueSnackbar('Gagal Pesan Sekarang', { variant: 'error' });
    }
  } finally {
    setIsBuyNow(false);
  }
};
