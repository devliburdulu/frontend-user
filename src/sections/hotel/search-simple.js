import React, { useState } from "react";
import { Box, Divider, IconButton, Typography, Drawer, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { fDateHotel } from "src/utils/format-time";
import { popularDestinations } from "src/_mock/_hotel-data";
import { useResponsive } from "src/hooks/use-responsive";
import GuestDialog from "./dialog-guest";
import SearchDialog from "./dialog-search";
import DateDialog from "./dialog-date";
import Iconify from "src/components/iconify";
import { useSearchParams } from "src/routes/hooks";

export default function SearchSimple({
  router,
  location,
  values,
  filteredDestinations,
  openGuestDialog,
  openSearchDialog,
  openDateDialog,
  rooms,
  setRooms,
  adults,
  setAdults,
  children,
  setChildren,
  onSearchDialogOpen,
  onSearchDialogClose,
  onGuestDialogOpen,
  onGuestDialogClose,
  onDateDialogOpen,
  onDateDialogClose,
  onInputChange,
  onSelectDestination,
  onIncrement,
  onDecrement,
  onDateChange,
  onSubmit,
  filterData,
  setFilterData,
  isDetail,
  checkinDetail,
  checkoutDetail,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useResponsive("down", "md");
  const searchParams = useSearchParams();

  // Compute the values to use for dates
  // const valuesCheck = values && values[0] ? values : [filterData?.checkin, filterData?.checkout];
  const valuesCheck = values && values[0] ? values : [isDetail ? checkinDetail : filterData?.checkin, isDetail ? checkoutDetail : filterData?.checkout];

  // Prepare text values for location and guest info to reduce duplication
  const displayLocation = location || filterData?.location;
  const displayRooms = isDetail === true ? searchParams.get("rooms") : rooms || filterData?.rooms || searchParams.get("rooms");
  const displayAdults = isDetail === true ? searchParams.get("adults") : adults || filterData?.adults || searchParams.get("adults");
  const displayChildren = isDetail === true ? searchParams.get("children") : children || filterData?.children || searchParams.get("children");
  const guestText = `${displayRooms} Kamar, ${displayAdults} Dewasa, ${displayChildren} Anak`;
  const mobileGuestText = `${displayRooms} Kamar • ${+displayAdults + +displayChildren} Tamu`;

  // Toggle the mobile drawer
  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  // Submit handler for mobile search
  const handleOnSubmit = () => {
    if (onSubmit) onSubmit();
    setIsDrawerOpen(false);
  };

  /**
   * A custom date button to be used with the DatePicker’s render prop.
   * It uses the passed date values or falls back to the filterData dates.
   */
  const CustomDateButton = ({ openCalendar, values }) => {
    const hasValue = values && values[0];
    // const startDate = hasValue ? values[0] : filterData?.checkin;
    // const endDate = hasValue ? values[1] : filterData?.checkout;
    const startDate = hasValue ? values[0] : isDetail ? checkinDetail : filterData?.checkin;
    const endDate = hasValue ? values[1] : isDetail ? checkoutDetail : filterData?.checkout;
    const dateText = `${fDateHotel(startDate, "dd MMM yyyy")} - ${fDateHotel(endDate, "dd MMM yyyy")}`;

    return (
      <Button onClick={openCalendar}>
        <Typography color="#fff" sx={{ textAlign: "left" }}>
          {dateText}
        </Typography>
      </Button>
    );
  };

  /**
   * Desktop search bar layout.
   */
  const DesktopSearch = (
    <Box
      sx={{
        display: isMobile ? "none" : "flex",
        alignItems: "center",
        backgroundColor: "#1E2A38",
        padding: 2,
        borderRadius: 2,
        gap: 2,
        color: "#fff",
        width: "100%",
        boxShadow: 1,
      }}
    >
      <IconButton sx={{ color: "#fff" }}>
        <SearchIcon />
      </IconButton>

      {!isDetail && (
        <>
          <Button onClick={onSearchDialogOpen}>
            <Typography
              variant="body1"
              sx={{
                ml: "8px",
                mr: "16px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {displayLocation}
            </Typography>
          </Button>
          <Divider orientation="vertical" variant="middle" flexItem sx={{ color: "#fff" }} />
        </>
      )}

      <DatePicker
        value={valuesCheck}
        onChange={onDateChange}
        range
        format="DD-MM-YYYY"
        dateSeparator=" - "
        minDate={new Date()}
        numberOfMonths={isMobile ? 1 : 2}
        className="rmdp-mobile"
        style={{
          width: "100%",
          border: "1px solid #e9ecee",
          borderRadius: 5,
          padding: 10,
          cursor: "pointer",
          height: 50,
        }}
        containerStyle={{ width: "auto" }}
        render={isMobile ? null : <CustomDateButton values={values} />}
      />

      <Divider orientation="vertical" variant="middle" flexItem sx={{ color: "#fff" }} />

      <Button onClick={onGuestDialogOpen}>
        <Typography
          variant="body1"
          sx={{
            mr: "auto",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {guestText}
        </Typography>
      </Button>

      <Button
        variant="contained"
        onClick={onSubmit}
        sx={{
          backgroundColor: "#FFA500",
          ml: "auto",
          color: "#fff",
          textTransform: "none",
          "&:hover": { backgroundColor: "#FF8C00" },
        }}
      >
        Change
      </Button>
    </Box>
  );

  /**
   * Mobile search bar layout with a drawer.
   */
  const MobileSearch = (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 1,
          backgroundColor: "#fff",
          border: "1px solid #e9ecee",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 1, px: isDetail ? 2 : 0 }}>
          {/* hide when isDetail === true */}
          {!isDetail && (
            <IconButton sx={{ color: "#000" }} onClick={() => router.push("/hotels")}>
              <ArrowBackIosIcon sx={{ fontSize: "20px" }} />
            </IconButton>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontSize: "14px",
                width: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                maxWidth: "250px",
              }}
            >
              {displayLocation}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {`${fDateHotel(isDetail ? checkinDetail : filterData?.checkin, "dd MMM")} - ${fDateHotel(isDetail ? checkoutDetail : filterData?.checkout, "dd MMM")} • ${guestText}`}
            </Typography>
          </Box>
        </Box>
        <Button variant="text" onClick={toggleDrawer(true)}>
          Ubah
        </Button>
      </Box>

      <Drawer anchor="bottom" open={isDrawerOpen} onClose={toggleDrawer(false)} sx={{ "& .MuiDrawer-paper": { borderRadius: "20px 20px 0 0" } }} ModalProps={{ keepMounted: true }}>
        <Box
          sx={{
            width: "auto",
            p: 2,
            maxHeight: 1000,
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6">Ubah Pencarian</Typography>

          {!isDetail && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                cursor: "pointer",
                p: 2,
                border: "1px solid #e9ecee",
                borderRadius: "8px",
              }}
              onClick={onSearchDialogOpen}
            >
              <Iconify icon="mdi:magnify" sx={{ color: "#aeb2be", size: "24px" }} />
              <Typography variant="body2">{displayLocation}</Typography>
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              border: "1px solid #e9ecee",
              borderRadius: "8px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, cursor: "pointer" }} onClick={onDateDialogOpen}>
              <Iconify icon="material-symbols:date-range" sx={{ color: "#aeb2be", size: "24px" }} />
              <Typography variant="body2">{valuesCheck ? `${fDateHotel(valuesCheck[0], "dd MMM")} - ${fDateHotel(valuesCheck[1], "dd MMM")}` : "Check In - Check Out"}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, cursor: "pointer" }} onClick={onGuestDialogOpen}>
              <Iconify icon="material-symbols:bed" sx={{ color: "#aeb2be", size: "24px" }} />
              <Typography variant="body2">{mobileGuestText}</Typography>
            </Box>
          </Box>

          <Button variant="contained" fullWidth onClick={handleOnSubmit}>
            Ayo Cari
          </Button>
        </Box>
      </Drawer>
    </>
  );

  return (
    <>
      {isMobile ? MobileSearch : DesktopSearch}

      <GuestDialog
        open={openGuestDialog}
        onClose={onGuestDialogClose}
        rooms={rooms}
        setRooms={setRooms}
        adults={adults}
        setAdults={setAdults}
        children={children}
        setChildren={setChildren}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        filterData={filterData}
        setFilterData={setFilterData}
        isMobile={isMobile}
      />

      <SearchDialog
        open={openSearchDialog}
        onClose={onSearchDialogClose}
        location={location}
        onInputChange={onInputChange}
        filteredDestinations={filteredDestinations}
        popularDestinations={popularDestinations}
        onSelectDestination={onSelectDestination}
        isMobile={isMobile}
      />

      <DateDialog
        open={openDateDialog}
        onClose={onDateDialogClose}
        onDateChange={onDateChange}
        onInputChange={onInputChange}
        filteredDestinations={filteredDestinations}
        popularDestinations={popularDestinations}
        onSelectDestination={onSelectDestination}
        isMobile={isMobile}
        valuesCheck={valuesCheck}
      />
    </>
  );
}
