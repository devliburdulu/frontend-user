import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { fToNow, fDate } from 'src/utils/format-time';
import Label from 'src/components/label';
import FileThumbnail from 'src/components/file-thumbnail';
import { useNotificationContext } from 'src/context/NotificationContext';

// ----------------------------------------------------------------------

export default function NotificationItem({ notification, onRead }) {
  const { unreadCount, setUnreadCount } = useNotificationContext();
  const [isRead, setIsRead] = useState(!notification.isUnRead);

  const handleReadNotification = () => {
    if (!isRead) {
      setIsRead(true);
      onRead(notification.id);
      if (unreadCount > 0) {
        setUnreadCount(unreadCount - 1);
      }
    }
  };

  const renderText = (
    <ListItemText
      disableTypography
      secondary={reader(notification.title)}
      primary={
        <Stack
          direction='row'
          alignItems='center'
          sx={{ typography: 'caption', color: 'text.disabled', mb: 0.35 }}
          divider={
            <Box
              sx={{
                width: 3.5,
                height: 3.5,
                bgcolor: 'currentColor',
                mx: 1,
                borderRadius: '50%',
              }}
            />
          }>
          <span className='text-liburdulu-blue font-semibold'>
            {notification.category}
          </span>
          <span>{fDate(notification.createdAt)}</span>
        </Stack>
      }
    />
  );

  const renderImage = notification.image?.url ? (
    <Link href={notification.srcLink} passHref style={{ width: '100%' }}>
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_EDU}${notification.image.url}`}
        alt='Notification Image'
        width={400}
        height={400}
        priority
        style={{ borderRadius: '6px' }}
      />
    </Link>
  ) : null;

  const friendAction = (
    <Stack spacing={1} direction='row' sx={{ mt: 1.5 }}>
      <Button size='small' variant='contained'>
        Accept
      </Button>
      <Button size='small' variant='outlined'>
        Decline
      </Button>
    </Stack>
  );

  const projectAction = (
    <Stack alignItems='flex-start'>
      <Box
        sx={{
          p: 1.5,
          my: 1.5,
          borderRadius: 1.5,
          color: 'text.secondary',
          bgcolor: 'background.neutral',
        }}>
        {reader(
          `<p><strong>@Jaydon Frankie</strong> feedback by asking questions or just leave a note of appreciation.</p>`
        )}
      </Box>

      <Button size='small' variant='contained'>
        Reply
      </Button>
    </Stack>
  );

  const fileAction = (
    <Stack
      spacing={1}
      direction='row'
      sx={{
        pl: 1,
        p: 1.5,
        mt: 1.5,
        borderRadius: 1.5,
        bgcolor: 'background.neutral',
      }}>
      <FileThumbnail
        file='http://localhost:8080/httpsdesign-suriname-2015.mp3'
        sx={{ width: 40, height: 40 }}
      />

      <Stack
        spacing={1}
        direction={{ xs: 'column', sm: 'row' }}
        flexGrow={1}
        sx={{ minWidth: 0 }}>
        <ListItemText
          disableTypography
          primary={
            <Typography
              variant='subtitle2'
              component='div'
              sx={{ color: 'text.secondary' }}
              noWrap>
              design-suriname-2015.mp3
            </Typography>
          }
          secondary={
            <Stack
              direction='row'
              alignItems='center'
              sx={{ typography: 'caption', color: 'text.disabled' }}
              divider={
                <Box
                  sx={{
                    mx: 0.5,
                    width: 2,
                    height: 2,
                    borderRadius: '50%',
                    bgcolor: 'currentColor',
                  }}
                />
              }>
              <span>2.3 GB</span>
              <span>30 min ago</span>
            </Stack>
          }
        />

        <Button size='small' variant='outlined'>
          Download
        </Button>
      </Stack>
    </Stack>
  );

  const tagsAction = (
    <Stack direction='row' spacing={0.75} flexWrap='wrap' sx={{ mt: 1.5 }}>
      <Label variant='outlined' color='info'>
        Design
      </Label>
      <Label variant='outlined' color='warning'>
        Dashboard
      </Label>
      <Label variant='outlined'>Design system</Label>
    </Stack>
  );

  const paymentAction = (
    <Stack direction='row' spacing={1} sx={{ mt: 1.5 }}>
      <Button size='small' variant='contained'>
        Pay
      </Button>
      <Button size='small' variant='outlined'>
        Decline
      </Button>
    </Stack>
  );

  const orderAction = (
    <Stack alignItems='flex-start' sx={{ mt: 0.5 }}>
      <Link href={notification.srcLink} passHref>
        <Button
          component='a'
          size='medium'
          variant='outlined'
          sx={{
            fontSize: { xs: '12px', md: '14px' },
            marginRight: { xs: '0px', sm: '8px' },
            fontWeight: 600,
            color: '#1D9CAB',
            borderColor: '#1D9CAB',
            '&:hover': {
              backgroundColor: '#E6F4F4',
              borderColor: '#1D9CAB',
            },
          }}>
          Lihat Pesanan
        </Button>
      </Link>
    </Stack>
  );

  const promoAction = (
    <Stack alignItems='flex-start' sx={{ mt: 1.5, width: '100%' }}>
      <Link href={notification.srcLink} passHref style={{ width: '100%' }}>
        <Button
          fullWidth
          component='a'
          size='medium'
          variant='outlined'
          sx={{
            fontSize: { xs: '12px', md: '14px' },
            marginRight: { xs: '0px', sm: '8px' },
            fontWeight: 600,
            color: '#1D9CAB',
            borderColor: '#1D9CAB',
            '&:hover': {
              backgroundColor: '#E6F4F4',
              borderColor: '#1D9CAB',
            },
          }}>
          Lihat Promo
        </Button>
      </Link>
    </Stack>
  );

  const poinAction = (
    <Stack alignItems='flex-start' sx={{ mt: 0.5 }}>
      <Link href={notification.srcLink} passHref>
        <Button
          component='a'
          size='medium'
          variant='outlined'
          sx={{
            fontSize: { xs: '12px', md: '14px' },
            marginRight: { xs: '0px', sm: '8px' },
            fontWeight: 600,
            color: '#1D9CAB',
            borderColor: '#1D9CAB',
            '&:hover': {
              backgroundColor: '#E6F4F4',
              borderColor: '#1D9CAB',
            },
          }}>
          Lihat Poin
        </Button>
      </Link>
    </Stack>
  );

  return (
    <ListItemButton
      disableRipple
      disableGutters
      component='a'
      onClick={handleReadNotification}
      sx={{
        p: 2.5,
        alignItems: 'flex-start',
        borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
        backgroundColor: isRead ? 'transparent' : '#ecfef4',
        width: '100%',
      }}>
      <Stack sx={{ flexGrow: 1 }}>
        {renderText}
        {renderImage}
        {notification.type === 'order' && orderAction}
        {notification.type === 'poin' && poinAction}
        {/* {notification.type === 'promo' && promoAction} */}
      </Stack>
    </ListItemButton>
  );
}

NotificationItem.propTypes = {
  notification: PropTypes.object,
  onRead: PropTypes.func.isRequired,
};

// ----------------------------------------------------------------------

function reader(data) {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: data }}
      sx={{
        mb: 0.5,
        '& p': { typography: 'body2', m: 0 },
        '& a': { color: 'inherit', textDecoration: 'none' },
        '& strong': { typography: 'subtitle2' },
      }}
    />
  );
}
