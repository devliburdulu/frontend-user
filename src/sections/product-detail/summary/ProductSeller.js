import { Avatar, Divider, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';

const ProductSeller = ({ seller, moveToMitraProfile, data, elementRef }) => {
  if (!seller) return null;

  return (
    <div>
      <Divider sx={{ borderStyle: 'dashed', mt: 1, mb: 1.5 }} />
      <div className='flex items-start justify-start gap-4'>
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
        <div className='flex flex-col items-start'>
          <button
            className='text-[16px] font-semibold ms-[5px]'
            onClick={() => moveToMitraProfile(data.sku)}>
            {seller?.shop_title}
          </button>

          <div ref={elementRef} className='flex items-center gap-4'>
            <div className='flex items-center gap-2 max-w-xs'>
              <Iconify
                icon='mdi:location-on-outline'
                width={24}
                height={24}
                style={{ color: '#1D9CAB' }}
              />
              <p className='text-[13px] font-light'>
                {seller?.company_locality}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Divider sx={{ borderStyle: 'dashed', mt: 1, mb: 2 }} />
    </div>
  );
};

export default ProductSeller;
