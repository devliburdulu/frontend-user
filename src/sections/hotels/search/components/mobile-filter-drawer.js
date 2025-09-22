import React from 'react';
import { Drawer, Box, Button } from '@mui/material';
import FilterBox from './filter-box';
import Iconify from 'src/components/iconify';

export default function MobileFilterDrawer({
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
  return (
    <>
      <Button
        onClick={onDrawerToggle}
        className='w-full h-fit place-self-center'
        variant='outlined'
        startIcon={<Iconify icon='mage:filter' />}
        sx={{
          border: '1px solid',
          padding: '8px 12px',
          fontWeight: 500,
          mt: 1,
          mb: 1.5,
          position: 'sticky',
          top: '80px',
          zIndex: 1100,
        }}>
        Filter & Urutkan Hotel
      </Button>

      <Drawer
        anchor='bottom'
        open={isDrawerOpen}
        onClose={onDrawerToggle}
        PaperProps={{
          sx: {
            maxHeight: '70vh',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
        }}>
        <Box sx={{ p: 1, overflowY: 'auto', backgroundColor: '#FFF' }}>
          <FilterBox
            isDesktop={false}
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
      </Drawer>
    </>
  );
}
