import { useRouter } from 'next/navigation';
import { StyledCardSuperMitra } from './extended';
import { paths } from 'src/routes/paths';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import './slider.css';

export default function SuperMitraCard({ item }) {
  const router = useRouter();
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  const handleClick = (route, data) => {
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
      className='super-mitra relative block'
      ref={elementRef}
      onClick={() => handleClick(item.route, item)}>
      <StyledCardSuperMitra className='relative cursor-pointer'>
        <Image
          src={item.coverMitra}
          alt={item.title}
          priority
          quality={100}
          layout='fill'
          objectFit='cover'
          className='absolute top-0 left-0 w-full h-full z-[-1]'
        />
        <div className='overlay'></div>
        <div className='flex flex-col h-full w-full p-3 z-10'>
          <div className='rounded-[5px] w-fit p-1 px-2 bg-liburdulu-orange'>
            <span className='font-[500] text-xs'>{item.category}</span>
          </div>
          <span className='font-[600] text-sm mt-2 max-w-40'>{item.title}</span>
          <Image
            src={item.iconMitra}
            alt={item.title}
            width={80}
            height={80}
            className='absolute bottom-0 left-0 m-3 object-contain'
          />
          <Image
            src='/SpecialMitraIcon.png'
            alt='icon-special'
            width={45}
            height={45}
            priority
            quality={100}
            className='absolute top-0 right-0 m-1 mt-2 md:h-[60px] object-contain'
          />
        </div>
      </StyledCardSuperMitra>
    </span>
  );
}
