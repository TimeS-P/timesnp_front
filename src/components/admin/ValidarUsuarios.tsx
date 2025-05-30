import { User, FileText, CheckCircle, AlertTriangle, X, Eye } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { mockUsuarios } from './AdminSidebar';
import NotificationModal from './NotificationModal';
import IdentityVerificationModal from './IdentityVerificationModal';
import { getVerificacionesPendientes } from '../../services/CategoriasAndServices/authService';


const ValidarUsuarios: React.FC = () => {

  const [verificacionesPendientes, setVerificacionesPendientes] = useState<any[]>([]);

  const [selectedVerificacion, setSelectedVerificacion] = useState<any>(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationData, setNotificationData] = useState({
    type: 'verificacion' as 'advertencia' | 'suspension' | 'verificacion' | 'problema',
    title: '',
    message: ''
  });

  useEffect(() => {
    const fetchVerificaciones = async () => {
      try {
        const data = await getVerificacionesPendientes();
        if (data) {
            setVerificacionesPendientes(data);
        }
      } catch (error) {
        console.error('Error fetching verificaciones:', error);
      }
    };

    fetchVerificaciones();
  }, []);

  const handleVerificar = (verificacion: any) => {
    setSelectedVerificacion(verificacion);
    setShowVerificationModal(true);
  };

  const handleVerificationAction = (action: 'rechazar' | 'validar') => {
    setShowVerificationModal(false);
    
    if (action === 'validar') {
      setNotificationData({
        type: 'verificacion',
        title: 'Notificación/Verificación aprobada',
        message: `Hola ${selectedVerificacion.perfil.nombre}, Tu identidad ha sido verificada correctamente. Ahora puedes continuar el proceso y comenzar a vender servicios en TimeSAP.`
      });
    } else {
      setNotificationData({
        type: 'problema',
        title: 'Notificación/Problema con tu verificación de identidad',
        message: `Hola ${selectedVerificacion.perfil.nombre}, No pudimos validar tu identidad con el documento que enviaste. Por favor, asegúrate de que sea una foto nítida y que muestra ambos lados del INE con recortes o reflejos.`
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

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Validar usuarios section */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Validar usuarios</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {verificacionesPendientes.map((verificacion) => (
                <div key={verificacion.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                    <span className="font-medium text-gray-800">{verificacion.perfil.nombre} {verificacion.perfil.apellidoPaterno} {verificacion.perfil.apellidoMaterno}</span>
                  </div>
                  <button 
                    onClick={() => handleVerificar(verificacion)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Eye size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          
        </div>
      </div>

      <IdentityVerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        verificacion={selectedVerificacion}
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