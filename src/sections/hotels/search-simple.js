import React, { useState, useEffect } from 'react';
import {
  Box,
  Divider,
  IconButton,
  Typography,
  Drawer,
  Button,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import 'react-day-picker/dist/style.css';
import { DateObject } from 'react-multi-date-picker';
import { fDate } from 'src/utils/format-time';
import { popularDestinations } from 'src/_mock/_hotel-data';
import { useResponsive } from 'src/hooks/use-responsive';
import GuestDialog from './dialog-guest';
import SearchDialog from './dialog-search';
import DateRangeDialog from './date-range-dialog';
import Iconify from 'src/components/iconify';
import { useSearchParams } from 'src/routes/hooks';
import './styles/calendar.css';
import MobileFilterDrawer from './search/components/mobile-filter-drawer';

export default function SearchSimple({
  router,
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
  setFilterData,
  isDetail,
  checkinDetail,
  checkoutDetail,
  // Filter drawer props
  isLoadingHotels,
  isDrawerOpen,
  onDrawerToggle,
  minPrice,
  maxPrice,
  selectedRatings,
  sortOption,
  availableStars,
  onMinPriceChange,
  onMaxPriceChange,
  onRatingChange,
  onSortChange,
}) {
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentSelectedDates, setCurrentSelectedDates] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useResponsive('down', 'md');
  const searchParams = useSearchParams();

  const convertStringToDateObject = (dateString) => {
    if (!dateString) return undefined;
    if (dateString && typeof dateString === 'object' && dateString.toDate) {
      return dateString;
    }
    if (typeof dateString === 'string') {
      try {
        return new DateObject({
          date: dateString,
          format: 'DD-MM-YYYY',
        });
      } catch (error) {
        return undefined;
      }
    }

    return undefined;
  };

  const safeDateFormat = (dateValue, format = 'dd MMM yyyy') => {
    if (!dateValue) return '';
    if (dateValue && typeof dateValue === 'object' && dateValue.toDate) {
      try {
        const jsDate = dateValue.toDate();
        return fDate(jsDate, format);
      } catch (error) {
        return '';
      }
    }
    if (typeof dateValue === 'string') {
      try {
        const parts = dateValue.split('-');
        if (parts.length === 3) {
          const jsDate = new Date(parts[2], parts[1] - 1, parts[0]);
          return fDate(jsDate, format);
        }
      } catch (error) {
        return '';
      }
    }

    return '';
  };

  const getDisplayValues = () => {
    if (
      currentSelectedDates &&
      (currentSelectedDates[0] || currentSelectedDates[1])
    ) {
      return currentSelectedDates;
    }

    if (values && values[0]) {
      return values;
    }
    return [
      isDetail ? checkinDetail : filterData?.checkin,
      isDetail ? checkoutDetail : filterData?.checkout,
    ];
  };

  const displayValues = getDisplayValues();
  const processedValuesCheck = [
    convertStringToDateObject(displayValues[0]),
    convertStringToDateObject(displayValues[1]),
  ];

  useEffect(() => {
    if (values && values[0] && !currentSelectedDates) {
      setCurrentSelectedDates(values);
    }
  }, [values]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * A custom date button to be used with the DayPicker.
   * It uses the passed date values or falls back to the filterData dates.
   */
  const CustomDateButton = ({ values }) => {
    const currentValues = displayValues;
    const startDate = currentValues[0];
    const endDate = currentValues[1];

    const dateText = `${safeDateFormat(
      startDate,
      'dd MMM yyyy'
    )} - ${safeDateFormat(endDate, 'dd MMM yyyy')}`;

    return (
      <Button
        onClick={() => {
          setIsCalendarOpen(!isCalendarOpen);
        }}
        sx={{
          width: '100%',
          justifyContent: 'flex-start',
          p: 1,
          textTransform: 'none',
        }}>
        <Iconify
          icon='mdi:calendar-range'
          sx={{ color: '#e9ecee', size: '24px' }}
        />
        <Typography
          color='#fff'
          sx={{
            textAlign: 'left',
            ml: 1,
            fontSize: '14px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
          {dateText}
        </Typography>
      </Button>
    );
  };

  const displayLocation = location || filterData?.location;
  const displayRooms =
    isDetail === true
      ? searchParams.get('rooms')
      : rooms || filterData?.rooms || searchParams.get('rooms');
  const displayAdults =
    isDetail === true
      ? searchParams.get('adults')
      : adults || filterData?.adults || searchParams.get('adults');
  const displayChildren =
    isDetail === true
      ? searchParams.get('children')
      : children || filterData?.children || searchParams.get('children');
  const guestText = `${displayRooms} Kamar, ${displayAdults} Dewasa, ${displayChildren} Anak`;
  const mobileGuestText = `${displayRooms} Kamar • ${
    +displayAdults + +displayChildren
  } Tamu`;

  const toggleDrawer = (open) => () => {
    setIsSearchDrawerOpen(open);
  };

  const handleOnSubmit = () => {
    if (onSubmit) onSubmit();
    setIsSearchDrawerOpen(false);
  };

  /**
   * Desktop search bar layout.
   */
  const DesktopSearch = (
    <Box
      sx={{
        display: isMobile ? 'none' : 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#1E2A38',
        padding: 2,
        borderRadius: isScrolled ? '0 0 16px 16px' : 2,
        gap: 1.5,
        color: '#fff',
        width: '100%',
        boxShadow: 1,
        position: 'sticky',
        top: 0,
        zIndex: 30,
      }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          gap: 1.5,
          width: '83%',
        }}>
        {!isDetail && (
          <>
            <Box
              sx={{
                width: '30%',
                p: 1,
                border: '1px solid #e9ecee',
                borderRadius: 1,
              }}>
              <Button
                onClick={onSearchDialogOpen}
                sx={{
                  padding: 0,
                  width: '100%',
                  justifyContent: 'flex-start',
                }}>
                <Iconify
                  icon='carbon:location'
                  sx={{ color: '#fff', size: '22px' }}
                />
                <Typography
                  variant='body1'
                  sx={{
                    fontSize: '14px',
                    ml: '8px',
                    mr: '16px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                  {displayLocation}
                </Typography>
              </Button>
            </Box>
            <Divider
              orientation='vertical'
              variant='middle'
              flexItem
              sx={{ borderColor: '#FFF' }}
            />
          </>
        )}
        <Box
          sx={{
            width: '30%',
            border: '1px solid #e9ecee',
            borderRadius: 1,
          }}>
          <CustomDateButton values={displayValues} />
        </Box>
        <Divider
          orientation='vertical'
          variant='middle'
          flexItem
          sx={{ borderColor: '#FFF' }}
        />
        <Box
          sx={{
            width: '30%',
            border: '1px solid #e9ecee',
            borderRadius: 1,
          }}>
          <Button
            onClick={onGuestDialogOpen}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '100%',
              p: 1,
            }}>
            <Iconify
              icon='material-symbols:bed'
              sx={{ color: '#FFF', size: '24px', mr: 1 }}
            />
            <Typography
              variant='body1'
              sx={{
                fontSize: '14px',
                mr: 'auto',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
              {guestText}
            </Typography>
          </Button>
        </Box>
        <Divider
          orientation='vertical'
          variant='middle'
          flexItem
          sx={{ borderColor: '#FFF' }}
        />
      </Box>

      <Button
        variant='contained'
        onClick={onSubmit}
        startIcon={
          <Iconify icon='mdi:magnify' sx={{ color: '#fff', size: '24px' }} />
        }
        sx={{
          backgroundColor: '#FF8C00',
          p: 1,
          width: '17%',
          fontSize: '14px',
          fontWeight: 600,
          color: '#fff',
          textTransform: 'none',
          '&:hover': { backgroundColor: '#FFA500' },
        }}>
        <span
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
          Ubah Pencarian
        </span>
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
          display: 'flex',
          flexDirection: 'column',
          p: 1,
          color: isScrolled ? '#FFF' : '#000',
          backgroundColor: isScrolled ? '#1E2A38' : '#fff',
          border: '1px solid #e9ecee',
          borderRadius: isScrolled ? '0 0 16px 16px' : 0,
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}>
        {/* Top row with guest info and ubah button */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 1,
              px: isDetail ? 2 : 0,
            }}>
            {/* hide when isDetail === true */}
            {!isDetail && (
              <IconButton
                sx={{ color: isScrolled ? '#FFF' : '#000', p: 0, left: '4px' }}
                onClick={() => router.push('/hotels')}>
                <ArrowBackIosIcon sx={{ fontSize: '20px' }} />
              </IconButton>
            )}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}>
              <Typography
                variant='subtitle2'
                sx={{
                  fontSize: '14px',
                  width: '100%',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  maxWidth: '250px',
                }}>
                {displayLocation}
              </Typography>
              <Typography
                variant='caption'
                color={isScrolled ? '#FFF' : '#000'}>
                {`${safeDateFormat(
                  displayValues[0],
                  'dd MMM'
                )} - ${safeDateFormat(
                  displayValues[1],
                  'dd MMM'
                )} • ${guestText}`}
              </Typography>
              {/* <Typography variant='caption' color='#FFF'>
                {`${guestText}`}
              </Typography> */}
            </Box>
          </Box>
          <Button variant='text' onClick={toggleDrawer(true)}>
            Ubah
          </Button>
        </Box>

        {!isLoadingHotels && !isDetail && (
          <Box sx={{ width: '100%', padding: '0 12px' }}>
            {/* Mobile Filter Drawer */}
            <MobileFilterDrawer
              isScrolled={isScrolled}
              isDrawerOpen={isDrawerOpen}
              onDrawerToggle={onDrawerToggle}
              minPrice={minPrice}
              maxPrice={maxPrice}
              selectedRatings={selectedRatings}
              sortOption={sortOption}
              onMinPriceChange={onMinPriceChange}
              onMaxPriceChange={onMaxPriceChange}
              onRatingChange={onRatingChange}
              onSortChange={onSortChange}
              availableStars={availableStars}
            />
          </Box>
        )}
      </Box>
      <Drawer
        anchor='bottom'
        open={isSearchDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ '& .MuiDrawer-paper': { borderRadius: '20px 20px 0 0' } }}
        ModalProps={{ keepMounted: true }}>
        <Box
          sx={{
            width: 'auto',
            p: 2.5,
            maxHeight: 1000,
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}>
          <Typography variant='h5'>Ubah Pencarian</Typography>

          {!isDetail && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                cursor: 'pointer',
                p: 2,
                border: '1px solid #e9ecee',
                borderRadius: '8px',
              }}
              onClick={onSearchDialogOpen}>
              <Iconify
                icon='mdi:magnify'
                sx={{ color: '#212b36', size: '24px' }}
              />
              <Typography variant='body2' sx={{ fontWeight: 500 }}>
                {displayLocation}
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              cursor: 'pointer',
              p: 2,
              border: '1px solid #e9ecee',
              borderRadius: '8px',
            }}
            onClick={() => setIsCalendarOpen(true)}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                cursor: 'pointer',
              }}>
              <Iconify
                icon='material-symbols:date-range'
                sx={{ color: '#212b36', size: '24px' }}
              />
              <Typography variant='body2' sx={{ fontWeight: 500 }}>
                {displayValues[0] && displayValues[1]
                  ? `${safeDateFormat(
                      displayValues[0],
                      'dd MMM'
                    )} - ${safeDateFormat(displayValues[1], 'dd MMM')}`
                  : 'Check In - Check Out'}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              border: '1px solid #e9ecee',
              borderRadius: '8px',
            }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                cursor: 'pointer',
              }}
              onClick={onGuestDialogOpen}>
              <Iconify
                icon='material-symbols:bed'
                sx={{ color: '#212b36', size: '24px' }}
              />
              <Typography variant='body2' sx={{ fontWeight: 500 }}>
                {mobileGuestText}
              </Typography>
            </Box>
          </Box>

          <Button variant='contained' fullWidth onClick={handleOnSubmit}>
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

      <DateRangeDialog
        open={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        selectedRange={{
          from:
            processedValuesCheck[0] && processedValuesCheck[0].toDate
              ? processedValuesCheck[0].toDate()
              : undefined,
          to:
            processedValuesCheck[1] && processedValuesCheck[1].toDate
              ? processedValuesCheck[1].toDate()
              : undefined,
        }}
        onConfirm={(range) => {
          try {
            if (!range) {
              return;
            }
            const validRange = {
              from: range.from || undefined,
              to: range.to || undefined,
            };

            const arr = [
              validRange.from ? new DateObject(validRange.from) : undefined,
              validRange.to ? new DateObject(validRange.to) : undefined,
            ];
            setCurrentSelectedDates(arr);
            onDateChange(arr);
            setIsCalendarOpen(false);
          } catch (error) {
            console.error('Error in date range dialog:', error);
          }
        }}
      />
    </>
  );
}
