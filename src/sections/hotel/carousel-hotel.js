import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import { styled, useTheme } from '@mui/material/styles';

import Lightbox, { useLightBox } from 'src/components/lightbox';
import Carousel, { useCarousel } from 'src/components/carousel';

export default function CarouselHotel({ media, isDekstop }) {
  const theme = useTheme();

  // Loading state for each image
  const [imageLoaded, setImageLoaded] = useState(
    Array(media.length).fill(false)
  );

  // Convert media data to list
  const list = () => media.map((img) => ({ src: img.ImageUri }));
  const slides = list();

  const lightbox = useLightBox(slides);
  const carouselLarge = useCarousel({
    rtl: false,
    draggable: false,
    adaptiveHeight: true,
  });

  useEffect(() => {
    carouselLarge.onSetNav();
  }, [carouselLarge]);

  const handleImageLoad = (index) => {
    setImageLoaded((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  return (
    <Box
      sx={{
        gap: 1.5,
        gridTemplateColumns: { xs: '1fr 2fr', md: '2fr 1fr' },
      }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <CardMedia
            component='img'
            image={slides[0]?.src}
            onLoad={() => handleImageLoad(0)}
            onClick={() => lightbox.onOpen(slides[0]?.src)}
            alt='Main Image'
            sx={{
              height: { xs: 250, md: 416 },
              objectFit: 'cover',
              borderRadius: 2,
              filter: imageLoaded[0] ? 'none' : 'blur(10px)',
              transition: 'filter 0.5s ease-out',
              cursor: 'pointer',
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Grid container spacing={2} direction={isDekstop ? 'column' : 'row'}>
            {[1, 2].map((index) => (
              <Grid item xs={6} key={index}>
                <CardMedia
                  component='img'
                  image={slides[index]?.src}
                  onLoad={() => handleImageLoad(index)}
                  onClick={() => lightbox.onOpen(slides[index]?.src)}
                  alt={`Image ${index}`}
                  sx={{
                    height: { xs: 130, md: 200 },
                    objectFit: 'cover',
                    borderRadius: 2,
                    filter: imageLoaded[index] ? 'none' : 'blur(10px)',
                    transition: 'filter 0.5s ease-out',
                    cursor: 'pointer',
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
        onGetCurrentIndex={(index) => lightbox.setSelected(index)}
      />
    </Box>
  );
}

CarouselHotel.propTypes = {
  media: PropTypes.array.isRequired,
};
