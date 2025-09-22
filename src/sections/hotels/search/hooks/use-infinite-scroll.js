import { useEffect } from 'react';

export function useInfiniteScroll({
  hasMore,
  loadingMore,
  isLoadingHotels,
  loadMoreHotels,
}) {
  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      // Clear previous timeout to prevent multiple rapid calls
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;

        if (scrollTop + clientHeight >= scrollHeight * 0.95) {
          if (hasMore && !loadingMore && !isLoadingHotels) {
            loadMoreHotels();
          }
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [loadingMore, hasMore, isLoadingHotels, loadMoreHotels]);
}
