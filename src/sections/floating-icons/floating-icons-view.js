'use client';

import { usePathname } from 'src/routes/hooks';

const FloatingButtons = () => {
  const pathname = usePathname();
  const isCheckout = pathname.startsWith('/checkout/checkout-form');
  const isProducts = pathname.startsWith('/products');
  const isHotels = pathname.startsWith('/hotels');
  const imgRequestTrip = '/request-trip.webp';

  return (
    <>
      {!isHotels && !isCheckout && !isProducts && (
        <div className='fixed right-0 bottom-0'>
          <div className='relative'>
            <a
              href='/request/trip'
              className='flex items-center justify-center w-32 h-32 text-white'>
              <img src={imgRequestTrip} alt='request-trip' />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingButtons;
