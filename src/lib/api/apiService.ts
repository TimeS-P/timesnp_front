import api from "./api";

// Prueba
export const getPrueba = async () => {
    const response = await api.get<any>("/pokemon/ditto");

    return response.data;
}