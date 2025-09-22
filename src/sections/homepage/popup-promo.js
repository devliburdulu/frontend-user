'use client';

import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { getHomePopup } from 'src/rest/HomePopup';

export default function PopupPromo() {
  const [open, setOpen] = useState(false);
  const [bannerPopup, setBannerPopup] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let popup = [];
        const data = await getHomePopup();
        if (Array.isArray(data)) {
          data.forEach((item) => {
            const attrs = item?.attributes || item || {};
            const page = attrs.page || attrs.Page || '';
            if (page !== 'Home') return;
            const base = process.env.NEXT_PUBLIC_IMAGE_EDU || '';
            const imagePath = attrs?.image?.url || '';
            const imageUrl = imagePath ? `${base}${imagePath}` : '';
            if (!imageUrl) return;
            popup.push({
              id: item?.id || attrs?.id,
              imageUrl,
              startDate: attrs.start_date || attrs.startDate,
              endDate: attrs.end_date || attrs.endDate,
              title: attrs.title || 'Title',
              url: attrs.url || '#',
              page,
            });
          });
        }
        setBannerPopup(popup);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const eventPopup = bannerPopup?.[0];
  const imageUrl = eventPopup?.imageUrl || '';

  useEffect(() => {
    if (!eventPopup) return;
    const popupStartDate = eventPopup?.startDate
      ? new Date(eventPopup.startDate)
      : null;
    const popupEndDate = eventPopup?.endDate
      ? new Date(eventPopup.endDate)
      : null;
    const currentDate = new Date();
    const canShow =
      !!popupStartDate &&
      !!popupEndDate &&
      currentDate >= popupStartDate &&
      currentDate <= popupEndDate;
    if (!canShow) return;
    const timer = setTimeout(() => {
      setOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [eventPopup]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open && !!eventPopup && !!imageUrl}
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
          right: { xs: 16, md: 20 },
          top: { xs: -12, md: -4 },
          color: 'white',
          zIndex: 1,
        }}>
        <CloseIcon sx={{ fontSize: 28 }} />
      </IconButton>
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          margin: '0 auto',
          padding: { xs: 3, md: 4 },
        }}>
        {eventPopup && (
          <Link href={eventPopup.url || '#'} target='_self' rel='noopener'>
            <Image
              src={imageUrl}
              alt={eventPopup.title || 'Popup Content'}
              width={200}
              height={200}
              layout='responsive'
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
                borderRadius: 10,
              }}
            />
          </Link>
        )}
      </Box>
    </Dialog>
  );
}
