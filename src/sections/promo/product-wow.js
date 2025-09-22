'use client';

import { Pagination } from '@mui/material';
import ProductCard from '../reuseable/product-card';
import { useEffect, useState } from 'react';

export default function ProductWow({ filter, setFilter, product, isLoading }) {
  const [data, setData] = useState();

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
    <div className='mt-0'>
      <div className='grid grid-cols-1 gap-4'>
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
                from={'Promo Page'}
              />
            </div>
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
  );
}
