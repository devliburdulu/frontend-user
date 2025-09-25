import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Label from 'src/components/label/label';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { fCurrency } from 'src/utils/format-number';
import { fDate, fDateOrder } from 'src/utils/format-time';
import Iconify from 'src/components/iconify';
import HotelHelp from 'src/sections/hotel/hotel-help';
import { ORDER_STATUS_OPTIONS } from 'src/_mock/_order';

export default function MyOrderDetailsItemsView({ detail, loading }) {
  const filteredItems = detail?.items?.filter((item) => !item.parent_item_id);
  const firstItemOriginalPrice =
    detail?.items?.[0]?.extension_attributes?.ld_original_total_price ?? 0;
  const baseSubtotal = detail?.base_subtotal ?? 0;
  const baseGrandTotal = detail?.grand_total_with_fees ?? 0;
  const isDownPayment =
    firstItemOriginalPrice > baseGrandTotal && baseGrandTotal > 0;
  const totalPelunasan = isDownPayment
    ? firstItemOriginalPrice - baseGrandTotal
    : 0;
  const partialPayment = detail?.status_histories?.find(
    (history) => history.status === 'partial_payment'
  );

  const getStatusLabel = (status) => {
    const statusOption = ORDER_STATUS_OPTIONS.find(
      (option) => option.value === status
    );
    return statusOption ? statusOption.label : status;
  };
  const renderDetailRow = (
    label,
    value,
    isLoading,
    sxProps = {},
    valueSxProps = {}
  ) => (
    <Stack
      direction='row'
      justifyContent='space-between'
      sx={{ width: '100%', ...sxProps }}>
      <Box sx={{ color: 'text.primary', ...valueSxProps }}>{label}</Box>
      <Box sx={{ width: 'auto', textAlign: 'right', ...valueSxProps }}>
        {isLoading ? <Skeleton width={100} /> : value}
      </Box>
    </Stack>
  );
  const renderTotalDP = () => (
    <Stack
      spacing={1}
      sx={{
        mt: 1,
        mb: 2,
        textAlign: 'left',
        typography: 'body2',
        width: '100%',
        fontSize: { xs: '12px', md: '14px' },
      }}>
      {renderDetailRow(
        'Metode Pembayaran',
        detail?.payment_method ? detail?.payment_method : '-',
        loading
      )}
      <Divider sx={{ borderStyle: 'dashed', mt: 0, mb: 0.25 }} />
      {renderDetailRow(
        'Subtotal Harga Asli',
        fCurrency(firstItemOriginalPrice),
        loading
      )}
      {renderDetailRow('Subtotal Harga (DP)', fCurrency(baseSubtotal), loading)}{' '}
      {detail?.payment_method_fees > 0 &&
        renderDetailRow(
          'Biaya Layanan',
          detail?.payment_method_fees
            ? `-${fCurrency(detail?.payment_method_fees)}`
            : '-',
          loading
        )}
      {detail?.base_discount_amount < 0 &&
        renderDetailRow(
          'Voucher Diskon',
          detail?.base_discount_amount
            ? `-${fCurrency(Math.abs(detail.base_discount_amount))}`
            : '-',
          loading,
          { color: '#1d9cab' }
        )}
      {detail?.points_used > 0 &&
        renderDetailRow(
          'Poin Digunakan',
          detail?.points_used ? `-${fCurrency(detail?.points_used)}` : '-',
          loading,
          { color: '#1d9cab' }
        )}
      {renderDetailRow(
        'Total Pembayaran',
        fCurrency(baseGrandTotal),
        loading,
        { typography: { xs: 'body', md: 'subtitle2' } },
        { fontWeight: 'semiBold' }
      )}
      <Divider sx={{ borderStyle: 'dashed', mt: 0.5, mb: 1 }} />
      {renderDetailRow(
        'Total Pelunasan',
        fCurrency(totalPelunasan),
        loading,
        {
          color: 'error.main',
          typography: { xs: 'subtitle2', md: 'subtitle1' },
        },
        { fontWeight: 'bold' }
      )}
      {detail.status_histories?.some(
        (history) => history.status === 'partial_payment'
      ) ? (
        <div className='text-xs md:text-sm font-normal mt-4'>
          <div className='font-semibold -mb-4'>Informasi Pelunasan</div>
          <br />
          {
            detail.status_histories.find(
              (history) => history.status === 'partial_payment'
            ).comment
          }
        </div>
      ) : (
        <div className='hidden'></div>
      )}
    </Stack>
  );
  const renderTotalRegular = () => (
    <Stack
      spacing={1}
      sx={{
        mt: 1,
        mb: 2,
        textAlign: 'left',
        typography: 'body2',
        width: '100%',
        fontSize: { xs: '12px', md: '14px' },
      }}>
      {renderDetailRow('Metode Pembayaran', detail?.payment_method, loading)}
      <Divider sx={{ borderStyle: 'dashed', mt: 0, mb: 0.25 }} />
      {renderDetailRow('Subtotal', fCurrency(baseSubtotal), loading)}
      {renderDetailRow(
        'Biaya Layanan',
        detail?.payment_method_fees
          ? `${fCurrency(detail?.payment_method_fees)}`
          : '-',
        loading
      )}

      {detail?.base_discount_amount < 0 &&
        renderDetailRow(
          `Voucher Diskon`,
          detail?.base_discount_amount
            ? `-${fCurrency(Math.abs(detail.base_discount_amount))}`
            : '-',
          loading,
          { color: '#1d9cab' }
        )}

      {detail?.points_used > 0 &&
        renderDetailRow(
          'Poin Digunakan',
          detail?.points_used ? `-${fCurrency(detail?.points_used)}` : '-',
          loading,
          { color: '#1d9cab' }
        )}

      {renderDetailRow(
        'Total Pembayaran',
        fCurrency(baseGrandTotal),
        loading,
        // { typography: { xs: 'body2', md: 'subtitle2' }, },
        { fontSize: { xs: '13px', md: '14px' } },
        { fontWeight: 'semiBold' }
      )}
    </Stack>
  );

  const renderHotelInformation = (
    <>
      <Box sx={{ px: 3, pt: 3 }}>
        <HotelHelp />
      </Box>
      <CardHeader
        title='Detail Informasi Hotel'
        titleTypographyProps={{
          fontSize: { xs: '14px', md: '16px' },
          fontWeight: '600',
        }}
        sx={{ pt: 2, pb: 0.5, px: { xs: 1.5, md: 3 } }}
      />
      <Stack sx={{ px: { xs: 1.5, md: 3 }, pb: 0.5, mt: 1.5 }} spacing={1}>
        <Box sx={{ px: 0 }}>
          <div class='flex flex-col md:flex-row justify-start'>
            <div class='w-full md:w-1/4'>
              <Box
                sx={{
                  color: 'text.primary',
                  fontSize: { xs: '13px', md: '14px' },
                }}>
                Booking Code
              </Box>
            </div>
            <div class='w-full md:w-3/4'>
              <Typography
                variant='body2'
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '13px', md: '14px' },
                }}>
                {loading ? (
                  <Skeleton width={150} />
                ) : (
                  detail?.hotel_order?.BookingCode || ''
                )}
              </Typography>
            </div>
          </div>
        </Box>
        <Box sx={{ px: 0 }}>
          <div class='flex flex-col md:flex-row justify-start'>
            <div class='w-full md:w-1/4 text-sm'>
              <Box
                sx={{
                  color: 'text.primary',
                  fontSize: { xs: '13px', md: '14px' },
                }}>
                Check In
              </Box>
            </div>
            <div class='w-full md:w-3/4'>
              <Typography
                variant='body2'
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '13px', md: '14px' },
                }}>
                {loading ? (
                  <Skeleton width={150} />
                ) : (
                  fDate(detail?.hotel_order?.HotelInformation?.CheckIn) || ''
                )}
              </Typography>
            </div>
          </div>
        </Box>
        <Box sx={{ px: 0 }}>
          <div class='flex flex-col md:flex-row justify-start'>
            <div class='w-full md:w-1/4 text-sm'>
              <Box
                sx={{
                  color: 'text.primary',
                  fontSize: { xs: '13px', md: '14px' },
                }}>
                Check Out
              </Box>
            </div>
            <div class='w-full md:w-3/4'>
              <Typography
                variant='body2'
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '13px', md: '14px' },
                }}>
                {loading ? (
                  <Skeleton width={150} />
                ) : (
                  fDate(detail?.hotel_order?.HotelInformation?.CheckOut) || ''
                )}
              </Typography>
            </div>
          </div>
        </Box>
        <Box sx={{ px: 0 }}>
          <div class='flex flex-col md:flex-row justify-start'>
            <div class='w-full md:w-1/4 text-sm'>
              <Box
                sx={{
                  color: 'text.primary',
                  fontSize: { xs: '13px', md: '14px' },
                }}>
                Nama Hotel
              </Box>
            </div>
            <div class='w-full md:w-3/4'>
              <Typography
                variant='body2'
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '13px', md: '14px' },
                }}>
                {loading ? (
                  <Skeleton width={150} />
                ) : (
                  detail?.hotel_order?.HotelInformation?.HotelName || ''
                )}
              </Typography>
            </div>
          </div>
        </Box>
        <Box sx={{ px: 0 }}>
          <div class='flex flex-col md:flex-row justify-start'>
            <div class='w-full md:w-1/4 text-sm'>
              <Box
                sx={{
                  color: 'text.primary',
                  fontSize: { xs: '13px', md: '14px' },
                }}>
                Kota
              </Box>
            </div>
            <div class='w-full md:w-3/4'>
              <Typography
                variant='body2'
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '13px', md: '14px' },
                }}>
                {loading ? (
                  <Skeleton width={150} />
                ) : (
                  detail?.hotel_order?.HotelInformation?.CityName || ''
                )}
              </Typography>
            </div>
          </div>
        </Box>
        <Box sx={{ px: 0 }}>
          <div class='flex flex-col md:flex-row justify-start'>
            <div class='w-full md:w-1/4 text-sm'>
              <Box
                sx={{
                  color: 'text.primary',
                  fontSize: { xs: '13px', md: '14px' },
                }}>
                Alamat
              </Box>
            </div>
            <div class='w-full md:w-3/4'>
              <Typography
                variant='body2'
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '13px', md: '14px' },
                }}>
                {loading ? (
                  <Skeleton width={150} />
                ) : (
                  detail?.hotel_order?.HotelInformation?.Address || ''
                )}
              </Typography>
            </div>
          </div>
        </Box>
      </Stack>
    </>
  );

  const renderGuestHotel = (
    <>
      <CardHeader
        title='Detail Pemesanan Hotel'
        titleTypographyProps={{
          fontSize: { xs: '14px', md: '16px' },
          fontWeight: '600',
        }}
        sx={{ pt: 2, pb: 0.5, px: { xs: 1.5, md: 3 } }}
      />
      <Stack sx={{ px: { xs: 1.5, md: 3 }, pb: 0.5, mt: 1.5 }} spacing={1}>
        <Stack direction='row' justifyContent='flex-start'>
          <Box
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '13px', md: '14px' },
            }}>
            <Iconify width={22} icon='mdi:person-box-outline' />
          </Box>
          <Box
            sx={{
              typography: 'body2',
              mx: 1,
              fontSize: { xs: '13px', md: '14px' },
            }}>
            <span>
              {loading ? (
                <Skeleton width={150} />
              ) : (
                detail?.hotel_order?.guest?.[0]?.firstName
              )}
            </span>
            <span className='mx-1'>
              {loading ? (
                <Skeleton width={150} />
              ) : (
                detail?.hotel_order?.guest?.[0]?.lastName
              )}
            </span>
          </Box>
        </Stack>
        <Stack direction='row' justifyContent='flex-start'>
          <Box
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '13px', md: '14px' },
            }}>
            <Iconify width={20} icon='lucide:phone' />
          </Box>
          <Box
            sx={{
              typography: 'body2',
              mx: 1,
              fontSize: { xs: '13px', md: '14px' },
            }}>
            {loading ? (
              <Skeleton width={150} />
            ) : (
              detail?.hotel_order?.guest?.[0]?.mobilePhone
            )}
          </Box>
        </Stack>
        <Stack direction='row' justifyContent='flex-start'>
          <Box
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '13px', md: '14px' },
            }}>
            <Iconify width={20} icon='ic:outline-email' />
          </Box>
          <Box
            sx={{
              typography: 'body2',
              mx: 1,
              fontSize: { xs: '13px', md: '14px' },
            }}>
            {loading ? <Skeleton width={150} /> : detail?.customer_email || ''}
          </Box>
        </Stack>
        <Divider sx={{ borderStyle: 'dashed', mt: 1 }} />
      </Stack>
    </>
  );
  return (
    <Card>
      <Stack
        direction='column'
        spacing={1}
        sx={{ mt: 3, px: { xs: 1.5, md: 3 } }}>
        <Box sx={{ px: 0 }}>
          {!loading && (
            <Label
              variant='soft'
              color={
                (['complete', 'processing'].includes(detail.status) &&
                  'success') ||
                (['pending', 'waiting_for_approval'].includes(detail.status) &&
                  'warning') ||
                (['partial_payment'].includes(detail.status) && 'info') ||
                ([
                  'canceled',
                  'order_canceled_pending',
                  'order_reject',
                ].includes(detail.status) &&
                  'error') ||
                'default'
              }
              sx={{ fontWeight: 600 }}>
              {getStatusLabel(detail.status)}
            </Label>
          )}
        </Box>
        <Box sx={{ px: 0 }}>
          <div class='flex flex-col md:flex-row justify-start'>
            <div class='w-full md:w-1/4'>
              <Box
                sx={{
                  color: 'text.primary',
                  fontSize: { xs: '13px', md: '14px' },
                }}>
                Nomor Pesanan
              </Box>
            </div>
            <div class='w-full md:w-3/4'>
              <Typography
                variant='body2'
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '13px', md: '14px' },
                }}>
                {detail.increment_id}
              </Typography>
            </div>
          </div>
        </Box>
        <Box sx={{ px: 0 }}>
          <div class='flex flex-col md:flex-row justify-start'>
            <div class='w-full md:w-1/4 text-sm'>
              <Box
                sx={{
                  color: 'text.primary',
                  fontSize: { xs: '13px', md: '14px' },
                }}>
                Tanggal Pembelian
              </Box>
            </div>
            <div class='w-full md:w-3/4'>
              <Typography
                variant='body2'
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '13px', md: '14px' },
                }}>
                {loading ? (
                  <Skeleton width={150} />
                ) : (
                  fDateOrder(detail.created_at)
                )}
              </Typography>
            </div>
          </div>
        </Box>
        <Divider sx={{ borderStyle: 'dashed', mt: 1 }} />
      </Stack>
      {detail?.hotel_order && (
        <>
          {detail?.hotel_order?.pnr_id !== null ? renderHotelInformation : null}
          {detail?.hotel_order && renderGuestHotel}
        </>
      )}
      <Stack sx={{ px: { xs: 1.5, md: 3, position: 'relative' } }}>
        <CardHeader
          title='Detail Produk'
          titleTypographyProps={{
            fontSize: { xs: '14px', md: '16px' },
            fontWeight: '600',
          }}
          sx={{ pt: 2, pb: 0.5, px: 0 }}
        />
        <div className='h-auto'>
          {filteredItems.map((item, index) => (
            <Stack
              key={index}
              direction='row'
              justifyContent='space-between'
              sx={{
                mt: { xs: '8px', md: '10px' },
                borderBottom: (theme) =>
                  `dashed 2px ${theme.palette.background.neutral}`,
              }}>
              <div className='box-item w-full pr-0 mb-0.5 md:mb-1'>
                <div className='font-semibold text-[13px] sm:text-sm mb-0 md:mb-[2px]'>
                  {item.name}
                </div>
                <div className='flex flex-col justify-start mt-1.5 mb-0'>
                  {item.custom_options && item.custom_options.length > 0 ? (
                    item.custom_options.map((option, optionIndex) => (
                      <div
                        className='flex flex-row text-[11px] sm:text-xs mb-0 lg:mb-1'
                        key={optionIndex}>
                        <span className='font-medium mr-1'>
                          {option.label} :{' '}
                        </span>{' '}
                        <span>
                          {typeof option.value === 'number' &&
                          !isNaN(option.value)
                            ? fCurrency(option.value)
                            : Date.parse(option.value)
                            ? fDate(option.value)
                            : option.value}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className='hidden'></div>
                  )}
                </div>
                <div className='flex flex-row justify-between mb-2'>
                  <div className='box-price'>
                    <span className='text-[11px] sm:text-xs opacity-90 mr-[2px]'>
                      {item.qty_ordered}
                    </span>
                    <span className='text-[11px] sm:text-xs opacity-90 mx-1'>
                      x
                    </span>
                    <span className='text-[11px] sm:text-xs opacity-90'>
                      {fCurrency(item.base_price)}
                    </span>
                  </div>
                  <div className='box-totals'>
                    <span className='font-medium text-xs sm:text-sm'>
                      {fCurrency(item.qty_ordered * item.base_price)}
                    </span>
                  </div>
                </div>
              </div>
            </Stack>
          ))}
        </div>
      </Stack>
      <Stack sx={{ px: { xs: 1.5, md: 3 }, pb: 1.5 }}>
        <CardHeader
          title='Rincian Pembayaran'
          titleTypographyProps={{
            fontSize: { xs: '14px', md: '16px' },
            fontWeight: '600',
          }}
          sx={{ pt: 2, pb: 0.5, px: 0 }}
        />
        {!loading &&
          detail &&
          (partialPayment ? renderTotalDP() : renderTotalRegular())}
      </Stack>
    </Card>
  );
}

MyOrderDetailsItemsView.propTypes = {
  items: PropTypes.array,
  taxes: PropTypes.number,
  shipping: PropTypes.number,
  discount: PropTypes.number,
  subTotal: PropTypes.number,
  totalAmount: PropTypes.number,
  detail: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};
