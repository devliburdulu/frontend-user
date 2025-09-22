import { Button, Card, Skeleton } from '@mui/material';
import { useState, useEffect } from 'react';
import Label from 'src/components/label/label';
import { TablePaginationCustom, useTable } from 'src/components/table';
import { useRouter } from 'next/navigation';
import { useAuthContext } from 'src/auth/hooks';
import { getPageOrder } from '../../../fetch-global';
import { createPaymentXendit } from 'src/rest/PaymentXendit';
import { ORDER_STATUS_OPTIONS } from 'src/_mock/_order';
import Cookies from 'js-cookie';
import { useSnackbar } from 'src/components/snackbar';

const defaultFilters = {
  name: '',
  status: 'all',
  startDate: null,
  endDate: null,
};

const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const dateOptions = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Intl.DateTimeFormat('id-ID', dateOptions).format(date);
};

const getStatusLabel = (status) => {
  const statusOption = ORDER_STATUS_OPTIONS.find(
    (option) => option.value === status
  );
  return statusOption ? statusOption.label : status;
};

export default function MyOrderCard() {
  const TOKEN_USER = Cookies.get('accessToken');
  const { user } = useAuthContext();
  const table = useTable({ defaultOrderBy: 'orderNumber' });
  const [filters, setFilters] = useState(defaultFilters);
  const [data, setData] = useState([]); // API data
  const [paginatedData, setPaginatedData] = useState([]); // Data for the current page
  const [totalRows, setTotalRows] = useState(0); // Total number of rows
  const [loading, setLoading] = useState(true); // Loading state
  const [loadingPayment, setLoadingPayment] = useState(false); // Loading state for payment
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const handleDetails = (id) => {
    router.push(`/profile/my-order/${id}`);
  };

  const handlePayment = async (orderId) => {
    setLoadingPayment(true);
    try {
      const response = await createPaymentXendit(TOKEN_USER, orderId);
      if (response && response.success) {
        enqueueSnackbar('Proses Pembayaran Berhasil Dibuat', {
          variant: 'success',
        });
        setTimeout(() => {
          window.location.href = response.data.invoice_url;
        }, 1500);
      } else {
        enqueueSnackbar('Pembayaran Gagal Diterima', {
          variant: 'error',
        });
        console.error('Failed to payment request. Status:', response.status);
      }
    } catch (error) {
      console.error('Failed to payment request: ', error);
      enqueueSnackbar('Pembayaran Gagal Diterima', {
        variant: 'error',
      });
    } finally {
      setLoadingPayment(false);
    }
  };

  const fetchDataComp = async () => {
    setLoading(true);
    try {
      const result = await getPageOrder(user.id);
      //
      setData(result);

      // Apply pagination
      const pageData = result.slice(
        table.page * table.rowsPerPage,
        table.page * table.rowsPerPage + table.rowsPerPage
      );
      setPaginatedData(pageData);
      setTotalRows(result.length);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataComp();

    if (selectedOrder) {
      setSelectedOrder(null);
    }
  }, [user?.id, table?.page, table?.rowsPerPage, selectedOrder]);

  return (
    <Card sx={{ boxShadow: 'none' }}>
      <div className='space-y-6'>
        {loading
          ? [...Array(table.rowsPerPage)].map((_, index) => (
              <Card
                key={index}
                sx={{
                  border: '1px solid #d8dce8',
                  borderRadius: '16px',
                  backgroundColor: 'transparent',
                }}
                className='p-4 flex flex-col space-y-4 md:space-y-3'>
                <div className='flex flex-col md:flex-row w-full'>
                  <div className='w-full md:w-3/4'>
                    <Skeleton width={180} className='mb-1' />
                    <Skeleton width={250} className='mb-1' />
                    <Skeleton width={80} className='mb-1 md:mb-0' />
                  </div>
                  <div className='w-full md:w-1/4 flex justify-start md:justify-end items-center'>
                    <div className='box-price flex flex-col justify-start items-start md:justify-center md:items-center'>
                      <Skeleton width={80} className='mb-1' />
                      <Skeleton width={100} />
                    </div>
                  </div>
                </div>
                <div className='flex flex-row justify-start md:justify-end w-full'>
                  <Skeleton width={250} />
                </div>
              </Card>
            ))
          : paginatedData.map((row) => (
              <Card
                key={row.increment_id}
                sx={{
                  border: '1px solid #d8dce8',
                  borderRadius: '16px',
                  backgroundColor: 'transparent',
                }}
                className='p-4 flex flex-col space-y-4 md:space-y-3'>
                <div className='flex flex-col md:flex-row w-full'>
                  <div className='w-full md:w-3/4'>
                    <div className='box-items mb-3 flex flex-row justify-between md:justify-start items-center md:items-end'>
                      <div className='text-xs md:text-sm opacity-90 mr-2'>
                        {formatDate(row.created_at)}
                      </div>
                      <div className='mb-0'>
                        <Label
                          variant='soft'
                          color={
                            (['complete', 'processing'].includes(row.status) &&
                              'success') ||
                            (['pending', 'waiting_for_approval'].includes(
                              row.status
                            ) &&
                              'warning') ||
                            (['partial_payment'].includes(row.status) &&
                              'info') ||
                            ([
                              'canceled',
                              'order_canceled_pending',
                              'order_reject',
                            ].includes(row.status) &&
                              'error') ||
                            'default'
                          }
                          sx={{
                            fontWeight: 500,
                            fontSize: { xs: '10px', md: '12px' },
                          }}>
                          {getStatusLabel(row.status)}
                        </Label>
                      </div>
                    </div>
                    <div className='box-products mb-4'>
                      <div className='mb-1'>
                        <span className='font-semibold text-sm md:text-base'>
                          {row.items[0].name}
                        </span>
                      </div>
                      <div className='text-[10px] md:text-xs opacity-90'>
                        {row.total_qty_ordered} Pax
                      </div>
                      <div className='mt-3'>
                        {(() => {
                          const itemsWithoutParent = row.items.filter(
                            (item) => !item.parent_item
                          );
                          if (itemsWithoutParent.length > 1) {
                            return (
                              <span className='text-[12px] md:text-sm opacity-90 p-0'>{`+${
                                itemsWithoutParent.length - 1
                              } Produk Lainnya`}</span>
                            );
                          }
                          return <span className='hidden'></span>;
                        })()}
                      </div>
                    </div>
                  </div>
                  <div className='w-full md:w-1/4 flex justify-start md:justify-end items-center'>
                    <div className='box-price flex flex-col justify-start items-start md:justify-center md:items-center'>
                      <div className='text-[10px] md:text-sm opacity-90'>
                        Total Harga
                      </div>
                      <div className='font-semibold text-xs md:text-base'>
                        {formatRupiah(row.grand_total)}
                      </div>
                    </div>
                  </div>
                </div>
                {row.status_histories?.some(
                  (history) => history.status === 'partial_payment'
                ) ? (
                  <div className='text-[11px] md:text-xs opacity-80 text-liburdulu-black font-medium'>
                    <div className='font-bold uppercase -mb-4'>
                      Informasi Pelunasan
                    </div>
                    <br />
                    {
                      row.status_histories.find(
                        (history) => history.status === 'partial_payment'
                      ).comment
                    }
                  </div>
                ) : (
                  <div className='hidden'></div>
                )}

                <div className='flex flex-row-reverse md:flex-row justify-end w-full'>
                  {row.status === 'pending' && (
                    <Button
                      onClick={() => handlePayment(row.entity_id)}
                      variant='outlined'
                      disabled={loadingPayment}
                      sx={{
                        fontSize: { xs: '12px', md: '14px' },
                        marginRight: { xs: '0px', sm: '8px' },
                        fontWeight: 600,
                        color: '#1D9CAB',
                        borderColor: '#1D9CAB',
                        '&:hover': {
                          backgroundColor: '#E6F4F4',
                          borderColor: '#1D9CAB',
                        },
                      }}>
                      Lanjutkan Pembayaran
                    </Button>
                  )}
                  <Button
                    onClick={() => handleDetails(row.entity_id)}
                    variant='contained'
                    sx={{
                      fontSize: { xs: '12px', md: '14px' },
                      fontWeight: 600,
                      backgroundColor: '#1D9CAB',
                      marginRight: { xs: '8px', sm: '0px' },
                      color: '#FFF',
                      '&:hover': {
                        backgroundColor: '#128391',
                      },
                      '&:disabled': {
                        backgroundColor: '#b9d8dd',
                      },
                    }}>
                    Lihat Pesanan
                  </Button>
                </div>
              </Card>
            ))}
      </div>
      <TablePaginationCustom
        count={totalRows}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
        sx={{
          '& .MuiTablePagination-root': {
            fontSize: { xs: '12px', md: '14px' },
            '& .MuiToolbar-root': {
              padding: 0,
              height: { xs: '40px', md: '54px' },
            },
          },
          '& .MuiTablePagination-select': {
            fontSize: { xs: '12px', md: '14px' },
          },
          '& .MuiTablePagination-selectLabel': {
            fontSize: { xs: '12px', md: '14px' },
          },
          '& .MuiInputBase-root': {
            marginRight: { xs: '4px', md: '8px' },
          },
          '& .MuiTablePagination-displayedRows': {
            fontSize: { xs: '12px', md: '14px' },
          },
          '& .MuiTablePagination-actions': {
            margin: { xs: '0px', md: '8px' },
            '& .MuiButtonBase-root': {
              fontSize: { xs: '12px', md: '14px' },
              padding: { xs: '0px', md: '8px' },
            },
          },
        }}
      />
    </Card>
  );
}
