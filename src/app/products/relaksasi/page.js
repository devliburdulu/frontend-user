import CategoryView from 'src/sections/productpage/view/category-view';

export const metadata = {
  title: 'Relaksasi - Produk Liburdulu',
  description:
    'Temukan berbagai pilihan relaksasi menarik untuk liburan terbaik Anda. Jelajahi destinasi populer dan nikmati pengalaman tak terlupakan!',
  openGraph: {
    title: 'Relaksasi - Produk Liburdulu',
    description:
      'Jelajahi berbagai pilihan relaksasi terbaik dan temukan pengalaman liburan impian Anda.',
    url: 'https://liburdulu.com/products/relaksasi',
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

export default function PaketWisata() {
  return <CategoryView />;
}
