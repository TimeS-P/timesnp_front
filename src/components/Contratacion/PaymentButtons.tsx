// components/PaymentButtons.tsx
import React, { useState, useEffect, useRef } from "react";
import { AlertCircle, CreditCard } from "lucide-react";
import { AllFormData } from "../../types/ContratacionInterfaces/ContratacionInterfaces";
import { usePayPal } from "../../hooks/Paypal/usePaypal";
import { createContratacion } from "../../services/Contratacion/authService";
import { sendEmail } from "../../services/Contratacion/authService";
import { CustomJWTPayload } from "../../ts/interfaces/global";
import { jwtDecode } from "jwt-decode";
import ContratacionSuccess from "./ContratacionSuccess";

const jwtToken = sessionStorage.getItem("JWT-TOKEN");
let decodedToken: CustomJWTPayload | null = null;
if (jwtToken) {
  try {
    decodedToken = jwtDecode<CustomJWTPayload>(jwtToken);
  } catch (e) {
    decodedToken = null;
    // Manejar el error o redirigir al login
  }
}

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
  const [isProcessing, setIsProcessing] = useState(false);
  const paypalLoaded = usePayPal();
  const paypalRef = useRef<HTMLDivElement>(null);
  const [paypalButtonRendered, setPaypalButtonRendered] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Función para limpiar completamente PayPal
  const cleanupPayPal = () => {
    try {
      // Limpiar el contenedor del botón
      if (paypalRef.current) {
        paypalRef.current.innerHTML = "";
      }
      
      // Resetear estados
      setPaypalButtonRendered(false);
      setIsProcessing(false);
      
      // Limpiar cualquier script o instancia de PayPal si es necesario
      if (window.paypal && window.paypal.close) {
        window.paypal.close();
      }
      
    } catch (error) {
      console.warn("Error limpiando PayPal:", error);
    }
  };

  // Renderizar botón de PayPal cuando esté listo
  useEffect(() => {
    if (
      paypalLoaded &&
      canProceed &&
      paypalRef.current &&
      !paypalButtonRendered &&
      window.paypal
    ) {
      setPaypalButtonRendered(true);

      window.paypal
        .Buttons({
          // Estilo del botón
          style: {
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "pay",
            height: 50,
          },

          // Crear la orden de pago
          createOrder: (data: any, actions: any) => {
            console.log("Creando orden PayPal", allFormData);
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: allFormData.totalPrice.toString(),
                    currency_code: "MXN",
                  },
                  description: "Servicio de contratación",
                },
              ],
            });
          },

          // Cuando se aprueba el pago
          onApprove: async (data: any, actions: any) => {
            console.log("Pago aprobado por PayPal:", data);
            setIsProcessing(true);

            try {
              // Capturar el pago en PayPal
              const details = await actions.order.capture();
              console.log("Detalles del pago capturado:", details);

              // Crear el servicio de contratación
              await createContratacion(allFormData);

              await sendEmail({
                addressee: "alexyanguie5@gmail.com",
                subject: "Confirmación de contratación de servicio - TimeS&P",
                message: `¡Gracias por tu contratación! Tu pago de $${allFormData.totalPrice} MXN fue procesado exitosamente.`,
                title: "¡Contratación Exitosa!",
                name: decodedToken.name,
                // Campos adicionales para el correo de contratación
                tipoServicio: "Servicio Profesional",
                categoria: "General",
                totalPagado: allFormData.totalPrice.toString(),
                fechaContratacion: new Date().toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
                duracion: "Por definir",
              });
              
              // Limpiar PayPal antes de mostrar el mensaje de éxito
              cleanupPayPal();
              
              // Mostrar mensaje de éxito
              setShowSuccessMessage(true);
              
            } catch (error) {
              console.error("Error procesando el pago:", error);
              alert("Error al procesar el pago. Por favor intente nuevamente.");
              setIsProcessing(false);
            }
          },

          // Manejo de errores
          onError: (err: any) => {
            console.error("Error en PayPal:", err);
            alert("Error con PayPal. Por favor intente nuevamente.");
            setIsProcessing(false);
          },

          // Cuando se cancela el pago
          onCancel: (data: any) => {
            console.log("Pago cancelado:", data);
            alert("Pago cancelado por el usuario.");
            setIsProcessing(false);
          },
        })
        .render(paypalRef.current);
    }
  }, [paypalLoaded, canProceed, paypalButtonRendered, allFormData, onPayment]);

  // Limpiar el botón si cambian las condiciones
  useEffect(() => {
    if (!canProceed && paypalRef.current) {
      cleanupPayPal();
    }
  }, [canProceed]);

  // Función para manejar el cierre completo
  const handleCompleteClose = () => {
    cleanupPayPal();
    setShowSuccessMessage(false);
    onClose(); // Cierra el modal principal
  };

  return (
    <div className="space-y-4">
      {/* Información del pago */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">Información del pago:</p>
            <ul className="space-y-1 text-xs">
              <li>• El pago se procesará a través de PayPal</li>
              <li>• El servicio se creará al completar el pago</li>
              <li>• Total a pagar: ${allFormData.totalPrice} MXN</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Botones de pago - Solo se muestran si no hay mensaje de éxito */}
      {!showSuccessMessage && (
        canProceed ? (
          <div className="space-y-3">
            {/* Loading state mientras carga PayPal */}
            {!paypalLoaded && (
              <div className="w-full h-[60px] bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
                <span className="ml-2 text-gray-600">Cargando PayPal...</span>
              </div>
            )}

            {/* Contenedor del botón de PayPal */}
            {paypalLoaded && (
              <div
                ref={paypalRef}
                className={`${
                  isProcessing ? "opacity-50 pointer-events-none" : ""
                }`}
              />
            )}

            {/* Overlay de procesamiento */}
            {isProcessing && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
                  <span className="text-blue-800 font-medium">
                    Procesando pago y creando servicio...
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-100 rounded-xl p-6 text-center">
            <p className="text-gray-600">
              Complete todos los campos requeridos para continuar
            </p>
          </div>
        )
      )}

      {/* Botón Cancelar - Solo se muestra si no hay mensaje de éxito */}
      {!showSuccessMessage && (
        <button
          onClick={() => {
            cleanupPayPal();
            onClose();
          }}
          disabled={isProcessing}
          className={`w-full px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-semibold ${
            isProcessing ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Cancelar
        </button>
      )}

      {showSuccessMessage && (
        <ContratacionSuccess
          isVisible={showSuccessMessage}
          onClose={handleCompleteClose}
          userEmail={decodedToken.username}
          totalAmount={allFormData.totalPrice}
          serviceName={"Servicio Profesional"}
        />
      )}
    </div>
  );
};

export default PaymentButtons;