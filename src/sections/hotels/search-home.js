import React, { useState } from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Iconify from 'src/components/iconify/iconify';
import 'react-day-picker/dist/style.css';
import { fDate } from 'src/utils/format-time';
import DateRangeDialog from './date-range-dialog';
import { DateObject } from 'react-multi-date-picker';
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
  console.log(
    'Cek Data Tanggal:',
    values && values[0] && values[1]
      ? `${fDate(values[0], 'dd MMM yyyy')} - ${fDate(values[1])}`
      : 'Tanggal belum dipilih'
  );
  const [openCalendar, setOpenCalendar] = useState(false);

  // Function Date Range Validation (Today CI & CO)
  const getValidDateRange = () => {
    try {
      const today = moment().startOf('day');
      let checkIn = null;
      let checkOut = null;
      if (
        values &&
        values[0] &&
        values[0].toDate &&
        typeof values[0].toDate === 'function'
      ) {
        checkIn = moment(values[0].toDate());
      }
      if (
        values &&
        values[1] &&
        values[1].toDate &&
        typeof values[1].toDate === 'function'
      ) {
        checkOut = moment(values[1].toDate());
      }

      if (checkIn && checkIn.isBefore(today)) {
        checkIn = today;
      }
      if (checkOut && checkOut.isBefore(today)) {
        checkOut = today.clone().add(1, 'day');
      }

      return { checkIn, checkOut };
    } catch (error) {
      console.error('Error dalam getValidDateRange:', error);
      return { checkIn: null, checkOut: null };
    }
  };

  const { checkIn, checkOut } = getValidDateRange();

  return (
    <>
      <Box
        sx={{
          width: { xs: '100%', sm: '65%', md: '50%' },
          margin: { xs: '0 auto 2rem', md: '0' },
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          p: { xs: 2, md: 3 },
        }}>
        <Stack spacing={2}>
          {/* Location Filter */}
          <Button
            onClick={onSearchDialogOpen}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 1,
              border: '1px solid #e9ecee',
              borderRadius: 1,
              p: 1.5,
            }}>
            <div className='flex items-center gap-2'>
              <Iconify icon='ic:round-search' />
              <Typography
                color={
                  location ? '#000' : filterData?.location ? '#000' : '#c0c4d6'
                }
                sx={{
                  textAlign: 'left',
                  fontSize: { xs: '14px', md: '16px' },
                }}>
                {location || filterData?.location || 'Mau nginep di mana?'}
              </Typography>
            </div>
            <Iconify icon='mage:location-fill' sx={{ color: '#000' }} />
          </Button>

          {/* Date Filter */}
          <Stack
            className='w-full'
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}>
            <Box sx={{ width: '100%', position: 'relative' }}>
              <Button
                onClick={() => setOpenCalendar(true)}
                sx={{
                  display: 'flex',
                  justifyContent: 'left',
                  gap: 1,
                  border: '1px solid #e9ecee',
                  borderRadius: 1,
                  p: 1.5,
                  width: '100%',
                }}>
                <Iconify icon='mdi:calendar-range' />
                <Typography
                  color={checkIn ? '#000' : '#c0c4d6'}
                  sx={{ fontSize: { xs: '14px', md: '16px' } }}>
                  {checkIn && checkOut && checkIn.toDate && checkOut.toDate
                    ? `${fDate(checkIn.toDate(), 'dd MMM yyyy')} - ${fDate(
                        checkOut.toDate(),
                        'dd MMM yyyy'
                      )}`
                    : 'Check In - Check Out'}
                </Typography>
              </Button>
              <DateRangeDialog
                open={openCalendar}
                onClose={() => setOpenCalendar(false)}
                selectedRange={{
                  from:
                    values && values[0] && values[0].isValid
                      ? values[0].toDate()
                      : undefined,
                  to:
                    values && values[1] && values[1].isValid
                      ? values[1].toDate()
                      : undefined,
                }}
                onConfirm={(range) => {
                  try {
                    if (!range) {
                      console.warn(
                        'Range tidak valid, menggunakan nilai default'
                      );
                      const arr = [undefined, undefined];
                      onDateChange(arr);
                      return;
                    }
                    const validRange = {
                      from: range.from || undefined,
                      to: range.to || undefined,
                    };
                    const arr = [
                      validRange.from
                        ? new DateObject(validRange.from)
                        : undefined,
                      validRange.to ? new DateObject(validRange.to) : undefined,
                    ];
                    onDateChange(arr);
                  } catch (error) {
                    console.error('Error saat memproses range tanggal:', error);
                    const arr = [undefined, undefined];
                    onDateChange(arr);
                  }
                }}
              />
            </Box>
          </Stack>

          {/* Guest Filter */}
          <Button
            onClick={onGuestDialogOpen}
            sx={{
              display: 'flex',
              justifyContent: 'left',
              border: '1px solid #e9ecee',
              borderRadius: 1,
              p: 1.5,
            }}>
            <Iconify icon='fluent:people-28-filled' />
            <Typography
              sx={{
                marginLeft: '6px',
                color: '#000',
                fontSize: { xs: '14px', md: '16px' },
              }}>
              {rooms} Kamar, {adults} Dewasa, {children} Anak
            </Typography>
          </Button>

          {/* Search Button */}
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={onSubmit}
            sx={{
              height: 50,
              backgroundColor: '#F99932',
              '&:hover': {
                backgroundColor: '#F99932',
              },
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
