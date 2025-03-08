// components/Pages/TokenInvalidPage.tsx
import React from 'react';
import { IoWarning } from "react-icons/io5";
import ButtonAzul from "../Botones/ButtonAzul";

interface TokenInvalidPageProps {
  error: string;
  onGoBack: () => void;
}

const TokenInvalido: React.FC<TokenInvalidPageProps> = ({ error, onGoBack }) => {
  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center justify-center mb-6 text-red-500">
          <IoWarning className="h-12 w-12" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Enlace no válido</h2>
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
        <div className="flex justify-center">
          <ButtonAzul texto="Volver al inicio" onClick={onGoBack} />
        </div>
      </div>
    </div>
  );
};

export default TokenInvalido;