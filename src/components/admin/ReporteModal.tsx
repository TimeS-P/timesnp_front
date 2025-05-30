import { Reporte } from "./AdminSidebar";
import { User, FileText, CheckCircle, AlertTriangle, X, Eye } from 'lucide-react';

// Modal Components
const ReporteModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  reporte: Reporte | null;
  onAction: (action: 'advertencia' | 'suspension') => void;
}> = ({ isOpen, onClose, reporte, onAction }) => {
  if (!isOpen || !reporte) return null;

  const parseComentario = (comentario: string) => {
    try {
      const parsed = JSON.parse(comentario);
      return parsed.comentario || comentario;
    } catch {
      return comentario;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Reporte de Incumplimiento</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del proveedor
            </label>
            <input 
              type="text" 
              value={`${reporte.perfil.nombre} ${reporte.perfil.apellidoPaterno}`}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Servicio realizado
            </label>
            <input 
              type="text" 
              value="Maquillaje profesional"
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ¿Qué aspectos no cumplió?
            </label>
            <textarea 
              value={parseComentario(reporte.comentario)}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 h-20 resize-none"
            />
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button 
            onClick={() => onAction('advertencia')}
            className="flex-1 bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors"
          >
            Emitir advertencia
          </button>
          <button 
            onClick={() => onAction('suspension')}
            className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
          >
            Suspensión definitiva
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReporteModal;