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
    </Box>
  );
}
