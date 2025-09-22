import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Stack,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { formatRupiah } from '../utils/format-utils';
import { getCurrentSortValue } from '../utils/sort-utils';
import Iconify from 'src/components/iconify';

export default function FilterBox({
  isDesktop,
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
  const [radioValue, setRadioValue] = React.useState(
    getCurrentSortValue(sortOption)
  );

  React.useEffect(() => {
    const newValue = getCurrentSortValue(sortOption);
    if (newValue !== radioValue) {
      setRadioValue(newValue);
    }
  }, [sortOption]);

  // Process available stars - use dynamic data or fallback to default
  const processedRatings = React.useMemo(() => {
    if (availableStars && availableStars.length > 0) {
      return availableStars.map((item) => ({
        rating: item.rating,
        count: item.count,
      }));
    }
    return [5, 4, 3, 2, 1, 0].map((rating) => ({ rating, count: 0 }));
  }, [availableStars]);
  return (
    <Box
      sx={{
        p: 2,
        width: isDesktop ? 'auto' : '100%',
        border: isDesktop ? '1px solid #1E2A38' : 'none',
        borderRadius: 2,
        maxHeight: isDesktop ? 'auto' : 500,
      }}>
      {/* Price Range Section */}
      <Typography
        variant='subtitle2'
        sx={{ mb: 2, fontSize: '16px', fontWeight: 700 }}>
        Rentang Harga
      </Typography>

      <TextField
        type='text'
        label='Harga Minimum'
        fullWidth
        sx={{ mb: 2 }}
        value={formatRupiah(minPrice)}
        onChange={onMinPriceChange}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position='start'
              sx={{
                color: 'rgba(0, 0, 0, 0.54)',
                fontSize: 16,
                fontWeight: 600,
              }}>
              IDR
            </InputAdornment>
          ),
        }}
      />
      <TextField
        type='text'
        label='Harga Maksimum'
        fullWidth
        value={formatRupiah(maxPrice)}
        onChange={onMaxPriceChange}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position='start'
              sx={{
                color: 'rgba(0, 0, 0, 0.54)',
                fontSize: 16,
                fontWeight: 600,
              }}>
              IDR
            </InputAdornment>
          ),
        }}
      />

      {/* Star Rating Section */}
      <Typography
        variant='subtitle2'
        sx={{ mt: 4, mb: 0, fontSize: '16px', fontWeight: 700 }}>
        Rating Hotel
      </Typography>
      <Stack direction='column' spacing={0}>
        {processedRatings.map(({ rating, count }) => (
          <FormControlLabel
            key={rating}
            sx={{
              width: '100%',
              margin: 0,
              '& .MuiFormControlLabel-label': {
                width: '100%',
                marginLeft: 0,
              },
              '& .MuiCheckbox-root': {
                padding: '8px 4px 8px 0 ',
              },
            }}
            control={
              <Checkbox
                value={rating.toString()}
                checked={selectedRatings.includes(rating.toString())}
                onChange={onRatingChange}
              />
            }
            label={
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  width: '100%',
                  minWidth: 0,
                }}>
                {rating > 0 && (
                  <Iconify
                    icon='material-symbols:star-rounded'
                    sx={{
                      color: '#F99932',
                      fontSize: '16px',
                      flexShrink: 0,
                    }}
                  />
                )}
                <Typography
                  variant='body2'
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    flex: 1,
                    minWidth: 0,
                    fontSize: { xs: '13px', lg: '14px' },
                  }}>
                  {rating === 0 ? '' : rating}
                  {rating === 5
                    ? ` (${count} Hotel Fantastis)`
                    : rating === 4
                    ? ` (${count} Hotel Terbaik)`
                    : rating === 3
                    ? ` (${count} Hotel Bagus)`
                    : rating === 2 || rating === 1
                    ? ` (${count} Hotel)`
                    : rating === 0
                    ? ` Tanpa Bintang (${count} Hotel)`
                    : ''}
                </Typography>
              </Box>
            }
          />
        ))}
      </Stack>

      {/* Sort Section */}
      <Typography
        variant='subtitle2'
        sx={{
          mt: { xs: 3, md: 4 },
          mb: 0,
          fontSize: '16px',
          fontWeight: 700,
        }}>
        Urutkan Berdasarkan
      </Typography>
      <RadioGroup
        value={radioValue}
        onChange={(event) => {
          const selectedValue = event.target.value;
          setRadioValue(selectedValue);
          onSortChange(event);
        }}
        sx={{
          '& .MuiFormControlLabel-label': {
            fontSize: { xs: '13px', lg: '14px' },
          },
          pb: { xs: 2, md: 0 },
        }}>
        <FormControlLabel
          value='price_asc'
          control={<Radio />}
          label='Harga Terendah'
        />
        <FormControlLabel
          value='price_desc'
          control={<Radio />}
          label='Harga Tertinggi'
        />
        <FormControlLabel
          value='name_asc'
          control={<Radio />}
          label='Nama Hotel A ke Z'
        />
        <FormControlLabel
          value='name_desc'
          control={<Radio />}
          label='Nama Hotel Z ke A'
        />
      </RadioGroup>
    </Box>
  );
}
