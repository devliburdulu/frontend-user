import CategoryView from 'src/sections/productpage/view/category-view';

export const metadata = {
  title: 'Libur Tiket - Produk Liburdulu',
  description:
    'Temukan berbagai pilihan tiket liburan menarik untuk liburan terbaik Anda. Jelajahi destinasi populer dan nikmati pengalaman tak terlupakan!',
  openGraph: {
    title: 'Libur Tiket - Produk Liburdulu',
    description:
      'Jelajahi berbagai pilihan tiket liburan terbaik dan temukan pengalaman liburan impian Anda.',
    url: 'https://liburdulu.com/products/libur-tiket',
    type: 'website',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_IMAGE_EDU}/uploads/see_u_soon_8ff93f0d91.jpg`,
        width: 1200,
        height: 630,
        alt: 'Produk Libur Tiket',
      },
    ],
  },
};

export default function LiburVoucher() {
  return <CategoryView />;
}
