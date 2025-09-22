'use client';

import { createContext, useContext, useState, useEffect } from 'react';
// import { getNotifications } from 'src/rest/Notification';
import { getNotifications } from 'src/rest/Notification';
import { useAuthContext } from 'src/auth/hooks';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const { authenticated } = useAuthContext();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (authenticated) {
      const savedUnreadCount = localStorage.getItem('unreadCount');
      if (savedUnreadCount !== null) {
        setUnreadCount(parseInt(savedUnreadCount, 10));
      }
      fetchUnreadNotifications();
    }
  }, [authenticated]);

  const fetchUnreadNotifications = async () => {
    if (!authenticated) return;

    try {
      const response = await getNotifications();
      console.log('Cek Responnsss :', response);
      if (response) {
        setNotifications(response);
        const unread = response.filter((notif) => notif.isUnRead).length;
        setUnreadCount(unread);
        localStorage.setItem('unreadCount', unread);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const updateUnreadCount = (newCount) => {
    setUnreadCount(newCount);
    localStorage.setItem('unreadCount', newCount);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        setNotifications,
        setUnreadCount: updateUnreadCount,
        fetchUnreadNotifications,
      }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationContext() {
  return useContext(NotificationContext);
}
