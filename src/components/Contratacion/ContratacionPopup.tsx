// components/ContratacionPopup.tsx
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  ContratacionData,
  ContratacionPopupProps,
  ServiceConfigData,
  ReferralData,
  PaymentData,
  AllFormData,
} from "../../types/ContratacionInterfaces/ContratacionInterfaces";
import ProviderInfo from "./ProviderInfo";
import ServiceConfiguration from "./ServiceConfiguration";
import ReferralCode from "./ReferralCode";
import PaymentSummary from "./PaymentSummary";
import TermsAndConditions from "./TermsAndConditions";
import PaymentButtons from "./PaymentButtons";
import { CustomJWTPayload } from "../../ts/interfaces/global";
import { jwtDecode } from "jwt-decode";

const ContratacionPopup: React.FC<ContratacionPopupProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const jwtToken = sessionStorage.getItem("JWT-TOKEN");
  let decodedToken: CustomJWTPayload | null = null;

  if (jwtToken) {
    try {
      decodedToken = jwtDecode<CustomJWTPayload>(jwtToken);
    } catch (e) {
      decodedToken = null;
    }
  }
  // Estados para cada sección
  const [serviceConfig, setServiceConfig] = useState<ServiceConfigData>({
    selectedDate: "",
    selectedHours: 1,
    selectedMeters: 1,
    startTime: "09:00",
    endTime: "10:00",
  });

  const [referralData, setReferralData] = useState<ReferralData>({
    referralCode: "",
    referralApplied: false,
  });

  const [paymentData, setPaymentData] = useState<PaymentData>({
    usePoints: false,
    acceptTerms: false,
    basePrice: data.price,
    pointsDiscount: 0,
    totalPrice: data.price,
    availablePoints: decodedToken.puntos, // Asumiendo que el JWT contiene los puntos del usuario
    pointsValue: 0.5,
  });

  // Calcular precio base
  const calculateBasePrice = () => {
    if (data.tipoPrecio === "Por hora") {
      return data.price * serviceConfig.selectedHours;
    } else if (data.tipoPrecio === "Por metro cuadrado") {
      return data.price * serviceConfig.selectedMeters;
    } else {
      return data.price;
    }
  };

  // Calcular descuento por puntos
  const calculatePointsDiscount = () => {
    if (!paymentData.usePoints) return 0;
    const maxDiscount = Math.min(
      paymentData.availablePoints * paymentData.pointsValue,
      calculateBasePrice() * 0.3
    );
    return Math.floor(maxDiscount);
  };

  // Actualizar precios cuando cambian los datos
  useEffect(() => {
    const basePrice = calculateBasePrice();
    const pointsDiscount = calculatePointsDiscount();
    const totalPrice = basePrice - pointsDiscount;

    setPaymentData((prev) => ({
      ...prev,
      basePrice,
      pointsDiscount,
      totalPrice,
    }));
  }, [
    serviceConfig.selectedHours,
    serviceConfig.selectedMeters,
    data.price,
    data.tipoPrecio,
    paymentData.usePoints,
    paymentData.availablePoints,
    paymentData.pointsValue,
  ]);

  // Actualizar hora de fin cuando cambia la hora de inicio o duración
  useEffect(() => {
    if (data.tipoPrecio === "Por hora" && serviceConfig.startTime) {
      const [hours, minutes] = serviceConfig.startTime.split(":").map(Number);
      const startDate = new Date();
      startDate.setHours(hours, minutes, 0, 0);

      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + serviceConfig.selectedHours);

      const endTimeString = `${endDate
        .getHours()
        .toString()
        .padStart(2, "0")}:${endDate.getMinutes().toString().padStart(2, "0")}`;

      if (endTimeString !== serviceConfig.endTime) {
        setServiceConfig((prev) => ({ ...prev, endTime: endTimeString }));
      }
    }
  }, [serviceConfig.startTime, serviceConfig.selectedHours, data.tipoPrecio]);

  // Verificar si se puede proceder
  const canProceed = () => {
    if (!paymentData.acceptTerms) return false;
    return serviceConfig.selectedDate !== "";
  };

  // Función para manejar el pago - aquí recibirás todos los datos
  const handlePayment = (allFormData: AllFormData) => {
    // Aquí puedes hacer tu llamada a la API con todos los datos
    console.log("Datos completos para enviar a la API:", allFormData);

    // Ejemplo de estructura de datos que recibirás:
    /*
    {
      // Datos del proveedor
      providerData: ContratacionData,
      
      // Configuración del servicio
      selectedDate: string,
      selectedHours: number,
      selectedMeters: number,
      startTime: string,
      endTime: string,
      
      // Datos de referido
      referralCode: string,
      referralApplied: boolean,
      
      // Datos de pago
      usePoints: boolean,
      acceptTerms: boolean,
      basePrice: number,
      pointsDiscount: number,
      totalPrice: number,
      availablePoints: number,
      pointsValue: number
    }
    */

    // Aquí puedes agregar tu lógica de API
    alert(`Procesando pago de ${allFormData.totalPrice}...`);
    onClose();
  };

  // Combinar todos los datos del formulario
  const getAllFormData = (): AllFormData => {
    return {
      providerData: data,
      ...serviceConfig,
      ...referralData,
      ...paymentData,
    };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900">
            Contratar Servicio
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* 1. INFORMACIÓN DEL PROVEEDOR */}
          <ProviderInfo data={data} />

          {/* 2. CONFIGURACIÓN DEL SERVICIO */}
          <ServiceConfiguration
            data={data}
            config={serviceConfig}
            onConfigChange={setServiceConfig}
          />

          {/* 3. CÓDIGO DE REFERIDO Y 4. RESUMEN EN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 3. CÓDIGO DE REFERIDO */}
            <ReferralCode
              referralData={referralData}
              onReferralChange={setReferralData}
            />

            {/* 4. RESUMEN */}
            <PaymentSummary
              paymentData={paymentData}
              onPaymentChange={setPaymentData}
            />
          </div>

          {/* 5. TÉRMINOS Y CONDICIONES */}
          <TermsAndConditions
            acceptTerms={paymentData.acceptTerms}
            onAcceptTermsChange={(acceptTerms) =>
              setPaymentData((prev) => ({ ...prev, acceptTerms }))
            }
          />

          {/* 6. BOTONES DE ACCIÓN */}
          <PaymentButtons
            allFormData={getAllFormData()}
            canProceed={canProceed()}
            onClose={onClose}
            onPayment={handlePayment}
          />
        </div>
      </div>
    </div>
  );
};

export default ContratacionPopup;
