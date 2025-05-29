import React, { useEffect, useState } from 'react';

interface ToggleUserTypeButtonProps {
  isCliente: (value: boolean) => void;
}

const ToggleUserTypeButton: React.FC<ToggleUserTypeButtonProps> = ({ isCliente }) => {
  const [userType, setUserType] = useState('cliente');

  const toggleUserType = () => {
    setUserType(userType === 'cliente' ? 'proveedor' : 'cliente');
  };

  useEffect(() => {
    if (userType === 'cliente') {
      isCliente(true);
    } else {
      isCliente(false);
    }
  }
  , [userType, isCliente]);

  return (
    <div className="flex justify-center p-4">
      <div 
        className="relative bg-white rounded-full shadow-lg flex w-full max-w-md cursor-pointer"
        onClick={toggleUserType}
      >
        {/* Background pill */}
        <div className="w-64 h-12 rounded-full flex items-center justify-between px-4">
          {/* Slider that moves */}
          <div 
            className={`absolute top-0 bottom-0 w-1/2 bg-[#cf9577] rounded-full transition-all duration-300 ease-in-out ${
              userType === 'cliente' ? 'left-0' : 'left-1/2'
            }`}
          />
          
          {/* Text labels */}
          <div className={`relative z-10 flex-1 text-center text-lg font-medium transition-colors duration-300 ${
            userType === 'cliente' ? 'text-white' : 'text-gray-700'
          }`}>
            Cliente
          </div>
          <div className={`relative z-10 flex-1 text-center text-lg font-medium transition-colors duration-300 ${
            userType === 'proveedor' ? 'text-white' : 'text-gray-700'
          }`}>
            Proveedor
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToggleUserTypeButton;