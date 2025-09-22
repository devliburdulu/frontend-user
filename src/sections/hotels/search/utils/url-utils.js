/**
 * Normalize query parameters untuk perbandingan URL sesuai dokumentasi API
 * @param {URLSearchParams} params - URL search parameters
 * @param {string} key - Key parameter
 * @returns {string} - Normalized value
 */
export const normalizeQueryParam = (params, key) => {
  const currentVal = params.get(key);

  switch (key) {
    case 'minPrice':
      return currentVal ?? '0';
    case 'maxPrice':
      return currentVal ?? '10000000';
    case 'ratings':
      return currentVal ?? '';
    case 'sort':
      // Convert legacy values to new API format
      if (currentVal === 'StarRating') return 'price_asc';
      if (currentVal === 'LowestRoomPrice') return 'price_asc';
      if (currentVal === 'HighestRoomPrice') return 'price_desc';
      // Default to price_asc sesuai dokumentasi
      return currentVal ?? 'price_asc';
    default:
      return currentVal;
  }
};

/**
 * Check apakah filters sudah berubah dengan membandingkan current dan new params
 * @param {URLSearchParams} currentParams - Current URL parameters
 * @param {URLSearchParams} newParams - New URL parameters
 * @returns {boolean} - True jika ada perubahan filter
 */
export const checkFiltersChanged = (currentParams, newParams) => {
  // Update filter keys sesuai API yang baru (tidak ada sortDir lagi)
  const filterKeys = ['ratings', 'sort', 'minPrice', 'maxPrice'];

  const hasChanges = filterKeys.some((key) => {
    if (key === 'ratings') {
      // Special handling for ratings: check if parameter exists vs empty string
      const currentHasRatings = currentParams.has('ratings');
      const newHasRatings = newParams.has('ratings');

      // If one has ratings param and the other doesn't, it's a change
      if (currentHasRatings !== newHasRatings) {
        return true;
      }

      // If both have ratings param, compare their values
      if (currentHasRatings && newHasRatings) {
        const currentValue = currentParams.get('ratings') || '';
        const newValue = newParams.get('ratings') || '';
        const changed = currentValue !== newValue;
        return changed;
      }

      // If neither has ratings param, no change
      return false;
    } else {
      const currentNormalized = normalizeQueryParam(currentParams, key);
      const newNormalized = normalizeQueryParam(newParams, key);
      const changed = currentNormalized !== newNormalized;
      return changed;
    }
  });

  return hasChanges;
};

/**
 * Build query parameters object untuk URL sesuai dokumentasi API
 * @param {object} searchData - Data pencarian
 * @returns {URLSearchParams} - URLSearchParams object
 */
export const buildQueryParams = (searchData) => {
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

  if (searchData.ratings) {
    queryParams.set('ratings', searchData.ratings);
  }

  // Hanya menggunakan sort sesuai dokumentasi API (tidak ada sortDir lagi)
  queryParams.set('sort', searchData.sort);
  queryParams.set('minPrice', searchData.minPrice);
  queryParams.set('maxPrice', searchData.maxPrice);
  queryParams.set('page', searchData.page);

  return queryParams;
};
