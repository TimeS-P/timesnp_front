import { User, FileText, CheckCircle, AlertTriangle, X, Eye } from 'lucide-react';
import React from 'react';

const NotificationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  type: 'advertencia' | 'suspension' | 'verificacion' | 'problema';
  title: string;
  message: string;
}> = ({ isOpen, onClose, type, title, message }) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'advertencia':
        return <AlertTriangle className="text-yellow-500" size={24} />;
      case 'suspension':
        return <X className="text-red-500" size={24} />;
      case 'verificacion':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'problema':
        return <AlertTriangle className="text-red-500" size={24} />;
      default:
        return <AlertTriangle className="text-gray-500" size={24} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 max-w-md">
        <div className="flex items-center gap-3 mb-4">
          {getIcon()}
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        
        <p className="text-gray-600 mb-6">{message}</p>
        
        <button 
          onClick={onClose}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;