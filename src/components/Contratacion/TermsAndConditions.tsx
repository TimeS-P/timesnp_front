// components/TermsAndConditions.tsx
import React from "react";
import { AlertCircle } from "lucide-react";

interface TermsAndConditionsProps {
  acceptTerms: boolean;
  onAcceptTermsChange: (acceptTerms: boolean) => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  acceptTerms,
  onAcceptTermsChange,
}) => {
  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <div className="text-sm text-gray-700 mb-3">
            <p className="font-semibold mb-1">Términos importantes:</p>
            <p>
              El servicio puede ajustarse según condiciones específicas.
              Cualquier trabajo adicional se cobrará presencialmente.
            </p>
          </div>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => onAcceptTermsChange(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-indigo-600 mt-0.5"
            />
            <span className="text-sm text-gray-700">
              Acepto los términos y condiciones del servicio
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;