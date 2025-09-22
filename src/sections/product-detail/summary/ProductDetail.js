export default function ProductDetail({
  data,
  price,
  specialPrice,
  childrenProduct,
  subSku,
}) {
  const priceStatus =
    data.custom_attributes.find(
      (attr) => attr.attribute_code === 'price_status'
    )?.value || '';

  const showSpecial = specialPrice && specialPrice !== 0;
  const displayPrice = price === 0 ? data.price : price;

  return (
    <div className='mt-3 mb-3 md:mt-0 flex flex-row md:flex-col justify-start items-center md:items-start gap-2 md:gap-1'>
      <p className='hidden md:block text-xl font-semibold mb-2'>{data.name}</p>
      {showSpecial ? (
        <>
          <span className='text-[14px] md:text-[18px] font-medium md:font-normal liburdulu-through'>
            Rp.
            {parseInt(
              childrenProduct && childrenProduct.length > 0
                ? (() => {
                    const matchedProduct = childrenProduct.find(
                      (product) => product.sku === subSku
                    );
                    return matchedProduct?.price;
                  })()
                : data.price || price
            ).toLocaleString()}
          </span>
          <p className='text-xl md:text-2xl font-semibold text-[#e52424]'>
            Rp. {parseInt(specialPrice).toLocaleString()}{' '}
            {priceStatus && (
              <span className='font-semibold text-[13px] text-liburdulu-black'>
                / {priceStatus}
              </span>
            )}
          </p>
        </>
      ) : (
        <p className='text-xl md:text-2xl font-semibold text-[#e52424]'>
          Rp. {parseInt(displayPrice).toLocaleString()}{' '}
          {priceStatus && (
            <span className='font-semibold text-[13px] text-liburdulu-black'>
              / {priceStatus}
            </span>
          )}
        </p>
      )}
    </div>
  );
}
