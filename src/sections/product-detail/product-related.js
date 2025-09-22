import { useEffect, useState } from 'react';
import ProductCard from '../reuseable/product-card';
import { getProduct } from 'src/fetch-global';

export default function ProductRelated({ category }) {
  const [product, setProduct] = useState([]);
  const [filter, setFilter] = useState({
    categoryId: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (category) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        categoryId: category.value[0],
      }));
    }
  }, [category]);

  useEffect(() => {
    const fetchData = async () => {
      if (filter.categoryId) {
        setIsLoading(true);
        try {
          const result = await getProduct(1, 4, filter);
          setProduct(result);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [filter]);

  return (
    <div className='mx-3 md:mx-0'>
      <p className='text-xl md:text-2xl font-semibold mt-4 md:mt-8 my-4 md:my-2 text-center w-full'>
        Produk Lainnya
      </p>
      <div className='grid md:grid-cols-4 grid-cols-2 sm:grid-cols-2 min-[600px]:grid-cols-2 gap-4'>
        {product.items && product.items.length > 0 ? (
          product.items.map((listproduct) => (
            <ProductCard
              key={listproduct.sku}
              id={listproduct.sku}
              idProduct={listproduct.id}
              name={listproduct.name}
              price={listproduct.price}
              image={listproduct.custom_attributes}
              from={'Single Page ( Related Product )'}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
      {isLoading && <p>Loading...</p>}
    </div>
  );
}
