"use client";

import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import InputAdornment from "@mui/material/InputAdornment";
import FilterListIcon from "@mui/icons-material/FilterList";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import ShopCardDefault from "src/sections/hotel/card-item-hotel";
import Pagination from "@mui/material/Pagination";
import { ShopCardSkeleton, ShopCardSkeletonGrid } from "../card-item-skeleton";
import { useResponsive } from "src/hooks/use-responsive";
import { useFilter } from "../context/search-context";
import { useRouter, useSearchParams } from "src/routes/hooks";
import { useDebounce } from "src/hooks/use-debounce";
import SearchSimple from "../search-simple";
import { fCurrency } from "src/utils/format-number";
import { DateObject } from "react-multi-date-picker";
import { getCities, getHotels } from "../api/hotel-api";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

export default function HotelSearchView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { filterData, isReady, setFilterData } = useFilter();
  const isDesktop = useResponsive("up", "md");

  const [page, setPage] = useState(1);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [sortOption, setSortOption] = useState("StarRating");
  const [sortDirection, setSortDirection] = useState("desc");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const debouncedMinPrice = useDebounce(minPrice, 1000);
  const debouncedMaxPrice = useDebounce(maxPrice, 1000);

  const [locationDisplay, setLocationDisplay] = useState("");
  const [locationKey, setLocationKey] = useState("");
  const [selectedCityName, setSelectedCityName] = useState("");
  const [selectedHotelName, setSelectedHotelName] = useState("");
  const [selectedItemType, setSelectedItemType] = useState("city");
  const [values, setValues] = useState([]);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const debouncedLocationDisplay = useDebounce(locationDisplay, 500);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [openGuestDialog, setOpenGuestDialog] = useState(false);
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const [openDateDialog, setOpenDateDialog] = useState(false);

  useEffect(() => {
    if (isReady) {
      const params = Object.fromEntries(searchParams.entries());
      const context = filterData || {};

      const initPage = parseInt(params.page || context.page) || 1;
      const initCheckinStr = params.checkin || context.checkin;
      const initCheckoutStr = params.checkout || context.checkout;
      const initLocationKey = params.id || context.locationKey;
      const initCityName = params.loc || context.location;
      const initHotelName = params.hotelName || context.hotelName;
      const initRooms = parseInt(params.rooms || context.rooms) || 1;
      const initAdults = parseInt(params.adults || context.adults) || 1;
      const initChildren = parseInt(params.children || context.children) || 0;
      const initRatings = (params.ratings || context.ratings || "").split(",").filter((r) => r);
      const initSort = params.sort || context.sort || "StarRating";
      const initSortDir = params.sortDir || context.sortDir || "desc";
      const initMinPrice = parseInt(params.minPrice || context.minPrice) || 0;
      const initMaxPrice = parseInt(params.maxPrice || context.maxPrice) || 10000000;

      setPage(initPage);
      setLocationKey(initLocationKey || "");
      setSelectedCityName(initCityName || "");
      setSelectedHotelName(initHotelName || "");
      setLocationDisplay(initHotelName || initCityName || "");
      setSelectedItemType(initHotelName ? "hotel" : "city");
      setRooms(initRooms);
      setAdults(initAdults);
      setChildren(initChildren);

      let checkinDate = null;
      let checkoutDate = null;
      try {
        checkinDate = initCheckinStr ? new DateObject({ date: initCheckinStr, format: "DD-MM-YYYY" }) : null;
      } catch (e) {
        console.error("Error parsing checkin date:", e);
      }
      try {
        checkoutDate = initCheckoutStr ? new DateObject({ date: initCheckoutStr, format: "DD-MM-YYYY" }) : null;
      } catch (e) {
        console.error("Error parsing checkout date:", e);
      }
      if (checkinDate && checkoutDate && checkinDate.isValid && checkoutDate.isValid) {
        setValues([checkinDate, checkoutDate]);
      } else {
        setValues([]);
      }

      setSelectedRatings(initRatings);
      setSortOption(initSort);
      setSortDirection(initSortDir);
      setMinPrice(initMinPrice);
      setMaxPrice(initMaxPrice);

      if (!initLocationKey || !initCityName) {
        console.warn("Missing location key or city name on initialization");
      }
    }
  }, [isReady, searchParams, filterData]);

  const handleDrawerToggle = () => setIsDrawerOpen(!isDrawerOpen);

  const handleRatingChange = (event) => {
    const value = event.target.value;
    setSelectedRatings((prev) => (prev.includes(value) ? prev.filter((rating) => rating !== value) : [...prev, value]));
  };

  const handleCurrentSortValue = () => {
    if (sortOption === "StarRating") {
      return sortDirection === "asc" ? "LowestStarRating" : "StarRating";
    }
    if (sortOption === "LowestRoomPrice") {
      return sortDirection === "desc" ? "HighestRoomPrice" : "LowestRoomPrice";
    }
    return sortOption;
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    let newSortOption = sortOption;
    let newSortDirection = sortDirection;

    if (value === "LowestStarRating") {
      newSortOption = "StarRating";
      newSortDirection = "asc";
    } else if (value === "StarRating") {
      newSortOption = "StarRating";
      newSortDirection = "desc";
    } else if (value === "HighestRoomPrice") {
      newSortOption = "LowestRoomPrice";
      newSortDirection = "desc";
    } else {
      newSortOption = "LowestRoomPrice";
      newSortDirection = "asc";
    }
    setSortOption(newSortOption);
    setSortDirection(newSortDirection);
  };

  const formatRupiah = (value) => {
    if (!value && value !== 0) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleMinPriceChange = (e) => {
    const value = e.target.value.replace(/\./g, "");
    const numericValue = value ? Number(value) : 0;
    setMinPrice(numericValue);
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value.replace(/\./g, "");
    const numericValue = value ? Number(value) : 10000000;
    setMaxPrice(numericValue);
  };

  const handleSearchDialogOpen = () => setOpenSearchDialog(true);
  const handleSearchDialogClose = () => setOpenSearchDialog(false);
  const handleGuestDialogOpen = () => setOpenGuestDialog(true);
  const handleGuestDialogClose = () => setOpenGuestDialog(false);
  const handleDateDialogOpen = () => setOpenDateDialog(true);
  const handleDateDialogClose = () => setOpenDateDialog(false);
  const handleIncrement = (setter) => () => setter((prev) => prev + 1);
  const handleDecrement = (setter) => () => setter((prev) => Math.max(0, prev - 1));
  const handleAdultDecrement = (setter) => () => setter((prev) => Math.max(1, prev - 1));

  const handleInputChange = (e) => {
    setLocationDisplay(e.target.value);
    if (e.target.value.trim() === "") {
      setSelectedHotelName("");
      setSelectedItemType("city");
      setFilteredDestinations([]);
    }
  };

  const handleSelectDestination = (destination) => {
    let displayValue = destination.CityName;
    let itemType = destination.type || "city";
    let hotelName = null;
    const cityKey = destination.CityKey;
    const cityName = destination.CityName;

    if (itemType === "hotel" && destination.HotelName && destination.HotelName.trim() !== "") {
      displayValue = destination.HotelName;
      hotelName = destination.HotelName;
    } else {
      itemType = "city";
      displayValue = destination.CityName;
    }

    setLocationDisplay(displayValue);
    setLocationKey(cityKey);
    setSelectedCityName(cityName);
    setSelectedItemType(itemType);
    setSelectedHotelName(hotelName);

    setFilteredDestinations([]);
    setOpenSearchDialog(false);
  };

  useEffect(() => {
    const fetchCities = async () => {
      if (!debouncedLocationDisplay || debouncedLocationDisplay.trim() === "") {
        setFilteredDestinations([]);
        return;
      }
      if (debouncedLocationDisplay === selectedHotelName || debouncedLocationDisplay === selectedCityName) {
        return;
      }

      try {
        const citiesData = await getCities(debouncedLocationDisplay);
        setFilteredDestinations(citiesData);
      } catch (error) {
        console.error("Error in fetchCities useEffect:", error);
        setFilteredDestinations([]);
      }
    };
    fetchCities();
  }, [debouncedLocationDisplay, selectedCityName, selectedHotelName]);

  const getQueryParam = (key, defaultValue = null) => searchParams.get(key) ?? defaultValue;

  const getQueryDateForAPI = (paramName, format = "YYYY-MM-DD") => {
    const dateStr = searchParams.get(paramName) || filterData?.[paramName];
    if (dateStr) {
      const parsed = moment(dateStr, "DD-MM-YYYY");
      if (parsed.isValid()) {
        return parsed.format(format);
      }
    }
    return null;
  };

  const queryApiLocationKey = getQueryParam("id", filterData?.locationKey);
  const queryApiHotelName = getQueryParam("hotelName", filterData?.hotelName) || "";
  const queryApiCheckin = getQueryDateForAPI("checkin");
  const queryApiCheckout = getQueryDateForAPI("checkout");
  const queryApiRooms = getQueryParam("rooms", filterData?.rooms || "1");
  const queryApiAdults = parseInt(getQueryParam("adults", filterData?.adults || "1"));
  const queryApiChildren = parseInt(getQueryParam("children", filterData?.children || "0"));
  const queryApiGuests = queryApiAdults + queryApiChildren;

  const queryApiMinPrice = debouncedMinPrice;
  const queryApiMaxPrice = debouncedMaxPrice;
  const queryApiSortDir = sortDirection;
  const queryApiSortBy = sortOption;
  const queryApiRatings = selectedRatings.join(",");
  const queryApiPage = page;

  const {
    data: hotelsData,
    isLoading: isLoadingHotels,
    isError: isErrorHotels,
  } = useQuery({
    queryKey: [
      "hotelsData",
      "ID",
      queryApiLocationKey,
      queryApiCheckin,
      queryApiCheckout,
      queryApiRooms,
      queryApiGuests,
      queryApiMinPrice,
      queryApiMaxPrice,
      queryApiHotelName,
      queryApiSortDir,
      queryApiSortBy,
      queryApiRatings,
      queryApiPage,
    ],
    queryFn: () =>
      getHotels("ID", queryApiLocationKey, queryApiCheckin, queryApiCheckout, queryApiRooms, queryApiGuests, queryApiMinPrice, queryApiMaxPrice, queryApiHotelName, queryApiSortDir, queryApiSortBy, queryApiRatings, queryApiPage),
    enabled: !!queryApiLocationKey && !!queryApiCheckin && !!queryApiCheckout,
    keepPreviousData: true,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const handleSubmit = () => {
    const hasCheckin = values[0] && values[0].isValid;
    const hasCheckout = values[1] && values[1].isValid;

    if (!locationKey || !selectedCityName || !hasCheckin || !hasCheckout) {
      console.error("Cannot submit: Missing location, city name, or valid dates selected.");
      return;
    }

    const newPage = 1;
    setPage(newPage);

    const checkinStr = values[0].format("DD-MM-YYYY");
    const checkoutStr = values[1].format("DD-MM-YYYY");

    const searchData = {
      location: selectedCityName,
      locationKey: locationKey,
      hotelName: selectedItemType === "hotel" ? selectedHotelName : null,
      checkin: checkinStr,
      checkout: checkoutStr,
      rooms: rooms,
      adults: adults,
      children: children,
      ratings: selectedRatings.join(","),
      sort: sortOption,
      sortDir: sortDirection,
      minPrice: minPrice,
      maxPrice: maxPrice,
      page: newPage,
    };

    setFilterData(searchData);

    const queryParams = new URLSearchParams();
    queryParams.set("loc", searchData.location);
    queryParams.set("id", searchData.locationKey);
    if (searchData.hotelName) {
      queryParams.set("hotelName", searchData.hotelName);
    }
    queryParams.set("checkin", searchData.checkin);
    queryParams.set("checkout", searchData.checkout);
    queryParams.set("rooms", searchData.rooms);
    queryParams.set("adults", searchData.adults);
    queryParams.set("children", searchData.children);
    if (searchData.ratings) queryParams.set("ratings", searchData.ratings);
    queryParams.set("sort", searchData.sort);
    queryParams.set("sortDir", searchData.sortDir);
    queryParams.set("minPrice", searchData.minPrice);
    queryParams.set("maxPrice", searchData.maxPrice);
    queryParams.set("page", searchData.page);

    router.push(`/hotels/search?${queryParams.toString()}`);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    const currentParams = new URLSearchParams(searchParams.toString());
    const checkinParam = currentParams.get("checkin") || filterData?.checkin;
    const checkoutParam = currentParams.get("checkout") || filterData?.checkout;

    const queryParamsData = {
      loc: currentParams.get("loc"),
      id: currentParams.get("id"),
      hotelName: currentParams.get("hotelName"),
      checkin: checkinParam,
      checkout: checkoutParam,
      rooms: currentParams.get("rooms") || "1",
      adults: currentParams.get("adults") || "1",
      children: currentParams.get("children") || "0",
      ratings: selectedRatings.join(",") || currentParams.get("ratings") || "",
      sortDir: sortDirection || currentParams.get("sortDir") || "desc",
      sort: sortOption || currentParams.get("sort") || "StarRating",
      minPrice: (minPrice ?? currentParams.get("minPrice")) || "0",
      maxPrice: (maxPrice ?? currentParams.get("maxPrice")) || "10000000",
      page: newPage,
    };

    const newParams = new URLSearchParams();
    Object.entries(queryParamsData).forEach(([key, value]) => {
      if (key === "hotelName" && !value) return;
      if (value !== null && value !== undefined && value !== "") {
        newParams.set(key, value.toString());
      }
    });
    router.replace(`/hotels/search?${newParams.toString()}`);
  };

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get("page") || "1");
    if (!isNaN(pageFromUrl) && pageFromUrl !== page) {
      setPage(pageFromUrl);
    }
  }, [searchParams, page]);

  useEffect(() => {
    if (!isReady || !queryApiLocationKey) return;

    const currentParams = new URLSearchParams(searchParams.toString());
    const currentPage = parseInt(currentParams.get("page") || "1");

    const queryParamsData = {
      loc: currentParams.get("loc"),
      id: currentParams.get("id"),
      hotelName: currentParams.get("hotelName"),
      checkin: currentParams.get("checkin"),
      checkout: currentParams.get("checkout"),
      rooms: currentParams.get("rooms") || "1",
      adults: currentParams.get("adults") || "1",
      children: currentParams.get("children") || "0",
      ratings: selectedRatings.join(","),
      sortDir: sortDirection,
      sort: sortOption,
      minPrice: debouncedMinPrice,
      maxPrice: debouncedMaxPrice,
      page: currentPage,
    };

    const newParams = new URLSearchParams();
    Object.entries(queryParamsData).forEach(([key, value]) => {
      if (key === "hotelName" && !value) return;
      if (value !== null && value !== undefined && value !== "") {
        if (key === "minPrice" && value === 0) newParams.set(key, "0");
        else if (value || (key === "children" && value === 0)) newParams.set(key, value.toString());
      }
    });

    let filtersChanged = false;
    ["ratings", "sortDir", "sort", "minPrice", "maxPrice"].forEach((key) => {
      const currentVal = currentParams.get(key);
      const newVal = newParams.get(key);
      const currentNormalized =
        key === "minPrice" ? currentVal ?? "0" : key === "maxPrice" ? currentVal ?? "10000000" : key === "ratings" ? currentVal ?? "" : key === "sortDir" ? currentVal ?? "desc" : key === "sort" ? currentVal ?? "StarRating" : currentVal;
      const newNormalized = key === "minPrice" ? newVal ?? "0" : key === "maxPrice" ? newVal ?? "10000000" : key === "ratings" ? newVal ?? "" : key === "sortDir" ? newVal ?? "desc" : key === "sort" ? newVal ?? "StarRating" : newVal;

      if (currentNormalized !== newNormalized) {
        filtersChanged = true;
      }
    });

    if (filtersChanged) {
      router.replace(`/hotels/search?${newParams.toString()}`);
    }
  }, [selectedRatings, sortOption, sortDirection, debouncedMinPrice, debouncedMaxPrice, isReady, router, queryApiLocationKey]);

  useEffect(() => {
    if (hotelsData?.CorrelationId && filterData?.CorrelationId !== hotelsData.CorrelationId) {
      setFilterData((prev) => ({
        ...prev,
        CorrelationId: hotelsData.CorrelationId,
      }));
    }
  }, [hotelsData, filterData?.CorrelationId, setFilterData]);

  const renderFilterBox = (
    <Box
      sx={{
        p: 2,
        width: isDesktop ? "auto" : "100%",
        border: isDesktop ? "1px solid #ddd" : "none",
        borderRadius: 2,
        maxHeight: isDesktop ? "auto" : 500,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Rentang Harga
      </Typography>
      <TextField
        type="text"
        label="Harga Minimum"
        fullWidth
        sx={{ mb: 2 }}
        value={formatRupiah(minPrice)}
        onChange={handleMinPriceChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ color: "rgba(0, 0, 0, 0.54)", fontSize: 16, fontWeight: 600 }}>
              IDR
            </InputAdornment>
          ),
        }}
      />
      <TextField
        type="text"
        label="Harga Maksimum"
        fullWidth
        value={formatRupiah(maxPrice)}
        onChange={handleMaxPriceChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ color: "rgba(0, 0, 0, 0.54)", fontSize: 16, fontWeight: 600 }}>
              IDR
            </InputAdornment>
          ),
        }}
      />
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Rating Bintang
      </Typography>
      <Stack direction="column" spacing={0}>
        {[5, 4, 3, 2, 1].map((rating) => (
          <FormControlLabel
            key={rating}
            control={<Checkbox value={rating.toString()} checked={selectedRatings.includes(rating.toString())} onChange={handleRatingChange} />}
            label={`${rating}${rating === 5 ? " Bintang" : rating === 4 ? " (Fantastis)" : rating === 3 ? " (Bagus)" : rating <= 2 ? " (Oke)" : ""}`}
          />
        ))}
      </Stack>
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Urutkan
      </Typography>
      <RadioGroup value={handleCurrentSortValue()} onChange={handleSortChange}>
        <FormControlLabel value="StarRating" control={<Radio />} label="Rating Tertinggi" />
        <FormControlLabel value="LowestStarRating" control={<Radio />} label="Rating Terendah" />
        <FormControlLabel value="HighestRoomPrice" control={<Radio />} label="Harga Tertinggi" />
        <FormControlLabel value="LowestRoomPrice" control={<Radio />} label="Harga Terendah" />
      </RadioGroup>
    </Box>
  );

  const renderContent = () => {
    const itemsPerPage = hotelsData?.count_data && hotelsData.count_data > 0 ? hotelsData.count_data : 50;
    const pageCount = hotelsData?.total && itemsPerPage > 0 ? Math.ceil(hotelsData.total / itemsPerPage) : 0;

    return (
      <Grid container spacing={4} sx={{ mt: 1, px: isDesktop ? 0 : 2, pb: isDesktop ? 0 : 2 }}>
        {isDesktop ? (
          <Grid item xs={12} sm={3}>
            {renderFilterBox}
          </Grid>
        ) : (
          <>
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                mb: 2,
                position: "fixed",
                bottom: 16,
                right: 16,
                zIndex: 1100,
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              <FilterListIcon />
            </IconButton>
            <Drawer anchor="bottom" open={isDrawerOpen} onClose={handleDrawerToggle} PaperProps={{ sx: { maxHeight: "70vh", borderTopLeftRadius: 16, borderTopRightRadius: 16 } }}>
              <Box sx={{ p: 2, overflowY: "auto" }}>{renderFilterBox}</Box>
            </Drawer>
          </>
        )}

        <Grid
          item
          xs={12}
          sm={isDesktop ? 9 : 12}
          sx={{
            mt: isDesktop ? 0 : -2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontSize: 16,
              fontWeight: "bold",
              color: "#4A4B4E",
            }}
          >
            {hotelsData?.total !== undefined && hotelsData?.total !== null ? `${hotelsData.total} Total properti ditemukan` : isLoadingHotels ? "" : isErrorHotels ? "" : "Mencari properti..."}
          </Typography>

          <Grid container spacing={2} position="relative">
            {isLoadingHotels && (
              <>
                {isDesktop ? (
                  <>
                    {[...Array(6)].map((_, index) => (
                      <Grid item xs={6} sm={6} md={4} key={`skeleton-${index}`}>
                        <ShopCardSkeleton />
                      </Grid>
                    ))}
                  </>
                ) : (
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 4, textAlign: "center" }}>
                      {/* <Typography variant="body2" className="text-liburdulu-blue font-medium">
                        Halo Liburians mohon ditunggu ya kami sedang mencari kamar terbaik untuk kamu
                      </Typography> */}
                      <ShopCardSkeletonGrid />
                    </Box>
                  </Grid>
                )}
              </>
            )}

            {!isLoadingHotels && isErrorHotels && (
              <Grid item xs={12} className="flex justify-center items-center flex-col my-8">
                <div className="max-w-md w-full text-center">
                  <Typography variant="h6" className="mt-4 text-red-600 font-medium">
                    Oops! Terjadi Kesalahan
                  </Typography>
                  <Typography variant="body2" className="mt-2 text-gray-500">
                    Gagal memuat data hotel. Silakan coba lagi nanti atau ubah pencarian Anda.
                  </Typography>
                </div>
              </Grid>
            )}

            {!isLoadingHotels && !isErrorHotels && hotelsData?.data?.length === 0 && (
              <Grid item xs={12} className="flex justify-center items-center flex-col my-8">
                <div className="max-w-md w-full text-center">
                  <img src="/hotel-not-found.png" alt="Maaf, hotelnya belum tersedia" className="w-full h-auto mx-auto max-w-[250px]" />
                  <Typography variant="h6" className="mt-4 text-gray-700 font-medium">
                    Maaf, hotelnya belum tersedia
                  </Typography>
                  <Typography variant="body2" className="mt-2 text-gray-500">
                    Coba cari dengan spesifikasi hotel yang lain ya...
                  </Typography>
                </div>
              </Grid>
            )}

            {!isLoadingHotels &&
              !isErrorHotels &&
              hotelsData?.data?.length > 0 &&
              hotelsData.data.map((item, index) => {
                const cardCityName = getQueryParam("loc", filterData?.location);
                return (
                  <Grid item xs={6} sm={6} md={4} key={item.HotelCode || `hotel-${index}`}>
                    <ShopCardDefault
                      data={item}
                      idx={`Hotel-${index}`}
                      correlationId={hotelsData?.CorrelationId}
                      filterData={{
                        checkin: getQueryDateForAPI("checkin", "DD-MM-YYYY"),
                        checkout: getQueryDateForAPI("checkout", "DD-MM-YYYY"),
                        rooms: queryApiRooms,
                        adults: queryApiAdults,
                        children: queryApiChildren,
                        location: cardCityName,
                        locationKey: queryApiLocationKey,
                      }}
                    />
                  </Grid>
                );
              })}
          </Grid>

          {pageCount > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}>
              <Pagination count={pageCount} page={page} onChange={handlePageChange} color="primary" size={isDesktop ? "medium" : "small"} disabled={isLoadingHotels} />
            </Box>
          )}
        </Grid>
      </Grid>
    );
  };

  const WrapperContent = isDesktop ? Container : Box;

  return (
    <WrapperContent
      sx={{
        mb: 5,
        mt: {
          xs: -8,
          md: -10,
        },
      }}
    >
      <SearchSimple
        location={locationDisplay}
        values={values}
        filteredDestinations={filteredDestinations}
        openGuestDialog={openGuestDialog}
        openSearchDialog={openSearchDialog}
        openDateDialog={openDateDialog}
        rooms={rooms}
        setRooms={setRooms}
        adults={adults}
        filterData={filterData}
        setAdults={setAdults}
        children={children}
        setChildren={setChildren}
        onSearchDialogOpen={handleSearchDialogOpen}
        onSearchDialogClose={handleSearchDialogClose}
        onGuestDialogOpen={handleGuestDialogOpen}
        onGuestDialogClose={handleGuestDialogClose}
        onDateDialogOpen={handleDateDialogOpen}
        onDateDialogClose={handleDateDialogClose}
        onInputChange={handleInputChange}
        onSelectDestination={handleSelectDestination}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onAdultDecrement={handleAdultDecrement}
        onDateChange={setValues}
        onSubmit={handleSubmit}
        router={router}
      />

      {renderContent()}
    </WrapperContent>
  );
}
