import { HotelView } from 'src/sections/hotels/view';

export const metadata = {
  title: 'Temukan Hotel Yang Pas Buat Liburanmu di liburdulu.id',
  description:
    'Ribuan pilihan hotel terbaik, dari staycation santai hingga liburan penuh petualangan. Liburan Nyaman, Praktis dan Terpercaya di liburdulu.id',
  openGraph: {
    title: 'Temukan Hotel Yang Pas Buat Liburanmu di liburdulu.id',
    description:
      'Ribuan pilihan hotel terbaik, dari staycation santai hingga liburan penuh petualangan. Liburan Nyaman, Praktis dan Terpercaya di liburdulu.id',
    url: 'https://liburdulu.com/hotel',
    type: 'website',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_IMAGE_EDU}/uploads/Banner_Hotel_rev1_783611022a.jpg`,
        width: 1200,
        height: 630,
        alt: 'Hotel Booking - Liburdulu',
      },
    ],
  },
};

export default function Hotels() {
  return <HotelView />;
}
