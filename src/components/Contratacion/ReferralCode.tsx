// components/ReferralCode.tsx
import React from "react";
import { Gift } from "lucide-react";
import { ReferralData } from "../../types/ContratacionInterfaces/ContratacionInterfaces";

interface ReferralCodeProps {
  referralData: ReferralData;
  onReferralChange: (data: ReferralData) => void;
}

const ReferralCode: React.FC<ReferralCodeProps> = ({
  referralData,
  onReferralChange,
}) => {
  const handleCodeChange = (referralCode: string) => {
    onReferralChange({ ...referralData, referralCode });
  };

  const applyReferralCode = () => {
    if (referralData.referralCode.trim() !== "") {
      onReferralChange({ ...referralData, referralApplied: true });
      alert(
        `¡Código aplicado! Se han otorgado 50 puntos al usuario del código ${referralData.referralCode}`
      );
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
                !referralData.referralCode.trim() || referralData.referralApplied
              }
              className="px-4 py-2.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 disabled:bg-gray-300 transition-colors font-semibold whitespace-nowrap"
            >
              {referralData.referralApplied ? "✓" : "Verificar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralCode;