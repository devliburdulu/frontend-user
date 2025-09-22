import { Card } from '@mui/material';
import { styled } from '@mui/system';

export const StyledCardPromo = styled(Card)(
  ({ theme, style, backgroundColor }) => ({
    position: 'relative',
    color: 'white',
    backgroundImage: style.backgroundImage,
    backgroundColor: backgroundColor,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
      position: 'relative',
      zIndex: 1,
    },
  })
);

// export const StyledCardSuperMitra = styled(Card)(({ theme }) => ({
//   position: 'relative',
//   color: 'white',
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
//   height: '300px',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   alignItems: 'center',
//   borderRadius: '10px',
//   '&::before': {
//     content: '""',
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     bottom: 0,
//     left: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: overlay for better text readability
//   },
//   '& > *': {
//     position: 'relative',
//     zIndex: 1,
//   },
// }));

export const StyledCardSuperMitra = styled(Card)(({ theme }) => ({
  position: 'relative',
  color: 'white',
  height: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  overflow: 'hidden', // Mencegah elemen bocor keluar dari border radius

  // Overlay yang berada tepat di atas Image
  '.overlay': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay gelap untuk meningkatkan keterbacaan teks
    zIndex: 1, // Pastikan overlay berada di atas gambar
  },

  // Semua elemen anak (text, icon, dll.) ada di atas overlay
  // '& > *': {
  //   position: 'relative',
  //   zIndex: 2, // Pastikan teks dan ikon berada di atas overlay
  // },
}));
