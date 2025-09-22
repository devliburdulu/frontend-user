import React from 'react';
import { Card, Typography } from '@mui/material';

export default function SearchResultsHeader({
  hotelsData,
  displayedHotels,
  page,
  isLoadingHotels,
  isErrorHotels,
}) {
  const getHeaderText = () => {
    if (hotelsData?.total !== undefined && hotelsData?.total !== null) {
      return `${displayedHotels.length} properti ditampilkan dari total ${
        hotelsData.total
      } (Page ${page} dari ${hotelsData.maxPage || 1})`;
    } else if (isLoadingHotels && page === 1) {
      return '';
    } else if (isErrorHotels) {
      return '';
    } else {
      return 'Mencari properti...';
    }
  };

  return (
    <Card
      sx={{
        position: 'sticky',
        top: 90,
        zIndex: 30,
        p: 2,
        mb: 4,
        display: 'none', // Hidden sesuai dengan kode asli
      }}>
      <Typography
        variant='h6'
        sx={{
          mb: 0,
          fontSize: 16,
          fontWeight: 'bold',
          color: '#4A4B4E',
          position: 'sticky',
          top: 60,
          zIndex: 30,
        }}>
        {getHeaderText()}
      </Typography>
    </Card>
  );
}
