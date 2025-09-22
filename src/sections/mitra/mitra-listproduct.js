import { useEffect, useState } from "react";
import { useResponsive } from "src/hooks/use-responsive";
import { getProduct } from "src/fetch-global";
import Iconify from "src/components/iconify";
// import ProductSidebar from "../productpage/product-sidebar";
// import ProductList from "../productpage/product-listproduct";
import ProductSidebar from "./product-sidebar";
import ProductList from "./product-listproduct";

export default function MitraListproduct({ listSku, sellerId }) {
  //

  // THIS VAR FOR ALL FILTER
  const [filter, setFilter] = useState({
    // categoryId: parseInt(localStorage.id),
    categoryName: typeof localStorage !== "undefined" ? (localStorage.getItem("searchMitra") ? localStorage.getItem("searchMitra") : "Semua Produk") : "Semua Produk",
    categoryId: typeof localStorage !== "undefined" ? (localStorage.getItem("idMitra") ? localStorage.getItem("idMitra") : 0) : 0,
    search: "",
    maxPrice: -1,
    minPrice: -1,
    page: 1,
    sellerId: sellerId,
  });

  // // THIS FOR REMOVE SOME VAR IN FILTER FROM LOCAL STORAGE
  if (typeof localStorage !== "undefined") {
    localStorage.getItem("idMitra") ? localStorage.removeItem("idMitra") : null;
    localStorage.getItem("searchMitra") ? localStorage.removeItem("searchMitra") : null;
  } else {
    console.error("localStorage is not defined");
  }

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
  // const [minPriceValue, setMinPriceValue] = useState("");
  // const [maxPriceValue, setMaxPriceValue] = useState("");

  // THIS VAR FOR DEBOUNCE
  const [debouncedInputValue, setDebouncedInputValue] = useState("");

  // THIS VAR FOR CONSITION RESPONSIVE
  const mdUp = useResponsive("up", "md");

  // THIS USE EFFECT FOR REFRESH NEW DATA BASE ON FILTER CHANGE
  useEffect(() => {
    setIsLoading(true);
    //
    const fetchData = async () => {
      //
      //
      try {
        if (filter.sellerId) {
          const result = await getProduct(filter.page, 12, filter)
            .then((data) => {
              setProduct(data);
            })
            .finally(setIsLoading(false));
          // .finally(() => setIsLoading(false));
          // if (listSku.length > 0) {
          //     setIsLoading(false)
        }
        // setProduct(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    setIsFirstLaunch(false);
  }, [filter]);

  // THIS USE EFFECT FOR MAKE USEEFFECT GET DATA NOT TRIGGER WHEN SEARCH SET "" BECAUSE USER SELECT CATEGORY
  useEffect(() => {
    if (filter.categoryId != 0) {
      setIsFirstLaunch(true);
      setSearchValue("");
      // setIsFirstLaunch(false);
      //
    }
  }, [filter.categoryId != 0]);

  // THIS USE EFFECT FOR REFRESH FILTER BASE ON SEARCH
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(searchValue);
      if (isFirstLaunch) {
        setIsFirstLaunch(false);
      } else {
        if (searchValue != null || searchValue != "") {
          if (filter.categoryId != 0) {
            //

            setFilter((filter) => {
              return {
                ...filter,
                categoryName: `Search "${searchValue}"`,
                categoryId: 0,
                search: searchValue,
                page: 1,
              };
            });
            //
          } else {
            setFilter((filter) => {
              return {
                ...filter,
                categoryName: `Search "${searchValue}"`,
                search: searchValue,
                page: 1,
              };
            });
          }
        } else {
          setFilter((filter) => {
            return {
              ...filter,
              categoryName: `All Product`,
              search: "",
              page: 1,
            };
          });
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
        // if ((priceValue.min != null || priceValue.min != "") && (priceValue.max != null || priceValue.max != "")) {
        //   //
        //   setFilter((filter) => {
        //     return {
        //       ...filter,
        //       minPrice: parseInt(priceValue.min),
        //       maxPrice: parseInt(priceValue.max),
        //       page: 1,
        //     };
        //   });
        // } else {
        //   setFilter((filter) => {
        //     return {
        //       ...filter,
        //       minPrice: -1,
        //       maxPrice: -1,
        //       page: 1,
        //     };
        //   });
        // }
        if (priceValue.min && priceValue.max) {
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
    setFilter((filter) => {
      return {
        ...filter,
        sellerId: sellerId,
      };
    });
  }, [sellerId]);

  return (
    <>
      {mdUp && (
        <div className="grid grid-cols-4 mt-5">
          <div className="sticky top-[120px] max-h-[720px]">
            <ProductSidebar filter={filter} setFilter={setFilter} searchValue={searchValue} setSearchValue={setSearchValue} priceValue={priceValue} setPriceValue={setPriceValue} />
          </div>
          <div className="col-span-3">
            {!isLoading && product && (
              <ProductList filter={filter} setFilter={setFilter} product={product} isLoading={isLoading} searchValue={searchValue} setSearchValue={setSearchValue} priceValue={priceValue} setPriceValue={setPriceValue} />
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
          {!isLoading && product && (
            <ProductList filter={filter} setFilter={setFilter} product={product} isLoading={isLoading} searchValue={searchValue} setSearchValue={setSearchValue} priceValue={priceValue} setPriceValue={setPriceValue} />
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
    </>
  );
}
