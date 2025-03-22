import api from "../../lib/api/api";

interface UserInfoResponse {
  message: string;
  data: UserInfo;
  OK: boolean;
}

interface UserInfo {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: string;
  fechaNacimiento: Date | null;
  codigoCompartir: string;
  genero: string | null;
  descripcion: string | null;
  foto: string | null;
  puntos: number;
  id: string;
  usuario: {
    id: string;
    email: string;
  };
  // Añadimos otros campos que puedas necesitar
}

interface UpdateUserInfo {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: string;
  fechaNacimiento: Date | null;
  genero: string | null;
  descripcion: string | null;
}

// Primero ajustamos la interfaz y la función getUserInfo
export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const response = await api.get<UserInfoResponse>("http://localhost:8080/api/updateUserInfo");
    console.log("RESPONSE: ",response.data.data);
    return response.data.data; // Accedemos a data.data para obtener la información del usuario
  } catch (error) {
    console.error("Error fetching user info: ", error);
    throw error;
  }
};

//Segundo ahora hacemos una peticion POST para actualizar la informacion del usuario, a la misma API
export const updateUserInfo = async (PerfilDTO: UpdateUserInfo): Promise<UpdateUserInfo> => {
  try {
    const response = await api.post<UpdateUserInfo>("http://localhost:8080/api/updateUserInfo", PerfilDTO);
    return response.data;
  } catch (error) {
    console.error("Error updating user info: ", error);
    throw error;
  }
};