import { IoClose } from "react-icons/io5";

interface LoginProps {
  onClose: () => void;
}

function Login({ onClose }: LoginProps) {
  return (
    <div className="w-1/2 bg-white p-8 flex flex-col justify-center baloo-2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#162C51]">Iniciar sesión</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <IoClose className="h-6 w-6" />
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-[#162C51]">Correo</label>
        <input
          type="email"
          placeholder="tucorreo@ejemplo.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#162C51]"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-[#162C51]">Contraseña</label>
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#162C51]"
        />
      </div>

      <div className="flex justify-end mb-6">
        <button className="text-sm text-[#162C51] hover:text-[#33599a] underline">
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      <div className="flex flex-col gap-2 mb-6">
        <button className="w-full bg-[#162C51] text-white py-2 rounded-md hover:bg-[#7483A2] transition-colors">
          Iniciar sesión
        </button>
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

export default Login;
