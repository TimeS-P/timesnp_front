import React, { useState } from 'react';
import { FaCheck, FaCopy, FaCheckCircle } from 'react-icons/fa';

function NombrePerfil() {
  const [copied, setCopied] = useState(false);
  const codigoUsuario = "3413af2";
  
  const copiarCodigo = () => {
    navigator.clipboard.writeText(codigoUsuario);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className='text-white px-4 space-y-2'>
      
      <h2 className="text-6xl font-bold">Alicia Cervantes Fernandez</h2>
      
      <div className="flex items-center w-full rounded-md text-2xl">
        <span>{codigoUsuario}</span>
        <button 
          onClick={copiarCodigo}
          className="ml-2 p-1 rounded transition-colors"
          aria-label="Copiar código"
        >
          {copied ? <FaCheck className="text-green-500" /> : <FaCopy className="text-white" />}
        </button>
      </div>
    </div>
  );
}

export default NombrePerfil;