// src/components/Banner.js
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { sendGAEvent } from "@next/third-parties/google";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Image from "src/components/image";
import Carousel, { useCarousel, CarouselDots, CarouselArrows } from "src/components/carousel";

export default function Banner({ data }) {
  const theme = useTheme();

  const carousel = useCarousel({
    autoplay: true,
  });

  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    //
    const observer = new IntersectionObserver(
      ([entry]) => {
        //

        setIsVisible(entry.isIntersecting);
      },
      {
        root: null, // viewport
        rootMargin: "0px", // no margin
        threshold: 0.5, // 50% of target visible
      }
    );

    //

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // Clean up the observer
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  //

  useEffect(() => {
    //
    if (typeof window !== "undefined" && window.dataLayer && typeof data[carousel.currentIndex] !== "undefined" && isVisible) {
      // window.dataLayer.pop({
      //   productSku,
      //   productTitle
      // })

      window.dataLayer.push({
        event: "bannerImpression",
        bannerDetail: {
          bannerId: data[carousel.currentIndex].id,
          bannerTitle: data[carousel.currentIndex].title,
          bannerRoute: data[carousel.currentIndex].route,
        },
      });
    }
  }, [carousel.currentIndex]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.dataLayer && isVisible) {
      let list = [];

      data.map((item) => {
        list.push({
          bannerId: item.id,
          bannerTitle: item.title,
          bannerRoute: item.route,
        });
      });
      //
      // window.dataLayer.pop({
      //   productSku,
      //   productTitle
      // })

      window.dataLayer.push({
        event: "bannerImpression",
        bannerDetail: {
          bannerId: data[0]?.id,
          bannerTitle: data[0]?.title,
          bannerRoute: data[0]?.route,
        },
      });

      // window.dataLayer.push({
      //   event: "bannerListImpression",
      //   bannerList: list,
      // });
    }
  }, [data]);

  return (
    <Box
      sx={{
        position: "relative",
        "& .slick-list": {
          borderRadius: 2,
          boxShadow: theme.customShadows.z16,
        },
      }}
      ref={elementRef}
    >
      <CarouselArrows filled shape="rounded" onNext={carousel.onNext} onPrev={carousel.onPrev}>
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {data.map((item) => (
            <CarouselItem key={item.id} item={item} />
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}

Banner.propTypes = {
  data: PropTypes.array,
};

function CarouselItem({ item }) {
  const { coverUrl, title, route } = item;

  const handleClick = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "bannerClick",
        bannerDetail: {
          bannerId: item.id,
          bannerTitle: item.title,
          bannerRoute: item.route,
        },
      });
    }
    // sendGAEvent("event", "buttonClicked", { value: "xyz" });
  };

  // useEffect(() => {
  //   if (typeof window !== "undefined" && window.dataLayer) {
  //     window.dataLayer.push({
  //       event: "bannerImpression",
  //       bannerTitle: title,
  //       bannerRoute: route,
  //     });
  //   }
  // }, [title, route]);

  return (
    <a href={route} onClick={handleClick}>
      <Image alt={title} src={coverUrl} ratio="21/9" sx={{ objectFit: "fill" }} />
    </a>
  );
}

CarouselItem.propTypes = {
  item: PropTypes.object,
};
