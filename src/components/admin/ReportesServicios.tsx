import { Reporte, ReportesResponse } from "./AdminSidebar";
import NotificationModal from "./NotificationModal";
import ReporteModal from "./ReporteModal";
import { User, FileText, CheckCircle, AlertTriangle, X, Eye } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const ReportesServicios: React.FC = () => {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReporte, setSelectedReporte] = useState<Reporte | null>(null);
  const [showReporteModal, setShowReporteModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationData, setNotificationData] = useState({
    type: 'advertencia' as 'advertencia' | 'suspension' | 'verificacion' | 'problema',
    title: '',
    message: ''
  });

  useEffect(() => {
    fetchReportes();
  }, []);

  const fetchReportes = async () => {
    try {
      setLoading(true);
      const serviceId = "28a74521-0de7-4a98-9bc6-ec0a82f59055";
      const response = await fetch(`http://localhost:8080/api/reportes/${serviceId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch reportes');
      }
      
      const data: ReportesResponse = await response.json();
      
      if (data.OK) {
        setReportes(data.data);
      } else {
        setError('Error al obtener los reportes');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error('Error fetching reportes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerDetalles = (reporte: Reporte) => {
    setSelectedReporte(reporte);
    setShowReporteModal(true);
  };

  const handleAction = (action: 'advertencia' | 'suspension') => {
    setShowReporteModal(false);
    
    if (action === 'advertencia') {
      setNotificationData({
        type: 'advertencia',
        title: 'Notificación/Advertencia por incumplimiento o...',
        message: 'Queremos informarte que se ha registrado un reporte relacionado con uno de los servicios que ofreces en la plataforma TimeSAP.'
      });
    } else {
      setNotificationData({
        type: 'suspension',
        title: 'Notificación/Cuenta suspendida',
        message: 'Tu cuenta ha sido suspendida de forma definitiva debido a reportes reiterados por incumplimiento.'
      });
    }
    
    setShowNotificationModal(true);
  };

  if (loading) {
    return (
      <div className="flex-1 bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Cargando reportes...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-red-500">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Reportes de Servicios</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <span>Administrador</span>
            <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Reportes de Servicios</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {reportes.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No hay reportes disponibles
              </div>
            ) : (
              reportes.map((reporte) => (
                <div key={reporte.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {reporte.perfil.nombre} {reporte.perfil.apellidoPaterno}
                      </p>
                      <p className="text-sm text-gray-500">Maquillaje profesional</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleVerDetalles(reporte)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Detalles del reporte
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <ReporteModal
        isOpen={showReporteModal}
        onClose={() => setShowReporteModal(false)}
        reporte={selectedReporte}
        onAction={handleAction}
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

export default ReportesServicios;