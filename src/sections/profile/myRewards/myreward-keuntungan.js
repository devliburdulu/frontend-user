import { Card } from '@mui/material';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { getRewardPoint } from 'src/fetch-global';
import { useAuthContext } from 'src/auth/hooks';
import { fPoin } from 'src/utils/format-number';

import RankBgExplorer from 'public/assets/tier/bg-explorer.png';
import RankBgVoyager from 'public/assets/tier/bg-voyager.png';
import RankBgJetsetter from 'public/assets/tier/bg-jetsetter.png';
import RankUserExplorer from 'public/assets/tier/RankExplorer.png';
import RankUserVoyager from 'public/assets/tier/RankVoyager.png';
import RankUserJetsetter from 'public/assets/tier/RankJetsetter.png';

export default function MyRewardKeuntungan() {
  const [rewardPoints, setRewardPoints] = useState(null);
  const { user } = useAuthContext();

  // Leveling or Tiering User with group_id
  const getLevelName = (groupId) => {
    if (groupId === 1) {
      return 'Explorer';
    } else if (groupId === 2) {
      return 'Voyager';
    } else if (groupId === 3) {
      return 'Jetsetter';
    } else {
      return 'Explorer';
    }
  };

  const level = getLevelName(user?.group_id);

  // Change Image Based on Level
  const getRankImage = (level) => {
    if (level === 'Explorer') return RankUserExplorer;
    if (level === 'Voyager') return RankUserVoyager;
    if (level === 'Jetsetter') return RankUserJetsetter;
    return RankUserExplorer;
  };

  // Change Background Image Based on Level
  const getRankBackground = (level) => {
    if (level === 'Explorer') return RankBgExplorer;
    if (level === 'Voyager') return RankBgVoyager;
    if (level === 'Jetsetter') return RankBgJetsetter;
    return RankBgExplorer;
  };

  useEffect(() => {
    const fetchRewardPoints = async () => {
      try {
        const data = await getRewardPoint();
        if (data && data.customerRewardDetail) {
          setRewardPoints(data.customerRewardDetail.remaining_reward_point);
        } else {
          setRewardPoints(0);
        }
      } catch (error) {
        console.error('Error fetching reward points:', error);
      }
    };

    fetchRewardPoints();
  }, []);

  return (
    <Card className='p-5'>
      <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
        <div className='h-[225px] relative'>
          <Image
            src={getRankBackground(level)}
            height={200}
            width={900}
            priority={true}
            alt='Rank Background'
            placeholder='blur'
            className='absolute h-[225px] w-fit'
          />

          <div className='absolute p-3 h-full w-full'>
            <div className='flex flex-col h-full justify-between'>
              <div className='flex flex-col'>
                <Image
                  src={getRankImage(level)}
                  height={200}
                  width={600}
                  style={{ objectFit: 'contain', width: '50%' }}
                  alt='Rank User'
                />
                <div className='flex items-center px-2 mt-2'>
                  <Image
                    src='/icon-logo.png'
                    height={20}
                    width={20}
                    style={{ objectFit: 'contain' }}
                  />
                  <span className='ml-2'>
                    {rewardPoints != null
                      ? `${fPoin(rewardPoints)} poin`
                      : 'Loading...'}
                  </span>
                </div>
              </div>
              <span className='absolute left-3 bottom-3 text-xs'>
                {user ? `LD#${user.id}` : 'Loading...'}
              </span>
            </div>
          </div>
        </div>
        <div className='d-flex flex-col gap-2'>
          <p className='font-semibold mb-3'>Keuntungan-mu Sekarang</p>
          <Card className='p-3 flex flex-row  gap-2'>
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
          </Card>
          <div className='flex flex-col mt-3'>
            <span className='text-liburdulu-blue text-sm font-semibold'>
              Cara Mengumpulkan Poin
            </span>
            <span className='text-sm mt-1'>
              Kamu bisa mengumpulkan poin dengan transaksi dan juga dengan
              menjalankan misi dari LiburDulu setiap hari{' '}
            </span>
          </div>
          {/* <Card className="p-3 flex flex-row gap-2">
            <div>
              <Image src="/icon-logo-rounded-fill.png" height={20} width={20} style={{ objectFit: "contain" }} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Dapat Poin LiburDulu</span>
              <span className="text-sm">Tukarkan poin di transaksi berikutnya atau untuk membeli voucher spesial</span>
            </div>
          </Card>
          <Card className="p-3 flex flex-row gap-2">
            <div>
              <Image src="/icon-logo-rounded-fill.png" height={20} width={20} style={{ objectFit: "contain" }} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Dapat Poin LiburDulu</span>
              <span className="text-sm">Tukarkan poin di transaksi berikutnya atau untuk membeli voucher spesial</span>
            </div>
          </Card> */}
        </div>
      </div>
      {/* <div className='flex justify-end pt-3 px-2'>
        <a href='/profile/my-reward-detail' className='text-liburdulu-orange'>
          Lihat Selengkapnya
        </a>
      </div> */}
    </Card>
  );
}
