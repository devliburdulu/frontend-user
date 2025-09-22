import Label from 'src/components/label/label';
import Image from 'next/image';

export default function ProductAttribute({
  category,
  review,
  sales,
  location,
}) {
  const categories = Array.isArray(category)
    ? category.slice(0, 2)
    : [category];

  const showReviewSales = review > 0 && sales > 0;

  return (
    <div className='box-items mx-1'>
      <div className='mb-3 flex flex-col-reverse md:flex-row justify-start items-start md:items-center'>
        <div className='mb-0'>
          {categories.map((item, index) => (
            <Label
              key={index}
              variant='soft'
              color='success'
              sx={{
                fontWeight: 500,
                fontSize: { xs: '14px', md: '12px' },
                marginRight: '0.25rem',
              }}>
              {item}
            </Label>
          ))}
        </div>

        <div className='text-liburdulu-blue text-sm sm:text-xs font-medium flex items-center mb-1.5 md:mb-0'>
          <Image
            src='/libur_dulu_logo_only_Converted.png'
            alt='logo-converted'
            height={21}
            width={25}
            style={{
              objectFit: 'contain',
              marginRight: 1,
            }}
          />
          <span className='line-clamp-1'>{location}</span>
        </div>
      </div>
      {showReviewSales && (
        <div className='mb-3 flex flex-row justify-start items-center'>
          {review > 0 && (
            <div className='text-sm md:text-sm font-medium mr-1'>
              ({review} ulasan)
            </div>
          )}
          {sales > 0 && (
            <div className='text-sm md:text-sm opacity-90 mr-2'>
              • {sales} kali dipesan
            </div>
          )}
        </div>
      )}
    </div>
  );
}
