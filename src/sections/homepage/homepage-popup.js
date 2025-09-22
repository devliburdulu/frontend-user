'use client';

import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import Box from '@mui/material/Box';

export default function HomepagePopUp() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setOpen(true);
        localStorage.setItem('hasSeenPopup', 'true');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          margin: 0,
          padding: 0,
          boxShadow: 'none',
          backgroundColor: 'transparent',
        },
      }}
      sx={{
        '& .MuiDialog-paper': {
          overflow: 'hidden',
        },
      }}>
      <IconButton
        aria-label='close'
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'white',
          zIndex: 1,
        }}>
        <CloseIcon />
      </IconButton>
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          margin: '0 auto',
          padding: 2,
        }}>
        <Image
          src='/popup-daftar4ribu.png'
          alt='Popup Content'
          width={200}
          height={200}
          layout='responsive'
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
          }}
        />
      </Box>
    </Dialog>
  );
}
