"use client";

import { useState, useEffect } from "react";
import Banner from "src/sections/reuseable/banner";
import { mockBannerAgent, mockAgentBannerBenefits } from "src/_mock/_banner";
import { getInternationalProducts } from "src/fetch-global";
import ProductCard from "src/sections/reuseable/product-card";

function ProductCardSkeleton() {
  return (
    <div className="relative drop-shadow animate-pulse">
      <div className="bg-gray-200 rounded-xl" style={{ height: "385px" }}>
        <div className="bg-gray-300 rounded-t-lg" style={{ aspectRatio: "1 / 1", width: "100%", maxHeight: "50%" }} />
        <div className="flex flex-col justify-between h-2/4 pt-3 pb-3 px-2.5">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <div className="bg-gray-300 h-3 w-1/3 rounded"></div>
              <div className="bg-gray-300 h-3 w-1/4 rounded"></div>
            </div>
            <div className="bg-gray-300 h-5 w-4/5 mb-1.5 rounded"></div>
            <div className="bg-gray-300 h-5 w-3/5 mb-2 rounded"></div>
            <div className="bg-gray-300 h-3 w-2/3 mb-3 rounded"></div>
          </div>
          <div className="bg-gray-400 h-6 w-1/2 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterAgentMainView() {
  const [internationalProducts, setInternationalProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoadingProducts(true);
      try {
        const products = await getInternationalProducts();
        setInternationalProducts(products || []);
      } catch (error) {
        console.error("Failed to fetch international products:", error);
        setInternationalProducts([]);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  const renderAgentBenefitsBanner = (
    <div className="relative mt-10 md:mt-0 lg:mt-14 mb-12">
      <div className="md:flex justify-around gap-5 rounded-[20px] bg-[#2C3A49] md:h-[200px] mb-0 md:mb-8 mt-8 md:mt-12 lg:mt-20 h-auto px-6 md:px-8 pb-0 pt-10 md:pt-0">
        <div className="w-full md:w-[110%] lg:w-[25%] flex flex-col justify-center text-liburdulu-white">
          <p className="mb-2 font-semibold  title-text text-center md:text-left text-liburdulu-white text-[14px] md:text-[20px]">Jadi Agen Kami dan Nikmati Keuntungannya!</p>
          <p className="mb-0 text-color-white text-center md:text-left text-[12px] md:text-[14px] max-w-full md:max-w-[500px]">Satu langkah mudah untuk penghasilan tambahan dan reward spesial.</p>
        </div>

        <div className="w-full md:w-[110%] lg:w-[25%] flex flex-col items-start justify-center text-liburdulu-white gap-3 mt-5 md:mt-0">
          {mockAgentBannerBenefits.map((item, index) => (
            <div className="flex flex-row gap-5 items-center justify-center" key={index}>
              <img src={item.iconPlaceholder} alt="icon-agent" className="w-[25px]" />
              <p className="mb-0 text-color-white text-center md:text-left text-[12px] md:text-[14px] max-w-full md:max-w-[500px]">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="hidden md:flex justify-center items-end">
          <img src="register-agent-girl.png" alt="img-mitra-registration" className="md:w-[100%]" />
        </div>
        <div className="flex md:hidden justify-center items-center mt-3">
          <img src="register-agent-girl.png" alt="img-mitra-registration" className="md:w-[50%]" />
        </div>
      </div>
    </div>
  );

  const renderInternationalProducts = (
    <div className="my-8">
      <h2 className="text-xl font-semibold mb-1">Rekomendasi Produk Internasional</h2>
      <p className="text-[#828282] mb-5">Jelajahi berbagai destinasi menarik bersama kami.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-[450px]:grid-cols-2 gap-4 md:gap-6">
        {isLoadingProducts ? (
          Array.from({ length: 4 }).map((_, index) => <ProductCardSkeleton key={index} />)
        ) : internationalProducts && internationalProducts.length > 0 ? (
          internationalProducts.map((product) => <ProductCard key={product.id} id={product.sku} idProduct={product.id} name={product.name} price={product.price} image={product.custom_attributes} from="RegisterAgentMainView" />)
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 text-lg">Produk tidak ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Banner data={mockBannerAgent} />
      {renderAgentBenefitsBanner}
      {renderInternationalProducts}
    </>
  );
}
