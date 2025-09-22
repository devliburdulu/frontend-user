import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { useFilter } from '../../context/search-context';
import { DateObject } from 'react-multi-date-picker';
import moment from 'moment';

export function useSearchState() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { filterData, isReady, setFilterData } = useFilter();
  // Pastikan inisialisasi selectedRatings dari URL hanya sekali (first mount)
  const hasInitializedRatingsRef = useRef(false);

  // Location states
  const [locationDisplay, setLocationDisplay] = useState('');
  const [locationKey, setLocationKey] = useState('');
  const [selectedCityName, setSelectedCityName] = useState('');
  const [selectedHotelName, setSelectedHotelName] = useState('');
  const [selectedItemType, setSelectedItemType] = useState('city');
  const [filteredDestinations, setFilteredDestinations] = useState([]);

  // Date and guest states
  const [values, setValues] = useState([]);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  // Dialog states
  const [openGuestDialog, setOpenGuestDialog] = useState(false);
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const [openDateDialog, setOpenDateDialog] = useState(false);

  // Filter states
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [sortOption, setSortOption] = useState('price_asc');

  // Debug logging for selectedRatings changes (removed for production)

  // Debug logging for sortOption changes
  useEffect(() => {
    // Effect untuk tracking sortOption changes
  }, [sortOption]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);

  // UI states
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Initialize state dari URL parameters dan context
  useEffect(() => {
    if (isReady) {
      const params = Object.fromEntries(searchParams.entries());
      const context = filterData || {};
      const initLocationKey = params.id || context.locationKey;
      const initCityName = params.loc || context.location;
      const initHotelName = params.hotelName || context.hotelName;
      const initRooms = parseInt(params.rooms || context.rooms) || 1;
      const initAdults = parseInt(params.adults || context.adults) || 1;
      const initChildren = parseInt(params.children || context.children) || 0;
      const initRatings = (params.ratings || context.ratings || '')
        .split(',')
        .filter((r) => r);
      // Convert legacy StarRating to price_asc to maintain consistency
      let initSort = params.sort || context.sort || 'price_asc';
      if (initSort === 'StarRating') {
        initSort = 'price_asc';
      }
      const initMinPrice = parseInt(params.minPrice || context.minPrice) || 0;
      const initMaxPrice =
        parseInt(params.maxPrice || context.maxPrice) || 10000000;

      setLocationKey(initLocationKey || '');
      setSelectedCityName(initCityName || '');
      setSelectedHotelName(initHotelName || '');
      setLocationDisplay(initHotelName || initCityName || '');
      setSelectedItemType(initHotelName ? 'hotel' : 'city');
      setRooms(initRooms);
      setAdults(initAdults);
      setChildren(initChildren);

      // Parse dates
      const initCheckinStr = params.checkin || context.checkin;
      const initCheckoutStr = params.checkout || context.checkout;

      let checkinDate = null;
      let checkoutDate = null;

      try {
        checkinDate = initCheckinStr
          ? new DateObject({ date: initCheckinStr, format: 'DD-MM-YYYY' })
          : null;
      } catch (e) {
        console.error('Error parsing checkin date:', e);
      }

      try {
        checkoutDate = initCheckoutStr
          ? new DateObject({ date: initCheckoutStr, format: 'DD-MM-YYYY' })
          : null;
      } catch (e) {
        console.error('Error parsing checkout date:', e);
      }

      if (
        checkinDate &&
        checkoutDate &&
        checkinDate.isValid &&
        checkoutDate.isValid
      ) {
        setValues([checkinDate, checkoutDate]);
      } else {
        setValues([]);
      }

      // Inisialisasi selectedRatings dari URL/context hanya SEKALI saat pertama kali ready
      // Menghindari bug ketika user uncheck semua rating (menjadi kosong) lalu state
      // di-reset kembali dari URL lama sebelum URL diperbarui.
      if (!hasInitializedRatingsRef.current) {
        setSelectedRatings(initRatings);
        hasInitializedRatingsRef.current = true;
      }

      // Only update sortOption if it's actually different
      if (sortOption !== initSort) {
        setSortOption(initSort);
      }
      setMinPrice(initMinPrice);
      setMaxPrice(initMaxPrice);
      if (!initLocationKey || !initCityName) {
        console.warn('Missing location key or city name on initialization');
      }
    }
  }, [isReady, searchParams, filterData]);

  // Remove problematic URL sync useEffect entirely for selectedRatings
  // Only initialize from URL once on mount

  return {
    // Location states
    locationDisplay,
    setLocationDisplay,
    locationKey,
    setLocationKey,
    selectedCityName,
    setSelectedCityName,
    selectedHotelName,
    setSelectedHotelName,
    selectedItemType,
    setSelectedItemType,
    filteredDestinations,
    setFilteredDestinations,

    // Date and guest states
    values,
    setValues,
    rooms,
    setRooms,
    adults,
    setAdults,
    children,
    setChildren,

    // Dialog states
    openGuestDialog,
    setOpenGuestDialog,
    openSearchDialog,
    setOpenSearchDialog,
    openDateDialog,
    setOpenDateDialog,

    // Filter states
    selectedRatings,
    setSelectedRatings,
    sortOption,
    setSortOption,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,

    // UI states
    isDrawerOpen,
    setIsDrawerOpen,

    // Context
    filterData,
    setFilterData,
    isReady,
    router,
    searchParams,
  };
}
