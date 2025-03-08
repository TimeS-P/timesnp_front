import { IoClose } from "react-icons/io5";
import ButtonAzul from "../Botones/ButtonAzul";
import InputAzul from "../Inputs/InputAzul";

interface ModalLoginProps {
  onClose: () => void;
  onSwitchToForgotPassword: () => void; // Nueva prop para cambiar la vista
}

function ModalLogin({ onClose, onSwitchToForgotPassword }: ModalLoginProps) {
  const handleForgotPasswordClick = () => {
    // Llamamos a la función del padre para cambiar la vista
    onSwitchToForgotPassword();
  };

  return (
    <div className="w-1/2 bg-white p-8 flex flex-col justify-center baloo-2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#162C51]">Iniciar sesión</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <IoClose className="h-6 w-6" />
        </button>
      </div>

      <div className="mb-4">
        <InputAzul
          label="Correo electrónico"
          type="email"
          placeholder="tucorreo@ejemplo.com"
          value=""
          onChange={() => {}}
        />
      </div>

      <div className="mb-4">
        <InputAzul
          label="Contraseña"
          type="password"
          placeholder="Ingrese la contraseña"
          value=""
          onChange={() => {}}
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
        <ButtonAzul texto="Iniciar sesión" />
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