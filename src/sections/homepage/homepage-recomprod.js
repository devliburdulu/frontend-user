import { useState, useEffect } from 'react';
import ProductCard from '../reuseable/product-card';
import { getHomepageProduct } from '../../fetch-global';

export default function HomepageRecomprod() {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchDataComp = async () => {
      const result = await getHomepageProduct().then((data) => {
        const sortedData = data.sort((a, b) => b.id - a.id);
        setData(sortedData);
      });
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
        {data?.map((item, index) => (
          <ProductCard
            image={item.custom_attributes}
            key={item.id}
            id={item.sku}
            idProduct={item.id}
            name={item.name}
            price={item.price}
            from={'Home Page'}
          />
        ))}
      </div>
    </div>
  );
}
