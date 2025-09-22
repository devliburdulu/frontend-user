import { Card } from '@mui/material';
import Iconify from 'src/components/iconify';
import Typography from '@mui/material/Typography';

export default function MitraAboutus({ seller }) {
  return (
    <Card className='h-full flex flex-row gap-2 p-2 justify-between'>
      <div className='p-3 h-full flex flex-col gap-2'>
        <span className='text-xs font-semibold'>About Us</span>
        <Typography
          variant='body1'
          component='div'
          sx={{ color: 'text.secondary' }}
          fontSize={13}
          dangerouslySetInnerHTML={{
            __html:
              seller.company_description != null
                ? seller.company_description
                : '',
          }}
        />
      </div>

      <div className='flex gap-2'>
        <div className='divide-x p-3 flex flex-row'>
          <div></div>
          <div></div>
        </div>
        <div className='p-3 h-full flex flex-col gap-2'>
          <span className='text-xs font-semibold'>Social Media</span>
          <div className='flex gap-2'>
            {/* {seller.youtube_id != null && <a href={seller.youtube_id} className=''><Iconify icon="line-md:youtube" sx={{ fontSize: 20, color: '#1D9CAB' }} /></a>} */}
            {seller.youtube_id != null && (
              <a
                href={`https://www.youtube.com/${seller.youtube_id}`}
                className=''
                target='_blank'>
                <Iconify
                  icon='line-md:youtube'
                  sx={{ fontSize: 20, color: '#1D9CAB' }}
                />
              </a>
            )}
            {seller.facebook_id != null && (
              <a
                href={`https://www.facebook.com/${seller.facebook_id}`}
                className=''
                target='_blank'>
                <Iconify
                  icon='line-md:facebook'
                  sx={{ fontSize: 20, color: '#1D9CAB' }}
                />
              </a>
            )}
            {seller.twitter_id != null && (
              <a
                href={`https://x.com/${seller.twitter_id}`}
                className=''
                target='_blank'>
                <Iconify
                  icon='line-md:twitter-x'
                  sx={{ fontSize: 20, color: '#1D9CAB' }}
                />
              </a>
            )}
            {seller.instagram_id != null && (
              <a
                href={`https://www.instagram.com/${seller.instagram_id}`}
                className=''
                target='_blank'>
                <Iconify
                  icon='line-md:instagram'
                  sx={{ fontSize: 20, color: '#1D9CAB' }}
                />
              </a>
            )}
            {seller.tiktok_id != null && (
              <a
                href={`https://www.tiktok.com/@${seller.tiktok_id}`}
                className=''
                target='_blank'>
                <Iconify
                  icon='line-md:tiktok'
                  sx={{ fontSize: 20, color: '#1D9CAB' }}
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

// DATA BACKUP

// <Card className="h-full flex flex-row gap-2">
//   <div className="p-3 h-full flex flex-col gap-2">
//     <span className="text-xs font-semibold">About Us</span>
//     <span className="text-xs font-normal">
//       {seller.company_description != null
//         ? seller.company_description
//         : "JALAN DULU AJA Tours & Travel nih, guys! Kalo kalian lagi cari jasa travel yang kece abis, ini dia pilihan pas buat kalian! Gak main-main deh, mereka spesialis dalam jasa perjalanan dan wisata."}
//     </span>
//   </div>
//   <div className="divide-x p-3 flex flex-row">
//     <div></div>
//     <div></div>
//   </div>
//   <div className="p-3 h-full flex flex-col gap-2">
//     <span className="text-xs font-semibold">Social Media</span>
//     <div className="flex gap-2">
//       {/* {seller.youtube_id != null && <a href={seller.youtube_id} className=''><Iconify icon="line-md:youtube" sx={{ fontSize: 20, color: '#1D9CAB' }} /></a>} */}
//       {seller.youtube_id != null && (
//         <a href={seller.youtube_id} className="">
//           <Iconify icon="line-md:youtube" sx={{ fontSize: 20, color: "#1D9CAB" }} />
//         </a>
//       )}
//       {seller.facebook_id != null && (
//         <a href={seller.facebook_id} className="">
//           <Iconify icon="line-md:facebook" sx={{ fontSize: 20, color: "#1D9CAB" }} />
//         </a>
//       )}
//       {seller.twitter_id != null && (
//         <a href={seller.twitter_id} className="">
//           <Iconify icon="line-md:twitter-x" sx={{ fontSize: 20, color: "#1D9CAB" }} />
//         </a>
//       )}
//       {seller.instagram_id != null && (
//         <a href={seller.instagram_id} className="">
//           <Iconify icon="line-md:instagram" sx={{ fontSize: 20, color: "#1D9CAB" }} />
//         </a>
//       )}
//       {seller.tiktok_id != null && (
//         <a href={seller.tiktok_id} className="">
//           <Iconify icon="line-md:tiktok" sx={{ fontSize: 20, color: "#1D9CAB" }} />
//         </a>
//       )}
//     </div>
//   </div>
// </Card>
