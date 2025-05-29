// components/PaymentButtons.tsx
import React from "react";
import { CreditCard } from "lucide-react";
import { AllFormData } from "../../types/ContratacionInterfaces/ContratacionInterfaces";

interface PaymentButtonsProps {
  allFormData: AllFormData;
  canProceed: boolean;
  onClose: () => void;
  onPayment: (formData: AllFormData) => void;
}

const PaymentButtons: React.FC<PaymentButtonsProps> = ({
  allFormData,
  canProceed,
  onClose,
  onPayment,
}) => {
  const handlePayment = () => {
    if (canProceed) {
      // Aquí tienes toda la información del formulario para enviar a tu API
      console.log("Datos completos para la API:", allFormData);
      onPayment(allFormData);
    }
  };

  return (
    <div className="space-y-3">
      <button
        disabled={!canProceed}
        onClick={handlePayment}
        className={`w-full px-6 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
          canProceed
            ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        <CreditCard className="w-6 h-6" />
        Pagar ${allFormData.totalPrice}
      </button>

      <button
        onClick={onClose}
        className="w-full px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-semibold"
      >
        Cancelar
      </button>
    </div>
  );
};

export default PaymentButtons;