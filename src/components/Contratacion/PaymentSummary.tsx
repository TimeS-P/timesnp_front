// components/PaymentSummary.tsx
import React from "react";
import { Calculator, Award } from "lucide-react";
import { PaymentData } from "../../types/ContratacionInterfaces/ContratacionInterfaces";

interface PaymentSummaryProps {
  paymentData: PaymentData;
  onPaymentChange: (data: PaymentData) => void;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  paymentData,
  onPaymentChange,
}) => {
  const handleUsePointsChange = (usePoints: boolean) => {
    onPaymentChange({ ...paymentData, usePoints });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <h4 className="font-semibold text-gray-800 text-base mb-3 flex items-center gap-2">
        <Calculator className="w-5 h-5 text-gray-500" />
        Resumen
      </h4>

      <div className="space-y-2 text-sm">
        {/* Recompensas - tono dorado para reflejar valor */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span className="text-sm text-amber-700 leading-tight">
                <span className="block text-xs">Tienes</span>
                <span className="text-[10px] font-semibold">
                  {paymentData.availablePoints} puntos
                </span>
              </span>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={paymentData.usePoints}
                onChange={(e) => handleUsePointsChange(e.target.checked)}
                className="w-4 h-4 accent-amber-500"
              />
              <div className="flex flex-col">
                <span className="text-xs text-amber-700 font-medium">
                  Usar puntos
                </span>
                <span className="text-[9px] text-gray-500">
                  ${paymentData.pointsValue} cada uno
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Descuento aplicado - tono verde para ahorro */}
        <div className="flex justify-between text-xs">
          <span className="text-gray-700">Precio base:</span>
          <span className="font-medium text-gray-800">
            ${paymentData.basePrice}
          </span>
        </div>

        <div className="flex justify-between text-xs">
          <span className="text-emerald-600">Descuento aplicado:</span>
          <span className="text-emerald-600 font-semibold">
            -${paymentData.pointsDiscount}
          </span>
        </div>

        <div className="border-t border-gray-300 pt-2">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-900">Total:</span>
            <span className="font-bold text-lg text-gray-900">
              ${paymentData.totalPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;