import { m } from 'framer-motion';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { paths } from 'src/routes/paths';
import { useResponsive } from 'src/hooks/use-responsive';
import { useRouter } from 'src/routes/hooks';
import { useAuthContext } from 'src/auth/hooks';
import { varHover } from 'src/components/animate';
import { useSnackbar } from 'src/components/snackbar';
import { useCartContext } from 'src/context/CartContext';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

export default function AccountPopover() {
  const mdUp = useResponsive('up', 'md');
  const router = useRouter();
  const { user, logout } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const { handleLogoutItem } = useCartContext();
  const popover = usePopover();

  const handleLogout = async () => {
    try {
      await logout();
      popover.onClose();
      handleLogoutItem();
      router.replace('/');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const handleClickItem = (path) => {
    popover.onClose();
    router.push(path);
  };

  // Default options
  const OPTIONS = [
    { label: 'Beranda', linkTo: '/' },
    { label: 'Akun', linkTo: '/profile' },
    { label: 'Pesanan', linkTo: '/profile/my-order' },
    { label: 'Poin', linkTo: '/profile/my-reward' },
  ];

  // Check for custom_attributes to add Mitra Dashboard
  const mitraDashboardUrl = process.env.NEXT_PUBLIC_MITRA_DASHBOARD_URL;
  if (
    user?.custom_attributes?.some(
      (attr) => attr.attribute_code === 'business_name' && attr.value
    )
  ) {
    OPTIONS.push({
      label: 'Mitra Dashboard',
      linkTo: mitraDashboardUrl,
      external: true,
    });
  }

  return (
    <>
      {/* {mdUp && (
        <div className='flex flex-column justify-content-start'>
          <p className='text-[14px] text-gray-[700] font-medium pe-[10px]'>
            {user?.firstname} {user?.lastname}
          </p>
        </div>
      )} */}

      <IconButton
        component={m.button}
        whileTap='tap'
        whileHover='hover'
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}>
        <Avatar
          src={user?.photoURL}
          alt={user?.firstname}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}>
          {user?.firstname?.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        sx={{ width: 200, p: 0 }}>
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant='subtitle2' noWrap>
            {user?.firstname} {user?.lastname}
          </Typography>

          <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => {
                if (option.external) {
                  window.open(option.linkTo, '_blank');
                } else {
                  handleClickItem(option.linkTo);
                }
              }}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={handleLogout}
          sx={{
            m: 1,
            fontWeight: 'fontWeightBold',
            color: 'error.main',
          }}>
          Keluar
        </MenuItem>
      </CustomPopover>
    </>
  );
}
