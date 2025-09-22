import { DetailProductView } from 'src/sections/product-detail/view';
import { getSellerBySKU } from 'src/fetch-global';

function stripHtmlAndTrim(text = '', maxLength = 160) {
  const plainText = text.replace(/<[^>]*>/g, '').trim();
  if (plainText.length <= maxLength) return plainText;

  const trimmed = plainText.slice(0, maxLength);
  const lastSpaceIndex = trimmed.lastIndexOf(' ');
  return trimmed.slice(0, lastSpaceIndex) + '...';
}

async function getProductDetail(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MAGENTO_API}/rest/V1/products/${id}`,
    {
      next: { revalidate: 60 },
      headers: {
        Authorization: `Bearer ${process.env.NEXT_MAGENTO_TOKEN}`,
      },
    }
  );

  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }) {
  const { id } = params;
  const data = await getProductDetail(id);
  let sellerData = null;

  try {
    const sellerResult = await getSellerBySKU(id);
    if (sellerResult && sellerResult.length > 0) {
      sellerData = sellerResult[0].seller;
    }
  } catch (err) {
    console.error('Error fetching metadata for mitra:', err.message);
  }

  if (!data) {
    return {
      title: 'Produk tidak ditemukan',
      description: 'Produk yang Anda cari tidak tersedia.',
    };
  }

  const metaTitle = `${data.name} - ${sellerData?.shop_title}`;
  const rawDesc = data?.custom_attributes?.find(
    (attr) => attr.attribute_code === 'short_description'
  )?.value;
  const metaDesc = stripHtmlAndTrim(rawDesc, 160);

  const imagePath = data?.media_gallery_entries?.[0]?.file || '';
  const metaImage = `${process.env.NEXT_PUBLIC_MAGENTO_API}/pub/media/catalog/product${imagePath}`;

  return {
    title: metaTitle,
    description: metaDesc,
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      images: [metaImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDesc,
      images: [metaImage],
    },
  };
}

export default function ProductDetails({ params }) {
  const { id } = params;
  return <DetailProductView id={id} />;
}
