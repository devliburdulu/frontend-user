'use client';

import Image from 'next/image';
import IconAbout from 'public/assets/home/ic-home-about.webp';
import BackgroundAbout from 'public/assets/home/bg-home-about.webp';

export default function HomepageAbout() {
  return (
    <div className='relative mt-10 mb-8 md:mb-10 bg-[#156D6A] rounded-[20px]'>
      <div className='absolute top-0 left-0 w-full h-full z-0'>
        <Image
          src={BackgroundAbout}
          fill
          quality={100}
          priority
          alt='Background About'
          className='object-cover object-center rounded-[20px]'
        />
      </div>
      <div className='relative md:flex justify-center gap-5 rounded-[20px] z-10 h-auto md:h-[450px] mb-0 md:mb-8 mt-8 md:mt-0 px-6 md:px-5 pb-8 md:pb-0 pt-0 md:pt-0'>
        <div className='w-full md:w-[28%] mb-5 md:mb-0 flex justify-center md:justify-start items-start'>
          <Image
            src={IconAbout}
            width={250}
            height={400}
            quality={100}
            priority={true}
            alt='Icon About'
          />
        </div>
        <div className='w-full md:w-[70%] lg:w-[50%] flex flex-col justify-center text-liburdulu-white'>
          <p className='mb-5 font-semibold title-text text-center md:text-left text-liburdulu-white text-xl md:text-2xl'>
            Tentang Liburdulu.id
          </p>
          <p className='mb-6 text-color-white text-center md:text-left text-[12px] md:text-[14px] max-w-full md:max-w-[540px]'>
            Liburdulu.id adalah layanan digital travel platform terbaik untuk
            membuat perjalanan lebih mudah dan menyenangkan.
            <br />
            <br />
            Mulai dari pemesanan online berbasis web, aplikasi yang ramah
            pengguna, hingga layanan pelanggan kami yang siap memberikan
            informasi untuk kebutuhan perjalanan Anda sebelum, selama, dan
            setelah perjalanan.
            <br />
            <br />
            Kami berkomitmen untuk membantu para pelaku usaha pariwisata dan
            fokus pada pariwisata berkelanjutan.
          </p>
          <p className='mb-0 font-semibold italic text-color-white text-center md:text-left text-[12px] md:text-[14px] max-w-full md:max-w-[540px]'>
            Liburdulu.id teman terbaik liburanmu.
            <br />
            Siap menemani anda menjelajah destinasi impian di Seluruh Indonesia.
          </p>
        </div>
      </div>
    </div>
  );
}
