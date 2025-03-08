import React from 'react';
import { IoLockClosed } from "react-icons/io5";

const HeaderRecuperacion: React.FC = () => {
  return (
    <div className="flex items-center mb-6">
      <div className="bg-blue-100 p-3 rounded-full mr-4">
        <IoLockClosed className="h-6 w-6 text-[#162C51]" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-[#162C51]">
          Recuperar contraseña
        </h2>
        <p className="text-sm text-gray-600">Crea una nueva contraseña segura</p>
      </div>
    </div>
  );
};

export default HeaderRecuperacion;