import CategoryView from 'src/sections/productpage/view/category-view';

export const metadata = {
  title: 'Objek Wisata - Produk Liburdulu',
  description:
    'Temukan berbagai pilihan objek wisata menarik untuk liburan terbaik Anda. Jelajahi destinasi populer dan nikmati pengalaman tak terlupakan!',
  openGraph: {
    title: 'Objek Wisata - Produk Liburdulu',
    description:
      'Jelajahi berbagai pilihan objek wisata terbaik dan temukan pengalaman liburan impian Anda.',
    url: 'https://liburdulu.com/products/hotel-convention',
    type: 'website',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_IMAGE_EDU}/uploads/see_u_soon_8ff93f0d91.jpg`,
        width: 1200,
        height: 630,
        alt: 'Produk Wisata Liburdulu',
      },
    ],
  },
};

export default function ObjekWisata() {
  return <CategoryView />;
}
