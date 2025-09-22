'use client';

import { Pagination } from '@mui/material';
import ProductCard from '../reuseable/product-card';
import { useEffect, useState } from 'react';
import { useResponsive } from 'src/hooks/use-responsive';
import Cookies from 'js-cookie';

export default function ProductList({ filter, setFilter, product, isLoading }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  // const [cart, setCart] = useState('');

  // const TOKEN = Cookies.get('accessToken');

  // const toggleDrawer = (open) => (event) => {
  //   if (
  //     event.type === 'keydown' &&
  //     (event.key === 'Tab' || event.key === 'Shift')
  //   ) {
  //     return;
  //   }
  //   setOpen(open);
  // };

  const handleChange = (event, value) => {
    setFilter((filter) => ({
      ...filter,
      page: value,
    }));
  };

  const checkProduct = () => {
    return typeof product == 'object' && product.items.length > 0;
  };

  useEffect(() => {
    setData(product);
  }, [product]);

  return (
    <>
      <div className=''>
        <div className='grid items-center grid-flow-col auto-rows-auto my-5'>
          <div className=''>
            <p className='text-[18px] md:text-xl xl:text-2xl font-semibold'>
              {filter.categoryName}
            </p>
            <p className='text-[14px] md:text-base text-[#828282]'>
              {filter.categorySubName}
            </p>
          </div>
        </div>
        <div className='grid md:grid-cols-4 grid-cols-2 sm:grid-cols-2 min-[600px]:grid-cols-2 gap-4'>
          {!isLoading &&
            checkProduct() &&
            product.items.map((listproduct) => (
              <ProductCard
                id={listproduct.sku}
                idProduct={listproduct.id}
                name={listproduct.name}
                price={listproduct.price}
                image={listproduct.custom_attributes}
                from={'Promo Page'}
              />
            ))}
        </div>
        {!isLoading && !checkProduct() && <div className='hidden'></div>}
        {!isLoading && checkProduct() && (
          <div className='flex justify-center w-full p-3'>
            {product.total_count >= 12 && (
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
            )}
          </div>
        )}
      </div>
    </>
  );
}
