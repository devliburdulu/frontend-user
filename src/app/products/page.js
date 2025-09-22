import { ProductView } from 'src/sections/productpage/view';

export const metadata = {
  title: 'Produk Wisata - Liburdulu',
  description:
    'Temukan berbagai pilihan paket wisata menarik untuk liburan terbaik Anda. Jelajahi destinasi populer dan nikmati pengalaman tak terlupakan!',
  openGraph: {
    title: 'Produk Wisata - Liburdulu',
    description:
      'Jelajahi berbagai pilihan paket wisata terbaik dan temukan pengalaman liburan impian Anda.',
    url: 'https://liburdulu.com/products',
    type: 'website',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_IMAGE_EDU}/uploads/waktu_indonesia_traveling_6881c1d4b8.jpg`,
        width: 1200,
        height: 630,
        alt: 'Produk Wisata Liburdulu',
      },
    ],
  },
};

export default function Products() {
  return <ProductView />;
}
