import { useEffect, useRef } from 'react';
import { useResponsive } from 'src/hooks/use-responsive';
import { useSearchState } from './use-search-state';
import { useHotelPagination } from './use-hotel-pagination';
import { useSearchDestinations } from './use-search-destinations';
import { useInfiniteScroll } from './use-infinite-scroll';
import { createSearchHandlers } from '../handlers/search-handlers';
import { checkFiltersChanged } from '../utils/url-utils';

export function useHotelSearch() {
  const isDesktop = useResponsive('up', 'md');
  const updateTimeoutRef = useRef(null);

  // Get all state dan functions dari custom hooks
  const searchState = useSearchState();

  const pagination = useHotelPagination({
    searchParams: searchState.searchParams,
    filterData: searchState.filterData,
    selectedRatings: searchState.selectedRatings,
    sortOption: searchState.sortOption,
    minPrice: searchState.minPrice,
    maxPrice: searchState.maxPrice,
    router: searchState.router,
    isReady: searchState.isReady,
  });

  useSearchDestinations({
    locationDisplay: searchState.locationDisplay,
    selectedCityName: searchState.selectedCityName,
    selectedHotelName: searchState.selectedHotelName,
    setFilteredDestinations: searchState.setFilteredDestinations,
  });

  useInfiniteScroll({
    hasMore: pagination.hasMore,
    loadingMore: pagination.loadingMore,
    isLoadingHotels: pagination.isLoadingHotels,
    loadMoreHotels: pagination.loadMoreHotels,
  });

  // Create handlers
  const handlers = createSearchHandlers({
    // State setters
    setLocationDisplay: searchState.setLocationDisplay,
    setSelectedHotelName: searchState.setSelectedHotelName,
    setSelectedItemType: searchState.setSelectedItemType,
    setFilteredDestinations: searchState.setFilteredDestinations,
    setLocationKey: searchState.setLocationKey,
    setSelectedCityName: searchState.setSelectedCityName,
    setOpenSearchDialog: searchState.setOpenSearchDialog,
    setSelectedRatings: searchState.setSelectedRatings,
    setSortOption: searchState.setSortOption,
    setMinPrice: searchState.setMinPrice,
    setMaxPrice: searchState.setMaxPrice,
    setOpenGuestDialog: searchState.setOpenGuestDialog,
    setOpenDateDialog: searchState.setOpenDateDialog,
    setIsDrawerOpen: searchState.setIsDrawerOpen,
    setValues: searchState.setValues,
    setAllHotels: pagination.setAllHotels,
    setDisplayedHotels: pagination.setDisplayedHotels,
    setPage: pagination.setPage,
    setHasMore: pagination.setHasMore,
    setLoadingMore: pagination.setLoadingMore,
    setDisplayCount: pagination.setDisplayCount,
    setFilterData: searchState.setFilterData,

    // Current values
    values: searchState.values,
    locationKey: searchState.locationKey,
    selectedCityName: searchState.selectedCityName,
    selectedItemType: searchState.selectedItemType,
    selectedHotelName: searchState.selectedHotelName,
    rooms: searchState.rooms,
    adults: searchState.adults,
    children: searchState.children,
    selectedRatings: searchState.selectedRatings,
    sortOption: searchState.sortOption,
    minPrice: searchState.minPrice,
    maxPrice: searchState.maxPrice,
    router: searchState.router,
  });

  // Effect untuk update URL ketika filter berubah (with debouncing)
  useEffect(() => {
    if (!searchState.isReady || !pagination.queryApiLocationKey) return;

    // Clear previous timeout
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    // Debounce URL updates to prevent rapid changes
    updateTimeoutRef.current = setTimeout(() => {
      const currentParams = new URLSearchParams(
        searchState.searchParams.toString()
      );
      const currentPage = parseInt(currentParams.get('page') || '1');

      const queryParamsData = {
        loc: currentParams.get('loc'),
        id: currentParams.get('id'),
        hotelName: currentParams.get('hotelName'),
        checkin: currentParams.get('checkin'),
        checkout: currentParams.get('checkout'),
        rooms: currentParams.get('rooms') || '1',
        adults: currentParams.get('adults') || '1',
        children: currentParams.get('children') || '0',
        ratings: searchState.selectedRatings.join(','),
        sort: searchState.sortOption,
        minPrice: searchState.minPrice,
        maxPrice: searchState.maxPrice,
        page: currentPage,
      };

      const newParams = new URLSearchParams();
      Object.entries(queryParamsData).forEach(([key, value]) => {
        if (key === 'hotelName' && !value) return;
        // Special handling for ratings: only include if it has values
        if (key === 'ratings') {
          if (value && value.trim() !== '') {
            newParams.set(key, value.toString());
          }
          // Don't add ratings parameter if empty - this ensures it's removed from URL
        } else if (value !== null && value !== undefined && value !== '') {
          if (key === 'minPrice' && value === 0) newParams.set(key, '0');
          else if (value || (key === 'children' && value === 0))
            newParams.set(key, value.toString());
        }
      });

      // Force URL update when ratings change from something to nothing
      const currentHasRatings = currentParams.has('ratings');
      const newHasRatings = newParams.has('ratings');
      const ratingsChanged = currentHasRatings !== newHasRatings;
      const hasChanges = checkFiltersChanged(currentParams, newParams);
      const forceUpdate = ratingsChanged || hasChanges;

      if (forceUpdate) {
        searchState.router.replace(`/hotels/search?${newParams.toString()}`);
      }
    }, 100); // 100ms debounce

    // Cleanup timeout on unmount
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [
    searchState.selectedRatings,
    searchState.sortOption,
    searchState.minPrice,
    searchState.maxPrice,
    searchState.isReady,
    searchState.router,
    pagination.queryApiLocationKey,
  ]);

  // Effect untuk update CorrelationId
  useEffect(() => {
    if (
      pagination.hotelsData?.CorrelationId &&
      searchState.filterData?.CorrelationId !==
        pagination.hotelsData.CorrelationId
    ) {
      searchState.setFilterData((prev) => ({
        ...prev,
        CorrelationId: pagination.hotelsData.CorrelationId,
      }));
    }
  }, [
    pagination.hotelsData,
    searchState.filterData?.CorrelationId,
    searchState.setFilterData,
  ]);

  // Ensure filterData is updated when selectedRatings changes
  useEffect(() => {
    if (searchState.filterData && searchState.isReady) {
      const currentRatings = searchState.selectedRatings.join(',');

      if (searchState.filterData.ratings !== currentRatings) {
        searchState.setFilterData((prev) => {
          const newFilterData = { ...prev };
          if (currentRatings === '') {
            // Remove ratings property when empty
            delete newFilterData.ratings;
          } else {
            // Set ratings property when has values
            newFilterData.ratings = currentRatings;
          }
          return newFilterData;
        });
      }
    }
  }, [searchState.selectedRatings, searchState.isReady]);

  return {
    // UI State
    isDesktop,

    // All search state
    ...searchState,

    // All pagination state dan functions
    ...pagination,

    // All handlers
    ...handlers,
  };
}
