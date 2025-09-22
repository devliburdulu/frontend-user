import { Card } from '@mui/material';
import Image from 'next/image';

export default function MyRewardMengumpulkan() {
  return (
    <Card className='p-5 flex flex-col'>
      <div className='flex flex-col'>
        <span className='text-liburdulu-blue text-sm font-semibold'>
          Cara Mengumpulkan Poin
        </span>
        <span className='text-sm mt-1'>
          Kamu bisa mengumpulkan poin dengan transaksi dan juga dengan
          menjalankan misi dari LiburDulu setiap hari{' '}
        </span>
      </div>
      <div className='flex flex-col mt-2 gap-1'>
        <span className='text-liburdulu-blue text-sm font-semibold mt-5 mb-2'>
          Selesaikan Misinya & Dapatkan Poin
        </span>
        <div className='grid grid-cols-2 gap-2'>
          <div className='flex flex-row gap-2'>
            <div>
              <Image
                src='/icon-logo-rounded-fill.png'
                height={20}
                width={20}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className='flex flex-col'>
              <span className='text-sm font-semibold'>
                Dapat Poin LiburDulu
              </span>
              <span className='text-sm'>
                Tukarkan poin di transaksi berikutnya atau untuk membeli voucher
                spesial
              </span>
            </div>
          </div>
          <div className='flex flex-row gap-2'>
            <div>
              <Image
                src='/icon-logo-rounded-fill.png'
                height={20}
                width={20}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className='flex flex-col'>
              <span className='text-sm font-semibold'>
                Dapat Poin LiburDulu
              </span>
              <span className='text-sm'>
                Tukarkan poin di transaksi berikutnya atau untuk membeli voucher
                spesial
              </span>
            </div>
          </div>
          <div className='flex flex-row gap-2'>
            <div>
              <Image
                src='/icon-logo-rounded-fill.png'
                height={20}
                width={20}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className='flex flex-col'>
              <span className='text-sm font-semibold'>
                Dapat Poin LiburDulu
              </span>
              <span className='text-sm'>
                Tukarkan poin di transaksi berikutnya atau untuk membeli voucher
                spesial
              </span>
            </div>
          </div>
          <div className='flex flex-row gap-2'>
            <div>
              <Image
                src='/icon-logo-rounded-fill.png'
                height={20}
                width={20}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className='flex flex-col'>
              <span className='text-sm font-semibold'>
                Dapat Poin LiburDulu
              </span>
              <span className='text-sm'>
                Tukarkan poin di transaksi berikutnya atau untuk membeli voucher
                spesial
              </span>
            </div>
          </div>
          <div className='flex flex-row gap-2'>
            <div>
              <Image
                src='/icon-logo-rounded-fill.png'
                height={20}
                width={20}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className='flex flex-col'>
              <span className='text-sm font-semibold'>
                Dapat Poin LiburDulu
              </span>
              <span className='text-sm'>
                Tukarkan poin di transaksi berikutnya atau untuk membeli voucher
                spesial
              </span>
            </div>
          </div>
          <div className='flex flex-row gap-2'>
            <div>
              <Image
                src='/icon-logo-rounded-fill.png'
                height={20}
                width={20}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className='flex flex-col'>
              <span className='text-sm font-semibold'>
                Dapat Poin LiburDulu
              </span>
              <span className='text-sm'>
                Tukarkan poin di transaksi berikutnya atau untuk membeli voucher
                spesial
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
