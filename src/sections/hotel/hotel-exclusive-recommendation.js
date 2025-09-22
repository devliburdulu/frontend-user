"use client";

import { useEffect, useState } from "react";
import { _mock } from "src/_mock";
import Container from "@mui/material/Container";
import Banner from "src/sections/reuseable/banner";
import ProductSidebar from "../productpage/product-sidebar";
// import ProductList from "../product-listproduct";
import ProductList from "../productpage/product-listproduct";
import { useResponsive } from "src/hooks/use-responsive";
import { getProduct } from "src/rest/Product";
import { getProductByCat1, getProductCategoryHotel } from "src/rest/Product";
import Iconify from "src/components/iconify/iconify";
import { useSnackbar } from "notistack";
import { getHomeBanners } from "src/rest/HomeBanner";

export default function HotelExclusiveRecommendation() {
  const [title, setTitle] = useState("Liburdulu.id - Hotel");
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      const response = await getHomeBanners();

      if (response) {
        const formattedBanners = response.map((banner) => ({
          id: banner.id,
          coverUrl: banner.image_desktop.url ? `${process.env.NEXT_PUBLIC_IMAGE_EDU}${banner.image_desktop.url}` : "https://via.placeholder.com/600x300?text=No+Image+Available",
          title: banner.title,
          route: banner.url,
        }));

        setBanners(formattedBanners);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    // This will run only on the client side
    document.title = title;
  }, [title]);

  const changeTitle = (newTitle, page) => {
    setTitle("Catalog: " + newTitle + " | Page: " + page + " - Liburdulu.id");
  };

  // changeTitle();
  //
  // THIS VAR FOR ALL FILTER
  const [filter, setFilter] = useState({
    categoryName: typeof localStorage !== "undefined" ? (localStorage.getItem("search") ? localStorage.getItem("search") : "Semua Produk") : "Semua Produk",
    categoryId: typeof localStorage !== "undefined" ? (localStorage.getItem("id") ? localStorage.getItem("id") : 0) : 0,
    search: "",
    maxPrice: -1,
    minPrice: -1,
    page: 1,
  });

  // THIS VAR FOR PRODUCT
  const [product, setProduct] = useState();

  // THIS VAR FOR CONDITION
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  // THIS VAR FOR SEARCH & PRICE TEXTFIELD
  const [searchValue, setSearchValue] = useState("");
  const [priceValue, setPriceValue] = useState({
    min: "",
    max: "",
  });

  // THIS VAR FOR DEBOUNCE
  const [debouncedInputValue, setDebouncedInputValue] = useState("");

  // THIS VAR FOR CONSITION RESPONSIVE
  const mdUp = useResponsive("up", "md");

  // THIS VAR FOR MAKE NOTIFICATION
  const { enqueueSnackbar } = useSnackbar();

  // THIS USE EFFECT FOR REFRESH NEW DATA BASE ON FILTER CHANGE
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const result = await getProductCategoryHotel(filter.page, 12, {});
        setProduct(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    // setTitle(`${filter.categoryName} | Liburdulu`);
  }, [filter]);

  // THIS USE EFFECT FOR MAKE USEEFFECT GET DATA NOT TRIGGER WHEN SEARCH SET "" BECAUSE USER SELECT CATEGORY
  useEffect(() => {
    if (filter.categoryId != 0) {
      setIsFirstLaunch(true);
      setSearchValue("");
    }
  }, [filter.categoryId]);

  // THIS USE EFFECT FOR REFRESH FILTER BASE ON SEARCH
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(searchValue);
      if (isFirstLaunch) {
        setIsFirstLaunch(false);
      } else {
        if (searchValue) {
          setFilter((filter) => ({
            ...filter,
            categoryName: `Search "${searchValue}"`,
            categoryId: 0,
            search: searchValue,
            page: 1,
          }));
        } else {
          setFilter((filter) => ({
            ...filter,
            categoryName: `Semua Produk`,
            search: "",
            page: 1,
          }));
        }
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchValue, 1000]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(priceValue);
      if (isFirstLaunch) {
        setIsFirstLaunch(false);
      } else {
        if (priceValue.min && priceValue.max) {
          //
          if (parseInt(priceValue.min) > parseInt(priceValue.max)) {
            enqueueSnackbar("Filter harga minimum lebih besar dari harga maxsimum", { variant: "error" });
            setFilter((filter) => ({
              ...filter,
              minPrice: -1,
              maxPrice: -1,
              page: 1,
            }));
          } else {
            setFilter((filter) => ({
              ...filter,
              minPrice: parseInt(priceValue.min),
              maxPrice: parseInt(priceValue.max),
              page: 1,
            }));
          }
        } else {
          setFilter((filter) => ({
            ...filter,
            minPrice: parseInt(priceValue.min),
            maxPrice: parseInt(priceValue.max),
            page: 1,
          }));
          // setFilter((filter) => ({
          //     ...filter,
          //     minPrice: -1,
          //     maxPrice: -1,
          //     page: 1,
          // }));
        }
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [priceValue, 1000]);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedId = localStorage.getItem("id");
      if (storedId) {
        setFilter((filter) => ({
          ...filter,
          categoryId: parseInt(storedId, 10),
          page: 1,
        }));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div sx={{ mt: 5, mb: 10 }}>
      {/* <Banner data={banners} /> */}
      {mdUp && (
        <div className="grid grid-cols-2 mt-5">
          {/* <div className="sticky top-[120px] max-h-[720px]">
            <ProductSidebar filter={filter} setFilter={setFilter} searchValue={searchValue} setSearchValue={setSearchValue} priceValue={priceValue} setPriceValue={setPriceValue} />
          </div> */}
          <div className="col-span-3">
            {!isLoading && (
              <ProductList filter={filter} setFilter={setFilter} product={product} isLoading={isLoading} searchValue={searchValue} setSearchValue={setSearchValue} priceValue={priceValue} setPriceValue={setPriceValue} isHotel={true} />
            )}
            {isLoading && (
              <div className="grid grid-cols-1 h-[600px] place-content-center">
                <div className="place-self-center">
                  <Iconify icon="line-md:loading-loop" sx={{ fontSize: 20, color: "#000000" }} />
                </div>
                <p className="place-self-center text-3xl font-semibold">Mohon Tunggu</p>
              </div>
            )}
          </div>
        </div>
      )}

      {!mdUp && (
        <div className="">
          {!isLoading && (
            <ProductList filter={filter} setFilter={setFilter} product={product} isLoading={isLoading} searchValue={searchValue} setSearchValue={setSearchValue} priceValue={priceValue} setPriceValue={setPriceValue} isHotel={true} />
          )}
          {isLoading && (
            <div className="grid grid-cols-1 h-[600px] place-content-center">
              <div className="place-self-center">
                <Iconify icon="line-md:loading-loop" sx={{ fontSize: 20, color: "#000000" }} />
              </div>
              <p className="place-self-center text-3xl font-semibold">Mohon Tunggu</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
