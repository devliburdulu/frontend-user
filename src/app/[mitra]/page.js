import dynamic from 'next/dynamic';
import { getSellerBySKU, getSellerByShopUrl } from 'src/fetch-global';

const MitraHomepage = dynamic(
  () => import('src/sections/mitra/view').then((mod) => mod.MitraHomepage),
  { ssr: false }
);

export async function generateMetadata({ params }) {
  const { mitra } = params;

  let sellerData = null;

  try {
    const dataByShopUrl = await getSellerByShopUrl(mitra);
    if (dataByShopUrl && dataByShopUrl.shop_title) {
      sellerData = dataByShopUrl;
    } else {
      const dataBySKU = await getSellerBySKU(mitra);
      if (dataBySKU && dataBySKU[0]?.seller) {
        sellerData = dataBySKU[0].seller;
      }
    }
  } catch (err) {
    console.error('Error fetching metadata for mitra:', err.message);
  }

  if (!sellerData) {
    return {
      title: 'Mitra Tidak Ditemukan - Liburdulu.id',
    };
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_MAGENTO_API}/media/${sellerData.logo_pic}`;

  return {
    title: `Mitra Liburdulu - ${sellerData.shop_title}`,
    description: sellerData.company_description,
    openGraph: {
      title: `Mitra Liburdulu - ${sellerData.shop_title}`,
      description: sellerData.company_description,
      images: [
        {
          url: imageUrl,
          width: 80,
          height: 80,
          alt: `Mitra - ${sellerData.shop_title}`,
        },
      ],
    },
    twitter: {
      title: `Mitra Liburdulu - ${sellerData.shop_title}`,
      description: sellerData.company_description,
      images: [imageUrl],
      card: 'summary_large_image',
    },
  };
}

export default function Mitra({ params }) {
  const { mitra } = params;
  return <MitraHomepage mitra={mitra} />;
}
