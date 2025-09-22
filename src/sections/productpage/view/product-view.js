'use client';

import { useEffect, useState } from 'react';
import { _mock } from '../../../_mock';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Container from '@mui/material/Container';
import Banner from 'src/sections/reuseable/banner';
import ProductSidebar from '../product-sidebar';
import ListProduct from '../list-product';
import { Pagination } from '@mui/material';
import { useResponsive } from 'src/hooks/use-responsive';
import { getProduct } from 'src/rest/Product';
import Iconify from 'src/components/iconify/iconify';
import { useSnackbar } from 'notistack';
import { getHomeBanners } from 'src/rest/HomeBanner';

export const navConfig = [
  { id: 41, title: 'Paket Wisata', path: '/products/paket-wisata' },
  { id: 44, title: 'Hotel', path: '/products/hotel-convention' },
  { id: 45, title: 'Villa', path: '/products/villa' },
  { id: 47, title: 'Transportasi', path: '/products/transportasi' },
  { id: 46, title: 'Objek Wisata', path: '/products/objek-wisata' },
  { id: 48, title: 'Relaksasi', path: '/products/relaksasi' },
];

export default function ProductView() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');

  const categoryFromPath = pathname.split('/').pop();
  const category = navConfig.find((item) =>
    item.path.endsWith(categoryFromPath)
  ) || { id: 0, title: 'Semua Produk' };

  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      const response = await getHomeBanners();

      if (response) {
        const formattedBanners = response.map((banner) => ({
          id: banner.id,
          coverUrl: banner.image_desktop.url
            ? `${process.env.NEXT_PUBLIC_IMAGE_EDU}${banner.image_desktop.url}`
            : 'https://via.placeholder.com/600x300?text=No+Image+Available',
          title: banner.title,
          route: banner.url,
        }));

        setBanners(formattedBanners);
      }
    };

    fetchBanners();
  }, []);

  // THIS VAR FOR ALL FILTER
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
    page: pageParam ? parseInt(pageParam) : 1, // Ambil dari URL
  });

  // THIS VAR FOR PRODUCT
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [priceValue, setPriceValue] = useState({
    min: '',
    max: '',
  });
  const [debouncedInputValue, setDebouncedInputValue] = useState('');
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  // THIS USE EFFECT FOR REFRESH NEW DATA BASE ON FILTER CHANGE
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const result = await getProduct(filter.page, 12, {
          search: filter.search,
          minPrice: filter.minPrice > 0 ? filter.minPrice : undefined,
          maxPrice: filter.maxPrice > 0 ? filter.maxPrice : undefined,
        });
        setProduct(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [filter]);

  // THIS USE EFFECT FOR MAKE USEEFFECT GET DATA NOT TRIGGER WHEN SEARCH SET "" BECAUSE USER SELECT CATEGORY
  useEffect(() => {
    if (filter.categoryId != 0) {
      setIsFirstLaunch(true);
      setSearchValue('');
    }
  }, [filter.categoryId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(searchValue);
      if (isFirstLaunch) {
        setIsFirstLaunch(false);
      } else {
        if (searchValue) {
          setFilter((filter) => ({
            ...filter,
            categoryName: `Search "${searchValue}"`,
            categoryId: 0,
            search: searchValue.trim(),
            page: 1,
          }));
        } else {
          setFilter((filter) => ({
            ...filter,
            categoryName: `Semua Produk`,
            search: '',
            page: 1,
          }));
        }
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(priceValue);

      if (isFirstLaunch) {
        setIsFirstLaunch(false);
      } else {
        const min = priceValue.min ? parseInt(priceValue.min) : -1;
        const max = priceValue.max ? parseInt(priceValue.max) : -1;

        if (min > 0 && max > 0 && min > max) {
          enqueueSnackbar(
            'Filter harga minimum lebih besar dari harga maksimum',
            { variant: 'error' }
          );
          setFilter((prevFilter) => ({
            ...prevFilter,
            minPrice: -1,
            maxPrice: -1,
            page: 1,
          }));
        } else {
          setFilter((prevFilter) => ({
            ...prevFilter,
            minPrice: min,
            maxPrice: max,
            page: 1,
          }));
        }
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [priceValue]);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedId = localStorage.getItem('id');
      if (storedId) {
        setFilter((filter) => ({
          ...filter,
          categoryId: parseInt(storedId, 10),
          page: 1,
        }));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handlePageChange = (event, value) => {
    setFilter((prev) => ({ ...prev, page: value }));
    router.push(`${pathname}?page=${value}`, { scroll: false });
  };

  return (
    <Container sx={{ mt: 5, mb: 10 }}>
      <Banner data={banners} />
      {mdUp && (
        <div className='grid grid-cols-4 mt-5'>
          <div className='sticky top-[120px] max-h-[720px]'>
            <ProductSidebar
              filter={filter}
              setFilter={setFilter}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              priceValue={priceValue}
              setPriceValue={setPriceValue}
            />
          </div>
          <div className='col-span-3'>
            {!isLoading && (
              <ListProduct
                filter={filter}
                setFilter={setFilter}
                product={product}
                isLoading={isLoading}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                priceValue={priceValue}
                setPriceValue={setPriceValue}
              />
            )}
            {/* Pagination */}
            {!isLoading && product?.items?.length > 0 && (
              <div className='flex justify-center w-full p-3'>
                <Pagination
                  shape='rounded'
                  count={Math.ceil(product.total_count / 12)}
                  variant='outlined'
                  page={filter.page}
                  onChange={handlePageChange}
                />
              </div>
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
        <div className=''>
          {!isLoading && (
            <ListProduct
              filter={filter}
              setFilter={setFilter}
              product={product}
              isLoading={isLoading}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              priceValue={priceValue}
              setPriceValue={setPriceValue}
            />
          )}
          {/* Pagination */}
          {!isLoading && product?.items?.length > 0 && (
            <div className='flex justify-center w-full p-3'>
              <Pagination
                shape='rounded'
                count={Math.ceil(product.total_count / 12)}
                variant='outlined'
                page={filter.page}
                onChange={handlePageChange}
              />
            </div>
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
    </Container>
  );
}
