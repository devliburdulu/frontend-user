import Box from '@mui/material/Box';
import Image from 'next/image';

export default function MitraCollab({ data }) {
  return (
    <Box className='pt-5 pb-0 -mb-5'>
      <Image
        src={data}
        alt='curaweda-collab'
        width={1160}
        height={670}
        quality={100}
        priority={true}
        className='object-contain mt-2 mb-1'
      />
      {/* {data.map((item) => (
        <Box key={item.id} item={item}>
          <Image
            src={item.banner}
            alt='curaweda-collab'
            width={1160}
            height={670}
            quality={100}
            priority={true}
            className='object-contain mt-2 mb-1'
          />
          <div class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1'>
            <Image
              src={item.content_1}
              alt='curaweda-collab'
              width={375}
              height={468}
              quality={100}
              priority={true}
              className='object-contain mt-0 md:mt-2'
            />
            <Image
              src={item.content_2}
              alt='curaweda-collab'
              width={375}
              height={468}
              quality={100}
              priority={true}
              className='object-contain mt-0 md:mt-2'
            />
            <Image
              src={item.content_3}
              alt='curaweda-collab'
              width={375}
              height={468}
              quality={100}
              priority={true}
              className='object-contain mt-0 md:mt-2'
            />
            <Image
              src={item.content_4}
              alt='curaweda-collab'
              width={375}
              height={468}
              quality={100}
              priority={true}
              className='object-contain mt-0 md:mt-2'
            />
            <Image
              src={item.content_5}
              alt='curaweda-collab'
              width={375}
              height={468}
              quality={100}
              priority={true}
              className='object-contain mt-0 md:mt-2'
            />
            <Image
              src={item.content_6}
              alt='curaweda-collab'
              width={375}
              height={468}
              quality={100}
              priority={true}
              className='object-contain mt-0 md:mt-2'
            />
          </div>
        </Box>
      ))} */}
    </Box>
  );
}
