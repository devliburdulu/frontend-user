'use client';

import { Pagination } from '@mui/material';
import ProductCard from '../reuseable/product-card';
import { useEffect, useState } from 'react';
import { useResponsive } from 'src/hooks/use-responsive';
import Cookies from 'js-cookie';

export default function ListProduct({ product, isLoading }) {
  const [data, setData] = useState();

  const checkProduct = () => {
    return typeof product == 'object' && product.items.length > 0;
  };

  useEffect(() => {
    setData(product);
  }, [product]);

  return (
    <div className=''>
      <div className='grid md:grid-cols-4 grid-cols-2 sm:grid-cols-2 min-[600px]:grid-cols-2 gap-3 md:gap-4'>
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
    </div>
  );
}
