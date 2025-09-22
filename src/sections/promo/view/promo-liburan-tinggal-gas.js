"use client";

import { useEffect, useState } from "react";

import { _mock } from "../../../_mock";

import Container from "@mui/material/Container";
import MainLayout from "src/layouts/main";
import Banner from "src/sections/reuseable/banner";
// import ProductSidebar from "../product-sidebar";

import ProductList from "../product-list";
import { useResponsive } from "src/hooks/use-responsive";
import { getProduct } from "src/fetch-global";
import Iconify from "src/components/iconify/iconify";

// const _carouselsExample = [...Array(20)].map((_, index) => ({
//   id: _mock.id(index),
//   title: _mock.postTitle(index),
//   coverUrl: _mock.image.cover(index),
//   description: _mock.description(index),
// }));

const mockBanner = [
    {
        id: 1,
        coverUrl: "/Banner-79.png",
        title: "banner-liburan-tinggal-gas",
    },
    // {
    //   id: 2,
    //   coverUrl: "/banner_banyuwangi.png",
    //   title: "banner-banyuwangi",
    // },
    // {
    //   id: 3,
    //   coverUrl: "/banner_bromo.png",
    //   title: "banner-bromo",
    // },
    // {
    //   id: 4,
    //   coverUrl: "/banner_dieng.png",
    //   title: "banner-dieng",
    // },
    // {
    //   id: 5,
    //   coverUrl: "/banner_balibybus.png",
    //   title: "banner-bali-by-bus",
    // },
];

export default function PromoLiburanTinggalGasView() {

    const [title, setTitle] = useState('Promo: Liburan Tinggal Gas'+ ' - Liburdulu.id');

    useEffect(() => {
        // This will run only on the client side
        document.title = title;
    }, [title]);

    // THIS VAR FOR ALL FILTER
    const [filter, setFilter] = useState({
        categoryName: "Semua Produk",
        categoryId: typeof localStorage !== "undefined" ? 61 : 61,
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

    // THIS USE EFFECT FOR REFRESH NEW DATA BASE ON FILTER CHANGE
    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const result = await getProduct(filter.page, 12, filter)
                    .then((data) => {
                        setProduct(data);
                    })
                    .finally(() => setIsLoading(false));
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
                        categoryName: `All Product`,
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
                    setFilter((filter) => ({
                        ...filter,
                        minPrice: parseInt(priceValue.min),
                        maxPrice: parseInt(priceValue.max),
                        page: 1,
                    }));
                } else {
                    setFilter((filter) => ({
                        ...filter,
                        minPrice: -1,
                        maxPrice: -1,
                        page: 1,
                    }));
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
        <Container sx={{ mt: 5, mb: 10 }}>
            <Banner data={mockBanner} />
            {mdUp && (
                <div className="grid grid-cols-4 mt-5">
                    <div className="col-span-4">
                        {!isLoading && <ProductList filter={filter} setFilter={setFilter} product={product} isLoading={isLoading} searchValue={searchValue} setSearchValue={setSearchValue} priceValue={priceValue} setPriceValue={setPriceValue} />}
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
                    {!isLoading && <ProductList filter={filter} setFilter={setFilter} product={product} isLoading={isLoading} searchValue={searchValue} setSearchValue={setSearchValue} priceValue={priceValue} setPriceValue={setPriceValue} />}
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
        </Container>
    );
}
