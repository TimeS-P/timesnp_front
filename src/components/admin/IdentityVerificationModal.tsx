import { User, FileText, CheckCircle, AlertTriangle, X, Eye } from 'lucide-react';
import React, { useState } from 'react';
import { getUrlDocumentoVerificacion } from '../../services/CategoriasAndServices/authService';

const IdentityVerificationModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    verificacion: any;
    onAction: (action: 'rechazar' | 'validar') => void;
}> = ({ isOpen, onClose, verificacion, onAction }) => {
    if (!isOpen || !verificacion) return null;

    const [documentoIdentidadUrl, setDocumentoIdentidadUrl] = useState<string | null>(null);
    const fetchDocumentoIdentidad = async () => {
        try {
            const url = await getUrlDocumentoVerificacion(verificacion.filename_foto_credencial);
            setDocumentoIdentidadUrl(url);
        } catch (error) {
            console.error('Error fetching document URL:', error);
        }
    }

    React.useEffect(() => {
        if (verificacion) {
            fetchDocumentoIdentidad();
        }
    }, [verificacion]);



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
                    <p className="font-medium text-gray-800 mb-2">{verificacion.perfil.nombre} {verificacion.perfil.apellidoPaterno} {verificacion.perfil.apellidoMaterno}</p>
                </div>

                {/* Mock ID Document Display */}
                <div className="mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                    {/* Imagen del documento de identidad por su url */}

                    <img
                        src={documentoIdentidadUrl || '/placeholder-document.png'}
                        alt="Documento de Identidad"
                        className="w-full h-auto rounded-md"
                    />
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