import { useMediaQuery, useTheme, Box, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import FilterIcon from '@mui/icons-material/Filter';
import Lightbox, { useLightBox } from 'src/components/lightbox';

import 'swiper/css';
import 'swiper/css/pagination';
import '../style/slider.css';

const THUMB_HEIGHT = 240;

export default function ProductDetailsCarousel({ media }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const slides = media.map((img) => ({
    src: `${process.env.NEXT_PUBLIC_MAGENTO_API}/pub/media/catalog/product${img.file}`,
  }));

  const lightbox = useLightBox(slides);
  const isMinimal = slides.length < 3;

  return (
    <>
      {isMobile ? (
        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          pagination={{ clickable: true }}>
          {slides.map((item, index) => {
            const isLast = index === slides.length - 1 && slides.length > 1;

            return (
              <SwiperSlide key={item.src}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '1/1',
                    borderRadius: 0,
                    overflow: 'hidden',
                    cursor: 'zoom-in',
                  }}
                  onClick={() => lightbox.onOpen(item.src)}>
                  <Image
                    src={item.src}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />

                  {isLast && slides.length >= 3 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        bgcolor: 'rgba(0,0,0,0.4)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      <FilterIcon style={{ marginRight: 8 }} />
                      Lihat Semua Foto
                    </Box>
                  )}
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <Grid container spacing={2} sx={{ padding: 0 }}>
          <Grid
            item
            xs={12}
            sm={isMinimal ? 12 : 8}
            sx={{ paddingLeft: 0, paddingTop: 0 }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: { xs: '400px', md: '500px' },
                borderRadius: 2,
                overflow: 'hidden',
                cursor: 'zoom-in',
              }}
              onClick={() => lightbox.onOpen(slides[0].src)}>
              <Image
                src={slides[0]?.src}
                alt='Main product'
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>
          </Grid>

          {!isMinimal && (
            <Grid item xs={12} sm={4} container direction='column' spacing={2}>
              {slides.slice(1, 3).map((item, index) => {
                const isLast = index === 1 && slides.length > 2;

                return (
                  <Grid item key={item.src}>
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: { xs: THUMB_HEIGHT - 46, md: THUMB_HEIGHT },
                        borderRadius: 2,
                        overflow: 'hidden',
                        cursor: 'zoom-in',
                      }}
                      onClick={() => lightbox.onOpen(item.src)}>
                      <Image
                        src={item.src}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                      />

                      {isLast && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            bgcolor: 'rgba(0,0,0,0.4)',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: 16,
                          }}>
                          <FilterIcon style={{ marginRight: 8 }} />
                          Lihat Semua Foto
                        </Box>
                      )}
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Grid>
      )}

      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
        onGetCurrentIndex={(index) => lightbox.setSelected(index)}
      />
    </>
  );
}

ProductDetailsCarousel.propTypes = {
  media: PropTypes.array.isRequired,
};
