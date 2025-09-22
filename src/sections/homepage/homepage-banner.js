import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Image from 'src/components/image';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

// ----------------------------------------------------------------------
export default function HomepageBanner({ data }) {
  const theme = useTheme();

  const carousel = useCarousel({
    autoplay: true,
  });

  return (
    <Box
      sx={{
        position: 'relative',
        '& .slick-list': {
          borderRadius: 2,
          boxShadow: theme.customShadows.z16,
        },
      }}>
      <CarouselArrows
        filled
        shape='rounded'
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}>
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {data.map((item) => (
            <CarouselItem key={item.id} item={item} />
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}

HomepageBanner.propTypes = {
  data: PropTypes.array,
};

// ----------------------------------------------------------------------

function CarouselItem({ item }) {
  const { coverUrl, title, route } = item;

  useEffect(() => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'bannerImpression',
        bannerTitle: title,
        bannerRoute: route,
      });
      //
    } else {
      console.warn('DataLayer not found or window is undefined');
    }
  }, [title, route]);

  return (
    <a href={route}>
      <Image
        alt={title}
        src={coverUrl}
        ratio='21/9'
        sx={{ objectFit: 'fill' }}
      />
    </a>
  );
}

CarouselItem.propTypes = {
  item: PropTypes.object.isRequired,
};
