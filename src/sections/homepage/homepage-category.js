import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { useTheme, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { getCategory } from 'src/fetch-global';
import CategoryIcon from '../reuseable/category-icon';
import { slugify } from 'src/utils/slugify';
import SearchBar from 'src/layouts/main/search/searchBar';

export default function HomepageCategory() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery('(max-width:374px)');
  const isMediumMobile = useMediaQuery(
    '(min-width:375px) and (max-width:640px)'
  );

  function moveToProduct(id, name) {
    const slug =
      name === 'Hotel & Convention' ? '/hotels' : `/products/${slugify(name)}`;
    localStorage.setItem('id', id);
    localStorage.setItem('search', name);
    router.push(slug);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategory();
        // Sorting in ascending order based on `position`
        const sortedData = data.children_data.sort(
          (a, b) => a.position - b.position
        );
        setDatas(sortedData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ mt: { xs: 2.5, lg: 0 } }}>
      <Card
        className='shadow-none p-0 mt-0 mb-0 md:mb-2 lg:mb-4'
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          borderRadius: '0',
        }}>
        {loading ? (
          <LoadingSkeleton
            isMobile={isMobile}
            isSmallMobile={isSmallMobile}
            isMediumMobile={isMediumMobile}
          />
        ) : (
          <>
            {!isMobile && (
              <div className='grid grid-cols-5 lg:grid-cols-5 gap-2 md:gap-3 pb-2'>
                {datas
                  // .filter((item) => item.id && item.is_active)
                  .slice(0, 10)
                  .map((item) => (
                    <CategoryIcon
                      key={item.id}
                      moveToProduct={moveToProduct}
                      item={item}
                      is_active={item.is_active}
                    />
                  ))}
              </div>
            )}

            {isMobile && (
              <Box sx={{ pb: { xs: 0, sm: 0.75 } }}>
                {isSmallMobile && (
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={4}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    loop={true}
                    modules={[Autoplay]}
                    className='category-swiper'>
                    {datas.slice(0, 10).map((item) => (
                      <SwiperSlide key={item.id}>
                        <CategoryIcon
                          moveToProduct={moveToProduct}
                          item={item}
                          is_active={item.is_active}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}

                {isMediumMobile && (
                  <div className='grid grid-cols-5 gap-1'>
                    {datas.slice(0, 10).map((item) => (
                      <CategoryIcon
                        key={item.id}
                        moveToProduct={moveToProduct}
                        item={item}
                        is_active={item.is_active}
                      />
                    ))}
                  </div>
                )}

                {!isSmallMobile && !isMediumMobile && isMobile && (
                  <div className='grid grid-cols-5 gap-2'>
                    {datas.slice(0, 10).map((item) => (
                      <CategoryIcon
                        key={item.id}
                        moveToProduct={moveToProduct}
                        item={item}
                        is_active={item.is_active}
                      />
                    ))}
                  </div>
                )}
              </Box>
            )}
          </>
        )}
      </Card>
    </Box>
  );
}

const LoadingSkeleton = ({ isMobile, isSmallMobile, isMediumMobile }) => {
  return (
    <>
      {/* Desktop Loading Skeleton */}
      {!isMobile && (
        <div className='grid grid-cols-5 lg:grid-cols-5 gap-2 md:gap-3 pb-2'>
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <Card
                key={index}
                sx={{ borderRadius: '8px', boxShadow: 1 }}
                className='flex flex-col lg:flex-row h-[6rem] lg:h-auto items-center justify-center lg:justify-start space-x-0 lg:space-x-2 p-2 lg:p-3.5'>
                <Skeleton variant='circular' width={40} height={40} />
                {!isMobile && <Skeleton variant='text' width={150} />}
                {isMobile && <Skeleton variant='text' width={60} />}
              </Card>
            ))}
        </div>
      )}

      {/* Mobile Loading Skeleton */}
      {isMobile && (
        <Box sx={{ pb: 2 }}>
          {isSmallMobile && (
            <Swiper
              slidesPerView={4}
              spaceBetween={4}
              modules={[Autoplay]}
              className='category-swiper'>
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <SwiperSlide key={index}>
                    <Card
                      sx={{ borderRadius: '8px', boxShadow: { xs: 0, md: 2 } }}
                      className='flex flex-col h-[6rem] items-center justify-center space-x-0 p-2'>
                      <Skeleton variant='circular' width={40} height={40} />
                      <Skeleton variant='text' width={60} sx={{ mt: 1 }} />
                    </Card>
                  </SwiperSlide>
                ))}
            </Swiper>
          )}

          {isMediumMobile && (
            <div className='grid grid-cols-5 gap-1'>
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <Card
                    key={index}
                    sx={{ borderRadius: '8px', boxShadow: { xs: 0, md: 2 } }}
                    className='flex flex-col h-[6rem] items-center justify-center space-x-0 p-2'>
                    <Skeleton variant='circular' width={40} height={40} />
                    <Skeleton variant='text' width={60} sx={{ mt: 1 }} />
                  </Card>
                ))}
            </div>
          )}

          {!isSmallMobile && !isMediumMobile && isMobile && (
            <div className='grid grid-cols-5 gap-2'>
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <Card
                    key={index}
                    sx={{ borderRadius: '8px', boxShadow: { xs: 0, md: 2 } }}
                    className='flex flex-col h-[6rem] items-center justify-center space-x-0 p-2'>
                    <Skeleton variant='circular' width={40} height={40} />
                    <Skeleton variant='text' width={60} sx={{ mt: 1 }} />
                  </Card>
                ))}
            </div>
          )}
        </Box>
      )}
    </>
  );
};
