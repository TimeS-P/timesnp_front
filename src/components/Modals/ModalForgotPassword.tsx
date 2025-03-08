import { IoClose } from "react-icons/io5";
import InputAzul from "../Inputs/InputAzul";
import { usePasswordRecovery } from "../../hooks/ForgotPassword/usePasswordRecovery";
import Notification from "../Notificaciones/Notificacion";
import LoadingButton from "../Botones/LoadingButton";

interface ModalForgotPasswordProps {
  onReturn: () => void;
  onClose: () => void;
  setActiveView?: (view: string) => void;
}

function ModalForgotPassword({
  onReturn,
  onClose,
  setActiveView,
}: ModalForgotPasswordProps) {
  const {
    email,
    isLoading,
    notification,
    handleEmailChange,
    sendRecoveryEmail,
    hideNotification
  } = usePasswordRecovery();

  const handleActiveLogin = () => {
    if (setActiveView) {
      setActiveView("login");
    }
    onClose();
  };

  return (
    <div className="w-1/2 bg-white p-8 flex flex-col justify-center baloo-2 relative">
      {/* Notificación */}
      <Notification
        show={notification.show}
        message={notification.message}
        isSuccess={notification.isSuccess}
        onClose={hideNotification}
      />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#162C51]">
          Recuperar contraseña
        </h2>
        <button
          onClick={handleActiveLogin}
          className="text-gray-500 hover:text-gray-700"
        >
          <IoClose className="h-6 w-6" />
        </button>
      </div>

      <p className="text-gray-600 mb-6">
        Ingresa la direccion de correo electronico que usas en TimeS&p. Nosotros
        te enviaremos un link para restablecer tu contraseña.
      </p>

      <div className="mb-6">
        <InputAzul
          label="Correo electrónico"
          type="email"
          placeholder="tucorreo@ejemplo.com"
          value={email}
          onChange={handleEmailChange}
        />
      </div>

      <div className="flex flex-col gap-2 mb-6">
        <LoadingButton 
          isLoading={isLoading} 
          text="Enviar enlace" 
          onClick={sendRecoveryEmail} 
        />
      </div>

      <div className="text-center">
        <button
          onClick={onReturn}
          className="text-sm text-[#162C51] hover:text-[#33599a] underline"
        >
          Volver a iniciar sesión
        </button>
      </div>
    </div>
  );
}

export default ModalForgotPassword;