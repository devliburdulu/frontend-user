// import React, { useEffect, useState, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { usePathname } from 'src/routes/hooks';
import { bgBlur } from 'src/theme/css';
import Logo from './logo';
import { HEADER } from '../config-layout';
// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();
  const pathname = usePathname();
  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);
  const WrapperContent = pathname.startsWith('/hotels') ? Box : AppBar;

  return (
    <WrapperContent>
      <Toolbar
        className='bg-liburdulu-white'
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offsetTop && {
            ...bgBlur({
              color: theme.palette.background.default,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}>
        <Container
          sx={{
            height: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'flex-start' },
          }}>
          <Logo />
        </Container>
      </Toolbar>
    </WrapperContent>
  );
}
