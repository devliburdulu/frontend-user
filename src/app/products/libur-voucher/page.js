import CategoryView from 'src/sections/productpage/view/category-view';

export const metadata = {
  title: 'Libur Voucher - Produk Liburdulu',
  description:
    'Temukan berbagai pilihan voucher liburan menarik untuk liburan terbaik Anda. Jelajahi destinasi populer dan nikmati pengalaman tak terlupakan!',
  openGraph: {
    title: 'Libur Voucher - Produk Liburdulu',
    description:
      'Jelajahi berbagai pilihan voucher liburan terbaik dan temukan pengalaman liburan impian Anda.',
    url: 'https://liburdulu.com/products/libur-voucher',
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

export default function LiburVoucher() {
  return <CategoryView />;
}
