import { UUID } from "crypto";
import api from "../../lib/api/api";
import { Usuario } from "../../types/ServiciosInterfaces/ServiciosInterfaces";
import { FormData } from "../../components/Register/ModalRegistroContent";

interface CategoriaResponse {
  message: string;
  data: CategoriaInfo[];
  OK: boolean;
}

interface CategoriaInfo {
  id: string;
  nombre: string;
  icono: string;
}

interface ServicioResponse {
  message: string;
  data: Servicio[]; // Cambia 'any' por el tipo adecuado para tus servicios
  OK: boolean;
}

interface SignedUrlResponse {
  message: string;
  data: string; // Cambia 'any' por el tipo adecuado para tus servicios
  OK: boolean;
}

export interface ReportesResponse {
  message: string;
  data: Reporte[]; // Cambia 'any' por el tipo adecuado para tus reportes
  OK: boolean;
}

export interface Reporte {
  id: string;
  comentario: string;
  fecha: string; // Cambia a `Date` si deseas manejar fechas como objetos Date
  perfil: PerfilComplete; // Cambia `Perfil` si tienes una estructura definida para el perfil
}

// interface Usuario {
//   id: string;
//   email: string;
//   verificarCorreo: boolean | null;
//   domicilios: any[]; // Cambia `any` si tienes una estructura definida para domicilios
//   recuperarPassword: any | null; // Cambia `any` si tienes una estructura definida
//   enabled: boolean;
//   accountNonExpired: boolean;
//   accountNonLocked: boolean;
//   credentialsNonExpired: boolean;
//   username: string;
// }

interface Perfil {
  id: string;
  nombre: string;
  // apellidoPaterno: string | null;
  // apellidoMaterno: string | null;
  // telefono: string | null;
  // foto: string | null;
  // puntos: number;
  // codigoCompartir: string;
  // fechaNacimiento: string | null; // Cambia a `Date | null` si deseas manejar fechas como objetos Date
  // genero: string | null;
  // descripcion: string | null;
  // usuario: Usuario;
  // verificacion: any | null; // Cambia `any` si tienes una estructura definida
}

interface PerfilComplete {
  id: string;
  nombre: string;
  apellidoPaterno: string | null;
  apellidoMaterno: string | null;
  telefono: string | null;
  foto: string | null;
  puntos: number;
  codigoCompartir: string;
  fechaNacimiento: string | null; // Cambia a `Date | null` si deseas manejar fechas como objetos Date
  genero: string | null;
  descripcion: string | null;
  usuario: Usuario; // Cambia `Usuario` si tienes una estructura definida para el usuario
  verificacion: any | null; // Cambia `any` si tienes una estructura definida
}

interface TipoPrecio {
  id: string;
  unidad_medida: string;
}

interface Proveedor {
  id: string;
  rfc: string;
  perfil: Perfil;
}

interface IdProveedorHasServicio {
  id: string;
  calificacion: number;
  tipoPrecio: TipoPrecio;
  proveedor: Proveedor;
  diasLibres: any[]; // Cambia `any` si tienes una estructura definida
}

interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  tipoServicio: string;
  fotosTrabajo: any[]; // Cambia `any` si tienes una estructura definida
  idProveedorHasServicio: IdProveedorHasServicio;
  contrataciones: any[]; // Cambia `any` si tienes una estructura definida
  idCombo: string | null;
}

interface UsuarioResponse {
  message: string;
  data: Usuario; // Cambia `Usuario` si tienes una estructura definida
  OK: boolean;
}


export const getCategorias = async (): Promise<CategoriaInfo[]> => {
  try {
    const response = await api.get<CategoriaResponse>(
      "/categorias/obtenerCategoriasServicios"
    );
    return response.data.data; // Accedemos a data.data para obtener el array de categorías
  } catch (error) {
    console.error("Error fetching categories: ", error);
    throw error;
  }
};

export const getServiciosPorCategoria = async (
  idCategoria: String,
  filtro: string
): Promise<any[]> => {
  try {
    const response = await api.get<ServicioResponse>(
      `/servicios/serviciosCategoria`,
      {
        params: {
          idCategoria,
          filtro,
        }
      }
    );
    return response.data.data; // Accedemos a data.data para obtener el array de servicios
  } catch (error) {
    console.error("Error fetching services by category: ", error);
    throw error;
  }
};

export const getServiciosRecomendados = async (): Promise<any[]> => {
  try {
    const response = await api.get<ServicioResponse>(
      `/v1/recommendations`
    );
    return response.data.data; // Accedemos a data.data para obtener el array de servicios recomendados
  } catch (error) {
    console.error("Error fetching recommended services: ", error);
    throw error;
  }
}

export const getVerificacionesPendientes = async (): Promise<any[]> => {
  try {
    const response = await api.get<ServicioResponse>(
      `/verificacionesadmin/pendientes`
    );
    return response.data.data; // Accedemos a data.data para obtener el array de servicios con verificaciones pendientes
  } catch (error) {
    console.error("Error fetching pending verifications: ", error);
    throw error;
  }
}

export const getUrlDocumentoVerificacion = async (
  fileName: string
): Promise<string> => {
  try {
    const response = await api.get<SignedUrlResponse>(
      `/verificacionesadmin/generate-url/${fileName}`
    );
    return response.data.data; // Retorna la URL del documento de verificación
  } catch (error) {
    console.error("Error fetching verification document URL: ", error);
    throw error;
  }
}

export const getAllReportes = async (): Promise<Reporte[]> => {
  try {
    const response = await api.get<ReportesResponse>(
      `/reportes/todos`
    );

    console.log("Response from getAllReportes:", response.data);
    return response.data.data; // Accedemos a data.data para obtener el array de reportes
  } catch (error) {
    console.error("Error fetching reports: ", error);
    throw error;
  }
}

export const registrarUsuario = async (
  formData: Omit<FormData, 'confirmPassword' | 'apellido'> // Omite confirmPassword y apellido del tipo FormData
): Promise<Usuario> => {
  try {
    // Ommit confirmPassword y apellido from the formData
    const response = await api.post<UsuarioResponse>(
      `/auth/register`,
      formData
    );
    return response.data.data; // Retorna el usuario registrado
  } catch (error) {
    console.error("Error registering user: ", error);
    throw error;
  }
}


export const getServicioPorId = async (
  id: string
): Promise<any[]> => {
  try {
    const response = await api.get<ServicioResponse>(
      `/servicios/servicio`,
      {
        params: {
          id
        }
      }
    );
    return response.data.data; // Accedemos a data.data para obtener el servicio
  } catch (error) {
    console.error("Error fetching service by ID: ", error);
    throw error;
  }
}
