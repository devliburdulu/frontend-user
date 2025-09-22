import { useRouter } from 'next/navigation';
import { StyledCardSuperMitra } from './extended';
import { paths } from 'src/routes/paths';
import { useEffect, useRef, useState } from 'react';
import Image from 'src/components/image';
// import Image from 'next/image';

export default function SuperMitraCard({ setIsDragging, isDragging, item }) {
  const router = useRouter();
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null, // viewport
        rootMargin: '0px', // no margin
        threshold: 0.5, // 50% of target visible
      }
    );

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

  const handleClick = (route, data) => {
    if (!isDragging) {
      moveToProduct(route);
      if (typeof window !== 'undefined' && window.dataLayer && isVisible) {
        window.dataLayer.push({
          event: 'mitraClick',
          mitraDetail: {
            mitraName: data.name,
            mitraFrom: 'Home Page',
            mitraURL: data.route,
          },
        });
      }
    }
  };

  function moveToProduct(search) {
    localStorage.setItem('idMitra', 0);
    localStorage.setItem('searchMitra', 'Semua Produk');
    router.push(paths.mitra.root(search));
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.dataLayer && isVisible) {
      window.dataLayer.push({
        event: 'mitraImpression',
        mitraDetail: {
          mitraName: item.name,
          mitraFrom: 'Home Page',
          mitraURL: item.route,
        },
      });
    }
  }, [isVisible, item]);

  return (
    <span
      className='super-mitra'
      ref={elementRef}
      onMouseDown={() => setIsDragging(false)}
      onClick={() => handleClick(item.route, item)}>
      {/* <StyledCardSuperMitra
        style={{
          backgroundImage: `${item.background}`,
          cursor: 'pointer',
        }}>
        <div className='flex flex-col h-full w-full p-3'>
          <div className='rounded-[5px] w-fit p-1 px-2 bg-liburdulu-orange'>
            <span className='font-[500] text-xs'>{item.label}</span>
          </div>
          <span className='font-[600] text-sm mt-2 max-w-40'>{item.name}</span>
          <img
            src={item.icon}
            alt={item.name}
            className='absolute bottom-0 left-0 m-3 h-[80px] object-contain'
          />
          <img
            src='SpecialMitraIcon.png'
            alt=''
            className='absolute top-0 right-0 m-1 mt-2 h-[70px] md:h-[60px] object-contain'
          />
        </div>
      </StyledCardSuperMitra> */}
      <StyledCardSuperMitra
        style={{
          // backgroundImage: `url(${item.coverMitra})`,
          cursor: 'pointer',
        }}>
        <div className='absolute z-0 w-full h-full top-0 left-0 object-cover object-top'>
          {/* <Image
            alt={item.title}
            src={item.coverMitra}
            sx={{
              objectFit: 'cover',
              objectPosition: 'top',
              height: '300px',
              width: '100%',
              '& > *': {
                position: 'relative',
                zIndex: 1,
              },
            }}
          /> */}
          <img
            src={item.coverMitra}
            alt={item.title}
            className='absolute w-full h-full object-cover'
          />
        </div>
        <div className='absolute z-10 w-full h-[300px] bg-[#333] opacity-50 top-0 right-0 left-0 bottom-0'></div>
        <div className='flex flex-col h-full w-full p-3 relative z-20'>
          <div className='rounded-[5px] w-fit p-1 px-2 bg-liburdulu-orange'>
            <span className='font-[500] text-xs'>{item.category}</span>
          </div>
          <span className='font-[600] text-sm mt-2 max-w-40'>{item.title}</span>
          <img
            src={item.iconMitra}
            alt={item.title}
            className='absolute bottom-0 left-0 m-3 h-[80px] object-contain'
          />
          <img
            src='SpecialMitraIcon.png'
            alt='icon-special'
            className='absolute top-0 right-0 m-1 mt-2 h-[70px] md:h-[60px] object-contain'
          />
        </div>
      </StyledCardSuperMitra>
    </span>
  );
}
