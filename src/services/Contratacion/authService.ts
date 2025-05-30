import api from "../../lib/api/api";
import { CustomJWTPayload } from "../../ts/interfaces/global";
import { jwtDecode } from "jwt-decode";

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

export interface ContratacionDTO {
  fechaInicio: string;
  fechaFin: string;
  total: number;
  cantidad?: number;
  perfilId: string;
  servicioGeneralId: string;
  codigoCompartir?: string;
  usePoints?: boolean;
}


// Response del backend
export interface ContratacionCreateResponse {
  message: string;
}

// Data que viene del frontend (tu objeto original)
export interface ContratacionFormData {
  acceptTerms: boolean;
  availablePoints: number;
  basePrice: number;
  endTime: string;
  pointsDiscount: number;
  pointsValue: number;
  providerData: {
    availability: string;
    avatar: string;
    nombre: string;
    price: number;
    rating: number;
    reviews: number;
    serviceTitle: string;
    tipoPrecio: string;
    ubicacion: string;
  };
  referralApplied: boolean;
  referralCode: string;
  selectedDate: string;
  selectedHours: number;
  selectedMeters: number;
  startTime: string;
  totalPrice: number;
  usePoints: boolean;
}


export const createContratacion = async (formData: ContratacionFormData): Promise<ContratacionCreateResponse> => {
  try {
    // Convertir los datos del frontend al formato DTO esperado por el backend
    const contratacionDTO: ContratacionDTO = {
      
      // Fechas: combinar fecha seleccionada con horas de inicio y fin
      fechaInicio: `${formData.selectedDate}`,
      fechaFin: `${formData.selectedDate}`, // Mismo día, se podría calcular basado en las horas
      
      // Total del precio
      total: formData.totalPrice,
      
      // Cantidad basada en horas seleccionadas o metros
      cantidad:  1,
      
      // Perfil del usuario (debes obtener esta información del contexto/estado de tu app)
      perfilId: decodedToken.id_perfil, // Asegúrate de que el perfilId esté disponible
      
      servicioGeneralId: "28a74521-0de7-4a98-9bc6-ec0a82f59055",
      // Campos adicionales
      codigoCompartir: formData.referralCode || "HOLA",
      usePoints: formData.usePoints
    };

    console.log("Contratacion DTO: ", contratacionDTO);

    // Enviar como JSON en lugar de FormData
    const response = await api.post<ContratacionCreateResponse>(
      "http://localhost:8080/api/contratacion/crearContratacion", 
      contratacionDTO,
    );
    
    return response.data;
  } catch (error) {
    console.error("Error creating contratacion: ", error);
    throw error;
  }
};

export interface EmailFormData {
    addressee: string;
    subject: string;
    message: string;
    title: string;
    name: string;
    tipoServicio: string;
    categoria: string;
    totalPagado: string;
    fechaContratacion: string;
    duracion: string;
}

export interface ResponseEmail {
    message: string;
    success: boolean;
}



export const sendEmail = async (emailData: EmailFormData): Promise<ResponseEmail> => {
  try {
    const response = await api.post<ResponseEmail>("http://localhost:8080/api/contratacion/sendContratacion", emailData);
    return response.data;
  } catch (error) { 
    console.error("Error sending email: ", error);
    throw error;
  }
}
