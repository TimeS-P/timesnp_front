import { IoClose } from "react-icons/io5";
import InputAzul from "../Inputs/InputAzul";
import Notification from "../Notificaciones/Notificacion";
import { login } from "../../services/Login/apiService";
import { useState, ChangeEvent, useEffect } from "react";
import LoadingButton from "../Botones/LoadingButton";

interface ModalLoginProps {
  onClose: () => void;
  onSwitchToForgotPassword: () => void;
}

function ModalLogin({ onClose, onSwitchToForgotPassword }: ModalLoginProps) {
  // Estados para manejar los inputs
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Estado para notificaciones
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    isSuccess: false,
  });

  // Efecto para manejar las notificaciones y el cierre automático
  useEffect(() => {
    let notificationTimer: NodeJS.Timeout;
    let modalTimer: NodeJS.Timeout;

    if (notification.show) {
      // Cierra automáticamente todas las notificaciones después de 3 segundos
      notificationTimer = setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }));
      }, 2000);

      // Si es una notificación de éxito, cierra el modal después
      if (notification.isSuccess) {
        modalTimer = setTimeout(() => {
          onClose();
          window.location.reload(); // Recargar la página
        }, 1100);
      }
    }

    return () => {
      if (notificationTimer) clearTimeout(notificationTimer);
      if (modalTimer) clearTimeout(modalTimer);
    };
  }, [notification.show, notification.isSuccess, onClose]);

  // Manejadores de cambios en los inputs
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleForgotPasswordClick = () => {
    onSwitchToForgotPassword();
  };

  const handleSumbit = async () => {
    if (!email.trim() || !password.trim()) {
      setNotification({
        show: true,
        message: "Por favor complete todos los campos",
        isSuccess: false,
      });
      return;
    }

    setIsLoading(true); // Activar animación de carga

    try {
      const data = await login(email, password);
      console.log("Respuesta del login: ", data);

      if (data && data.OK) {
        setNotification({
          show: true,
          message: "Has iniciado sesión correctamente",
          isSuccess: true,
        });
      } else {
        setNotification({
          show: true,
          message: "Credenciales inválidas. Por favor intente nuevamente.",
          isSuccess: false,
        });
      }
    } catch (error) {
      console.error("ERROR al hacer post: ", error);
      setNotification({
        show: true,
        message: "Credenciales inválidas. Por favor intente nuevamente.",
        isSuccess: false,
      });
    } finally {
      setIsLoading(false); // Desactivar animación
    }
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, show: false }));
  };

  return (
    <div className="w-1/2 bg-white p-8 flex flex-col justify-center baloo-2 relative">
      {/* Notificación */}
      <Notification
        show={notification.show}
        message={notification.message}
        isSuccess={notification.isSuccess}
        onClose={handleCloseNotification}
      />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#162C51]">Iniciar sesión</h1>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <IoClose className="h-6 w-6" />
        </button>
      </div>

      <div className="mb-4">
        <InputAzul
          label="Correo electrónico"
          type="email"
          placeholder="tucorreo@ejemplo.com"
          value={email}
          onChange={handleEmailChange}
        />
      </div>

      <div className="mb-4">
        <InputAzul
          label="Contraseña"
          type="password"
          placeholder="Ingrese la contraseña"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>

      <div className="flex justify-end mb-6">
        <button
          className="text-sm text-[#162C51] hover:text-[#33599a] underline"
          onClick={handleForgotPasswordClick}
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      <div className="flex flex-col gap-2 mb-6">
        <LoadingButton isLoading={isLoading} text="Iniciar sesión" onClick={handleSumbit} />
      </div>

      <div className="flex items-center mb-6">
        <div className="flex-grow h-px bg-[#162C51]"></div>
        <span className="px-4 text-sm text-[#162C51] font-medium">o</span>
        <div className="flex-grow h-px bg-[#162C51]"></div>
      </div>

      <div className="text-center text-sm text-[#162C51]">
        ¿No tienes una cuenta?
        <button className="ml-1 text-[#162C51] hover:text-[#7483A2] font-bold">
          Regístrate aquí
        </button>
      </div>
    </div>
  );
}

export default ModalLogin;
