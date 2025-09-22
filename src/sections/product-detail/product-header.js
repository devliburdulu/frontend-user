import { useEffect, useState, useRef } from 'react';
import { getAllReview, getProductChildren } from 'src/fetch-global';

import ProductName from './header/ProductName';
import ProductAttribute from './header/ProductAttribute';
import ProductSeller from './header/ProductSeller';

export default function ProductHeader({
  data,
  seller,
  category,
  sales,
  moveToMitraProfile,
  elementRef,
}) {
  const [currentSku, setCurrentSku] = useState(data.sku);
  const [review, setReview] = useState(-1);

  const location = data?.custom_attributes?.find(
    (attr) => attr.attribute_code === 'city'
  )?.value;

  const reviewCount = async (value) => {
    try {
      const data = await getAllReview(value);
      setReview(data.length);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    reviewCount(data.sku);
  }, [currentSku]);

  const checkSKU = data.sku;

  return (
    <div className='mx-0 md:mx-0'>
      <ProductName
        data={data}
        category={category}
        review={review}
        sales={sales}
      />
      <ProductAttribute
        data={data}
        category={category}
        location={location}
        review={review}
        sales={sales}
      />
      {checkSKU.includes('ldofficial') && <div className='mb-2'></div>}
      {!checkSKU.includes('ldofficial') && (
        <ProductSeller
          seller={seller}
          moveToMitraProfile={moveToMitraProfile}
          data={data}
          elementRef={elementRef}
        />
      )}
    </div>
  );
}
