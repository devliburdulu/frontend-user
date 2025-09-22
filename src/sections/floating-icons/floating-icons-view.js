'use client';

import { usePathname } from 'src/routes/hooks';

const FloatingButtons = () => {
  const pathname = usePathname();
  const isCheckout = pathname.startsWith('/checkout/checkout-form');
  const isHotels = pathname.startsWith('/hotels');
  const imgRequestTrip = '/request-trip.webp';

  return (
    <>
      {!isHotels && !isCheckout && (
        <div className='fixed right-0 bottom-0'>
          <div className='relative'>
            <a
              href='/request/trip'
              className='flex items-center justify-center w-32 h-32 text-white hover:scale-110 transitio
              n-transform duration-200'>
              <img src={imgRequestTrip} alt='request-trip' />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingButtons;
