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

export interface GetContratacion{
  id: string;
  fechaInicio: string;
  fechaFin: string;
  total: number;
  cantidad?: number;
  resenas?: {
    id: string;
    comentario: string;
    calificacion: number;
  }[];
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
    id: string;
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
      perfilId: decodedToken.id_perfil || "", // Asegúrate de que el perfilId esté disponible
      
      servicioGeneralId: formData.providerData.id,
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

export const getContratacionesByPerfil = async (perfilId: string): Promise<GetContratacion[]> => {
  try {
    const response = await api.get<GetContratacion[]>(
      `http://localhost:8080/api/contratacion/getContrataciones`,
      {
        params: {
          perfilId: perfilId,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching contrataciones by perfil: ", error);
    throw error;
  }
}

export interface ResenaDTO {
  comentario: string;
  calificacion: number;
  contratacionId: string;
}

export const crearResena = async (resenaDTO: ResenaDTO): Promise<{ message: string }> => {
  try {
    const response = await api.post<{ message: string }>(
      "http://localhost:8080/api/resena/crearResena",
      resenaDTO
    );
    return response.data;
  } catch (error) {
    console.error("Error creating resena: ", error);
    throw error;
  }
}

export interface ReporteDTO {
  idPerfil: string;
  comentario: string;
  idContratacion: string;
}


interface ReporteResponse {
  message: string;
  data: null;
  OK: boolean;
}

export const crearReporte = async (reporteDTO: ReporteDTO): Promise<{ message: string }> => {
  try {
    const response = await api.post<ReporteResponse>(
      "http://localhost:8080/api/reportes/crearReporte",
      reporteDTO
    );
    return response.data;
  } catch (error) {
    console.error("Error creating resena: ", error);
    throw error;
  }
}