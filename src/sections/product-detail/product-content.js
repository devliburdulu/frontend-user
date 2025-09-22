import { useState, useEffect } from 'react';
// import { getTerms } from 'src/rest/TermsProduct';
import { getAllReview } from 'src/fetch-global';
import ProductContentDetail from './content/ProductContentDetail';
import ReviewContent from '../reuseable/review-content';
import ProductSizeOptions from './summary/ProductSizeOptions';
import CustomOptions from './summary/CustomOptions';
import CustomPayments from './summary/CustomPayments';
import ProductQuantity from './summary/ProductQuantity';

const ATTRIBUTE_LABELS = {
  itinerary: 'Itinerary',
  destinasi_wisata: 'Destinasi Wisata',
  tanggal_keberangkatan: 'Tanggal Keberangkatan',
  pickup_point: 'Titik Jemput',
  informasi_tambahan: 'Informasi Lainnya',
  // terms_and_condition: 'Syarat & Ketentuan',
  short_description: 'Deskripsi',
};

const FASILITAS_CODES = ['fasilitas_include', 'fasilitas_exclude'];

export default function ProductContent(props) {
  const {
    data,
    category,
    seller,
    image,
    childrenProduct,
    subSkuCode,
    subSku,
    handleChange,
    label,
    time,
    handleChangeCustomOption,
    cart,
    timeForDateType,
    downPayment,
    price,
    specialPrice,
    value,
    valueMin,
    valueMax,
    qty,
    setValue,
    ...rest
  } = props;

  const [tabs, setTabs] = useState([]);
  const customAttributes = data?.custom_attributes || [];

  useEffect(() => {
    const fetchTabs = async () => {
      const fasilitasData = FASILITAS_CODES.map((code) =>
        customAttributes.find((attr) => attr.attribute_code === code)
      );

      const fasilitasInclude = fasilitasData[0]?.value?.trim();
      const fasilitasExclude = fasilitasData[1]?.value?.trim();

      const fasilitasTab = (fasilitasInclude || fasilitasExclude) && {
        code: 'fasilitas',
        label: 'Fasilitas',
        value: `
            ${
              fasilitasInclude
                ? `<span class='font-semibold'>Termasuk:</span><br/>${fasilitasInclude}`
                : ''
            }
            ${
              fasilitasExclude
                ? `<br><span class='font-semibold'>Tidak Termasuk:</span><br/>${fasilitasExclude}`
                : ''
            }
          `,
      };

      // const termsAPI = await getTerms(data?.sku);
      // const termsTab = ((Array.isArray(category) &&
      //   category.includes('Paket Wisata')) ||
      //   category === 'Paket Wisata') && {
      //   code: 'terms_and_condition',
      //   label: ATTRIBUTE_LABELS['terms_and_condition'],
      //   value: `${termsAPI?.content || ''}`,
      // };

      const attributeTabs = customAttributes
        .filter(
          (attr) =>
            Object.keys(ATTRIBUTE_LABELS).includes(attr.attribute_code) &&
            attr.attribute_code !== 'terms_and_condition'
        )
        .map((attr) => ({
          code: attr.attribute_code,
          label: ATTRIBUTE_LABELS[attr.attribute_code],
          value: attr.value,
        }));

      const reviews = await getAllReview(data?.sku);
      const reviewTab = reviews?.length && {
        code: 'ulasan',
        label: 'Ulasan',
        component: (
          <div>
            {reviews.map((review, idx) => {
              const ratings = review?.ratings?.find(
                (rate) => rate.rating_name === 'Rating'
              );
              return (
                <ReviewContent
                  key={idx}
                  img={review.nickname}
                  nama={review.nickname}
                  rating={ratings?.value || 0}
                  tgl={review.created_at}
                  comment={review.detail}
                  title={review.title}
                />
              );
            })}
          </div>
        ),
      };

      const categoryLabel = Array.isArray(category) ? category[0] : category;
      const productOptionsTab = {
        code: 'product_options',
        label: `Pilihan ${categoryLabel ? `${categoryLabel}` : 'Paket'}`,
        component: (
          <>
            {childrenProduct.length === 0 ? (
              <></>
            ) : (
              <ProductSizeOptions
                subSkuCode={subSkuCode}
                subSku={subSku}
                handleChange={handleChange}
                childrenProduct={childrenProduct}
                label={label}
                time={time}
                isHotelOrVilla={
                  category?.includes('Hotel & Convention') ||
                  category?.includes('Villa')
                }
              />
            )}
            {data.options.map((opt) =>
              opt.title === 'Opsi Pembayaran' ? (
                <CustomPayments
                  key={opt.option_id}
                  value={opt}
                  handleChangeCustomOption={handleChangeCustomOption}
                  cart={cart}
                  timeForDateType={timeForDateType}
                  isObjekWisata={category?.includes('Objek Wisata')}
                  downPayment={downPayment}
                  data={data}
                  price={price}
                  specialPrice={specialPrice}
                />
              ) : (
                <CustomOptions
                  key={opt.option_id}
                  value={opt}
                  handleChangeCustomOption={handleChangeCustomOption}
                  cart={cart}
                  timeForDateType={timeForDateType}
                  isObjekWisata={category?.includes('Objek Wisata')}
                />
              )
            )}
            <ProductQuantity
              data={data}
              value={value}
              valueMin={valueMin}
              valueMax={valueMax}
              qty={qty}
              setValue={setValue}
              price={price}
              specialPrice={specialPrice}
              handleChangeCustomOption={handleChangeCustomOption}
              isHotelOrVilla={
                category?.includes('Hotel & Convention') ||
                category?.includes('Villa')
              }
            />
          </>
        ),
      };

      const tabMap = Object.fromEntries(
        attributeTabs.map((tab) => [tab.code, tab])
      );

      const orderedTabs = [
        tabMap['short_description'],
        productOptionsTab,
        tabMap['itinerary'],
        fasilitasTab,
        tabMap['destinasi_wisata'],
        tabMap['tanggal_keberangkatan'],
        tabMap['pickup_point'],
        tabMap['informasi_tambahan'],
        // termsTab,
        reviewTab,
      ].filter(Boolean);

      setTabs(orderedTabs);
    };

    fetchTabs();
  }, [
    data,
    category,
    childrenProduct,
    subSkuCode,
    subSku,
    handleChange,
    label,
    time,
    handleChangeCustomOption,
    cart,
    timeForDateType,
    downPayment,
    price,
    specialPrice,
    value,
    valueMin,
    valueMax,
    qty,
    setValue,
  ]);

  return (
    <>
      <ProductContentDetail
        childrenProduct={childrenProduct}
        subSku={subSku}
        tabs={tabs}
        data={data}
        seller={seller}
        image={image}
        price={price}
        specialPrice={specialPrice}
        downPayment={downPayment}
        qty={qty}
        cart={cart}
        value={value}
        valueMin={valueMin}
        valueMax={valueMax}
        setValue={setValue}
        handleChange={handleChange}
        handleChangeCustomOption={handleChangeCustomOption}
        isAddToCart={rest.isAddToCart}
        isBuyNow={rest.isBuyNow}
        handleAddToCart={rest.handleAddToCart}
        handleBuyNow={rest.handleBuyNow}
        isHotelConvention={category.includes('Hotel & Convention')}
      />
    </>
  );
}
