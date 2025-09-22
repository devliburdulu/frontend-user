'use client';

import { useMemo, useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';
import { hotelConfirmation } from './api/hotel-api';
import { SplashScreen } from 'src/components/loading-screen';
import { useRouter } from 'next/navigation';

function HotelRoomCard({ rooms, setLowestPrice }) {
  const TOKEN = Cookies.get('accessToken');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //

  const { mutate } = useMutation({
    mutationFn: hotelConfirmation,

    onMutate: (variables) => {
      return { correlationId: variables.correlationId };
    },
    onSuccess: (data, variables, context) => {
      setLoading(false);

      router.push(
        `/checkout/checkout-form?correlationId=${context.correlationId}`
      );
    },
    onError: (error) => {
      console.error('Hotel confirmation failed:', error);
      setLoading(false);
    },
    retry: 0,
  });

  const handleSelectedRooms = (room) => {
    setLoading(true);

    if (!TOKEN) {
      window.location.href = '/login';
      return;
    }

    const body = {
      correlationId: room.correlationId,
      hotelKey: room.HotelKey,
      roomKey: room.RoomKey,
      tokenMagento: TOKEN,
    };

    mutate(body);
  };

  useEffect(() => {
    if (
      rooms &&
      rooms.length > 0 &&
      rooms[0].roomData &&
      rooms[0].roomData.length > 0 &&
      rooms[0].roomData[0].TotalPrice != null
    ) {
      setLowestPrice(rooms[0].roomData[0].TotalPrice);
    }
  }, [rooms, setLowestPrice]);

  return (
    <Box>
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            zIndex: 9999,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}>
          <SplashScreen />
        </Box>
      )}

      {rooms?.map((roomGroup, groupIndex) => (
        <Box
          key={groupIndex}
          sx={{
            border: '1px solid #ddd',
            borderRadius: 2,
            p: 2,
            my: 2,
            boxShadow: 0.5,
          }}>
          <Typography variant='h6' fontWeight='bold' sx={{ mb: 2 }}>
            {`${roomGroup.groupName}`}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
            }}>
            <Box
              sx={{
                flex: '0 0 30%',
              }}>
              <Box
                component='img'
                src='/default image 1.png'
                alt='Room Image'
                sx={{
                  width: '100%',
                  height: '100%',
                  padding: 12,
                  border: '1px solid #ddd',
                  maxHeight: '300px',
                  objectFit: 'contain',
                  borderRadius: 2,
                }}
              />
            </Box>

            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mt: { xs: 2, md: 0 },
              }}>
              {roomGroup?.roomData?.map((room, roomIndex) => (
                <Box
                  key={roomIndex}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    border: '0.2px solid #ddd',
                    borderRadius: 2,
                    position: 'relative',
                  }}>
                  <Box>
                    <Typography variant='subtitle1' fontWeight='bold'>
                      {room?.RoomName || `Room Option ${roomIndex + 1}`}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {room?.cancelPolicy?.Message}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{ mt: 1 }}>
                      {room?.MealType === 'Breakfast'
                        ? '🍴 Included Breakfast'
                        : 'Breakfast Not Included'}
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant='h6' fontWeight='bold'>
                      {room?.TotalPrice
                        ? `Rp ${room?.TotalPrice.toLocaleString()}`
                        : 'Rp 0'}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {/* Termasuk pajak per malam */}
                      Total Harga termasuk pajak
                    </Typography>
                    <Button
                      variant='contained'
                      color='primary'
                      sx={{
                        mt: 1,
                        borderRadius: 8,
                        textTransform: 'none',
                        fontWeight: 'bold',
                      }}
                      onClick={() => handleSelectedRooms(room)}
                      disabled={loading}>
                      {loading ? (
                        <CircularProgress size={24} sx={{ color: 'white' }} />
                      ) : (
                        'Pesan Sekarang'
                      )}
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default function HotelRooms({ rooms, setLowestPrice }) {
  const transformedRooms = useMemo(() => {
    if (!rooms || typeof rooms !== 'object') return [];
    return Object.entries(rooms).map(([groupName, roomData]) => ({
      groupName,
      roomData,
    }));
  }, [rooms]);

  return (
    <Box>
      <HotelRoomCard rooms={transformedRooms} setLowestPrice={setLowestPrice} />
    </Box>
  );
}
