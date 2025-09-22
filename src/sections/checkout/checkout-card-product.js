import { Card, Stack } from '@mui/material';
import { fCurrency } from 'src/utils/format-number';
import Image from 'next/image';
import CircularProgress from '@mui/material/CircularProgress';
import Iconify from 'src/components/iconify';
import PropTypes from 'prop-types';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from 'next/link';
import { paths } from 'src/routes/paths';
import { fDate } from 'src/utils/format-time';

export default function CheckoutCardProduct({ row, onDelete, isDeleting }) {
  const optionsString = row.options;
  let options = [];
  try {
    options = optionsString ? JSON.parse(optionsString) : [];
  } catch (error) {
    console.error('Error parsing optionsString:', error);
    options = [];
  }

  return (
    <Card
      sx={{
        border: '1px solid #d8dce8',
        borderRadius: '16px',
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
      className='px-3 py-5 md:px-5 flex flex-col space-y-5'>
      <Stack
        direction='column'
        alignItems='start'
        sx={{
          pb: { xs: 1, md: 2 },
          borderBottom: (theme) =>
            `dashed 2px ${theme.palette.background.neutral}`,
        }}>
        <div className='flex flex-col md:flex-row w-full'>
          <div className='w-full md:w-3/4'>
            <Link href={paths.product.details(row.sku)} className='relative'>
              <div className='flex flex-row w-full'>
                <div className='relative mr-3 sm:mr-0 w-44 sm:w-40 lg:w-48 rounded-lg'>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_MAGENTO_API}/pub/media/catalog/product${row.thumbnail}`}
                    width={160}
                    height={160}
                    quality={100}
                    priority={true}
                    alt='product_thumbnail'
                    className='rounded-lg hidden lg:block'
                    style={{ objectFit: 'cover', height: 160 }}
                  />
                  <Image
                    src={`${process.env.NEXT_PUBLIC_MAGENTO_API}/pub/media/catalog/product${row.thumbnail}`}
                    width={140}
                    height={140}
                    quality={100}
                    priority={true}
                    alt='product_thumbnail'
                    className='rounded-lg hidden sm:block lg:hidden'
                    style={{ objectFit: 'cover', height: 140 }}
                  />
                  <Image
                    src={`${process.env.NEXT_PUBLIC_MAGENTO_API}/pub/media/catalog/product${row.thumbnail}`}
                    width={130}
                    height={130}
                    quality={100}
                    priority={true}
                    alt='product_thumbnail'
                    className='rounded-lg block sm:hidden'
                    style={{ objectFit: 'cover', height: 130 }}
                  />
                </div>
                <div className='w-4/5 flex flex-col ml-0 md:ml-3'>
                  <Link
                    href={paths.product.details(row.sku)}
                    className='relative'>
                    <div className='font-semibold text-sm sm:text-base mb-1'>
                      {row.name}
                    </div>
                    <div className='flex flex-row mb-3'>
                      <span className='text-[10px] sm:text-xs opacity-90'>
                        {row.qty} {''}
                      </span>
                      <span className='text-[10px] sm:text-xs opacity-90 mx-1'>
                        x
                      </span>
                      <span className='text-[10px] sm:text-xs opacity-90'>
                        {fCurrency(row.price)}
                      </span>
                    </div>
                    <div className='hidden sm:block mb-1'>
                      {options.length > 0 ? (
                        options.map((item, index) => (
                          <div
                            className='flex flex-col lg:flex-row text-[11px] sm:text-xs mb-2 lg:mb-1'
                            key={index}>
                            <span className='font-semibold mr-1'>
                              {item.label} :{' '}
                            </span>{' '}
                            <span>
                              {typeof item.value === 'number' &&
                              !isNaN(item.value)
                                ? fCurrency(item.value)
                                : Date.parse(item.value)
                                ? fDate(item.value)
                                : item.value}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className='hidden'></div>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            </Link>
          </div>
          <div className='block sm:hidden mt-5'>
            {options.length > 0 ? (
              options.map((item, index) => (
                <div
                  className='flex flex-row text-[11px] sm:text-xs mb-0'
                  key={index}>
                  <span className='font-semibold mr-1'>{item.label} : </span>{' '}
                  <span>
                    {typeof item.value === 'number' && !isNaN(item.value)
                      ? fCurrency(item.value)
                      : Date.parse(item.value)
                      ? fDate(item.value)
                      : item.value}
                  </span>
                </div>
              ))
            ) : (
              <div className='hidden'></div>
            )}
          </div>
          <div className='hidden md:flex flex-col w-full md:w-1/4 justify-start md:justify-center items-start md:items-end mt-5 md:mt-0'>
            <div className='text-sm opacity-90'>Total Harga</div>
            <div className='font-semibold text-base'>
              {fCurrency(row.price * row.qty)}
            </div>
          </div>
        </div>
      </Stack>
      <div className='flex flex-row md:flex-row justify-between md:justify-end w-full'>
        <div className='flex-col justify-start items-start md:hidden'>
          <div className='text-xs opacity-90'>Total Harga</div>
          <div className='font-semibold text-xs'>
            {fCurrency(row.price * row.qty)}
          </div>
        </div>
        <LoadingButton
          variant='outlined'
          onClick={onDelete}
          color='error'
          loading={isDeleting}
          loadingIndicator={
            <CircularProgress size={16} sx={{ color: 'error.main' }} />
          }
          sx={{
            fontSize: { xs: '13px', sm: '14px' },
            fontWeight: 600,
          }}
          startIcon={
            !isDeleting && <Iconify icon='heroicons:trash' width={18} />
          }>
          {isDeleting ? 'Hapus...' : 'Hapus'}
        </LoadingButton>
      </div>
    </Card>
  );
}

CheckoutCardProduct.propTypes = {
  row: PropTypes.object,
  onDelete: PropTypes.func,
  onDecrease: PropTypes.func,
  onIncrease: PropTypes.func,
  isDeleting: PropTypes.bool,
};
