import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorMessage from "../components/Notificaciones/ErrorMessage";
import Notification from "../components/Notificaciones/Notificacion";
import PasswordForm from "../components/RecuperarContraseña/PasswordForm";
import LoadingSpinner from "../components/LoadingStates/LoadingSpinner";
import TokenInvalido from "../components/RecuperarContraseña/TokenInvalido";
import useTokenValidation from "../hooks/ForgotPassword/useTokenValidation";
import BackButton from "../components/Botones/BackButton";
import HeaderRecuperacion from "../components/RecuperarContraseña/HeaderRecuperacion";

function RecuperarContrasena() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Usar custom hook para validación de token
  const { token, isLoading, tokenValid, error, setError } = useTokenValidation(location);

  // Cerrar la notificación
  const closeNotification = () => {
    setShowNotification(false);
    setError("");
  };

  // Manejador de éxito
  const handleSuccess = (message: string) => {
    setNotificationMessage(message);
    setIsSuccess(true);
    setShowNotification(true);
    
    // Redirigir después de 4 segundos
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  // Manejador de error
  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  // Mostrar mensaje de carga
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Mostrar mensaje de error si el token no es válido
  if (!tokenValid) {
    return <TokenInvalido error={error} onGoBack={() => navigate("/")} />;
  }

  // Mostrar formulario para cambiar contraseña
  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative">
        {/* Notificación */}
        {showNotification && (
          <Notification 
            show={showNotification}
            message={notificationMessage} 
            isSuccess={isSuccess} 
            onClose={closeNotification} 
          />
        )}
        
        <HeaderRecuperacion />
        
        {error && <ErrorMessage message={error} onClose={closeNotification} />}
        
        <PasswordForm 
          token={token}
          onSuccess={handleSuccess}
          onError={handleError}
        />
        
        <div className="mt-6 text-center">
          <BackButton onClick={() => navigate("/")} text="Volver al inicio" />
        </div>
      </div>
    </div>
  );
}

export default RecuperarContrasena;