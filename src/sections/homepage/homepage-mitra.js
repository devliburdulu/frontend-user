'use client';

import { useAuthContext } from 'src/auth/hooks';
import { useRouter, useSearchParams } from 'src/routes/hooks';

export default function HomepagePromo() {
  const { authenticated } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('to');

  const handleRegisMitra = () => {
    authenticated === true
      ? router.push(returnTo || '/register-mitra')
      : router.push(returnTo || '/login');
  };

  return (
    <div className='relative mt-10 md:mt-0 lg:mt-40 mb-12'>
      <div className='md:flex justify-center gap-5 rounded-[20px] bg-[#F99932] md:h-[280px] mb-0 md:mb-8 mt-8 md:mt-12 lg:mt-20 h-auto px-6 md:px-8 pb-0 pt-10 md:pt-0'>
        <div className='hidden md:flex justify-center items-end'>
          <img
            src='promo-maskot.png'
            alt='img-mitra-registration'
            className='md:w-[75%]'
          />
        </div>
        <div className='w-full md:w-[110%] lg:w-[50%] flex flex-col justify-center text-liburdulu-white'>
          <p className='mb-2 font-semibold  title-text text-center md:text-left text-liburdulu-white text-[14px] md:text-[20px]'>
            JADILAH MITRA LIBURDULU BIAR PELUANG BISNIS PARIWISATAMU MAKIN LUAS!
          </p>
          <p className='mb-0 text-color-white text-center md:text-left text-[12px] md:text-[14px] max-w-full md:max-w-[500px]'>
            Bergabunglah dengan mitra libur dan menjadi bagian keluarga kami,
            temukan tamu wisatamu dengan berbagai kemudahan yang menarik untuk
            usahamu!
          </p>
          <div className='flex justify-center md:justify-start text-color-white'>
            <button
              onClick={handleRegisMitra}
              className='px-8 py-3 mt-3 rounded-xl bg-[#1D9CAB] text-liburdulu-white border-none font-semibold text-[14px]'>
              Daftar Gratis Sekarang
            </button>
          </div>
        </div>
        <div className='flex md:hidden justify-center items-center mt-3'>
          <img
            src='promo-maskot.png'
            alt='img-mitra-registration'
            className='md:w-[50%]'
          />
        </div>
      </div>
    </div>
  );
}
