import { useState, useCallback } from "react";
import Image from "next/image";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useResponsive } from "src/hooks/use-responsive";

// -----------------------------------------------------------------------------------------
import ImgHotel from "public/assets/images/cara-pesan/img-cara-pesan-hotel.jpg";
import ImgHotelMobile from "public/assets/images/cara-pesan/img-cara-pesan-hotel-mobile.jpg";
import ImgOT from "public/assets/images/cara-pesan/img-cara-pesan-OT.jpg";
import ImgOTCustom from "public/assets/images/cara-pesan/img-cara-pesan-OT-custom.jpg";
import ImgPesawat from "public/assets/images/cara-pesan/img-cara-pesan-pesawat.jpg";
import ImgPesawatMobile from "public/assets/images/cara-pesan/img-cara-pesan-pesawat-mobile.jpg";
import ImgKereta from "public/assets/images/cara-pesan/img-cara-pesan-kereta.jpg";
import ImgKeretaMobile from "public/assets/images/cara-pesan/img-cara-pesan-kereta-mobile.jpg";

const categories = [
  {
    label: "Hotel",
    value: "hotel",
    Component: () => (
      <div className="relative w-full h-full">
        <div className="block md:hidden relative w-full h-full">
          <Image
            src={ImgHotelMobile}
            alt="Hotel Mobile"
            placeholder="blur"
            quality={100}
            width={700}
            height={700}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="hidden md:block relative w-full h-full">
          <Image
            src={ImgHotel}
            alt="Hotel Desktop"
            placeholder="blur"
            quality={100}
            width={2000}
            height={700}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    ),
  },
  {
    label: "Open Trip",
    value: "openTrip",
    Component: () => (
      <div className="relative w-full h-full">
        <div className="block md:hidden relative w-full h-full">
          <Image
            src={ImgOT}
            alt="Hotel Mobile"
            placeholder="blur"
            quality={100}
            width={700}
            height={700}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="hidden md:block relative w-full h-full">
          <Image
            src={ImgOT}
            alt="Hotel Desktop"
            placeholder="blur"
            quality={100}
            width={2000}
            height={700}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    ),
  },
  {
    label: "Kereta",
    value: "kereta",
    Component: () => (
      <div className="relative w-full h-full">
        <div className="block md:hidden relative w-full h-full">
          <Image
            src={ImgKeretaMobile}
            alt="Hotel Mobile"
            placeholder="blur"
            quality={100}
            width={700}
            height={700}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="hidden md:block relative w-full h-full">
          <Image
            src={ImgKereta}
            alt="Hotel Desktop"
            placeholder="blur"
            quality={100}
            width={1920}
            height={700}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    ),
  },
  {
    label: "Pesawat",
    value: "pesawat",
    Component: () => (
      <div className="relative w-full h-full">
        <div className="block md:hidden relative w-full h-full">
          <Image
            src={ImgPesawatMobile}
            alt="Hotel Mobile"
            placeholder="blur"
            quality={100}
            width={1920}
            height={700}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="hidden md:block relative w-full h-full">
          <Image
            src={ImgPesawat}
            alt="Hotel Desktop"
            placeholder="blur"
            quality={100}
            width={1920}
            height={700}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    ),
  },
  {
    label: "Custom Open Trip",
    value: "customOpenTrip",
    Component: () => (
      <div className="relative w-full h-full">
        <div className="block md:hidden relative w-full h-full">
          <Image
            src={ImgOTCustom}
            alt="Hotel Mobile"
            placeholder="blur"
            quality={100}
            width={700}
            height={700}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="hidden md:block relative w-full h-full">
          <Image
            src={ImgOTCustom}
            alt="Hotel Desktop"
            placeholder="blur"
            quality={100}
            width={1920}
            height={700}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    ),
  },
];

export default function CaraPemesananCategory() {
  const mdUp = useResponsive("up", "md");
  const [currentTab, setCurrentTab] = useState("hotel");

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const CurrentComponent = categories.find(
    (tab) => tab.value === currentTab
  )?.Component;

  return (
    <div className="container mx-auto">
      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        className="mb-5"
      >
        {categories.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>

      {CurrentComponent && <CurrentComponent />}
    </div>
  );
}
