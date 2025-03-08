// hooks/useTokenValidation.ts
import { useState, useEffect } from 'react';
import { Location } from 'react-router-dom';
import { fetchValidateToken } from '../../services/ForgotPassword/authService';

const useTokenValidation = (location: Location) => {
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Extraer el token de la URL
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get("token");
    
    if (!tokenFromUrl) {
      setError("No se encontró ningún token en la URL");
      setIsLoading(false);
      return;
    }
    
    setToken(tokenFromUrl);
    
    // Validar el token
    const validateTokenFromUrl = async () => {
      try {
        const result = await fetchValidateToken(tokenFromUrl);
        
        if (result.success) {
          setTokenValid(true);
        } else {
          setError(result.message);
        }
      } catch (err) {
        console.error("Error al validar el token:", err);
        setError("Error de conexión. Intenta más tarde");
      } finally {
        setIsLoading(false);
      }
    };
    
    validateTokenFromUrl();
  }, [location]);

  return { token, isLoading, tokenValid, error, setError };
};

export default useTokenValidation;