import { MainPromoView } from 'src/sections/promo/view';
import { WowPromoView } from 'src/sections/promo/view';
import { PromoFlashsaleView } from 'src/sections/promo/view';
import { PromoMerdekaView } from 'src/sections/promo/view';
import { getHomePromo } from 'src/rest/HomePromo';

export async function generateMetadata({ params }) {
  const { promo } = params;

  try {
    const data = await getHomePromo();
    const currentPromo = data.find(
      (item) => item.url === decodeURIComponent(promo)
    );

    if (!currentPromo) {
      return {
        title: 'Promo Tidak Ditemukan - Liburdulu.id',
        description: 'Promo yang Anda cari tidak ditemukan.',
      };
    }

    return {
      title: `Promo Liburdulu - ${currentPromo.title}`,
      description: currentPromo.subtitle,
      openGraph: {
        title: `Promo Liburdulu - ${currentPromo.title}`,
        description: currentPromo.subtitle,
        images: [
          `${process.env.NEXT_PUBLIC_IMAGE_EDU}${currentPromo.banner_image?.url}`,
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `Promo Liburdulu - ${currentPromo.title}`,
        description: currentPromo.subtitle,
        images: [
          `${process.env.NEXT_PUBLIC_IMAGE_EDU}${currentPromo.banner_image?.url}`,
        ],
      },
    };
  } catch (err) {
    return {
      title: 'Promo - Liburdulu.id',
      description:
        'Lihat berbagai penawaran dan promo menarik di Liburdulu.id.',
    };
  }
}

export default function PromoCollab({ params }) {
  const { promo } = params;

  if (promo === 'wow') {
    return <WowPromoView promo={promo} />;
  } else if (promo === 'flashsale') {
    return <PromoFlashsaleView promo={promo} />;
  } else if (promo === 'merdeka-trip') {
    return <PromoMerdekaView promo={promo} />;
  }
  return <MainPromoView promo={promo} />;
}
