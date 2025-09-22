import {
  Button,
  Drawer,
  InputAdornment,
  TextField,
  Pagination,
} from '@mui/material';
// import ShopCard from '../reuseable/shop-card';
import ProductCard from '../reuseable/product-card';
import { useEffect, useState } from 'react';
import ProductSidebar from './product-sidebar';
import Iconify from 'src/components/iconify';
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

  const handleChange = (event, value) => {
    setFilter((filter) => ({
      ...filter,
      page: value,
    }));
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const mdUp = useResponsive('up', 'md');

  const checkProduct = () => {
    return typeof product == 'object' && product.items.length > 0;
  };

  useEffect(() => {
    setData(product);
  }, [product]);

  return (
    <>
      <div className='relative'>
        <div className='flex flex-col md:flex-row my-5'>
          <div className='w-full md:w-2/3'>
            <p className='text-[18px] md:text-xl font-semibold'>
              {filter.categoryName}
            </p>
            <p className='text-[14px] md:text-base text-[#828282]'>
              {!filter.categoryName
                ? ''
                : `Jelajahi kategori kami untuk kebahagiaan maksimal.`}
            </p>
          </div>
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
        </div>

        <div
          className={`grid ${
            product.items.length < 2
              ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
              : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3'
          } gap-4`}>
          {!isLoading &&
            checkProduct() &&
            product.items.map((listproduct) => (
              <div key={listproduct.id}>
                <ProductCard
                  id={listproduct.sku}
                  idProduct={listproduct.id}
                  name={listproduct.name}
                  price={listproduct.price}
                  image={listproduct.custom_attributes}
                  from={'Catalog Mitra Page'}
                />
              </div>
            ))}
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
              {/* Mungkin kamu salah ketik? */}
              Koreksi dan cek yang kamu ketik.
            </span>
          </div>
        )}

        {!isLoading && checkProduct() && product.items.length > 12 && (
          <div className='flex justify-center w-full p-3'>
            <Pagination
              shape='rounded'
              count={
                parseInt(product.total_count / 12) +
                (product.total_count % 12 !== 0 ? 1 : 0)
              }
              variant='outlined'
              page={filter.page}
              onChange={handleChange}
            />
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
