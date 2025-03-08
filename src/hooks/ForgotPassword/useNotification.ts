import { useState, useEffect } from 'react';

interface NotificationState {
  show: boolean;
  message: string;
  isSuccess: boolean;
}

export const useNotification = (duration = 5000) => {
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    message: '',
    isSuccess: true,
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (notification.show) {
      timer = setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, duration);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [notification.show, duration]);

  const showSuccess = (message: string) => {
    setNotification({
      show: true,
      message,
      isSuccess: true,
    });
  };

  const showError = (message: string) => {
    setNotification({
      show: true,
      message,
      isSuccess: false,
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, show: false }));
  };

  return {
    notification,
    showSuccess,
    showError,
    hideNotification,
  };
};