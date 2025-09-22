'use client';

import Image from 'next/image';
import Card from '@mui/material/Card';
import { mockWhyUs } from 'src/_mock/_home';

export default function HomepageWhyus() {
  return (
    <div className='relative mt-10 mb-8 md:mb-10'>
      <div className='flex flex-col'>
        <p className='mb-2 md:mb-5 font-semibold title-text text-center text-liburdulu-black text-xl md:text-2xl'>
          Kenapa Liburdulu.id?
        </p>
      </div>
      <div className='flex flex-col md:flex-row w-full'>
        {mockWhyUs.map((item, index) => (
          <div className='w-full md:w-1/3' key={index}>
            <Card className='min-h-fit md:min-h-[260px] lg:min-h-[220px] my-3 md:my-0 mx-0 md:mx-2 px-3 py-6 drop-shadow flex flex-col text-center justify-center items-center rounded-[20px]'>
              <div className='box-icon mb-3'>
                <Image
                  src={item.icon}
                  width={64}
                  height={64}
                  quality={100}
                  priority
                  alt='Icon Why Us'
                />
              </div>
              <div className='box-desc flex flex-col justify-center items-center'>
                <p className='text-liburdulu-black font-semibold text-[16px] mb-1'>
                  {item.title}
                </p>
                <p className='text-liburdulu-black font-normal text-[14px] max-w-64'>
                  {item.desc}
                </p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
