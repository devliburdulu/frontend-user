import React, { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, differenceInDays } from 'date-fns';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Drawer,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import './styles/calendar.css';

export default function DateRangeDialog({
  open,
  onClose,
  onConfirm,
  selectedRange,
}) {
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [clickCount, setClickCount] = useState(0);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  // Sinkronkan selectedRange ke state range saat dialog dibuka/selectedRange berubah
  useEffect(() => {
    if ((selectedRange?.from || selectedRange?.to) && open) {
      setRange(selectedRange);
    }
    if (!selectedRange?.from && !selectedRange?.to && open) {
      setRange({ from: undefined, to: undefined });
    }
    // Reset click count saat dialog dibuka
    if (open) {
      setClickCount(0);
    }
  }, [selectedRange, open]);

  const getNightCount = () => {
    if (range && range.from && range.to) {
      return differenceInDays(range.to, range.from);
    }
    return 0;
  };

  // Handler untuk menangani pemilihan tanggal dengan batasan klik yang fleksibel
  const handleDateSelect = (selectedRange) => {
    try {
      if (!selectedRange) {
        console.warn('Range tidak valid, menggunakan range default');
        setRange({ from: undefined, to: undefined });
        return;
      }

      if (selectedRange.from && selectedRange.to) {
        setClickCount(0);
      } else if (!selectedRange.from && !selectedRange.to) {
        setClickCount(0);
      } else {
        setClickCount((prev) => prev + 1);
        if (clickCount >= 3 && (!selectedRange.from || !selectedRange.to)) {
          console.error(
            'Maksimal 3 kali klik untuk memilih tanggal, silakan pilih ulang'
          );
          return;
        }
      }

      setRange(selectedRange);
    } catch (error) {
      console.error('Error saat memilih tanggal:', error);
      setRange({ from: undefined, to: undefined });
    }
  };

  // Handler untuk konfirmasi dengan validasi
  const handleConfirm = () => {
    try {
      if (!range || (!range.from && !range.to)) {
        console.warn('Range tidak valid untuk konfirmasi');
        return;
      }
      const validRange = {
        from: range.from || undefined,
        to: range.to || undefined,
      };

      onConfirm(validRange);
      onClose();
      setClickCount(0);
    } catch (error) {
      console.error('Error saat konfirmasi tanggal:', error);
    }
  };

  return (
    <>
      {!isSmallScreen && (
        <Dialog open={open} onClose={onClose} maxWidth={false}>
          <DialogTitle sx={{ textAlign: 'center' }}>Pilih Tanggal</DialogTitle>
          <DialogContent className='calendar-container'>
            <DayPicker
              mode='range'
              selected={range}
              onSelect={handleDateSelect}
              numberOfMonths={2}
              fromDate={new Date()}
              modifiers={{
                disabled: { before: new Date() },
                sunday: (date) => date.getDay() === 0 && date >= new Date(),
              }}
              modifiersStyles={{
                disabled: {
                  opacity: 0.5,
                  pointerEvents: 'none',
                  cursor: 'no-drop',
                },
                sunday: { color: '#f15c59' },
              }}
              showOutsideDays={false}
              weekStartsOn={1}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              onClick={onClose}
              color='inherit'
              fullWidth
              sx={{
                color: '#212B36',
                backgroundColor: 'transparent',
                border: '1px solid #212B36',
                '&:hover': {
                  backgroundColor: '#212B36',
                  color: '#FFF',
                },
              }}>
              Batal
            </Button>
            <Button
              onClick={handleConfirm}
              variant='contained'
              color='primary'
              fullWidth
              disabled={!range || !range.from || !range.to}
              sx={{
                backgroundColor: '#1D9CAB',
                '&:hover': {
                  backgroundColor: '#1D9CAB',
                },
              }}>
              Simpan ({getNightCount()} malam)
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {isSmallScreen && (
        <Drawer
          anchor='bottom'
          open={open}
          onClose={onClose}
          PaperProps={{
            sx: {
              maxWidth: 'inherit',
              width: '100vw',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              height: '92vh',
              '@media (max-width: 450px)': {
                height: '94vh',
              },
              '@media (max-width: 420px)': {
                height: '86vh',
              },
              '@media (max-width: 400px)': {
                height: '85vh',
              },
              '@media (max-width: 376px)': {
                height: '88vh',
              },
              '@media (max-width: 360px)': {
                height: '90vh',
              },
              '@media (max-width: 320px)': {
                height: '82vh',
              },
            },
          }}>
          <Box
            sx={{
              padding: 0,
              background: '#fff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              maxHeight: '100vh',
              overflowY: 'auto',
              width: '100vw',
              textAlign: 'center',
              height: '100vh',
            }}>
            <Typography variant='h6' align='center' sx={{ mb: 2, pt: 4 }}>
              Pilih Tanggal
            </Typography>
            <Box
              sx={{
                overflowY: 'auto',
                width: '100vw',
                maxHeight: '74vh',
                '@media (max-width: 450px)': {
                  maxHeight: '75vh',
                },
                '@media (max-width: 420px)': {
                  maxHeight: '69vh',
                },
                '@media (max-width: 400px)': {
                  maxHeight: '66vh',
                },
                '@media (max-width: 376px)': {
                  maxHeight: '67vh',
                },
                '@media (max-width: 360px)': {
                  maxHeight: '71.5vh',
                },
                '@media (max-width: 320px)': {
                  maxHeight: '55vh',
                },
              }}>
              <DayPicker
                className='calendar-mobile'
                mode='range'
                selected={range}
                onSelect={handleDateSelect}
                numberOfMonths={12}
                pagedNavigation={false}
                fromDate={new Date()}
                modifiers={{
                  disabled: { before: new Date() },
                  sunday: (date) => date.getDay() === 0 && date >= new Date(),
                }}
                modifiersStyles={{
                  disabled: {
                    opacity: 0.5,
                    pointerEvents: 'none',
                    cursor: 'no-drop',
                  },
                  sunday: { color: '#f15c59' },
                }}
                showOutsideDays={false}
                weekStartsOn={1}
                components={{
                  Navigation: () => null,
                }}
              />
            </Box>
            <Button
              onClick={handleConfirm}
              variant='contained'
              color='primary'
              disabled={!range || !range.from || !range.to}
              sx={{
                width: '85%',
                backgroundColor: '#1D9CAB',
                mt: 2,
                '&:hover': {
                  backgroundColor: '#1D9CAB',
                },
              }}>
              Simpan ({getNightCount()} malam)
            </Button>
          </Box>
        </Drawer>
      )}
    </>
  );
}
