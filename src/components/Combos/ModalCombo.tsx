import React from 'react';
import ButtonAzul from '../Botones/ButtonAzul';

interface ComboDetails {
  nombre: string;
  description: string;
  precio: string | number;
  proveedor: string;
  foto: string;
}

interface ModalDetalleComboProps {
  combo: ComboDetails;
  onClose: () => void;
  isCliente: boolean;
}

const ModalCombo: React.FC<ModalDetalleComboProps> = ({ combo, onClose, isCliente }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="relative">
        <img
          src={combo.foto}
          alt={`Combo ${combo.nombre}`}
          className="w-full h-48 object-cover rounded-xl"
        />
        <div className="flex justify-center mb-5">
          <div 
            className="absolute top-full transform -translate-y-1/2 bg-white shadow-lg max-w-fit p-4 rounded-xl"
          >
            <h2 className="text-black text-xl font-bold">{combo.nombre}</h2>
          </div>
        </div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <p className="text-gray-700 font-medium">Proveedor: <span className="font-normal">{combo.proveedor}</span></p>
            <p className="text-gray-700 font-medium mt-2">Precio: <span className="text-green-600 font-semibold">${combo.precio}</span></p>
            <p className="text-gray-700 font-medium mt-2">Descripción:</p>
            <p className="text-gray-600 mt-2">{combo.description}</p>
          </div>
        
          <div className='flex justify-end'>
            <div className="mt-6 w-36">
              {isCliente ?
                (<ButtonAzul
                  texto="Reservar"
                  onClick={() => {
                    // Aquí puedes agregar la lógica para unirte al combo
                    console.log(`Unido al combo: ${combo.nombre}`);
                    onClose();
                  }}
                />)
                :
                (<ButtonAzul
                  texto="Solicitar unirse"
                  onClick={() => {
                    // Aquí puedes agregar la lógica para unirte al combo
                    console.log(`Unido al combo: ${combo.nombre}`);
                    onClose();
                  }}
                />)
              
              }
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCombo;