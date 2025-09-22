'use client';

import { useEffect, useState } from 'react';
import { _mock } from 'src/_mock';
import { useResponsive } from 'src/hooks/use-responsive';
import { getProductCategoryHotel } from 'src/rest/Product';
import ProductHotel from '../productpage/product-hotel';
import Iconify from 'src/components/iconify/iconify';

export default function HotelExclusiveRecommendation() {
  //
  const [filter, setFilter] = useState({
    categoryName:
      typeof localStorage !== 'undefined'
        ? localStorage.getItem('search')
          ? localStorage.getItem('search')
          : 'Semua Produk'
        : 'Semua Produk',
    categoryId:
      typeof localStorage !== 'undefined'
        ? localStorage.getItem('id')
          ? localStorage.getItem('id')
          : 0
        : 0,
    search: '',
    maxPrice: -1,
    minPrice: -1,
    page: 1,
  });

  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const mdUp = useResponsive('up', 'md');

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const result = await getProductCategoryHotel(filter.page, 12, {});
        setProduct(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [filter]);

  return (
    <div sx={{ mt: 5, mb: 10, px: { xs: 2, md: 0 } }}>
      {mdUp && (
        <div className='grid grid-cols-2 mt-5'>
          <div className='col-span-3'>
            {!isLoading && (
              <ProductHotel
                filter={filter}
                product={product}
                isLoading={isLoading}
                isHotel={true}
              />
            )}
            {isLoading && (
              <div className='grid grid-cols-1 h-[600px] place-content-center'>
                <div className='place-self-center'>
                  <Iconify
                    icon='line-md:loading-loop'
                    sx={{ fontSize: 20, color: '#000000' }}
                  />
                </div>
                <p className='place-self-center text-3xl font-semibold'>
                  Mohon Tunggu
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {!mdUp && (
        <div className='px-4'>
          {!isLoading && (
            <ProductHotel
              filter={filter}
              product={product}
              isLoading={isLoading}
              isHotel={true}
            />
          )}
          {isLoading && (
            <div className='grid grid-cols-1 h-[600px] place-content-center'>
              <div className='place-self-center'>
                <Iconify
                  icon='line-md:loading-loop'
                  sx={{ fontSize: 20, color: '#000000' }}
                />
              </div>
              <p className='place-self-center text-3xl font-semibold'>
                Mohon Tunggu
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
