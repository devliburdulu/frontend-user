import { Avatar, Typography } from '@mui/material';

const ProductSeller = ({ data, seller, moveToMitraProfile, elementRef }) => {
  if (!seller) return null;

  return (
    <div className='flex items-center gap-2 mt-4 mb-3 md:mb-5 px-1 md:px-0'>
      {seller?.logo_pic === null ? (
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: 'rgba(29, 156, 171, 0.2)',
          }}
          className='shadow'>
          {seller?.shop_title?.charAt(0)}
        </Avatar>
      ) : (
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: 'rgba(29, 156, 171, 0.2)',
          }}
          className='shadow'
          src={`${process.env.NEXT_PUBLIC_MAGENTO_API}/media/${seller?.logo_pic}`}
        />
      )}
      <div className='flex flex-col'>
        <button
          type='button'
          onClick={() => moveToMitraProfile(data.sku)}
          className='text-left p-0 m-0 bg-transparent border-0 cursor-pointer ms-0'
          style={{ font: 'inherit' }}
          ref={elementRef}>
          <div className='text-[10px] md:text-xs opacity-90'>
            Produk Disediakan Oleh
          </div>
          <Typography
            variant='subtitle1'
            sx={{
              fontSize: { xs: '13px', md: '16px' },
              fontWeight: { xs: 500, md: 600 },
            }}>
            {seller?.shop_title}
          </Typography>
        </button>
      </div>
    </div>
  );
};

export default ProductSeller;
