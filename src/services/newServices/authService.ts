import api from "../../lib/api/api";

export const createServicio = async (formData: any): Promise<any> => {
  try {
    const response = await api.post("http://localhost:8080/api/servicios/crearServicio", formData, {
    });
    return response.data; // Retorna la respuesta del backend
  } catch (error) {
    console.error("Error creating service: ", error);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
}