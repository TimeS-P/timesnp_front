// components/ReferralCode.tsx
import React, { useState } from "react";
import { Gift, CheckCircle, XCircle } from "lucide-react";
import { ReferralData } from "../../types/ContratacionInterfaces/ContratacionInterfaces";
import { checkProfileByCode } from "../../services/Perfil/authService";

interface ReferralCodeProps {
  referralData: ReferralData;
  onReferralChange: (data: ReferralData) => void;
}

const ReferralCode: React.FC<ReferralCodeProps> = ({
  referralData,
  onReferralChange,
}) => {
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | null;
    text: string;
  }>({ type: null, text: '' });

  const handleCodeChange = (referralCode: string) => {
    // Limpiar el mensaje cuando el usuario cambie el código
    setStatusMessage({ type: null, text: '' });
    onReferralChange({ ...referralData, referralCode });
  };

  const applyReferralCode = async () => {
    try {
      const codigo = referralData.referralCode;
      console.log("Applying referral code:", codigo);

      const exists = await checkProfileByCode(codigo);
      console.log("Referral code exists:", exists);

      if (exists) {
        console.log("Código de referido válido.");
        setStatusMessage({ type: 'success', text: 'Código encontrado' });
        // Aquí puedes continuar con la lógica si el código es válido
      } else {
        console.log("El código de referido no existe.");
        setStatusMessage({ type: 'error', text: 'Código no encontrado' });
        // Puedes mostrar un mensaje de error al usuario, por ejemplo con un toast
      }
    } catch (error) {
      console.log("Error al verificar el código de referido:", error);
      setStatusMessage({ type: 'error', text: 'Código no encontrado' });
      // Manejo de error (toast, mensaje, etc.)
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <h5 className="font-bold text-gray-900 text-base mb-3 flex items-center gap-2">
        <Gift className="w-5 h-5 text-purple-600" />
        Código de Referido
      </h5>

      <div className="space-y-3">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-2.5">
          <p className="text-purple-700 text-[11px]">
            Ingresa el código de otro usuario, al realizar el pago recibirá{" "}
            <strong>50 puntos de recompensa</strong>.
          </p>
        </div>

        <div>
          <p className="text-gray-600 text-[10px] mb-2 mx-1">
            Haz clic en el botón para validar y verificar su autenticidad y
            existencia.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={referralData.referralCode}
              onChange={(e) => handleCodeChange(e.target.value)}
              placeholder="Ingresa el código aquí"
              className="flex-1 p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 bg-white"
              disabled={referralData.referralApplied}
            />
            <button
              onClick={applyReferralCode}
              disabled={
                !referralData.referralCode.trim() ||
                referralData.referralApplied
              }
              className="px-4 py-2.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 disabled:bg-gray-300 transition-colors font-semibold whitespace-nowrap"
            >
              {referralData.referralApplied ? "✓" : "Verificar"}
            </button>
          </div>
          
          {/* Mensaje de estado */}
          {statusMessage.type && (
            <div className={`flex items-center gap-1.5 mt-2 text-xs ${
              statusMessage.type === 'success' 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {statusMessage.type === 'success' ? (
                <CheckCircle className="w-3 h-3" />
              ) : (
                <XCircle className="w-3 h-3" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralCode;