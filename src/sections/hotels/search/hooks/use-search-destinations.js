import { useEffect } from 'react';
import { useDebounce } from 'src/hooks/use-debounce';
import { getCities } from '../../api/hotel-api';

export function useSearchDestinations({
  locationDisplay,
  selectedCityName,
  selectedHotelName,
  setFilteredDestinations,
}) {
  const debouncedLocationDisplay = useDebounce(locationDisplay, 500);

  useEffect(() => {
    const fetchCities = async () => {
      if (!debouncedLocationDisplay || debouncedLocationDisplay.trim() === '') {
        setFilteredDestinations([]);
        return;
      }

      if (
        debouncedLocationDisplay === selectedHotelName ||
        debouncedLocationDisplay === selectedCityName
      ) {
        return;
      }

      try {
        const citiesData = await getCities(debouncedLocationDisplay);
        setFilteredDestinations(citiesData);
      } catch (error) {
        console.error('Error in fetchCities useEffect:', error);
        setFilteredDestinations([]);
      }
    };

    fetchCities();
  }, [
    debouncedLocationDisplay,
    selectedCityName,
    selectedHotelName,
    setFilteredDestinations,
  ]);

  return {
    debouncedLocationDisplay,
  };
}
