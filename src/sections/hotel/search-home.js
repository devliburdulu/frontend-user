// import React from "react";
// import { Box, Typography, Button, Stack } from "@mui/material";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import DatePicker from "react-multi-date-picker";
// import "react-multi-date-picker/styles/layouts/mobile.css";
// import { fDate } from "src/utils/format-time";
// import Iconify from "src/components/iconify/iconify";
// import GuestDialog from "./dialog-guest";
// import SearchDialog from "./dialog.search";
// import { popularDestinations } from "src/_mock/_hotel-data";

// const CustomDateButton = ({ openCalendar, values }) => (
//   <Button
//     onClick={openCalendar}
//     sx={{
//       display: "flex",
//       justifyContent: "left",
//       gap: 1,
//       border: "1px solid #e9ecee",
//       borderRadius: 1,
//       p: 1.5,
//       width: "100%",
//     }}
//   >
//     <Iconify icon="ic:round-date-range" />
//     <Typography color={values && values[0] ? "#000" : "#c0c4d6"} sx={{ textAlign: "left" }}>
//       {values && values[0] ? `${fDate(values[0], "dd MMM yyyy")} - ${fDate(values[1], "dd MMM yyyy")}` : "Check In - Check Out"}
//     </Typography>
//   </Button>
// );

// const SearchButton = ({ location, filterData, onClick }) => (
//   <Button
//     onClick={onClick}
//     sx={{
//       display: "flex",
//       justifyContent: "left",
//       gap: 1,
//       border: "1px solid #e9ecee",
//       borderRadius: 1,
//       p: 1.5,
//     }}
//   >
//     <Iconify icon="ic:round-search" />
//     <Typography color={location ? "#000" : filterData?.location ? "#000" : "#c0c4d6"} sx={{ textAlign: "left" }}>
//       {location || filterData?.location || "Mau nginep di mana?"}
//     </Typography>
//   </Button>
// );

// const GuestButton = ({ rooms, adults, children, onClick }) => (
//   <Button
//     onClick={onClick}
//     sx={{
//       display: "flex",
//       justifyContent: "space-between",
//       border: "1px solid #e9ecee",
//       borderRadius: 1,
//       p: 1.5,
//     }}
//   >
//     <Typography>
//       {rooms} Kamar, {adults} Dewasa, {children} Anak
//     </Typography>
//     <Iconify icon="ic:baseline-person" />
//   </Button>
// );

// export default function SearchHome({ searchState, updateSearchState, filteredDestinations, onSubmit, filterData }) {
//   const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
//   const { location, dates, rooms, adults, children, dialogs } = searchState;

//   const handleDialogToggle = (dialogName, isOpen) => {
//     updateSearchState("dialogs", { ...dialogs, [dialogName]: isOpen });
//   };

//   const handleIncrement = (type) => () => {
//     updateSearchState(type, searchState[type] + 1);
//   };

//   const handleDecrement = (type) => () => {
//     updateSearchState(type, Math.max(0, searchState[type] - 1));
//   };

//   const handleLocationSelect = (destinationName, destinationKey) => {
//     updateSearchState("location", destinationName);
//     updateSearchState("locationKey", destinationKey);
//     handleDialogToggle("search", false);
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           width: { xs: "100%", sm: "100%", md: "50%" },
//           backgroundColor: "white",
//           borderRadius: 2,
//           boxShadow: 3,
//           p: 3,
//         }}
//       >
//         <Stack spacing={2}>
//           <SearchButton location={location} filterData={filterData} onClick={() => handleDialogToggle("search", true)} />

//           <Stack direction={{ xs: "column", sm: "row" }} spacing={1} className="w-full">
//             <DatePicker
//               value={dates}
//               onChange={(newDates) => updateSearchState("dates", newDates)}
//               range
//               format="DD-MM-YYYY"
//               dateSeparator=" - "
//               minDate={new Date()}
//               numberOfMonths={isSmallScreen ? 1 : 2}
//               className="rmdp-mobile"
//               style={{
//                 width: "100%",
//                 border: "1px solid #e9ecee",
//                 borderRadius: 5,
//                 padding: 10,
//                 cursor: "pointer",
//                 height: 50,
//               }}
//               containerStyle={{ width: "100%" }}
//               render={<CustomDateButton values={dates} />}
//             />
//           </Stack>

//           <GuestButton rooms={rooms} adults={adults} children={children} onClick={() => handleDialogToggle("guest", true)} />

//           <Button variant="contained" color="primary" fullWidth onClick={onSubmit} sx={{ height: 50 }}>
//             Ayo Cari
//           </Button>
//         </Stack>
//       </Box>

//       <GuestDialog
//         open={dialogs.guest}
//         onClose={() => handleDialogToggle("guest", false)}
//         rooms={rooms}
//         setRooms={(value) => updateSearchState("rooms", value)}
//         adults={adults}
//         setAdults={(value) => updateSearchState("adults", value)}
//         children={children}
//         setChildren={(value) => updateSearchState("children", value)}
//         onIncrement={handleIncrement}
//         onDecrement={handleDecrement}
//       />

//       <SearchDialog
//         open={dialogs.search}
//         onClose={() => handleDialogToggle("search", false)}
//         location={location}
//         onInputChange={(e) => updateSearchState("location", e.target.value)}
//         filteredDestinations={filteredDestinations}
//         popularDestinations={popularDestinations}
//         onSelectDestination={handleLocationSelect}
//       />
//     </>
//   );
// }

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import Iconify from 'src/components/iconify/iconify';
import DatePicker from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import moment from 'moment';
import { fDate } from 'src/utils/format-time';
import { popularDestinations } from 'src/_mock/_hotel-data';
import GuestDialog from './dialog-guest';
import SearchDialog from './dialog-search';

export default function SearchHome({
  location,
  values,
  filteredDestinations,
  openGuestDialog,
  openSearchDialog,
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
  onInputChange,
  onSelectDestination,
  onIncrement,
  onDecrement,
  onDateChange,
  onSubmit,
  filterData,
}) {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  console.log('Cek Tgl In Out:', onDateChange);
  console.log('Cek Value:', values);

  class CustomDateButton extends React.Component {
    render() {
      const { openCalendar } = this.props;

      return (
        <Button
          onClick={openCalendar}
          sx={{
            display: 'flex',
            justifyContent: 'left',
            gap: 1,
            border: '1px solid #e9ecee',
            borderRadius: 1,
            p: 1.5,
            width: '100%',
          }}>
          <Iconify icon='ic:round-date-range' />
          <Typography
            color={values && values[0] ? '#000' : '#c0c4d6'}
            sx={{
              textAlign: 'left',
            }}>
            {values && values[0]
              ? `${fDate(values[0], 'dd MMM yyyy')} - ${fDate(
                  values[1],
                  'dd MMM yyyy'
                )}`
              : 'Check In - Check Out'}
          </Typography>
        </Button>
      );
    }
  }

  return (
    <>
      <Box
        sx={{
          width: { xs: '100%', sm: '100%', md: '50%' },
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          p: 3,
        }}>
        <Stack spacing={2}>
          {/* Location Filter */}
          <Button
            onClick={onSearchDialogOpen}
            sx={{
              display: 'flex',
              justifyContent: 'left',
              gap: 1,
              border: '1px solid #e9ecee',
              borderRadius: 1,
              p: 1.5,
            }}>
            <Iconify icon='ic:round-search' />
            <Typography
              color={
                location ? '#000' : filterData?.location ? '#000' : '#c0c4d6'
              }
              sx={{
                textAlign: 'left',
              }}>
              {location || filterData?.location || 'Mau nginep di mana?'}
            </Typography>
          </Button>

          {/* Date Filter */}
          <Stack
            className='w-full'
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}>
            <DatePicker
              value={values}
              onChange={onDateChange}
              range
              format='DD-MM-YYYY'
              dateSeparator=' - '
              minDate={new Date()}
              numberOfMonths={isSmallScreen ? 1 : 2}
              className='rmdp-mobile'
              placeholder={`${fDate(
                moment().add(1, 'days').toDate(),
                'dd MMM yyyy'
              )} - ${fDate(moment().add(2, 'days').toDate(), 'dd MMM yyyy')}`}
              style={{
                width: '100%',
                border: '1px solid #e9ecee',
                borderRadius: 5,
                padding: 10,
                cursor: 'pointer',
                height: 50,
              }}
              containerStyle={{
                width: '100%',
              }}
              render={<CustomDateButton />}
            />
          </Stack>

          {/* Guest Filter */}
          <Button
            onClick={onGuestDialogOpen}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              border: '1px solid #e9ecee',
              borderRadius: 1,
              p: 1.5,
            }}>
            <Typography>
              {rooms} Kamar, {adults} Dewasa, {children} Anak
            </Typography>
            <Iconify icon='ic:baseline-person' />
          </Button>

          {/* Search Button */}
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={onSubmit}
            sx={{
              height: 50,
            }}>
            Ayo Cari
          </Button>
        </Stack>
      </Box>

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
      />

      <SearchDialog
        open={openSearchDialog}
        onClose={onSearchDialogClose}
        location={location}
        onInputChange={onInputChange}
        filteredDestinations={filteredDestinations}
        popularDestinations={popularDestinations}
        onSelectDestination={onSelectDestination}
      />
    </>
  );
}
