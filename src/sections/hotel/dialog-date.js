import React from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from '@mui/material';
import { Calendar } from 'react-multi-date-picker';
import { styled } from '@mui/material/styles';
import { fDateHotel } from 'src/utils/format-time';
import { useSnackbar } from 'src/components/snackbar';

export default function DateDialog({
  open,
  onClose,
  valuesCheck,
  onDateChange,
  filteredDestinations,
  popularDestinations,
  onSelectDestination,
  isMobile,
}) {
  const { enqueueSnackbar } = useSnackbar();

  const StyledCalendar = styled(Calendar)(({ theme }) => ({
    width: '100%',
    borderRadius: 10,
    '& .rmdp-top-class': {
      display: 'block !important',
    },
    '& .rmdp-day-picker': {
      display: 'block !important',
    },

    '& .rmdp-calendar': {
      borderRadius: 15,
      padding: 0,
    },
  }));

  const handleDateChange = (newValues) => {
    if (newValues.length === 2) {
      const startDate = newValues[0]?.toDate();
      const endDate = newValues[1]?.toDate();

      if (startDate && endDate) {
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
        const durationInDays = Math.floor(
          (endDate - startDate) / oneDayInMilliseconds
        );

        if (durationInDays === 0) {
          enqueueSnackbar('Durasi menginap minimal 1 malam', {
            variant: 'error',
          });
          return;
        }

        if (durationInDays > 30) {
          enqueueSnackbar('Durasi menginap maksimal 30 malam', {
            variant: 'error',
          });
          return;
        }
      }
    }

    onDateChange(newValues);
  };

  return (
    <Dialog
      open={open}
      onClose={(holdClose) => {
        if (holdClose === 'backdropClick') return;
        onClose();
      }}
      // fullScreen={isMobile}
      maxWidth={isMobile ? 'xl' : 'md'}
      fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold' }}>Pilih tanggal</DialogTitle>
      <DialogContent>
        {/* <Calendar /> */}
        <StyledCalendar
          value={valuesCheck}
          calendar={'gregorian'}
          // value={values}
          //   onChange={(newValues) => {
          //     const convertedValues = newValues.map((date) => (date ? moment(date.toDate()) : null));
          //     onDateChange(convertedValues);
          //   }}
          onChange={handleDateChange}
          range
          format='DD-MM-YYYY'
          dateSeparator=' - '
          minDate={new Date()}
          numberOfMonths={isMobile ? 1 : 2}
          className='rmdp-mobile w-full'
          // placeholder={`${fDate(moment().add(1, "days").toDate(), "dd MMM yyyy")} - ${fDate(moment().add(2, "days").toDate(), "dd MMM yyyy")}`}
          style={{
            width: '100%',
            // border: "1px solid #e9ecee",
            borderRadius: 15,
            padding: 0,
            // padding: 10,
            // cursor: "pointer",
            // height: 50,
          }}
          containerStyle={{
            width: '100%',
            borderRadius: '20px',
          }}
          //   render={isMobile ? null : <CustomDateButton values={values} />}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 3,
          }}>
          <Box>
            <Typography
              variant='caption'
              sx={{
                fontSize: '10px',
              }}>
              Check-in
            </Typography>
            <Typography variant='subtitle2'>
              {fDateHotel(valuesCheck[0], 'dd MMM yyyy')}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant='caption'
              sx={{
                fontSize: '10px',
              }}>
              Check-out
            </Typography>
            <Typography variant='subtitle2'>
              {' '}
              {!valuesCheck[1]
                ? 'Pilih tanggal'
                : fDateHotel(valuesCheck[1], 'dd MMM yyyy')}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant='outlined'
          disabled={!valuesCheck[1]}
          sx={{
            backgroundColor: !valuesCheck[1] ? '#e9ecee' : '#F99932',
            color: !valuesCheck[1] ? 'gray' : 'white',
            '&:hover': {
              backgroundColor: !valuesCheck[1] ? '#e9ecee' : '#f57c00',
            },
          }}>
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
}
