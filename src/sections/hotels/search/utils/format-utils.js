/**
 * Format angka menjadi format Rupiah dengan titik sebagai pemisah ribuan
 * @param {number|string} value - Nilai yang akan diformat
 * @returns {string} - Nilai yang sudah diformat
 */
export const formatRupiah = (value) => {
  if (!value && value !== 0) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

/**
 * Parse input Rupiah dan hapus titik pemisah ribuan
 * @param {string} value - Input value dari field
 * @returns {number} - Nilai numerik
 */
export const parseRupiahInput = (value) => {
  const cleanValue = value.replace(/\./g, '');
  return cleanValue ? Number(cleanValue) : 0;
};

/**
 * Parse input Rupiah dengan default value untuk max price
 * @param {string} value - Input value dari field
 * @returns {number} - Nilai numerik dengan default 10000000 untuk empty value
 */
export const parseMaxPriceInput = (value) => {
  const cleanValue = value.replace(/\./g, '');
  return cleanValue ? Number(cleanValue) : 10000000;
};
