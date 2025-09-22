/**
 * Get current sort value untuk RadioGroup sesuai dokumentasi API
 * @param {string} sortOption - Current sort option
 * @returns {string} - Value untuk RadioGroup
 */
export const getCurrentSortValue = (sortOption) => {
  // Ensure we always return a valid radio value sesuai dokumentasi API
  const validValues = ['price_asc', 'price_desc', 'name_asc', 'name_desc'];

  // Handle legacy values
  if (sortOption === 'StarRating') return 'price_asc';
  if (sortOption === 'LowestRoomPrice') return 'price_asc';

  // Return current value if it's valid, otherwise default to price_asc
  return validValues.includes(sortOption) ? sortOption : 'price_asc';
};

/**
 * Parse sort value dari RadioGroup sesuai dokumentasi API
 * @param {string} value - Value dari RadioGroup
 * @returns {string} - sortOption yang akan digunakan untuk API
 */
export const parseSortValue = (value) => {
  // Mapping sesuai dokumentasi API yang baru
  const sortMapping = {
    // Legacy mappings
    StarRating: 'price_asc',
    HighestRoomPrice: 'price_desc',
    LowestRoomPrice: 'price_asc',
    LowestStarRating: 'price_asc',
    HighestStarRating: 'price_desc',

    // New API format mappings
    price_asc: 'price_asc',
    price_desc: 'price_desc',
    name_asc: 'name_asc',
    name_desc: 'name_desc',
  };

  return sortMapping[value] || 'price_asc'; // Default to price_asc sesuai dokumentasi
};
