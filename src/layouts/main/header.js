import React, { useEffect, useState, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Iconify from 'src/components/iconify';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { paths } from 'src/routes/paths';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
import { usePathname } from 'src/routes/hooks';
import { bgBlur } from 'src/theme/css';
import Logo from 'src/components/logo';
import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import ShopCart from 'src/sections/product-detail/shop-cart';
import SearchBar from './search/searchBar';
import { HEADER } from '../config-layout';
import { navConfig } from './config-navigation';
import { menuConfig } from './menu-navigation';
import LoginButton from '../common/login-button';
import AccountPopover from '../common/account-popover';
import { useAuthContext } from 'src/auth/hooks';
import { getItemsCart } from 'src/fetch-global';
import { getCartForward } from 'src/rest/Cart';
import { useCartContext } from 'src/context/CartContext';
// ----------------------------------------------------------------------
const PHONE_WA = '6287824059090';
const TEXT_WA = 'Hello how can we help you?';

const socialLinks = [
  {
    icon: 'line-md:instagram',
    href: 'https://www.instagram.com/liburdulu.id/',
  },
  {
    icon: 'line-md:tiktok',
    href: 'https://www.tiktok.com/@liburdulu.id?_t=8ZaytRxgaJN&_r=1',
  },
  {
    icon: 'line-md:facebook',
    href: 'https://www.facebook.com/liburduluindonesia/?_rdc=1&_rdr',
  },
  { icon: 'line-md:twitter-x', href: 'https://x.com/idLiburDulu' },
  {
    icon: 'line-md:youtube',
    href: 'https://www.youtube.com/channel/UCKd_07XMyze2cz5op27n2KA',
  },
];

const navLinks = [
  // { text: "Tentang Kami", href: "#" },
  // { text: "Promo", href: "#", target: "_blank" },
  {
    text: 'Bantuan',
    href: `https://wa.me/${PHONE_WA}?text=${TEXT_WA}`,
    target: '_blank',
  },
];

export default function Header() {
  const TOKEN = Cookies.get('accessToken');
  const router = useRouter();
  const theme = useTheme();
  const pathname = usePathname();
  const mdUp = useResponsive('up', 'md');
  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);
  const { authenticated } = useAuthContext();
  const [item, setItem] = useState('');
  const { itemCount, setItemCount } = useCartContext();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cachedCount = parseInt(localStorage.getItem('itemCount'), 10);

        if (!isNaN(cachedCount) && cachedCount > 0) {
          setItemCount(cachedCount);
        } else {
          const res = await getCartForward(TOKEN);
          const itemCountFromAPI = res?.data?.total_item_count || 0;
          setItemCount(itemCountFromAPI);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [setItemCount, TOKEN]);

  const handleRegisMitra = () => {
    authenticated === true
      ? router.push('/register-mitra')
      : router.push('/login');
  };

  function moveToProduct(id, name) {
    localStorage.setItem('id', id);
    localStorage.setItem('search', name);
    router.push(paths.product.root);
  }

  useEffect(() => {
    authenticated;
  }, [authenticated]);

  const WrapperContent =
    pathname.startsWith('/hotel') || pathname.startsWith('/hotels')
      ? Box
      : AppBar;

  return (
    <WrapperContent>
      {mdUp && (
        <div className='bg-liburdulu-blue'>
          <Container>
            <div className='text-white p-2 flex justify-between items-center h-[28px] mb-0.5'>
              <div className='grid grid-flow-col'>
                <span className='text-liburdulu-white font-[500] text-[12px] leading-[14px] flex items-center'>
                  Follow Liburdulu
                </span>
                <div className='ms-3 grid grid-flow-col gap-2'>
                  {socialLinks.map((link) => (
                    <a key={link.icon} href={link.href} target='_blank'>
                      <Iconify
                        icon={link.icon}
                        sx={{ fontSize: 20, color: '#FFFFFF' }}
                      />
                    </a>
                  ))}
                </div>
              </div>
              <div className='grid grid-flow-col gap-3'>
                {navLinks.map((link) => (
                  <a
                    key={link.text}
                    href={link.href}
                    target={link.target}
                    className='text-liburdulu-white font-[500] text-[12px] leading-[14px]'>
                    {link.text}
                  </a>
                ))}
                <button
                  onClick={handleRegisMitra}
                  className='text-[12px] p-0 text-liburdulu-white font-[500] leading-[14px]'>
                  Jadi Mitra Liburdulu
                </button>
              </div>
            </div>
          </Container>
        </div>
      )}

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
            backgroundColor: '#FFF',
            px: { xs: 1, md: 3 },
          }}>
          <Logo />
          <div className='hidden xl:block'>
            <Box sx={{ ml: 0, flexGrow: 1, width: 360, maxWidth: 400 }}>
              <SearchBar />
            </Box>
          </div>
          {mdUp && <NavDesktop data={menuConfig} />}
          <Box sx={{ flexGrow: 1 }} />
          {authenticated &&
            !pathname.includes('/checkout/confirm-payment-success') && (
              <ShopCart totalItems={itemCount} />
            )}
          {authenticated ? <AccountPopover /> : <>{mdUp && <LoginButton />}</>}
          <Stack
            alignItems='center'
            direction={{ xs: 'row', md: 'row-reverse' }}>
            {!authenticated && (
              <>
                {!mdUp && <LoginButton />}
                <Button
                  variant='contained'
                  rel='noopener'
                  href={`/register`}
                  sx={{ fontWeight: 600 }}>
                  Daftar
                </Button>
              </>
            )}
            {!mdUp && <NavMobile data={menuConfig} />}
          </Stack>
        </Container>
      </Toolbar>
    </WrapperContent>
  );
}
