"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import moment from "moment";
import { popularDestinations } from "src/_mock/_hotel-data";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filterData, setFilterData] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("filterData");
      let initialData = null;

      if (savedData) {
        try {
          initialData = JSON.parse(savedData);
          if (!initialData.location || !initialData.locationKey || !initialData.checkin || !initialData.checkout) {
            initialData = null;
            localStorage.removeItem("filterData");
          }
        } catch (error) {
          console.error("Error parsing saved filterData:", error);
          localStorage.removeItem("filterData");
          initialData = null;
        }
      }

      if (initialData === null) {
        const params = Object.fromEntries(searchParams.entries());
        const defaultDestination = popularDestinations.length > 0 ? popularDestinations[0] : { name: "Jakarta", CityKey: "vOoQdQqvHE6Req8ZI8ulZA" };

        let checkin = params.checkin;
        let checkout = params.checkout;
        if (!checkin || !moment(checkin, "DD-MM-YYYY", true).isValid()) {
          checkin = moment().add(1, "days").format("DD-MM-YYYY");
        }
        if (!checkout || !moment(checkout, "DD-MM-YYYY", true).isValid() || moment(checkout, "DD-MM-YYYY").isSameOrBefore(moment(checkin, "DD-MM-YYYY"))) {
          checkout = moment(checkin, "DD-MM-YYYY").add(1, "days").format("DD-MM-YYYY");
        }

        const locationFromUrl = params.loc || defaultDestination.name;
        const locationKeyFromUrl = params.id || defaultDestination.CityKey;

        initialData = {
          location: locationFromUrl,
          locationKey: locationKeyFromUrl,
          checkin: checkin,
          checkout: checkout,
          rooms: parseInt(params.rooms) || 1,
          adults: parseInt(params.adults) || 1,
          children: parseInt(params.children) || 0,
          selectedType: "city",
          hotelName: "",
          ratings: params.ratings || "",
          sort: params.sort || "StarRating",
          sortDir: params.sortDir || "desc",
          minPrice: parseInt(params.minPrice) || 0,
          maxPrice: parseInt(params.maxPrice) || 10000000,
          page: parseInt(params.page) || 1,
          CorrelationId: params.CorrelationId || null,
        };
      }

      setFilterData(initialData);
      setIsReady(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isReady && filterData !== null) {
      try {
        localStorage.setItem("filterData", JSON.stringify(filterData));
      } catch (error) {
        console.error("Error saving filterData to localStorage:", error);
      }
    }
  }, [filterData, isReady]);

  return <FilterContext.Provider value={{ filterData, setFilterData, isReady }}>{children}</FilterContext.Provider>;
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
// =======================================================================

// "use client";

// import { createContext, useContext, useState, useEffect } from "react";
// import { useSearchParams } from "src/routes/hooks";
// import moment from "moment";
// import { popularDestinations } from "src/_mock/_hotel-data"; // Import your destinations data

// const FilterContext = createContext();

// export const FilterProvider = ({ children }) => {
//   const [filterData, setFilterData] = useState(null);
//   const [isReady, setIsReady] = useState(false);
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const savedData = localStorage.getItem("filterData");

//       if (savedData) {
//         setFilterData(JSON.parse(savedData));
//       } else {
//         const params = Object.fromEntries(searchParams.entries());

//         if (!params.checkin) {
//           params.checkin = moment().add(7, "days").format("DD-MM-YYYY");
//         }

//         if (!params.checkout) {
//           params.checkout = moment().add(8, "days").format("DD-MM-YYYY");
//         }

//         if (!params.location || !params.locationKey) {
//           const defaultDestination = popularDestinations[0];
//           params.location = defaultDestination.name;
//           params.locationKey = defaultDestination.CityKey;
//         }

//         params.rooms = params.rooms || 1;
//         params.adults = params.adults || 1;
//         params.children = params.children || 0;

//         setFilterData(params);
//       }
//       setIsReady(true);
//     }
//   }, [searchParams]);

//   useEffect(() => {
//     if (filterData !== null) {
//       localStorage.setItem("filterData", JSON.stringify(filterData));
//     }
//   }, [filterData]);

//   return <FilterContext.Provider value={{ filterData, setFilterData, isReady }}>{children}</FilterContext.Provider>;
// };

// export const useFilter = () => {
//   return useContext(FilterContext);
// };

// ==============================================================================

// "use client";

// import { createContext, useContext, useState, useEffect } from "react";
// import { useSearchParams } from "src/routes/hooks";
// import moment from "moment";
// import { popularDestinations } from "src/_mock/_hotel-data"; // Import your destinations data

// const FilterContext = createContext();

// export const FilterProvider = ({ children }) => {
//   const [filterData, setFilterData] = useState(null);
//   const [isReady, setIsReady] = useState(false);
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const savedData = localStorage.getItem("filterData");
//       const today = moment();

//       if (savedData) {
//         const parsedData = JSON.parse(savedData);

//         // Validate checkin and checkout dates
//         const expectedCheckin = today.add(7, "days").format("DD-MM-YYYY");
//         const expectedCheckout = today.add(1, "days").format("DD-MM-YYYY"); // +8 days total

//         if (parsedData.checkin !== expectedCheckin || parsedData.checkout !== expectedCheckout) {
//           parsedData.checkin = expectedCheckin;
//           parsedData.checkout = expectedCheckout;
//         }

//         setFilterData(parsedData);
//       } else {
//         const params = Object.fromEntries(searchParams.entries());

//         // Set default dates if not provided
//         params.checkin = moment().add(7, "days").format("DD-MM-YYYY");
//         params.checkout = moment().add(8, "days").format("DD-MM-YYYY");

//         // Set default location and locationKey if not provided
//         if (!params.location || !params.locationKey) {
//           const defaultDestination = popularDestinations[0]; // Get the first destination as default
//           params.location = defaultDestination.name;
//           params.locationKey = defaultDestination.CityKey;
//         }

//         // Set other default values
//         params.rooms = params.rooms || 1;
//         params.adults = params.adults || 1;
//         params.children = params.children || 0;

//         setFilterData(params);
//       }
//       setIsReady(true);
//     }
//   }, [searchParams]);

//   useEffect(() => {
//     if (filterData !== null) {
//       localStorage.setItem("filterData", JSON.stringify(filterData));
//     }
//   }, [filterData]);

//   return <FilterContext.Provider value={{ filterData, setFilterData, isReady }}>{children}</FilterContext.Provider>;
// };

// export const useFilter = () => {
//   return useContext(FilterContext);
// };
