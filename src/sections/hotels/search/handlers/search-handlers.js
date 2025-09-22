import { parseRupiahInput, parseMaxPriceInput } from '../utils/format-utils';
import { parseSortValue } from '../utils/sort-utils';

export const createSearchHandlers = ({
  // State setters
  setLocationDisplay,
  setSelectedHotelName,
  setSelectedItemType,
  setFilteredDestinations,
  setLocationKey,
  setSelectedCityName,
  setOpenSearchDialog,
  setSelectedRatings,
  setSortOption,
  setMinPrice,
  setMaxPrice,
  setOpenGuestDialog,
  setOpenDateDialog,
  setIsDrawerOpen,
  setFilterData,

  // Data
  values,
  locationKey,
  selectedCityName,
  selectedItemType,
  selectedHotelName,
  rooms,
  adults,
  children,
  selectedRatings,
  sortOption,
  minPrice,
  maxPrice,
  router,
}) => {
  // Dialog handlers
  const handleSearchDialogOpen = () => setOpenSearchDialog(true);
  const handleSearchDialogClose = () => setOpenSearchDialog(false);
  const handleGuestDialogOpen = () => setOpenGuestDialog(true);
  const handleGuestDialogClose = () => setOpenGuestDialog(false);
  const handleDateDialogOpen = () => setOpenDateDialog(true);
  const handleDateDialogClose = () => setOpenDateDialog(false);
  const handleDrawerToggle = () => setIsDrawerOpen((prev) => !prev);

  // Counter handlers
  const handleIncrement = (setter) => () => setter((prev) => prev + 1);
  const handleDecrement = (setter) => () =>
    setter((prev) => Math.max(0, prev - 1));
  const handleAdultDecrement = (setter) => () =>
    setter((prev) => Math.max(1, prev - 1));

  // Input handlers
  const handleInputChange = (e) => {
    setLocationDisplay(e.target.value);
    if (e.target.value.trim() === '') {
      setSelectedHotelName('');
      setSelectedItemType('city');
      setFilteredDestinations([]);
    }
  };

  const handleSelectDestination = (destination) => {
    let displayValue = destination.CityName;
    let itemType = destination.type || 'city';
    let hotelName = null;
    const cityKey = destination.CityKey;
    const cityName = destination.CityName;

    if (
      itemType === 'hotel' &&
      destination.HotelName &&
      destination.HotelName.trim() !== ''
    ) {
      displayValue = destination.HotelName;
      hotelName = destination.HotelName;
    } else {
      itemType = 'city';
      displayValue = destination.CityName;
    }

    setLocationDisplay(displayValue);
    setLocationKey(cityKey);
    setSelectedCityName(cityName);
    setSelectedItemType(itemType);
    setSelectedHotelName(hotelName);
    setFilteredDestinations([]);
    setOpenSearchDialog(false);
  };

  // Rating handlers
  const handleRatingChange = (event) => {
    const value = event.target.value;
    const isCurrentlySelected = selectedRatings.includes(value);
    const newSelectedRatings = isCurrentlySelected
      ? selectedRatings.filter((rating) => rating !== value)
      : [...selectedRatings, value];

    setSelectedRatings(newSelectedRatings);
    setIsDrawerOpen(false);
  };

  // Sort handlers
  const handleSortChange = (event) => {
    const value = event.target.value;
    const newSortOption = parseSortValue(value);

    setSortOption((prevSort) => {
      return newSortOption;
    });

    setIsDrawerOpen(false);
  };

  // Price handlers
  const handleMinPriceChange = (e) => {
    const numericValue = parseRupiahInput(e.target.value);
    setMinPrice(numericValue);

    // Close drawer after price change (optional - user might want to adjust both min and max)
    // Uncomment if you want drawer to close after price changes
    // setIsDrawerOpen(false);
  };

  const handleMaxPriceChange = (e) => {
    const numericValue = parseMaxPriceInput(e.target.value);
    setMaxPrice(numericValue);

    // Close drawer after price change (optional - user might want to adjust both min and max)
    // Uncomment if you want drawer to close after price changes
    // setIsDrawerOpen(false);
  };

  // Submit handler
  const handleSubmit = () => {
    const hasCheckin = values[0] && values[0].isValid;
    const hasCheckout = values[1] && values[1].isValid;

    if (!locationKey || !selectedCityName || !hasCheckin || !hasCheckout) {
      console.error(
        'Cannot submit: Missing location, city name, or valid dates selected.'
      );
      return;
    }

    const checkinStr = values[0].format('DD-MM-YYYY');
    const checkoutStr = values[1].format('DD-MM-YYYY');

    const searchData = {
      location: selectedCityName,
      locationKey: locationKey,
      hotelName: selectedItemType === 'hotel' ? selectedHotelName : null,
      checkin: checkinStr,
      checkout: checkoutStr,
      rooms: rooms,
      adults: adults,
      children: children,
      ratings: selectedRatings.join(','),
      sort: sortOption,
      minPrice: minPrice,
      maxPrice: maxPrice,
      page: 1,
    };

    setFilterData(searchData);

    const queryParams = new URLSearchParams();
    queryParams.set('loc', searchData.location);
    queryParams.set('id', searchData.locationKey);
    if (searchData.hotelName) {
      queryParams.set('hotelName', searchData.hotelName);
    }
    queryParams.set('checkin', searchData.checkin);
    queryParams.set('checkout', searchData.checkout);
    queryParams.set('rooms', searchData.rooms);
    queryParams.set('adults', searchData.adults);
    queryParams.set('children', searchData.children);
    if (searchData.ratings) queryParams.set('ratings', searchData.ratings);
    queryParams.set('sort', searchData.sort);
    queryParams.set('minPrice', searchData.minPrice);
    queryParams.set('maxPrice', searchData.maxPrice);
    queryParams.set('page', searchData.page);

    router.push(`/hotels/search?${queryParams.toString()}`);
  };

  return {
    // Dialog handlers
    handleSearchDialogOpen,
    handleSearchDialogClose,
    handleGuestDialogOpen,
    handleGuestDialogClose,
    handleDateDialogOpen,
    handleDateDialogClose,
    handleDrawerToggle,

    // Counter handlers
    handleIncrement,
    handleDecrement,
    handleAdultDecrement,

    // Input handlers
    handleInputChange,
    handleSelectDestination,

    // Filter handlers
    handleRatingChange,
    handleSortChange,
    handleMinPriceChange,
    handleMaxPriceChange,

    // Submit handler
    handleSubmit,
  };
};
