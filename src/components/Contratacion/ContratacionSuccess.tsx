import React, { useEffect, useState } from 'react';
import { CheckCircle, Mail, User, CreditCard } from 'lucide-react';

interface ContratacionSuccessProps {
  isVisible: boolean;
  onClose: () => void;
  userEmail: string;
  totalAmount: number;
  serviceName?: string;
}

const ContratacionSuccess: React.FC<ContratacionSuccessProps> = ({
  isVisible,
  onClose,
  userEmail,
  totalAmount,
  serviceName = "Servicio Profesional"
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Confetti Animation - Reducido */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce text-lg"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1.5 + Math.random() * 1}s`
              }}
            >
              {['🎉', '✨', '🎊'][Math.floor(Math.random() * 3)]}
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scale-in">
        {/* Header compacto */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white text-center">
          <CheckCircle className="w-12 h-12 mx-auto mb-2 animate-pulse" />
          <h2 className="text-xl font-bold mb-1">¡Pago Exitoso!</h2>
          <p className="text-green-100 text-xs">Contratación confirmada</p>
        </div>

        {/* Contenido principal compacto */}
        <div className="p-4 space-y-4">
          
          {/* Información del correo - Simplificada */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-blue-900 text-sm">Confirmación enviada</span>
            </div>
            <div className="bg-white border border-blue-200 rounded p-2">
              <p className="font-mono text-xs text-blue-800 break-all">
                {userEmail}
              </p>
            </div>
          </div>

          {/* Detalles del pago - Compacto */}
          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-600">Servicio</span>
              </div>
              <span className="text-xs font-medium text-gray-900">
                {serviceName}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-600">Total</span>
              </div>
              <span className="text-sm font-bold text-green-600">
                ${totalAmount.toLocaleString()} MXN
              </span>
            </div>
          </div>

          {/* Próximos pasos - Compacto */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <h4 className="font-semibold text-amber-900 mb-1 text-sm flex items-center gap-1">
              <span className="text-amber-600">📋</span>
              Próximos pasos
            </h4>
            <ul className="text-xs text-amber-800 space-y-0.5">
              <li>• Revisa tu correo electrónico</li>
              <li>• Te contactara el proveedor pronto</li>
            </ul>
          </div>

          {/* Botones de acción - Compactos */}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-3 rounded-lg transition-colors text-sm"
            >
              Cerrar
            </button>
            
            <button
              onClick={() => {
                console.log('Redirigir al panel');
                onClose();
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors text-sm flex items-center justify-center gap-1"
            >
              <User className="w-3 h-3" />
              <span>Mi Panel</span>
            </button>
          </div>

          {/* Mensaje de soporte - Compacto */}
          <div className="text-center pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Soporte:{' '}
              <a href="mailto:soporte@timesp.com" className="text-blue-600 hover:underline">
                soporte@timesp.com
              </a>
            </p>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ContratacionSuccess;