import { useEffect, useState } from 'react';
import ProductCard from '../reuseable/product-card';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useResponsive } from 'src/hooks/use-responsive';

export default function ProductHotel({ product, isLoading, isHotel }) {
  const [data, setData] = useState();
  const isMobile = useResponsive('down', 'md');

  const checkProduct = () => {
    return typeof product === 'object' && product?.items?.length > 0;
  };

  useEffect(() => {
    setData(product);
  }, [product]);

  if (isHotel !== true) return null;

  return (
    <>
      <div>
        <div className='flex flex-col md:flex-row mt-8 md:mt-10 mb-5 justify-between'>
          <div className='w-full md:w-2/3'>
            <p className='text-[18px] md:text-xl font-semibold'>
              Rekomendasi Hotel Ekslusif Kami
            </p>
            <p className='text-[14px] md:text-base text-[#828282]'>
              Jelajahi kemudahan akomasimu, dan paket menarik lainnya di
              kategori Hotel & Convention
            </p>
          </div>
        </div>

        {isMobile ? (
          <div className='mx-0'>
            {!isLoading && checkProduct() && (
              <Swiper
                slidesPerView={1.8}
                spaceBetween={12}
                breakpoints={{
                  720: { slidesPerView: 3.6 },
                  600: { slidesPerView: 2.8 },
                  450: { slidesPerView: 2.6 },
                  120: { slidesPerView: 1.7 },
                }}
                style={{ padding: '0 0 4px' }}>
                {product.items.slice(0, 4).map((listproduct) => (
                  <SwiperSlide key={listproduct.id}>
                    <ProductCard
                      id={listproduct.sku}
                      idProduct={listproduct.id}
                      name={listproduct.name}
                      price={listproduct.price}
                      image={listproduct.custom_attributes}
                      from='Catalog'
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        ) : (
          <div className='grid md:grid-cols-4 grid-cols-2 sm:grid-cols-2 min-[600px]:grid-cols-2 gap-4'>
            {!isLoading &&
              checkProduct() &&
              product.items.slice(0, 4).map((listproduct) => (
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
              ))}
          </div>
        )}

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
    </>
  );
}
