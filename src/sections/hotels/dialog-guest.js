import PropTypes from 'prop-types';
import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';

export default function GuestDialog({
  open,
  onClose,
  rooms,
  setRooms,
  adults,
  setAdults,
  children,
  setChildren,
  onIncrement,
  onDecrement,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const content = (
    <>
      <DialogTitle
        sx={{
          padding: { xs: '24px 0', sm: '24px' },
          fontSize: { xs: '18px', sm: '20px' },
        }}>
        Kamar & Tamu
      </DialogTitle>
      <DialogContent
        sx={{
          padding: { xs: '0', sm: '0 24px' },
          overflowY: { xs: 'inherit', sm: 'auto' },
        }}>
        <Stack spacing={3} sx={{ minWidth: 300 }}>
          {[
            {
              label: 'Kamar',
              value: rooms,
              setter: setRooms,
              key: 'rooms',
            },
            {
              label: 'Dewasa',
              value: adults,
              setter: setAdults,
              key: 'adults',
            },
            {
              label: 'Anak (Dibawah 17 tahun)',
              value: children,
              setter: setChildren,
              key: 'children',
            },
          ].map((item) => (
            <Stack
              key={item.label}
              direction='row'
              alignItems='center'
              justifyContent='space-between'>
              <Typography sx={{ fontSize: { xs: '14px', sm: '16px' } }}>
                {item.label}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  onClick={onDecrement(item.setter, item.key)}
                  disabled={
                    (item.key === 'rooms' && item.value <= 1) ||
                    (item.key === 'adults' && item.value <= 1) ||
                    (item.key === 'children' && item.value <= 0)
                  }
                  sx={{
                    borderRadius: '50%',
                    border: '1px solid',
                    borderColor:
                      (item.key === 'rooms' && item.value <= 1) ||
                      (item.key === 'adults' && item.value <= 1) ||
                      (item.key === 'children' && item.value <= 0)
                        ? '#ccc'
                        : '#1D9CAB',
                    width: { xs: 28, sm: 36 },
                    height: { xs: 28, sm: 36 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity:
                      (item.key === 'rooms' && item.value <= 1) ||
                      (item.key === 'adults' && item.value <= 1) ||
                      (item.key === 'children' && item.value <= 0)
                        ? 0.8
                        : 1,
                    color:
                      (item.key === 'rooms' && item.value <= 1) ||
                      (item.key === 'adults' && item.value <= 1) ||
                      (item.key === 'children' && item.value <= 0)
                        ? '#ccc'
                        : '#1D9CAB',
                    '&:hover': {
                      backgroundColor:
                        (item.key === 'rooms' && item.value <= 1) ||
                        (item.key === 'adults' && item.value <= 1) ||
                        (item.key === 'children' && item.value <= 0)
                          ? 'transparent'
                          : 'rgba(29, 156, 171, 0.1)',
                    },
                    '&:disabled': {
                      opacity: 0.8,
                    },
                  }}>
                  -
                </IconButton>
                <Typography
                  width={{ xs: '24px', sm: '48px' }}
                  component='span'
                  align='center'
                  sx={{
                    display: 'inline-block',
                    textAlign: 'center',
                    fontSize: { xs: '14px', sm: '16px' },
                  }}>
                  {item.value}
                </Typography>
                <IconButton
                  onClick={onIncrement(item.setter, item.key)}
                  sx={{
                    borderRadius: '50%',
                    border: '1px solid #1D9CAB',
                    borderColor: '#1D9CAB',
                    width: { xs: 28, sm: 36 },
                    height: { xs: 28, sm: 36 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#1D9CAB',
                    '&:hover': {
                      backgroundColor: 'rgba(29, 156, 171, 0.1)',
                    },
                  }}>
                  +
                </IconButton>
              </Box>
            </Stack>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          padding: { xs: '20px 0 10px', sm: '24px' },
          width: '100%',
          justifyContent: 'center',
        }}>
        <Button
          onClick={onClose}
          variant='contained'
          sx={{
            width: '100%',
            backgroundColor: '#1D9CAB',
            '&:hover': { backgroundColor: '#1D9CAB' },
          }}>
          Selesai
        </Button>
      </DialogActions>
    </>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor='bottom'
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            backgroundColor: '#fff !important',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: 1000,
          },
        }}>
        <Box sx={{ p: 2, backgroundColor: '#fff' }}>{content}</Box>
      </Drawer>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={isMobile ? 'xs' : false}
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: isMobile ? '100%' : '500px',
          width: '100%',
        },
      }}
      fullWidth>
      {content}
    </Dialog>
  );
}

GuestDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  rooms: PropTypes.number,
  setRooms: PropTypes.func,
  adults: PropTypes.number,
  setAdults: PropTypes.func,
  children: PropTypes.number,
  setChildren: PropTypes.func,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
};
