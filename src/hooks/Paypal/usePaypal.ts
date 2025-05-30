import { useEffect, useState } from 'react';

export const usePayPal = () => {
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  useEffect(() => {
    // Verificar si ya está cargado
    if (window.paypal) {
      setPaypalLoaded(true);
      return;
    }

    // Verificar si el script ya existe
    const existingScript = document.querySelector('script[src*="paypal.com/sdk"]');
    if (existingScript) {
      // Si ya existe, esperar a que cargue
      const checkPaypal = setInterval(() => {
        if (window.paypal) {
          setPaypalLoaded(true);
          clearInterval(checkPaypal);
        }
      }, 100);
      return () => clearInterval(checkPaypal);
    }

    // Cargar script dinámicamente
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AcwrDjbuYZJalwyMzZ-58uCKhdf1LzMp0p5HxVYIBq-gaP9oeTZ6u70XK1yGvpf52UyG8KlnmMKEUe-A&currency=MXN&intent=capture';
    script.async = true;
    
    script.onload = () => {
      console.log('PayPal SDK loaded successfully');
      setPaypalLoaded(true);
    };
    
    script.onerror = () => {
      console.error('Error loading PayPal SDK');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup más seguro
      try {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      } catch (error) {
        console.warn('Error removing PayPal script:', error);
      }
    };
  }, []);

  return paypalLoaded;
};