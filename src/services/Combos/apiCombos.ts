import api from "../../lib/api/api";

interface ComboInfoResponse {
  message: string;
  data: ComboInfo;
  OK: boolean;
}

interface RoleResponse{
    message: string;
    data: Roles[];
    OK: boolean;
}

interface Roles {
  id: string;
  nombre: string;
}

interface ComboInfo {
        id: string;
        proveedor: {
            id: string;
            rfc: string;
            perfil: {
                id: string;
                nombre: string;
                apellidoPaterno: string | null;
                apellidoMaterno: string | null;
                telefono: string | null;
                foto: string | null;
                puntos: number;
                referido: string | null;
                usuario: {
                    id: string;
                    email: string;
                    verificarCorreo: string | null;
                    domicilios: string[];
                    recuperarPassword: string | null;
                    enabled: boolean;
                    accountNonExpired: boolean;
                    accountNonLocked: boolean;
                    credentialsNonExpired: boolean;
                    username: string;
                };
                verificacion: string | null;
                codigoCompartir: string;
                fechaNacimiento: string | null;
                genero: string | null;
                descripcion: string | null;
            };
        };
        servicioGeneral: {
            id: string;
            nombre: string;
            descripcion: string;
            precio: number;
            tipoServicio: "COMBO";
            proveedorHasServicio?: string | null; // Cambiado a optional
            contrataciones?: string[]; // Cambiado a optional
            fotos?: string[]; // Cambiado a optional
            reportes?: string[]; // Cambiado a optional
            mensajes?: string[]; // Cambiado a optional
        };
        comboHasProveedor?: string | null; // Cambiado a optional
    
}

export const getCombos = async (): Promise<ComboInfo> => {
  try {
    const response = await api.get<ComboInfoResponse>("http://localhost:8080/api/combo/get-combos");
    console.log("RESPONSE: ",response.data.data);
    return response.data.data; 
  } catch (error) {
    console.error("Error fetching user info: ", error);
    throw error;
  }
};

export const getRoles = async (): Promise<Roles[]> => {
    try {
        const response = await api.get<RoleResponse>("http://localhost:8080/api/combo/get-roles");
        return response.data.data;
    } catch (error) {
        console.error("Error fetching roles: ", error);
        throw error;
    }

}