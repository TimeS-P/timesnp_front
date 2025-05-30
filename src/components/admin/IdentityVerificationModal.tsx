import { User, FileText, CheckCircle, AlertTriangle, X, Eye } from 'lucide-react';
import React, { useState } from 'react';


const IdentityVerificationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  usuario: any;
  onAction: (action: 'rechazar' | 'validar') => void;
}> = ({ isOpen, onClose, usuario, onAction }) => {
  if (!isOpen || !usuario) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Verificación de Identidad</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-4">
          <p className="font-medium text-gray-800 mb-2">{usuario.nombre}</p>
        </div>
        
        {/* Mock ID Document Display */}
        <div className="mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="bg-gradient-to-r from-pink-100 to-pink-50 p-4 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-20 bg-gray-200 rounded flex items-center justify-center">
                <User size={24} className="text-gray-400" />
              </div>
              <div className="flex-1">
                <div className="text-xs space-y-1">
                  <p className="font-semibold">INSTITUTO NACIONAL ELECTORAL</p>
                  <p>CREDENCIAL PARA VOTAR</p>
                  <p className="mt-2 font-medium">GOMEZ</p>
                  <p className="font-medium">MARGARITA</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-black border-2 border-gray-300"></div>
                <div className="w-12 h-12 bg-black border-2 border-gray-300"></div>
                <div className="w-6 h-6 bg-black border border-gray-300"></div>
              </div>
            </div>
            <div className="mt-2 text-xs">
              <p>CURP: GOMM760527MDFXXX08</p>
              <p>IDMEX1836577170&lt;074711637584Z</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => onAction('rechazar')}
            className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
          >
            Rechazar
          </button>
          <button 
            onClick={() => onAction('validar')}
            className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
          >
            Validar
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdentityVerificationModal;