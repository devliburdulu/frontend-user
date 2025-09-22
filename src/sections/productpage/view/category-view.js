'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Container from '@mui/material/Container';
import { Pagination } from '@mui/material';
import Banner from 'src/sections/reuseable/banner';
import ProductSidebar from '../product-sidebar';
import ProductList from '../product-listproduct';
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
  { id: 75, title: 'Libur Voucher', path: '/products/libur-voucher' },
];

export default function CategoryView() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');

  const categoryFromPath = pathname.split('/').pop();
  const category = navConfig.find((item) =>
    item.path.endsWith(categoryFromPath)
  ) || { id: 0, title: 'Semua Produk' };

  const [banners, setBanners] = useState([]);
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [priceValue, setPriceValue] = useState({ min: '', max: '' });
  const [debouncedInputValue, setDebouncedInputValue] = useState('');
  const [filter, setFilter] = useState({
    categoryName: category.title,
    categoryId: category.id,
    search: '',
    maxPrice: -1,
    minPrice: -1,
    page: pageParam ? parseInt(pageParam) : 1,
  });

  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

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

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const result = await getProduct(filter.page, 12, filter)
          .then((data) => {
            setProduct(data);
          })
          .finally(() => setIsLoading(false));
        // console.log('result: ', result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    setIsFirstLaunch(false);

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('id', filter.categoryId);
      sessionStorage.setItem('search', filter.categoryName);
    }
  }, [filter]);

  console.log('filter: ', filter);
  console.log('product: ', product);

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
          setFilter((prevFilter) => ({
            ...prevFilter,
            search: searchValue,
            categoryId: prevFilter.categoryId,
            page: 1,
          }));
        } else {
          setFilter((prevFilter) => ({
            ...prevFilter,
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

  const handlePageChange = (event, value) => {
    setFilter((prev) => ({ ...prev, page: value }));
    router.push(`${pathname}?page=${value}`, { scroll: false });
  };

  return (
    <Container sx={{ mt: 5, mb: 10 }}>
      <Banner data={banners} />
      <div className='grid grid-cols-3 md:grid-cols-4 mt-5'>
        {mdUp && (
          <div className='sticky top-[120px] max-h-[720px]'>
            <ProductSidebar
              // filter={filter}
              // setFilter={setFilter}
              // searchValue={searchValue}
              // setSearchValue={setSearchValue}
              // priceValue={priceValue}
              // setPriceValue={setPriceValue}
              filter={filter}
              setFilter={setFilter}
              product={product}
              isLoading={isLoading}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              priceValue={priceValue}
              setPriceValue={setPriceValue}
            />
          </div>
        )}
        <div className={`col-span-3 ${!mdUp && 'w-full'}`}>
          {!isLoading && (
            <ProductList
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
        </div>
      </div>
    </Container>
  );
}
