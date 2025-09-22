const calculateDownPayment = (price) => {
  if (price >= 250000 && price <= 999000) {
    return 150000;
  } else if (price >= 1000000 && price <= 2499000) {
    return 300000;
  } else if (price >= 2500000 && price <= 5000000) {
    return 500000;
  }
  return price; // Default jika harga tidak sesuai kriteria
};

export default calculateDownPayment;
