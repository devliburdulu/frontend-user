import { Button, Drawer, InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import ProductCard from '../reuseable/product-card';
import Iconify from 'src/components/iconify';
import ProductSidebar from './product-sidebar';
import { useResponsive } from 'src/hooks/use-responsive';

export default function ProductList({
  filter,
  setFilter,
  product,
  isLoading,
  searchValue,
  setSearchValue,
  priceValue,
  setPriceValue,
  isHotel,
}) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpen(open);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const mdUp = useResponsive('up', 'md');

  const checkProduct = () => {
    return typeof product === 'object' && product?.items?.length > 0;
  };

  useEffect(() => {
    setData(product);
  }, [product]);

  return (
    <>
      <div>
        <div
          className={`flex flex-col md:flex-row my-5 ${
            isHotel === true ? 'justify-between' : ''
          }`}>
          <div className='w-full md:w-2/3'>
            <p className='text-[18px] md:text-xl font-semibold'>
              {isHotel === true
                ? 'Rekomendasi Hotel Ekslusif Kami'
                : filter.categoryName}
            </p>
            <p className='text-[14px] md:text-base text-[#828282]'>
              {isHotel === true
                ? 'Jelajahi kemudahan akomasimu, dan paket menarik lainnya di kategori Hotel & Convention'
                : !filter.categoryName
                ? ''
                : `Jelajahi kategori kami untuk kebahagiaan maksimal.`}
            </p>
          </div>

          {isHotel !== true ? (
            <div className='w-full md:w-1/3 mt-5 md:mt-0'>
              <TextField
                id='search'
                placeholder='Cari Nama Produk'
                type='search'
                variant='outlined'
                value={searchValue}
                onChange={handleSearchChange}
                className='w-full'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Iconify
                        icon='icon-park-outline:search'
                        sx={{ color: 'text.disabled' }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#212b36',
                    fontWeight: 'bold',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#919EAB',
                      borderWidth: '1px',
                    },
                    '&.Mui-focused': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '1.5px',
                      },
                    },
                  },
                }}
              />
              {!mdUp && (
                <Button
                  onClick={toggleDrawer(true)}
                  className='w-full h-fit place-self-center'
                  variant='outlined'
                  startIcon={<Iconify icon='mage:filter' />}
                  sx={{
                    border: '1px solid',
                    padding: '8px 12px',
                    fontWeight: 500,
                    mt: 2,
                  }}>
                  Filter Produk
                </Button>
              )}
            </div>
          ) : (
            <div className='flex items-end md:items-center justify-end'>
              <a
                href='/products/hotel-convention'
                className='flex items-end md:items-center justify-end text-[#FF5C00] text-[14px] md:text-base font-semibold'
                sx={{
                  ':hover': {
                    backgroundColor: '#fff',
                  },
                  padding: '8px 12px',
                  fontWeight: 500,
                  color: '#FF5C00',
                  mt: 2,
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}>
                Lihat semua produk
              </a>
            </div>
          )}
        </div>

        <div
          className={`grid ${
            isHotel === true ? 'md:grid-cols-4' : 'md:grid-cols-3'
          } grid-cols-2 sm:grid-cols-2 min-[600px]:grid-cols-2 gap-4`}>
          {!isLoading &&
            checkProduct() &&
            (isHotel === true
              ? product.items.slice(0, 4).map((listproduct) => (
                  <div key={listproduct.id}>
                    <ProductCard
                      id={listproduct.sku}
                      idProduct={listproduct.id}
                      name={listproduct.name}
                      price={listproduct.price}
                      image={listproduct.custom_attributes}
                      from='Catalog'
                    />
                  </div>
                ))
              : product.items.map((listproduct) => (
                  <div key={listproduct.id}>
                    <ProductCard
                      id={listproduct.sku}
                      idProduct={listproduct.id}
                      name={listproduct.name}
                      price={listproduct.price}
                      image={listproduct.custom_attributes}
                      from='Catalog'
                    />
                  </div>
                )))}
        </div>

        {!isLoading && !checkProduct() && (
          <div className='grid grid-cols-1 h-[180px] md:h-[420px] place-content-center justify-center text-center'>
            <span className='text-xl md:text-2xl font-semibold place-self-center'>
              Maaf, Produk tidak ditemukan!
            </span>
            <span className='text-xs md:text-base font-normal text-[#828282]'>
              Maaf, kami tidak menemukan produk yang kamu cari.
            </span>
            <span className='text-xs md:text-base font-normal text-[#828282]'>
              Koreksi dan cek yang kamu ketik.
            </span>
          </div>
        )}
      </div>

      <Drawer
        anchor='bottom'
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            overflow: 'hidden',
          },
        }}>
        <ProductSidebar
          filter={filter}
          setFilter={setFilter}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          priceValue={priceValue}
          setPriceValue={setPriceValue}
        />
      </Drawer>
    </>
  );
}
