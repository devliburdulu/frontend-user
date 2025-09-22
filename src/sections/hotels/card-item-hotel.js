'use client';

import { useState, useEffect } from 'react';
import { Card, Rating } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import Label from 'src/components/label';
import { fCurrency } from 'src/utils/format-number';
// import useResponsive from 'src/hooks/useResponsive';
import { useResponsive } from 'src/hooks/use-responsive';
import Iconify from 'src/components/iconify';

export default function ShopCardDefault({
  data,
  idx,
  correlationId,
  filterData,
}) {
  const mdUp = useResponsive('up', 'md');
  const [storedFilterData, setStoredFilterData] = useState(null);

  useEffect(() => {
    // Check if window is defined (Next.js SSR safety)
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem('filterData');
      if (item) {
        // Parse the JSON string to an object
        setStoredFilterData(JSON.parse(item));
      }
    }
  }, []);

  const paramsDetail = `?correlationId=${
    correlationId || storedFilterData?.correlationId
  }&id=${filterData?.locationKey || storedFilterData?.locationKey}&location=${
    filterData?.location || storedFilterData?.location
  }&rating=${data?.StarRating}&name=${data?.HotelName}&hotelName=${
    data?.HotelName
  }&checkin=${filterData?.checkin || storedFilterData?.checkin}&checkout=${
    filterData?.checkout || storedFilterData?.checkout
  }&rooms=${filterData?.rooms || 1}&adults=${
    filterData?.adults || 2
  }&children=${filterData?.children || 0}`;

  return (
    <Link
      href={`/hotels/${data?.HotelKey}${paramsDetail}`}
      className='relative drop-shadow'
      key={idx}
      target='_blank'>
      <Card
        sx={{
          height: { xs: 345, sm: 360, md: 380, lg: 420 },
          minHeight: { xs: 340, sm: 350, md: 370, lg: 410 },
          borderRadius: { xs: '10px', lg: '14px' },
          boxShadow: 2,
        }}>
        {/* Product Image */}
        <Card
          className='rounded-[10px] relative'
          sx={{
            aspectRatio: '1 / 1',
            width: '100%',
            maxHeight: '50%',
            borderRadius: '6px 6px 2px 2px',
          }}>
          {data?.ImageUri ? (
            <img
              src={data?.ImageUri}
              alt={data?.HotelName}
              width={200}
              height={200}
              className='h-full w-full object-cover'
            />
          ) : (
            <div className='h-[195px] w-full bg-gray-200 flex items-center justify-center'>
              <Image
                src='/default image 1.png'
                alt={data?.name}
                width={100}
                height={100}
                style={{ objectFit: 'contain', padding: 3 }}
              />
            </div>
          )}

          {/* Badge */}
          {data?.badge && (
            <div className='absolute bg-liburdulu-orange end-0 p-1 px-2 rounded-bl-[10px] top-0'>
              <span className='text-[14px] font-semibold text-white'>
                {data?.badge}
              </span>
            </div>
          )}
        </Card>

        {/* Product Details */}
        <div className='flex flex-col justify-between h-[52%] md:h-2/4 pt-3 xs:pb-14 sm:pb-12 lg:pb-3 px-2 md:px-3'>
          <div className='grid grid-flow-row p-0'>
            {/* Location */}
            <div className='flex justify-between gap-4 pb-2.5 md:pb-1.5'>
              <div className='text-liburdulu-blue flex items-center -ml-[5px]'>
                {mdUp && (
                  <Image
                    src='/libur_dulu_logo_only_Converted.png'
                    alt='logo-converted'
                    height={21}
                    width={25}
                    style={{
                      objectFit: 'contain',
                      marginRight: 1,
                    }}
                  />
                )}
                {!mdUp && (
                  <Image
                    src='/libur_dulu_logo_only_Converted.png'
                    alt='logo-converted'
                    height={16}
                    width={18}
                    style={{
                      objectFit: 'contain',
                      marginRight: 1,
                    }}
                  />
                )}
                <span className='text-liburdulu-blue -ml-[3px] md:-ml-1 text-[10px] lg:text-xs font-[400] line-clamp-0 md:line-clamp-1'>
                  {data?.CityName || 'Indonesia'}
                </span>
              </div>
              <div className='flex'>
                {(() => {
                  const rating = data?.StarRating || 0;
                  const fullStars = Math.floor(rating);
                  const hasHalfStar =
                    rating - fullStars >= 0.25 && rating - fullStars < 0.75;
                  const totalStars = hasHalfStar
                    ? fullStars + 1
                    : Math.round(rating);

                  return [...Array(totalStars)].map((_, index) => {
                    if (index < fullStars) {
                      return (
                        <Iconify
                          key={index}
                          icon='material-symbols:star-rounded'
                          sx={{
                            width: { xs: 14, md: 18 },
                            color: '#F99932',
                            marginRight: '-3px',
                          }}
                        />
                      );
                    } else if (hasHalfStar && index === fullStars) {
                      return (
                        <Iconify
                          key={index}
                          icon='material-symbols:star-half-rounded'
                          sx={{
                            width: { xs: 14, md: 18 },
                            color: '#F99932',
                            marginRight: '-3px',
                          }}
                        />
                      );
                    }
                    return null;
                  });
                })()}
              </div>
            </div>
            {/* Rating */}
            <div className='flex items-center px-0 my-1 md:my-1.5'>
              <Label
                variant='soft'
                color='success'
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: '10px', md: '12px' },
                  marginRight: '0.25rem',
                }}>
                <Iconify
                  icon='ri:hotel-line'
                  sx={{ width: { xs: 12, md: 14 }, marginRight: '0.25rem' }}
                />
                Hotel
              </Label>
              {/* <div className='flex md:hidden'>
                {(() => {
                  const rating = data?.StarRating || 0;
                  const fullStars = Math.floor(rating);
                  const hasHalfStar =
                    rating - fullStars >= 0.25 && rating - fullStars < 0.75;
                  const totalStars = hasHalfStar
                    ? fullStars + 1
                    : Math.round(rating);

                  return [...Array(totalStars)].map((_, index) => {
                    if (index < fullStars) {
                      return (
                        <Iconify
                          key={index}
                          icon='material-symbols:star-rounded'
                          sx={{
                            width: { xs: 14, md: 18 },
                            color: '#ffaa00',
                            marginRight: '-3px',
                          }}
                        />
                      );
                    } else if (hasHalfStar && index === fullStars) {
                      return (
                        <Iconify
                          key={index}
                          icon='material-symbols:star-half-rounded'
                          sx={{
                            width: { xs: 14, md: 18 },
                            color: '#ffaa00',
                            marginRight: '-3px',
                          }}
                        />
                      );
                    }
                    return null;
                  });
                })()}
              </div> */}
            </div>
            {/* Product Name */}
            <div className='px-0 min-h-[55px] md:min-h-[50px]'>
              <span className='text-sm lg:text-base mb-5 md:mb-2.5 lg:mb-2 font-[500] line-clamp-2'>
                {data?.HotelName}
              </span>
            </div>
          </div>
          {/* Prices */}
          <div className='grid grid-flow-row p-0 mb-2 md:mb-0 justify-items-start'>
            {data?.discount > 0 ? (
              <>
                <span className='text-gray-400 text-[11px] md:text-[13px] font-[400] liburdulu-through'>
                  {fCurrency(data?.price)}
                </span>
                <span className='text-[#e52424] text-[13px] md:text-[16px] font-[600]'>
                  {fCurrency(data?.discount)}
                </span>
              </>
            ) : (
              <>
                <span className='text-[11px] md:text-[12px] font-[500]'>
                  Mulai Dari{' '}
                </span>
                <span className='text-[#e52424] text-[13px] md:text-[16px] font-[600]'>
                  {fCurrency(data?.PricePerRoomNight || data?.AveragePrice)}
                </span>
              </>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
