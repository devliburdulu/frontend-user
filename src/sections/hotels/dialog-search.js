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
  Chip,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Iconify from 'src/components/iconify/iconify';

export default function SearchDialog({
  open,
  onClose,
  location,
  onInputChange,
  filteredDestinations,
  popularDestinations,
  onSelectDestination,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLocalSelect = (destination) => {
    if (
      !destination ||
      !destination.CityKey ||
      !(destination.CityName || destination.name)
    ) {
      console.error(
        'SearchDialog: Invalid destination object passed to handleLocalSelect',
        destination
      );
      onClose();
      return;
    }
    onSelectDestination(destination);
    onClose();
  };

  const content = (
    <>
      <DialogTitle
        sx={{
          fontWeight: 'bold',
          padding: { xs: '24px 0 10px', sm: '24px' },
        }}>
        Cari Sesuai Destinasi
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
          <Iconify icon='mdi:close' />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ padding: { xs: '0', sm: '24px' } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            placeholder='Masukkan nama akomodasi, destinasi, dll'
            sx={{
              '& fieldset': { border: 'none' },
              border: '1px solid #e9ecee',
              borderRadius: 1,
            }}
            fullWidth
            value={location || ''}
            onChange={onInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Iconify icon='ic:round-search' />
                </InputAdornment>
              ),
              endAdornment: location ? (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={() => onInputChange({ target: { value: '' } })}
                    edge='end'>
                    <Iconify icon='mdi:clear' />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
            autoFocus
          />

          <Box>
            {location && filteredDestinations.length > 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                }}>
                {filteredDestinations.map((destination, index) => (
                  <Box
                    key={destination.HotelKey || destination.CityKey || index}
                    onClick={() => handleLocalSelect(destination)}
                    sx={{
                      display: 'flex',
                      gap: 1.5,
                      padding: '12px 2px',
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '100%',
                      cursor: 'pointer',
                      ':hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}>
                    <Iconify
                      icon={
                        destination.type === 'hotel' ? 'mdi:hotel' : 'mdi:city'
                      }
                      sx={{
                        color: 'text.secondary',
                        width: 24,
                        height: 24,
                        flexShrink: 0,
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant='subtitle1'
                        sx={{ fontWeight: 'medium' }}>
                        {destination.type === 'hotel'
                          ? destination.HotelName
                          : destination.CityName}
                      </Typography>
                      {destination.type === 'hotel' && destination.CityName && (
                        <Typography
                          variant='body2'
                          sx={{
                            color: 'text.secondary',
                            fontSize: { xs: '12px', sm: '14px' },
                          }}>
                          {destination.CityName}
                        </Typography>
                      )}
                    </Box>
                    <Typography
                      variant='caption'
                      sx={{
                        color: 'text.disabled',
                        ml: 'auto',
                        flexShrink: 0,
                        fontSize: { xs: '12px', sm: '14px' },
                      }}>
                      {destination.type === 'hotel' ? 'Hotel' : 'Kota'}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  flexWrap: 'wrap',
                }}>
                <Typography
                  textAlign='left'
                  variant='h6'
                  sx={{ fontWeight: 'bold', mt: 1, mb: 1 }}>
                  Destinasi Populer
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {popularDestinations.map((destination) => (
                    <Chip
                      key={destination.id}
                      label={destination.CityName}
                      onClick={() => handleLocalSelect(destination)}
                      clickable
                      sx={{
                        color: '#000',
                        border: '1px solid #e9ecee',
                        backgroundColor: '#fff',
                        '&:hover': {
                          backgroundColor: '#f5f5f5',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}
            {location && filteredDestinations.length === 0 && (
              <Typography
                sx={{ p: 2, color: 'text.secondary', textAlign: 'center' }}>
                {location.length === 0
                  ? 'Masukkan nama akomodasi, destinasi, dll'
                  : `Pencarian untuk keyword "${location}"`}
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
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
            maxHeight: '85vh',
          },
        }}>
        <Box sx={{ p: '2rem 1rem', backgroundColor: '#fff' }}>{content}</Box>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      {content}
    </Dialog>
  );
}
