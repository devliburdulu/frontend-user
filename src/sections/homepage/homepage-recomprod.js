import { useState, useEffect } from 'react';
import ProductCard from '../reuseable/product-card';
import { getHomepageProduct } from '../../fetch-global';

export default function HomepageRecomprod() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchDataComp = async () => {
      try {
        const data = await getHomepageProduct();
        if (data && Array.isArray(data)) {
          const sortedData = data.sort((a, b) => b.id - a.id);
          setData(sortedData);
        } else {
          console.warn('Data tidak valid atau kosong:', data);
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching homepage products:', error);
        setData([]);
      }
    };
    fetchDataComp();
  }, []);

  return (
    <div className='my-8'>
      <span className='text-xl font-semibold'>Rekomendasi Produk</span>
      <br />
      <span className='text-[#828282]'>
        Liburan jadi lebih seru Bersama Liburdulu
      </span>
      <div className='mt-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-[450px]:grid-cols-2 gap-4'>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <ProductCard
              image={item.custom_attributes}
              key={item.id}
              id={item.sku}
              idProduct={item.id}
              name={item.name}
              price={item.price}
              from={'Home Page'}
            />
          ))
        ) : (
          <div className='col-span-full text-center py-8 text-gray-500'>
            Tidak ada produk rekomendasi saat ini
          </div>
        )}
      </div>
    </div>
  );
}
