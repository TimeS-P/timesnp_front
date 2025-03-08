import { useState } from 'react';
import { sendPasswordRecoveryEmail } from '../../services/ForgotPassword/authService';
import { useNotification } from './useNotification';

export const usePasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { notification, showSuccess, showError, hideNotification } = useNotification();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const sendRecoveryEmail = async () => {
    if (!email.trim()) {
      showError('Por favor, ingresa tu correo electrónico');
      return;
    }

    if (!isValidEmail(email)) {
      showError('Por favor, ingresa un correo electrónico válido');
      return;
    }

    setIsLoading(true);

    try {
      console.log('Email a enviar:', email);
      const response = await sendPasswordRecoveryEmail(email);

      if (response.success) {
        showSuccess('Se envió un correo de recuperación de contraseña');
      } else {
        showError('Ocurrió un error al enviar el correo');
      }
    } catch (error) {
      showError('Error de conexión. Intenta más tarde');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    isLoading,
    notification,
    handleEmailChange,
    sendRecoveryEmail,
    hideNotification
  };
};