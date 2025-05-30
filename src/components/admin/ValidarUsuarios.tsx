import { User, FileText, CheckCircle, AlertTriangle, X, Eye } from 'lucide-react';
import React, { useState } from 'react';
import { mockUsuarios } from './AdminSidebar';
import NotificationModal from './NotificationModal';
import IdentityVerificationModal from './IdentityVerificationModal';


const ValidarUsuarios: React.FC = () => {
  const [usuarios] = useState(mockUsuarios);
  const [selectedUsuario, setSelectedUsuario] = useState<any>(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationData, setNotificationData] = useState({
    type: 'verificacion' as 'advertencia' | 'suspension' | 'verificacion' | 'problema',
    title: '',
    message: ''
  });

  const handleVerificar = (usuario: any) => {
    setSelectedUsuario(usuario);
    setShowVerificationModal(true);
  };

  const handleVerificationAction = (action: 'rechazar' | 'validar') => {
    setShowVerificationModal(false);
    
    if (action === 'validar') {
      setNotificationData({
        type: 'verificacion',
        title: 'Notificación/Verificación aprobada',
        message: 'Hola Amalia, Tu identidad ha sido verificada correctamente. Ahora puedes continuar el proceso y comenzar a vender servicios en TimeSAP.'
      });
    } else {
      setNotificationData({
        type: 'problema',
        title: 'Notificación/Problema con tu verificación de identidad',
        message: 'Hola Amalia, No pudimos validar tu identidad con el documento que enviaste. Por favor, asegúrate de que sea una foto nítida y que muestra ambos lados del INE con recortes o reflejos.'
      });
    }
    
    setShowNotificationModal(true);
  };

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Validar Usuarios</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <span>Administrador</span>
            <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Validar usuarios section */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Validar usuarios</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {usuarios.map((usuario) => (
                <div key={usuario.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                    <span className="font-medium text-gray-800">{usuario.nombre}</span>
                  </div>
                  <button 
                    onClick={() => handleVerificar(usuario)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Eye size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Verificación de identidad section */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Verificación de identidad</h2>
            </div>
            
            <div className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <span className="font-medium text-gray-800">Amalia Rosas Fuente</span>
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
                  onClick={() => handleVerificationAction('rechazar')}
                  className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                >
                  Rechazar
                </button>
                <button 
                  onClick={() => handleVerificationAction('validar')}
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                >
                  Validar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <IdentityVerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        usuario={selectedUsuario}
        onAction={handleVerificationAction}
      />

      <NotificationModal
        isOpen={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
        type={notificationData.type}
        title={notificationData.title}
        message={notificationData.message}
      />
    </div>
  );
};

export default ValidarUsuarios;