'use client';

import { useState } from 'react';
import { Card } from '@mui/material';
import {
  mockBanner,
  mockCardFeature,
  mockCardBenefit,
  mockEasyWay,
  mockSlideTextRegisterMitra,
} from 'src/_mock/_banner';
import { styled } from '@mui/system';
import Container from '@mui/material/Container';
import Banner from 'src/sections/reuseable/banner';
import { useResponsive } from 'src/hooks/use-responsive';

import Slider from 'react-slick';

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  color: 'white',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  '& > *': {
    position: 'relative',
    zIndex: 1,
  },
}));

export default function RegisterMitraMainView() {
  const [isDragging, setIsDragging] = useState(false);

  const handleBeforeChange = () => {
    setIsDragging(true);
  };

  const handleAfterChange = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    if (!isDragging) {
    }
  };

  let settings = {
    className: 'mt-2',
    infinite: false,
    speed: 100,
    slidesToShow: 4.2,
    focusOnSelect: true,
    swipeToSlide: true,
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
    responsive: [
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3.5,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2.2,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1.2,
          swipeToSlide: true,
        },
      },
    ],
  };

  const mdUp = useResponsive('up', 'md');

  const renderText = (
    <div className='bg-liburdulu-black text-liburdulu-white grid grid-cols-1 md:grid-cols-3 items-start gap-5 justify-start p-7 mt-5 rounded-[20px] w-full'>
      {mockSlideTextRegisterMitra.map((item, index) => (
        <div key={index}>
          <p className='text-xl font-semibold'>{item.title}</p>
          <p className='text-[13px] font-medium mt-2'>{item.desc}</p>
        </div>
      ))}
    </div>
  );

  const renderCard = (
    <Card className='drop-shadow p-3 my-4'>
      <Slider {...settings}>
        {mockCardFeature.map((item, index) => (
          <span
            className='px-1'
            key={index}
            onMouseDown={() => setIsDragging(false)}
            onClick={() => handleClick(item.route)}>
            <Card className='h-[340px] p-3'>
              <div className='flex flex-col h-full w-full'>
                <span className='font-[600]'>{item.name}</span>
                <img
                  src={item.background}
                  alt={item.name}
                  className='w-full h-[140px]'
                />
                <div className='flex flex-col justify-start gap-3 mt-3 p-3'>
                  <p className='font-semibold text-xl text-liburdulu-black'>
                    {item.title}
                  </p>
                  <p className='text-sm'>{item.desc}</p>
                </div>
              </div>
            </Card>
          </span>
        ))}
      </Slider>
    </Card>
  );

  const renderHowTo = (
    <Card className='drop-shadow p-8 my-5'>
      <p className='text-center text-2xl font-semibold text-liburdulu-black'>
        Cara mudah jadi mitra
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-5 mt-5'>
        {mockEasyWay.map((item, index) => (
          <div className='text-center p-3' key={index}>
            <img src={item.background} alt={item.title} className='w-[50%]' />
            <p className='font-semibold text-base text-liburdulu-black my-3'>
              {item.title}
            </p>
            <p className='text-[14px] font-medium'>{item.desc}</p>
          </div>
        ))}
      </div>
    </Card>
  );

  const renderCardBenefit = (
    <Card className='drop-shadow p-8 my-4'>
      <p className='font-semibold text-center ps-1 text-2xl'>
        Benefit Menjadi Mitra Liburdulu
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-center mt-5'>
        {mockCardBenefit.map((item, index) => (
          <div
            className='flex flex-col items-center mt-3 justify-center text-center'
            key={index}>
            <img src={item.background} alt={item.title} />
            <p className='text-liburdulu-black font-semibold text-[15px]'>
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );

  return (
    <>
      <Banner data={mockBanner} />
      {renderText}
      {renderCard}
      {renderHowTo}
      {renderCardBenefit}
    </>
  );
}
