import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHotels } from '../../api/hotel-api';
import { useDebounce } from 'src/hooks/use-debounce';
import moment from 'moment';

export function useHotelPagination({
  searchParams,
  filterData,
  selectedRatings,
  sortOption,
  minPrice,
  maxPrice,
}) {
  const [page, setPage] = useState(1);
  const [allHotels, setAllHotels] = useState([]);
  const [displayedHotels, setDisplayedHotels] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [displayCount, setDisplayCount] = useState(18);
  const [pageData, setPageData] = useState({});
  const [scrollPosition, setScrollPosition] = useState(0);

  const debouncedMinPrice = useDebounce(minPrice, 1000);
  const debouncedMaxPrice = useDebounce(maxPrice, 1000);

  // Helper functions for query parameters
  const getQueryParam = (key, defaultValue = null) =>
    searchParams.get(key) ?? defaultValue;

  const getQueryDateForAPI = (paramName, format = 'YYYY-MM-DD') => {
    const dateStr = searchParams.get(paramName) || filterData?.[paramName];
    if (dateStr) {
      const parsed = moment(dateStr, 'DD-MM-YYYY');
      if (parsed.isValid()) {
        return parsed.format(format);
      }
    }
    return null;
  };

  // Query parameters for API
  const queryApiLocationKey = getQueryParam('id', filterData?.locationKey);
  const queryApiHotelName =
    getQueryParam('hotelName', filterData?.hotelName) || '';
  const queryApiCheckin = getQueryDateForAPI('checkin');
  const queryApiCheckout = getQueryDateForAPI('checkout');
  const queryApiRooms = getQueryParam('rooms', filterData?.rooms || '1');
  const queryApiAdults = parseInt(
    getQueryParam('adults', filterData?.adults || '1')
  );
  const queryApiChildren = parseInt(
    getQueryParam('children', filterData?.children || '0')
  );
  const queryApiGuests = queryApiAdults + queryApiChildren;
  const queryApiMinPrice = debouncedMinPrice || 0;
  const queryApiMaxPrice = debouncedMaxPrice || 10000000;

  const queryApiSortBy = sortOption || 'price_asc';
  // Ratings: utamakan nilai dari URL. Jika URL tidak punya ratings, gunakan state selectedRatings.
  // Ini memastikan ketika user menghapus semua checkbox (URL tanpa ratings), API dipanggil ulang tanpa parameter starRating.
  const ratingsFromUrl = searchParams.get('ratings') || '';
  const ratingsFromState = Array.isArray(selectedRatings)
    ? selectedRatings.join(',')
    : '';
  const queryApiRatings =
    ratingsFromUrl !== '' ? ratingsFromUrl : ratingsFromState;
  const queryApiPage = page || 1;

  // Sync page with URL parameters
  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page')) || 1;
    if (pageFromUrl !== page) {
      setPage(pageFromUrl);
    }
  }, [searchParams]); // Remove page from dependency to prevent loop

  // Get correlationId from filterData for page > 1
  const queryApiCorrelationId =
    queryApiPage > 1 ? filterData?.correlationId : null;

  // React Query for fetch hotels
  const {
    data: hotelsData,
    isLoading: isLoadingHotels,
    isError: isErrorHotels,
  } = useQuery({
    queryKey: [
      'hotelsData',
      'ID',
      queryApiLocationKey,
      queryApiCheckin,
      queryApiCheckout,
      queryApiRooms,
      queryApiGuests,
      queryApiMinPrice,
      queryApiMaxPrice,
      queryApiHotelName,
      queryApiSortBy,
      queryApiRatings,
      queryApiPage,
      queryApiCorrelationId,
    ],
    queryFn: () =>
      getHotels(
        'ID',
        queryApiLocationKey,
        queryApiCheckin,
        queryApiCheckout,
        queryApiRooms,
        queryApiGuests,
        queryApiMinPrice,
        queryApiMaxPrice,
        queryApiHotelName,
        queryApiSortBy,
        queryApiRatings,
        queryApiPage,
        queryApiCorrelationId
      ),
    enabled: !!queryApiLocationKey && !!queryApiCheckin && !!queryApiCheckout,
    keepPreviousData: true,
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Reset infinite scroll state when filter changes
  useEffect(() => {
    setAllHotels([]);
    setDisplayedHotels([]);
    setPageData({});
    setScrollPosition(0);
    setPage(1);
    setHasMore(true);
    setLoadingMore(false);
    setDisplayCount(50);

    // Reset page in URL without navigation
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set('page', '1');

    // Add correlationId to URL if available
    if (hotelsData?.correlationId) {
      currentParams.set('correlationId', hotelsData.correlationId);
    }

    const newUrl = `/hotels/search?${currentParams.toString()}`;

    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', newUrl);
    }
  }, [
    queryApiLocationKey,
    queryApiCheckin,
    queryApiCheckout,
    queryApiRooms,
    queryApiGuests,
    queryApiMinPrice,
    queryApiMaxPrice,
    queryApiHotelName,
    queryApiSortBy,
    queryApiRatings,
  ]);

  // Update data hotel and CorrelationId
  useEffect(() => {
    if (hotelsData) {
      const newData = hotelsData.data || [];
      // Store data per page for tracking
      setPageData((prev) => ({
        ...prev,
        [page]: {
          data: newData,
          count: newData.length,
          total: hotelsData.total,
          maxPage: hotelsData.maxPage,
        },
      }));

      if (page === 1) {
        setAllHotels(newData);
      } else {
        // Next page: Append new data to existing data
        setAllHotels((prev) => {
          const existingHotelCodes = prev.map((hotel) => hotel.HotelCode);
          const uniqueNewData = newData.filter(
            (hotel) => !existingHotelCodes.includes(hotel.HotelCode)
          );
          const combinedData = [...prev, ...uniqueNewData];
          return combinedData;
        });

        // Restore scroll position after new data is loaded for page > 1
        // Delay slightly to ensure DOM is updated
        setTimeout(() => {
          if (scrollPosition > 0) {
            // Scroll ke posisi sebelumnya dengan sedikit adjustment
            const adjustedPosition = Math.max(0, scrollPosition - 100);
            window.scrollTo({
              top: adjustedPosition,
              behavior: 'smooth',
            });
            setScrollPosition(0);
          } else {
          }
        }, 300);
      }

      const hasMorePages = hotelsData.maxPage && page < hotelsData.maxPage;
      setHasMore(hasMorePages);
      setLoadingMore(false);
    }
  }, [hotelsData, page, scrollPosition]);

  // Update displayedHotels when allHotels changes
  useEffect(() => {
    // Show all data that has been loaded without slice
    // This will display data sequentially: page 1 (1-50), page 2 (51-100), etc
    setDisplayedHotels(allHotels);
  }, [allHotels]);

  // Functions for pagination
  const loadMoreHotels = () => {
    if (!loadingMore && hasMore && !isLoadingHotels) {
      // Save current scroll position before loading new page
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      setScrollPosition(currentScrollPosition);

      const nextPage = page + 1;
      setLoadingMore(true);
      setPage(nextPage);

      // Update URL without navigation to avoid scroll jump
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.set('page', nextPage.toString());

      // Add correlationId to URL if available and page > 1
      if (nextPage > 1 && hotelsData?.correlationId) {
        currentParams.set('correlationId', hotelsData.correlationId);
      }

      const newUrl = `/hotels/search?${currentParams.toString()}`;

      // Using history.replaceState to update URL without triggering navigation
      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', newUrl);
      }
    }
  };

  return {
    page,
    setPage,
    allHotels,
    displayedHotels,
    loadingMore,
    hasMore,
    displayCount,
    pageData,

    // Query data
    hotelsData,
    isLoadingHotels,
    isErrorHotels,

    // Query parameters
    queryApiLocationKey,
    queryApiHotelName,
    queryApiCheckin,
    queryApiCheckout,
    queryApiRooms,
    queryApiAdults,
    queryApiChildren,
    queryApiGuests,

    // Functions
    loadMoreHotels,
    getQueryParam,
    getQueryDateForAPI,

    // Helper functions
    resetPagination: () => {
      setAllHotels([]);
      setDisplayedHotels([]);
      setPageData({});
      setScrollPosition(0);
      setPage(1);
      setHasMore(true);
      setLoadingMore(false);
      setDisplayCount(50);
    },
  };
}
