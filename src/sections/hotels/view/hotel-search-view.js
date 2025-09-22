'use client';

import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SearchSimple from '../search-simple';
import { useHotelSearch } from '../search/hooks/use-hotel-search';
import FilterBox from '../search/components/filter-box';
import HotelGrid from '../search/components/hotel-grid';
import SearchResultsHeader from '../search/components/search-results-header';

export default function HotelSearchView() {
  const {
    // UI State
    isDesktop,

    // Search state
    locationDisplay,
    values,
    filteredDestinations,
    openGuestDialog,
    openSearchDialog,
    openDateDialog,
    rooms,
    setRooms,
    adults,
    setAdults,
    children,
    setChildren,
    filterData,
    setFilterData,
    router,

    // Filter state
    isDrawerOpen,
    selectedRatings,
    sortOption,
    minPrice,
    maxPrice,

    // Pagination state
    page,
    displayedHotels,
    loadingMore,
    hasMore,
    hotelsData,
    isLoadingHotels,
    isErrorHotels,
    queryApiLocationKey,
    queryApiRooms,
    queryApiAdults,
    queryApiChildren,
    getQueryParam,
    getQueryDateForAPI,
    pageData,

    // Handlers
    handleSearchDialogOpen,
    handleSearchDialogClose,
    handleGuestDialogOpen,
    handleGuestDialogClose,
    handleDateDialogOpen,
    handleDateDialogClose,
    handleDrawerToggle,
    handleIncrement,
    handleDecrement,
    handleAdultDecrement,
    handleInputChange,
    handleSelectDestination,
    handleRatingChange,
    handleSortChange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleSubmit,
    setValues,
  } = useHotelSearch();

  const renderContent = () => {
    return (
      <Grid
        container
        spacing={4}
        sx={{
          width: '100%',
          mt: 1,
          px: isDesktop ? 0 : 2,
          ml: 0,
          pb: isDesktop ? 0 : 2,
        }}>
        {/* Desktop Filter Sidebar */}
        {isDesktop && (
          <Grid
            item
            xs={12}
            sm={3}
            sx={{
              position: 'sticky',
              top: 60,
              maxHeight: 'fit-content',
              paddingLeft: '0 !important',
            }}>
            <FilterBox
              isDesktop={isDesktop}
              minPrice={minPrice}
              maxPrice={maxPrice}
              selectedRatings={selectedRatings}
              sortOption={sortOption}
              availableStars={filteredAvailableStars}
              onMinPriceChange={handleMinPriceChange}
              onMaxPriceChange={handleMaxPriceChange}
              onRatingChange={handleRatingChange}
              onSortChange={handleSortChange}
            />
          </Grid>
        )}

        {/* Main Content Area */}
        <Grid
          item
          xs={12}
          sm={isDesktop ? 9 : 12}
          sx={{
            mt: isDesktop ? 0 : -2,
            px: isDesktop ? 0 : 0,
            pl: isDesktop ? '2rem !important' : '0 !important',
          }}>
          {/* Search Results Header */}
          <SearchResultsHeader
            hotelsData={hotelsData}
            displayedHotels={displayedHotels}
            page={page}
            isLoadingHotels={isLoadingHotels}
            isErrorHotels={isErrorHotels}
          />

          {/* Hotel Grid */}
          <HotelGrid
            isDesktop={isDesktop}
            isLoadingHotels={isLoadingHotels}
            isErrorHotels={isErrorHotels}
            displayedHotels={displayedHotels}
            loadingMore={loadingMore}
            hotelsData={hotelsData}
            page={page}
            selectedRatings={selectedRatings}
            correlationId={hotelsData?.correlationId}
            filterData={filterData}
            queryApiRooms={queryApiRooms}
            queryApiAdults={queryApiAdults}
            queryApiChildren={queryApiChildren}
            getQueryParam={getQueryParam}
            getQueryDateForAPI={getQueryDateForAPI}
            queryApiLocationKey={queryApiLocationKey}
            hasMore={hasMore}
            pageData={pageData}
          />
        </Grid>
      </Grid>
    );
  };

  const WrapperContent = isDesktop ? Container : Box;

  // Filter dan optimasi availableStars - hanya star dengan count > 0
  const filteredAvailableStars = React.useMemo(() => {
    if (!hotelsData?.stars || hotelsData.stars.length === 0) {
      return [];
    }

    return hotelsData.stars
      .filter((item) => {
        // Handle both object format {Rating: 5, Count: 10} dan number format
        if (typeof item === 'object' && item?.Count !== undefined) {
          return item.Count > 0;
        }
        // Jika format number, anggap semua tersedia
        return true;
      })
      .map((item) => {
        // Normalize format untuk konsistensi
        const rating =
          typeof item === 'object' && item?.Rating !== undefined
            ? Number(item.Rating)
            : Number(item);
        const count = typeof item === 'object' ? item.Count || 0 : 0;

        return {
          rating,
          count,
        };
      })
      .filter(({ rating }) => rating >= 0 && rating <= 5)
      .sort((a, b) => b.rating - a.rating);
  }, [hotelsData?.stars]);

  return (
    <WrapperContent
      sx={{
        mb: 5,
        mt: {
          xs: -8,
          md: -10,
        },
      }}>
      {/* Search Form */}
      <SearchSimple
        location={locationDisplay}
        values={values}
        filteredDestinations={filteredDestinations}
        openGuestDialog={openGuestDialog}
        openSearchDialog={openSearchDialog}
        openDateDialog={openDateDialog}
        rooms={rooms}
        setRooms={setRooms}
        adults={adults}
        filterData={filterData}
        setFilterData={setFilterData}
        setAdults={setAdults}
        children={children}
        setChildren={setChildren}
        onSearchDialogOpen={handleSearchDialogOpen}
        onSearchDialogClose={handleSearchDialogClose}
        onGuestDialogOpen={handleGuestDialogOpen}
        onGuestDialogClose={handleGuestDialogClose}
        onDateDialogOpen={handleDateDialogOpen}
        onDateDialogClose={handleDateDialogClose}
        onInputChange={handleInputChange}
        onSelectDestination={handleSelectDestination}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onAdultDecrement={handleAdultDecrement}
        onDateChange={setValues}
        onSubmit={handleSubmit}
        router={router}
        // Filter drawer props
        isDrawerOpen={isDrawerOpen}
        onDrawerToggle={handleDrawerToggle}
        minPrice={minPrice}
        maxPrice={maxPrice}
        selectedRatings={selectedRatings}
        sortOption={sortOption}
        availableStars={filteredAvailableStars}
        onMinPriceChange={handleMinPriceChange}
        onMaxPriceChange={handleMaxPriceChange}
        onRatingChange={handleRatingChange}
        onSortChange={handleSortChange}
        isLoadingHotels={isLoadingHotels}
      />

      {/* Search Results */}
      {renderContent()}
    </WrapperContent>
  );
}
