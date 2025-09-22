import { m } from 'framer-motion';
import { useState, useCallback } from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { varHover } from 'src/components/animate';
import NotificationItem from './notification-item';
import { useNotificationContext } from 'src/context/NotificationContext';

export default function NotificationsPopover() {
  const drawer = useBoolean();
  const smUp = useResponsive('up', 'sm');
  const [currentTab, setCurrentTab] = useState('semua');

  const { notifications, setNotifications, unreadCount, setUnreadCount } =
    useNotificationContext();

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const TABS = [
    {
      value: 'semua',
      label: 'Semua',
      count: notifications.length,
      unreadCount: notifications.filter((notif) => notif.isUnRead).length,
    },
    ...Array.from(new Set(notifications.map((notif) => notif.category))).map(
      (category) => {
        const filteredNotifs = notifications.filter(
          (notif) => notif.category === category
        );
        return {
          value: category,
          label: category.charAt(0).toUpperCase() + category.slice(1),
          count: filteredNotifs.length,
          unreadCount: filteredNotifs.filter((notif) => notif.isUnRead).length,
        };
      }
    ),
  ];

  const handleMarkAsRead = (id) => {
    const updatedNotifications = notifications.map((notif) =>
      notif.id === id ? { ...notif, isUnRead: false } : notif
    );
    setNotifications(updatedNotifications);
    const newUnreadCount = updatedNotifications.filter(
      (notif) => notif.isUnRead
    ).length;
    setUnreadCount(newUnreadCount);
  };

  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map((notif) => ({
      ...notif,
      isUnRead: false,
    }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
  };

  const renderHead = (
    <Stack
      direction='row'
      alignItems='center'
      sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}>
      <Typography variant='h6' sx={{ flexGrow: 1 }}>
        Notifikasi
      </Typography>

      {!!unreadCount && (
        <IconButton onClick={handleMarkAllAsRead} sx={{ color: '#1D9CAB' }}>
          <Typography variant='caption' sx={{ fontWeight: 600 }}>
            Tandai Semua Dibaca
          </Typography>
        </IconButton>
      )}

      {!smUp && (
        <IconButton onClick={drawer.onFalse}>
          <Iconify icon='mingcute:close-line' />
        </IconButton>
      )}
    </Stack>
  );

  const renderTabs = (
    <Tabs
      value={currentTab}
      onChange={handleChangeTab}
      variant='scrollable'
      scrollButtons='auto'
      allowScrollButtonsMobile
      sx={{
        '& .MuiTabs-scrollButtons': {
          display: 'flex',
          width: 'auto',
        },
        '& .MuiTabs-scrollButtons.Mui-disabled': {
          opacity: 0.3,
        },
      }}>
      {TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition='end'
          value={tab.value}
          label={tab.label}
          icon={
            tab.unreadCount > 0 ? (
              <Label
                variant={tab.value === currentTab ? 'filled' : 'soft'}
                color='default'
                sx={{ fontWeight: 500 }}>
                {tab.unreadCount}
              </Label>
            ) : null
          }
          sx={{
            '&:not(:last-of-type)': {
              mr: 2,
            },
          }}
        />
      ))}
    </Tabs>
  );

  const renderList = (
    <Scrollbar>
      <List disablePadding>
        {notifications
          .filter(
            (notif) => currentTab === 'semua' || notif.category === currentTab
          )
          .map((notif) => (
            <NotificationItem
              key={notif.id}
              notification={notif}
              onRead={handleMarkAsRead}
            />
          ))}
      </List>
    </Scrollbar>
  );

  return (
    <>
      <IconButton
        component={m.button}
        whileTap='tap'
        whileHover='hover'
        variants={varHover(1.05)}
        color={drawer.value ? 'primary' : 'default'}
        onClick={drawer.onTrue}
        sx={{
          padding: { xs: '8px 16px', md: '8px 12px' },
          '&:hover': {
            backgroundColor: 'unset',
          },
        }}>
        <Badge badgeContent={unreadCount} color='error'>
          <Iconify icon='solar:bell-outline' width={24} color='#212b36' />
        </Badge>
      </IconButton>

      <Drawer
        open={drawer.value}
        onClose={drawer.onFalse}
        anchor='right'
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 1, maxWidth: { xs: 420, sm: 450, md: 540, lg: 480 } },
        }}>
        <Stack
          direction='row'
          alignItems='center'
          sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            Notifikasi
          </Typography>
          {!!unreadCount && (
            <IconButton onClick={handleMarkAllAsRead} sx={{ color: '#1D9CAB' }}>
              <Typography variant='caption' sx={{ fontWeight: 600 }}>
                Tandai Semua Dibaca
              </Typography>
            </IconButton>
          )}
          {!smUp && (
            <IconButton onClick={drawer.onFalse}>
              <Iconify icon='mingcute:close-line' />
            </IconButton>
          )}
        </Stack>
        <Divider />
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          sx={{ pl: { xs: 2, md: 1.5, lg: 2.5 }, pr: { xs: 0.5, md: 1 } }}>
          <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            variant='scrollable'
            scrollButtons='auto'
            allowScrollButtonsMobile
            sx={{
              '& .MuiTabs-scrollButtons': {
                display: 'flex',
                width: 'auto',
              },
              '& .MuiTabs-scrollButtons.Mui-disabled': {
                opacity: 0.3,
              },
            }}>
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition='end'
                value={tab.value}
                label={tab.label}
                icon={
                  tab.unreadCount > 0 ? (
                    <Label
                      variant={tab.value === currentTab ? 'filled' : 'soft'}
                      color='default'>
                      {tab.unreadCount}
                    </Label>
                  ) : null
                }
                sx={{
                  '&:not(:last-of-type)': {
                    mr: 2,
                  },
                }}
              />
            ))}
          </Tabs>
        </Stack>
        <Divider />
        <Scrollbar>
          <List disablePadding>
            {notifications
              .filter(
                (notif) =>
                  currentTab === 'semua' || notif.category === currentTab
              )
              .map((notif) => (
                <NotificationItem
                  key={notif.id}
                  notification={notif}
                  onRead={handleMarkAsRead}
                />
              ))}
          </List>
        </Scrollbar>
      </Drawer>
    </>
  );
}
