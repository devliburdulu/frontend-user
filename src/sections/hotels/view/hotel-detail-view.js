"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { useResponsive } from "src/hooks/use-responsive";
import CarouselHotel from "../carousel-hotel";
import { useRouter, useSearchParams } from "src/routes/hooks";
import { useFilter } from "../context/search-context";
import SearchSimple from "../search-simple";
import { useDebounce } from "src/hooks/use-debounce";
import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import { SplashScreen } from "src/components/loading-screen";
import { getDetailHotel, searchHotelDetail } from "../api/hotel-api";

import HotelInfo from "../hotel-info";
import HotelReview from "../hotel-review";
import HotelFacilities from "../hotel-facilities";
import HotelMaps from "../hotel-maps";
import HotelRooms from "../hotel-rooms";
import HotelHelp from "../hotel-help";

export const TABS = [
  { value: "one", label: "Informasi Hotel" },
  { value: "two", label: "Ulasan" },
  { value: "three", label: "Fasilitas" },
  { value: "four", label: "Lokasi" },
  { value: "five", label: "Kamar" },
];

export default function HotelDetailsView({ id }) {
  const isDekstop = useResponsive("up", "md");
  const [dataDetail, setDataDetail] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { filterData, isReady, setFilterData } = useFilter();
  const [scrollableTab, setScrollableTab] = useState("one");
  const tabsRef = useRef(null);

  // Tabs
  const sectionRefs = useRef({
    one: useRef(null),
    two: useRef(null),
    three: useRef(null),
    four: useRef(null),
    five: useRef(null),
  });

  // Search State
  const [location, setLocation] = useState("");
  const [values, setValues] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [openGuestDialog, setOpenGuestDialog] = useState(false);
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const [openDateDialog, setOpenDateDialog] = useState(false);
  const [rooms, setRooms] = useState(filterData?.rooms || 1);
  const [adults, setAdults] = useState(filterData?.adults || 1);
  const [children, setChildren] = useState(filterData?.children || 0);
  const [lowestRoomPrice, setLowestRoomPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const debouncedLocation = useDebounce(location, 500);

  // Get all params from URL
  const correlationId = searchParams.get("correlationId");
  const loc = searchParams.get("loc");
  const locationKey = searchParams.get("id");
  const rating = searchParams.get("rating");
  const hotelName = searchParams.get("hotelName");
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");
  const roomCount = searchParams.get("rooms") || "1";
  const adultCount = searchParams.get("adults") || "1";
  const childCount = searchParams.get("children") || "0";

  const hasRetriedRef = useRef(false);

  // const { mutate: mutateDetail, isLoading: isDetailLoading } = useMutation({
  //   mutationFn: ({ correlationId, hotelKey }) => getDetailHotel(correlationId, hotelKey),
  //   onSuccess: (data) => {
  //     setDataDetail(data);
  //     setLoading(false);
  //
  //   },

  //   onError: (error) => {
  //     console.error("detail failed:", error);
  //     setLoading(false);
  //   },
  //   keepPreviousData: true,
  //   cacheTime: 0,
  //   staleTime: 0,
  //   retry: 0,
  // });

  const { mutate: mutateDetail, isLoading: isDetailLoading } = useMutation({
    mutationFn: ({ correlationId, hotelKey }) => getDetailHotel(correlationId, hotelKey),
    onSuccess: async (data, variables) => {
      if (data.error && data.error.includes("Failed to load room data.") && !hasRetriedRef.current) {
        hasRetriedRef.current = true;
        try {
          const currentHotelName = data?.data?.HotelName || hotelName || "";
          const totalGuest = parseInt(adultCount) + parseInt(childCount);

          const newSearchResponse = await searchHotelDetail(locationKey, moment(checkin, "DD-MM-YYYY").format("YYYY-MM-DD"), moment(checkout, "DD-MM-YYYY").format("YYYY-MM-DD"), roomCount, totalGuest, currentHotelName);

          if (newSearchResponse?.CorrelationId) {
            await mutateDetail({ correlationId: newSearchResponse.CorrelationId, hotelKey: id });
          }
        } catch (error) {
          console.error("Error fetching new correlation ID:", error);
        }
      } else {
        setDataDetail(data);
        setLoading(false);
      }
    },
    onError: (error) => {
      console.error("Detail fetch failed:", error);
      setLoading(false);
    },
    keepPreviousData: false,
    cacheTime: 0,
    staleTime: 0,
    retry: 0,
  });

  // const { mutate: mutateDetail, isLoading: isDetailLoading } = useMutation({
  //   mutationFn: ({ correlationId, hotelKey }) => getDetailHotel(correlationId, hotelKey),
  //   onSuccess: async (response, variables) => {
  //     try {
  //       // Check if response has status code and it's not 200
  //       if (response?.statusCode !== 200) {
  //         // Get the required parameters
  //         const currentHotelName = dataDetail?.data?.HotelName || hotelName || "";
  //         const totalGuest = parseInt(adultCount) + parseInt(childCount);

  //         // Format dates for the API call
  //         const formattedCheckin = moment(checkin, "DD-MM-YYYY").format("YYYY-MM-DD");
  //         const formattedCheckout = moment(checkout, "DD-MM-YYYY").format("YYYY-MM-DD");

  //         // Search for new hotel details
  //         const newSearchResponse = await searchHotelDetail(locationKey, formattedCheckin, formattedCheckout, roomCount, totalGuest, currentHotelName);

  //         // If we get a new correlation ID, retry the detail fetch
  //         if (newSearchResponse?.data?.length !== 0) {
  //           const retryResponse = await getDetailHotel(newSearchResponse.CorrelationId, variables.hotelKey);

  //           // Update state with retry response
  //           setDataDetail(retryResponse);
  //           setLoading(false);
  //         } else {
  //           // Handle case where we don't get a correlation ID
  //           console.error("Failed to get new correlation ID");
  //           setLoading(false);
  //           setDataDetail(response); // Use original response as fallback
  //         }
  //       } else {
  //         // If response is 200, proceed normally
  //         setDataDetail(response);
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.error("Error in mutation success handler:", error);
  //       setDataDetail(response); // Use original response as fallback
  //       setLoading(false);
  //     }
  //   },
  //   onError: (error) => {
  //     console.error("Detail fetch failed:", error);
  //     setLoading(false);
  //   },
  //   keepPreviousData: false,
  //   cacheTime: 0,
  //   staleTime: 0,
  //   retry: 0,
  // });

  // useEffect(() => {
  //   if (!isReady) return;

  //   if (filterData) {
  //     setRooms(filterData.rooms || 0);
  //     setAdults(filterData.adults || 0);
  //     setChildren(filterData.children || 0);
  //   }

  //   // localStorage.removeItem("filterData");

  //   mutateDetail({ correlationId: filterData?.CorrelationId || correlationId, hotelKey: id });

  //   const queryParams = new URLSearchParams({
  //     loc: filterData.location || "",
  //     id: filterData.locationKey || "",
  //     checkin: filterData.checkin || "",
  //     checkout: filterData.checkout || "",
  //     rooms: filterData.rooms || "1",
  //     adults: filterData.adults || "1",
  //     children: filterData.children || "0",
  //   }).toString();

  //   router.replace(`/hotels/${id}?correlationId=${correlationId}&rating=${rating}&hotelName=${hotelName}&${queryParams}`);
  // }, [filterData, isReady, searchParams, router, id, correlationId, rating, mutateDetail]);

  useEffect(() => {
    setLoading(true);
    mutateDetail({ correlationId, hotelKey: id });
  }, [correlationId, id, mutateDetail]);

  const handleChangeScrollableTab = useCallback((event, newValue) => {
    setScrollableTab(newValue);
    const sectionRef = sectionRefs.current[newValue];

    if (sectionRef?.current) {
      const offset = 80;
      const elementPosition = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const scrollPosition = elementPosition - offset;

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  }, []);

  const handleJumpToRooms = () => {
    const roomTabValue = "five";
    setScrollableTab(roomTabValue);
    const sectionRef = sectionRefs.current[roomTabValue];

    if (sectionRef?.current) {
      const offset = 80;
      const elementPosition = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const scrollPosition = elementPosition - offset;

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-80px 0px -50% 0px",
      threshold: 0,
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const value = entry.target.getAttribute("data-tab-value");
          setScrollableTab(value);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    Object.keys(sectionRefs.current).forEach((key) => {
      if (sectionRefs.current[key]?.current) {
        observer.observe(sectionRefs.current[key].current);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Search Functions
  const handleSearchDialogOpen = () => {
    setOpenSearchDialog(true);
  };

  const handleSearchDialogClose = () => {
    setOpenSearchDialog(false);
  };

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSelectDestination = (destinationName) => {
    setLocation(destinationName);
    setFilteredDestinations([]);
    setOpenSearchDialog(false);
  };

  // Date Functions
  const handleDateDialogOpen = () => {
    setOpenDateDialog(true);
  };

  const handleDateDialogClose = () => {
    setOpenDateDialog(false);
  };

  // Guest Functions
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
    setter((prev) => Math.max(0, prev - 1));
  };

  // const handleSubmit = async () => {
  //   const searchData = {
  //     location: location || filterData.location,
  //     locationKey: filterData?.locationKey || searchParams.get("id"),
  //     checkin: !values[0] ? filterData.checkin : values[0].format("DD-MM-YYYY"),
  //     checkout: !values[1] ? filterData.checkout : values[1].format("DD-MM-YYYY"),
  //     rooms: rooms,
  //     adults: adults,
  //     children: children,
  //   };

  //   try {
  //     const totalGuest = adults + children;
  //     const hotelName = dataDetail?.data?.HotelName || "";

  //     const searchResponse = await searchHotelDetail(filterData?.locationKey, moment(searchData.checkin, "DD-MM-YYYY").format("YYYY-MM-DD"), moment(searchData.checkout, "DD-MM-YYYY").format("YYYY-MM-DD"), rooms, totalGuest, hotelName);

  //
  //

  //     if (!searchResponse?.CorrelationId) {
  //       console.error("No CorrelationId in response");
  //       return;
  //     }

  //     await new Promise((resolve) => setTimeout(resolve, 0));

  //     const updatedFilterData = {
  //       ...searchData,
  //       CorrelationId: searchResponse.CorrelationId,
  //     };

  //     localStorage.setItem("filterData", JSON.stringify(updatedFilterData));
  //     setFilterData(updatedFilterData);

  //     // Call mutateDetail before URL update
  //     await mutateDetail({
  //       correlationId: searchResponse.CorrelationId,
  //       hotelKey: id,
  //     });

  //     // Create query string manually to ensure order and correct encoding
  //     const queryString = [
  //       `correlationId=${searchResponse.CorrelationId}`,
  //       `rating=${rating || searchParams.get("rating") || ""}`,
  //       `hotelName=${hotelName || searchParams.get("hotelName") || ""}`,
  //       `loc=${encodeURIComponent(searchData.location || "")}`,
  //       `id=${searchData.locationKey || searchParams.get("id") || ""}`,
  //       `checkin=${searchData.checkin}`,
  //       `checkout=${searchData.checkout}`,
  //       `rooms=${searchData.rooms}`,
  //       `adults=${searchData.adults}`,
  //       `children=${searchData.children}`,
  //     ].join("&");

  //     // Use window.history directly to update URL
  //     window.history.replaceState(null, "", `/hotels/${id}?${queryString}`);
  //   } catch (error) {
  //     console.error("Error in handleSubmit:", error);
  //   }
  // };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const totalGuest = adults + children;
      const currentHotelName = dataDetail?.data?.HotelName || hotelName || "";
      const checkinNew = !values[0] ? checkin : values[0].format("DD-MM-YYYY");
      const checkoutNew = !values[1] ? checkout : values[1].format("DD-MM-YYYY");

      const searchResponse = await searchHotelDetail(locationKey, moment(checkinNew, "DD-MM-YYYY").format("YYYY-MM-DD"), moment(checkoutNew, "DD-MM-YYYY").format("YYYY-MM-DD"), rooms, totalGuest, currentHotelName);

      if (!searchResponse?.CorrelationId) {
        console.error("No CorrelationId in response");
        setLoading(false);
        return;
      }

      await mutateDetail({
        correlationId: searchResponse.CorrelationId,
        hotelKey: id,
      });

      const queryString = [
        `correlationId=${searchResponse.CorrelationId}`,
        `id=${locationKey}`,
        `loc=${encodeURIComponent(loc)}`,
        `rating=${rating || ""}`,
        `hotelName=${encodeURIComponent(currentHotelName)}`,
        `checkin=${checkinNew}`,
        `checkout=${checkoutNew}`,
        `rooms=${rooms}`,
        `adults=${adults}`,
        `children=${children}`,
      ].join("&");

      router.replace(`/hotels/${id}?${queryString}`);
    } catch (error) {
      setLoading(false);
      console.error("Error in handleSubmit:", error);
    }
  };

  if (loading || !dataDetail) {
    return <SplashScreen />;
  }

  const WrapperContent = isDekstop ? Container : Box;

  return (
    <WrapperContent
      maxWidth="lg"
      sx={{
        mb: 5,
        mt: {
          xs: -8,
          md: -10,
        },
      }}
    >
      <Box sx={{ mb: 4, px: isDekstop ? 0 : 3 }}>
        <CarouselHotel media={dataDetail?.data?.Images || []} isDekstop={isDekstop} />
      </Box>

      {/* Sticky Scrollable Tabs */}
      <Box
        ref={tabsRef}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          bgcolor: "background.paper",
          borderBottom: "1px solid #e0e0e0",
          px: isDekstop ? 0 : 3,
        }}
      >
        <Tabs value={scrollableTab} onChange={handleChangeScrollableTab} variant="scrollable" scrollButtons="auto" aria-label="Hotel details tabs">
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </Box>

      {/* Sections */}
      {TABS.map((tab) => (
        <Box
          key={tab.value}
          ref={sectionRefs.current[tab.value]}
          data-tab-value={tab.value}
          sx={{
            my: 2,
            scrollMarginTop: "80px",
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ my: 2, mt: 3, px: isDekstop ? 0 : 3 }}>
            {tab.label}
          </Typography>

          {tab.value === "one" && (
            <>
              <Box sx={{ px: isDekstop ? 0 : 3 }}>
                <HotelInfo hotelName={dataDetail?.data?.HotelName} description={dataDetail?.data?.Description} rating={rating} address={dataDetail?.data?.Address} onJumpToRoom={handleJumpToRooms} lowestPrice={lowestRoomPrice} />
              </Box>
            </>
          )}

          {tab.value === "two" && (
            <Box sx={{ px: isDekstop ? 0 : 3 }}>
              <HotelReview reviews={dataDetail?.data?.Reviews} />
            </Box>
          )}

          {tab.value === "three" && (
            <Box sx={{ px: isDekstop ? 0 : 3 }}>
              <HotelFacilities facilities={dataDetail?.data?.Facilities} />
            </Box>
          )}

          {tab.value === "four" && (
            <Box sx={{ px: isDekstop ? 0 : 3 }}>
              <HotelMaps address={dataDetail?.data?.Address} long={dataDetail?.data?.Longitude} lat={dataDetail?.data?.Latitude} />
            </Box>
          )}

          {tab.value === "five" && (
            <Box sx={{ px: 0 }}>
              <SearchSimple
                location={location}
                values={values}
                filteredDestinations={filteredDestinations}
                openGuestDialog={openGuestDialog}
                openSearchDialog={openSearchDialog}
                openDateDialog={openDateDialog}
                rooms={rooms}
                setRooms={setRooms}
                adults={adults}
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
                onDateChange={setValues}
                onSubmit={handleSubmit}
                filterData={filterData}
                setFilterData={setFilterData}
                isDetail={true}
                checkinDetail={checkin}
                checkoutDetail={checkout}
              />
              <Box sx={{ my: 2 }}>
                <HotelRooms rooms={dataDetail?.data?.Rooms} setLowestPrice={setLowestRoomPrice} />
              </Box>
            </Box>
          )}

          <Divider sx={{ my: 3 }} />
        </Box>
      ))}
    </WrapperContent>
  );
}
