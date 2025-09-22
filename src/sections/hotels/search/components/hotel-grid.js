import React from 'react';
import { Grid, Box, Typography, Button, CircularProgress } from '@mui/material';
import ShopCardDefault from '../../card-item-hotel';
import { ShopCardSkeletonGrid } from '../../card-item-skeleton';

export default function HotelGrid({
  isLoadingHotels,
  isErrorHotels,
  displayedHotels,
  loadingMore,
  hotelsData,
  page,
  selectedRatings,
  correlationId,
  filterData,
  queryApiRooms,
  queryApiAdults,
  queryApiChildren,
  getQueryParam,
  getQueryDateForAPI,
  queryApiLocationKey,
  pageData,
}) {
  const renderLoadingSkeleton = () => {
    return (
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 1,
            textAlign: 'center',
            height: '70vh',
          }}>
          <ShopCardSkeletonGrid />
        </Box>
      </Grid>
    );
  };

  const renderErrorState = () => (
    <Grid
      item
      xs={12}
      className='flex justify-center items-center flex-col my-8'
      sx={{ height: '70vh' }}>
      <div className='max-w-md w-full text-center'>
        <img
          src='/hotel-not-found.png'
          alt='Maaf, hotelnya belum tersedia'
          className='w-full h-auto mx-auto mb-3 md:mb-1 max-w-[240px] md:max-w-[280px]'
        />
        <Typography variant='h6' className='mt-4 text-red-600 font-medium'>
          Oops! Terjadi Kesalahan
        </Typography>
        <Typography variant='body2' className='mt-2 text-gray-500'>
          Gagal memuat data hotel. Silakan coba lagi nanti atau ubah pencarian
          Anda.
        </Typography>
      </div>
    </Grid>
  );

  const renderEmptyState = () => (
    <Grid
      item
      xs={12}
      className='flex justify-center items-center flex-col my-8'
      sx={{ height: '70vh' }}>
      <div className='max-w-md w-full text-center'>
        <img
          src='/hotel-not-found.png'
          alt='Maaf, hotelnya belum tersedia'
          className='w-full h-auto mx-auto mb-3 md:mb-1 max-w-[240px] md:max-w-[280px]'
        />
        <Typography
          variant='h6'
          className='mt-4 text-gray-700 font-medium'
          sx={{ fontSize: { xs: '15px', md: '18px' } }}>
          {selectedRatings.length > 0
            ? `Maaf, Hotel Bintang ${selectedRatings.join(
                ' & '
              )} belum tersedia`
            : 'Maaf, Hotelnya belum tersedia'}
        </Typography>
        <Typography
          variant='body2'
          className='mt-2 text-gray-500'
          sx={{ fontSize: { xs: '12px', md: '14px' } }}>
          {selectedRatings.length > 0
            ? 'Coba cari dengan rating hotel lainnya ya...'
            : 'Coba cari dengan spesifikasi hotel lainnya ya...'}
        </Typography>
      </div>
    </Grid>
  );

  const renderHotelCards = () => {
    // Check if pageData is available and has data (use pageData for consistency)
    if (pageData && Object.keys(pageData).length > 0) {
      const renderedItems = [];
      let globalIndex = 0;

      // Group hotels by page based on pageData
      const pageNumbers = Object.keys(pageData)
        .map(Number)
        .sort((a, b) => a - b);

      pageNumbers.forEach((pageNumber) => {
        const pageInfo = pageData[pageNumber];
        const pageHotels = pageInfo?.data || [];

        // PageSeparator disembunyikan (tidak di-render)
        // if (pageNumber > 1) {
        //   const startIndex = globalIndex + 1;
        //   const endIndex = globalIndex + pageHotels.length;
        //   renderedItems.push(
        //     <PageSeparator
        //       key={`separator-page-${pageNumber}`}
        //       pageNumber={pageNumber}
        //       startIndex={startIndex}
        //       endIndex={endIndex}
        //       totalCount={hotelsData?.total || displayedHotels.length}
        //       isDesktop={isDesktop}
        //     />
        //   );
        // }

        // Add hotels for this page
        pageHotels.forEach((item, indexInPage) => {
          const cardCityName = getQueryParam('loc', filterData?.location);

          renderedItems.push(
            <Grid
              item
              xs={6}
              sm={6}
              md={4}
              key={item.HotelCode || `hotel-${globalIndex}`}>
              <ShopCardDefault
                data={item}
                idx={`Hotel-${globalIndex + 1}`}
                correlationId={correlationId}
                filterData={{
                  checkin: getQueryDateForAPI('checkin', 'DD-MM-YYYY'),
                  checkout: getQueryDateForAPI('checkout', 'DD-MM-YYYY'),
                  rooms: queryApiRooms,
                  adults: queryApiAdults,
                  children: queryApiChildren,
                  location: cardCityName,
                  locationKey: queryApiLocationKey,
                }}
              />
            </Grid>
          );
          globalIndex++;
        });
      });

      return renderedItems;
    }

    // Fallback: if no pageData available, render normally (for backward compatibility)
    return displayedHotels.map((item, index) => {
      const cardCityName = getQueryParam('loc', filterData?.location);
      return (
        <Grid
          item
          xs={6}
          sm={6}
          md={4}
          key={item.HotelCode || `hotel-${index}`}>
          <ShopCardDefault
            data={item}
            idx={`Hotel-${index + 1}`}
            correlationId={correlationId}
            filterData={{
              checkin: getQueryDateForAPI('checkin', 'DD-MM-YYYY'),
              checkout: getQueryDateForAPI('checkout', 'DD-MM-YYYY'),
              rooms: queryApiRooms,
              adults: queryApiAdults,
              children: queryApiChildren,
              location: cardCityName,
              locationKey: queryApiLocationKey,
            }}
          />
        </Grid>
      );
    });
  };

  const renderLoadingMore = () => (
    <Grid item xs={12} data-loading-indicator='true'>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4,
        }}>
        <Button
          variant='outlined'
          disabled
          startIcon={<CircularProgress size={18} sx={{ color: '#1E2A38' }} />}
          sx={{
            px: 3,
            py: 1.5,
            borderRadius: 2,
            borderColor: '#1E2A38',
            color: '#1E2A38 !important',
            '&:disabled': {
              borderColor: '#1E2A38',
              color: '#1976d2',
            },
          }}>
          Memuat Data Hotel Lainnya...
        </Button>
      </Box>
    </Grid>
  );

  const renderDataLoadedIndicator = () => (
    <Grid item xs={12} sx={{ display: 'none' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4,
        }}>
        <Typography variant='body2' sx={{ color: '#1E2A38', fontSize: '14px' }}>
          {hotelsData?.total || 0} Properti hotel telah ditampilkan
          <span className='text-liburdulu-blue hidden'>
            Semua hotel telah ditampilkan ({displayedHotels.length} properti
            dari total {hotelsData?.total || 0})
          </span>
        </Typography>
      </Box>
    </Grid>
  );

  return (
    <Grid container spacing={2} position='relative'>
      {/* Loading state */}
      {isLoadingHotels && page === 1 && renderLoadingSkeleton()}

      {/* Error state */}
      {!isLoadingHotels && isErrorHotels && renderErrorState()}

      {/* Empty state */}
      {!isLoadingHotels &&
        !isErrorHotels &&
        displayedHotels.length === 0 &&
        renderEmptyState()}

      {/* Hotel cards */}
      {displayedHotels.length > 0 && renderHotelCards()}

      {/* Loading more indicator */}
      {loadingMore && renderLoadingMore()}

      {/* Data loaded indicator */}
      {!loadingMore &&
        displayedHotels.length > 0 &&
        !isLoadingHotels &&
        renderDataLoadedIndicator()}
    </Grid>
  );
}
