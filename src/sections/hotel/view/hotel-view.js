/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import ShopCardDefault from "src/sections/hotel/card-item-hotel";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { popularDestinations } from "src/_mock/_hotel-data";
import SearchHome from "../search-home";
import { useDebounce } from "src/hooks/use-debounce";
import { useFilter } from "../context/search-context";
import { useRouter } from "next/navigation";
import { DateObject } from "react-multi-date-picker";
import { useQuery } from "@tanstack/react-query";
import { getCities, getPopularHotels } from "../api/hotel-api";
import ShopCardSkeleton, { ShopCardSkeletonGrid } from "../card-item-skeleton";
import HotelExclusiveRecommendation from "../hotel-exclusive-recommendation";

export default function HotelView() {
  const router = useRouter();
  const { filterData, setFilterData, isReady } = useFilter();

  const defaultCheckin = new DateObject().add(1, "days");
  const defaultCheckout = new DateObject().add(2, "days");
  const defaultDestination = popularDestinations.length > 0 ? popularDestinations[0] : { id: "default", name: "Jakarta", CityKey: "vOoQdQqvHE6Req8ZI8ulZA" };

  const [location, setLocation] = useState("");
  const [locationKey, setLocationKey] = useState("");
  const [selectedCityName, setSelectedCityName] = useState("");
  const [selectedItemType, setSelectedItemType] = useState(null);
  const [selectedHotelName, setSelectedHotelName] = useState("");
  const [values, setValues] = useState([defaultCheckin, defaultCheckout]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [openGuestDialog, setOpenGuestDialog] = useState(false);
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [selectedTab, setSelectedTab] = useState(defaultDestination.CityKey);
  const debouncedLocation = useDebounce(location, 500);

  useEffect(() => {
    if (isReady) {
      const initialData = filterData || {};

      let initCityName = initialData.location || defaultDestination.name; // City Name from context or default
      let initLocationKey = initialData.locationKey || defaultDestination.CityKey;
      let initSelectedItemType = initialData.selectedType || "city";
      let initSelectedHotelName = initialData.hotelName || null;
      let initLocationDisplay = initSelectedHotelName || initCityName; // Display hotel or city name

      if (initSelectedHotelName && initSelectedItemType === "hotel") {
        initLocationDisplay = initSelectedHotelName;
      } else {
        initSelectedItemType = "city";
        initSelectedHotelName = null;
        initLocationDisplay = initCityName;
      }

      setLocation(initLocationDisplay);
      setLocationKey(initLocationKey);
      setSelectedCityName(initCityName); // Set City Name
      setSelectedItemType(initSelectedItemType);
      setSelectedHotelName(initSelectedHotelName);

      let checkinDate = defaultCheckin;
      if (initialData.checkin) {
        try {
          checkinDate = new DateObject({ date: initialData.checkin, format: "DD-MM-YYYY" });
        } catch (e) {}
      }
      let checkoutDate = defaultCheckout;
      if (initialData.checkout) {
        try {
          checkoutDate = new DateObject({ date: initialData.checkout, format: "DD-MM-YYYY" });
        } catch (e) {}
      }
      setValues([checkinDate, checkoutDate]);

      setRooms(initialData.rooms || 1);
      setAdults(initialData.adults || 1);
      setChildren(initialData.children || 0);

      setSelectedTab(initLocationKey || defaultDestination.CityKey);
    }
  }, [isReady, filterData]);

  const fetchCitiesApiCall = async (query) => {
    try {
      const citiesData = await getCities(query);
      if (openSearchDialog) {
        setFilteredDestinations(citiesData);
      } else {
        setFilteredDestinations([]);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
      setFilteredDestinations([]);
    }
  };

  useEffect(() => {
    if (!openSearchDialog) {
      setFilteredDestinations([]);
      return;
    }
    const trimmedDebouncedLocation = debouncedLocation?.trim();
    if (!trimmedDebouncedLocation) {
      setFilteredDestinations([]);
      return;
    }
    const currentSelectionDisplay = selectedHotelName || selectedCityName;
    if (selectedItemType && trimmedDebouncedLocation === currentSelectionDisplay) {
      setFilteredDestinations([]);
      return;
    }
    fetchCitiesApiCall(trimmedDebouncedLocation);
  }, [debouncedLocation, openSearchDialog, selectedItemType, selectedHotelName, selectedCityName, location]);

  const handleSearchDialogOpen = () => {
    setOpenSearchDialog(true);
  };
  const handleSearchDialogClose = () => {
    setOpenSearchDialog(false);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setLocation(newValue);
    if (newValue !== location) {
      setSelectedItemType(null);
      setSelectedHotelName("");
      setLocationKey("");
      setSelectedCityName(""); // Clear City Name
    }
  };

  const handleSelectDestination = (destination) => {
    if (!destination || !destination.CityKey || !(destination.CityName || destination.name)) {
      console.error("Invalid destination object received:", destination);
      setOpenSearchDialog(false);
      return;
    }
    const itemType = destination.type === "hotel" ? "hotel" : "city";
    const currentHotelName = itemType === "hotel" && destination.HotelName?.trim() ? destination.HotelName.trim() : null;
    const cityName = destination.CityName || destination.name;
    const displayValue = currentHotelName || cityName;
    const cityKey = destination.CityKey;

    setLocation(displayValue);
    setLocationKey(cityKey);
    setSelectedCityName(cityName); // Set City Name
    setSelectedItemType(itemType);
    setSelectedHotelName(currentHotelName);

    setFilteredDestinations([]);
    setOpenSearchDialog(false);
  };

  const handleGuestDialogOpen = () => {
    setOpenGuestDialog(true);
  };
  const handleGuestDialogClose = () => {
    setOpenGuestDialog(false);
  };

  const handleIncrement = (setter) => () => {
    setter((prev) => prev + 1);
  };
  const handleDecrement = (setter) => () => {
    setter((prev) => (setter === setRooms || setter === setAdults ? Math.max(1, prev - 1) : Math.max(0, prev - 1)));
  };

  const handleSubmit = () => {
    const checkinStr = values[0]?.isValid ? values[0].format("DD-MM-YYYY") : null;
    const checkoutStr = values[1]?.isValid ? values[1].format("DD-MM-YYYY") : null;

    if (!locationKey || !selectedCityName) {
      // Check city name
      alert("Please select a valid destination from the suggestions.");
      handleSearchDialogOpen();
      return;
    }
    const expectedDisplayValue = selectedHotelName || selectedCityName;
    if (!selectedItemType || location !== expectedDisplayValue) {
      alert("The destination name seems to have changed. Please select a valid destination from the suggestions again.");
      handleSearchDialogOpen();
      return;
    }
    if (!checkinStr || !checkoutStr) {
      alert("Please select valid check-in and check-out dates.");
      return;
    }

    // Context Data: location is CITY NAME
    const contextData = {
      location: selectedCityName, // Use stored city name
      locationKey: locationKey,
      checkin: checkinStr,
      checkout: checkoutStr,
      rooms: rooms,
      adults: adults,
      children: children,
      selectedType: selectedItemType,
      ...(selectedItemType === "hotel" && selectedHotelName && { hotelName: selectedHotelName }),
      CorrelationId: filterData?.CorrelationId,
      ratings: filterData?.ratings || "",
      sort: filterData?.sort || "StarRating",
      sortDir: filterData?.sortDir || "desc",
      minPrice: filterData?.minPrice || 0,
      maxPrice: filterData?.maxPrice || 10000000,
      page: 1, // Reset page on new search from home
    };
    setFilterData(contextData);

    // URL Params: loc is display value, id is key
    const queryParams = new URLSearchParams({
      loc: location, // Use display value for URL
      id: locationKey,
      checkin: checkinStr,
      checkout: checkoutStr,
      rooms: rooms.toString(),
      adults: adults.toString(),
      children: children.toString(),
    }).toString();
    router.push(`/hotels/search?${queryParams}`);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    const selectedCity = popularDestinations.find((dest) => dest.CityKey === newValue);
    if (selectedCity) {
      setLocation(selectedCity.name);
      setLocationKey(selectedCity.CityKey);
      setSelectedCityName(selectedCity.name); // Set City Name
      setSelectedItemType("city");
      setSelectedHotelName("");
    } else {
      console.warn("Could not find popular destination details for CityKey:", newValue);
    }
  };

  const {
    data: recommendationHotels,
    isLoading: isLoadingRecommendationHotels,
    isError: isErrorRecommendationHotels,
    error: recommendationError,
  } = useQuery({
    queryKey: ["recommendation-hotels", selectedTab],
    queryFn: () => getPopularHotels(selectedTab),
    keepPreviousData: true,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: !!selectedTab,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    if (isErrorRecommendationHotels) console.error("Error fetching recommendation hotels:", recommendationError);
  }, [isErrorRecommendationHotels, recommendationError]);

  if (!isReady) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        {" "}
        <CircularProgress />{" "}
      </Box>
    );
  }

  return (
    <Container sx={{ mb: 10, mt: { xs: -8, md: -10 } }}>
      <Box
        sx={{
          position: "relative",
          height: { xs: "auto", sm: "auto", md: "auto" },
          backgroundImage: `url('/banner-hotel.png')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          p: { xs: 3, md: 10 },
        }}
      >
        <Box sx={{ color: "white", textAlign: { xs: "center", sm: "left" }, mb: { xs: 2, sm: 0 } }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mt: { xs: 4, sm: 0 } }}>
            {" "}
            Temukan Hotel Yang Pas <br /> Buat Liburanmu{" "}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, my: { xs: 3, sm: 0 } }}>
            {" "}
            Cari sesuai destinasi dan tanggal yang kamu mau{" "}
          </Typography>
        </Box>
        <SearchHome
          location={location}
          onInputChange={handleInputChange}
          onSelectDestination={handleSelectDestination}
          filteredDestinations={filteredDestinations}
          popularDestinations={popularDestinations}
          openSearchDialog={openSearchDialog}
          onSearchDialogOpen={handleSearchDialogOpen}
          onSearchDialogClose={handleSearchDialogClose}
          openGuestDialog={openGuestDialog}
          onGuestDialogOpen={handleGuestDialogOpen}
          onGuestDialogClose={handleGuestDialogClose}
          values={values}
          onDateChange={setValues}
          rooms={rooms}
          adults={adults}
          children={children}
          setRooms={setRooms}
          setAdults={setAdults}
          setChildren={setChildren}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onSubmit={handleSubmit}
        />
      </Box>
      <HotelExclusiveRecommendation />
      <Box sx={{ mt: 7 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
          {" "}
          Cek Hotel Populer Menarik di Kota Tujuan Kamu{" "}
        </Typography>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          aria-label="Popular destination tabs"
          sx={{
            mt: 2,
            mx: 0,
            width: "100%",
            "& .MuiTab-root": { borderRadius: "12px", textTransform: "none", border: "1px solid #e9ecee", padding: "0 20px", margin: "0 4px", color: "#000" },
            "& .MuiTabs-scrollButtons": { width: "0px" },
            "& .MuiSvgIcon-root": { display: "none" },
            "& .MuiTab-root:not(:last-of-type)": { marginRight: "8px" },
            "& .Mui-selected": { backgroundColor: "#1f2937", color: "#fff", transform: "none", "&:hover": { backgroundColor: "#1f2937" } },
            "& .MuiTabs-indicator": { display: "none" },
          }}
        >
          {popularDestinations.map((destination) => (
            <Tab key={destination.id} label={destination.CityName} value={destination.CityKey} />
          ))}
        </Tabs>
      </Box>
      <Grid container spacing={2} sx={{ mt: 0.5 }}>
        {isLoadingRecommendationHotels ? (
          <ShopCardSkeletonGrid count={4} />
        ) : isErrorRecommendationHotels ? (
          <Grid item xs={12}>
            <Typography color="error" align="center" sx={{ py: 5 }}>
              {" "}
              Maaf, terjadi kesalahan saat memuat hotel populer. Coba lagi nanti.{" "}
            </Typography>
          </Grid>
        ) : recommendationHotels?.data?.Hotels && recommendationHotels.data.Hotels.length > 0 ? (
          recommendationHotels.data.Hotels.slice(0, 4).map((item) => (
            <Grid item xs={6} sm={4} md={3} key={item.HotelKey}>
              {" "}
              <ShopCardDefault data={item} idx={`PopularHotel-${item.HotelKey}`} correlationId={recommendationHotels.data.CorrelationId} />{" "}
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            {" "}
            <Typography align="center" sx={{ py: 5, color: "text.secondary" }}>
              {" "}
              Belum ada hotel populer yang ditemukan di area ini.{" "}
            </Typography>{" "}
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
