"use client";

import { useState, useEffect } from "react";
import { Card, Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { fCurrency } from "src/utils/format-number";
import Iconify from "src/components/iconify";

export default function ShopCardDefault({ data, idx, correlationId, filterData }) {
  const [storedFilterData, setStoredFilterData] = useState(null);

  useEffect(() => {
    // Check if window is defined (Next.js SSR safety)
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("filterData");
      if (item) {
        // Parse the JSON string to an object
        setStoredFilterData(JSON.parse(item));
      }
    }
  }, []);

  const paramsDetail = `?correlationId=${correlationId || storedFilterData?.correlationId}&id=${filterData?.locationKey || storedFilterData?.locationKey}&location=${filterData?.location || storedFilterData?.location}&rating=${
    data?.StarRating
  }&name=${data?.HotelName}&hotelName=${data?.HotelName}&checkin=${filterData?.checkin || storedFilterData?.checkin}&checkout=${filterData?.checkout || storedFilterData?.checkout}&rooms=${filterData?.rooms || 1}&adults=${
    filterData?.adults || 2
  }&children=${filterData?.children || 0}`;

  return (
    <Link href={`/hotels/${data?.HotelKey}${paramsDetail}`} className="relative drop-shadow" key={idx} target="_blank">
      <Card
        className="p-2 rounded-[20px]"
        sx={{
          height: { xs: 375, md: 400 },
          minHeight: 320,
        }}
      >
        {/* Product Image */}
        <Card
          className="rounded-[10px] relative"
          sx={{
            aspectRatio: "1 / 1",
            width: "100%",
            maxHeight: "50%",
          }}
        >
          {data?.ImageUri ? (
            <img src={data?.ImageUri} alt={data?.HotelName} width={200} height={200} className="h-full w-full object-cover" />
          ) : (
            <div className="h-[195px] w-full bg-gray-200 flex items-center justify-center">
              <Image src="/default image 1.png" alt={data?.name} width={100} height={100} style={{ objectFit: "contain", padding: 3 }} />
            </div>
          )}

          {/* Badge */}
          {data?.badge && (
            <div className="absolute bg-liburdulu-orange end-0 p-1 px-2 rounded-bl-[10px] top-0">
              <span className="text-[14px] font-semibold text-white">{data?.badge}</span>
            </div>
          )}
        </Card>

        {/* Product Details */}
        <div className="flex flex-col justify-between h-2/4 pt-2">
          <div className="grid grid-flow-row p-1">
            {/* Location */}
            <div className="flex justify-between gap-4">
              <div className="text-liburdulu-blue flex items-center">
                <Image
                  src="/libur_dulu_logo_only_Converted.png"
                  alt="logo-converted"
                  height={21}
                  width={25}
                  style={{
                    objectFit: "contain",
                    marginRight: 1,
                  }}
                />
                <span className="text-liburdulu-blue text-[12px] font-[400]">{data?.CityName || "Indonesia"}</span>
              </div>
              {/* <span className="text-[10px] font-semibold">{data.totalSales || 0} Terjual</span> */}
              {/* <div className="flex font-semibold">
                <Rating
                  name={`rating-${data.HotelKey}`}
                  value={data.StarRating || 0}
                  precision={0.5}
                  size="small"
                  readOnly
                  sx={{
                    "& .MuiRating-icon": {
                      fontSize: "10px",
                    },
                    "& .MuiRating-iconEmpty": {
                      fontSize: "10px",
                    },
                  }}
                />

                <Iconify icon="material-symbols:star-rounded" sx={{ width: 12, color: "#ffaa00" }} />
              </div> */}
              <div className="flex">
                {[...Array(5)].map((_, index) => {
                  if (index < Math.floor(data?.StarRating || 0)) {
                    return <Iconify key={index} icon="material-symbols:star-rounded" sx={{ width: { xs: 15, md: 19 }, color: "#ffaa00" }} />;
                  } else {
                    return <Iconify key={index} icon="material-symbols:star-outline-rounded" sx={{ width: { xs: 15, md: 19 }, color: "#ffaa00" }} />;
                  }
                })}
              </div>
            </div>

            {/* Product Name */}
            <div className="px-1">
              <span className="text-[16px] font-[500] line-clamp-2">{data?.HotelName}</span>
            </div>

            {/* Categories */}
            {/* <div className="px-1">
              <span className="text-liburdulu-blue text-[12px] font-[400] line-clamp-2">{data?.category.join(", ")}</span>
            </div> */}

            {/* Rating */}
            <div className="flex items-center">
              {/* <Rating name={`rating-${data?.HotelKey}`} value={data?.StarRating || 0} precision={0.5} readOnly size="small" sx={{ fontSize: "12px" }} /> */}
              <span className="text-[12px] font-[400] ml-1 text-liburdulu-blue">Hotel</span>
            </div>
          </div>

          {/* Prices */}
          <div className="grid grid-flow-row p-1 justify-items-start">
            {data?.discount > 0 ? (
              <>
                <span className="text-gray-400 text-[13px] font-[400] line-through">{fCurrency(data?.price)}</span>
                <span className="text-[#e52424] text-[16px] font-[600]">{fCurrency(data?.discount)}</span>
              </>
            ) : (
              <>
                <span className="text-[12px] font-[500]">Mulai Dari </span>
                <span className="text-[#e52424] text-[16px] font-[600]">{fCurrency(data?.PricePerRoomNight || data?.AveragePrice)}</span>
              </>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
