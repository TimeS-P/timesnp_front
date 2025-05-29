import api from "../../lib/api/api";
import { jwtDecode } from "jwt-decode";
import { CustomJWTPayload } from "../../ts/interfaces/global";

// Prueba
export const login = async (email:string , password:string) : Promise<any> => {

    // Hace la petición enviando el email y password en el body
    const response = await api.post<any>("/auth/loginSecure", {
        email,
        password, // Enviamos las credenciales en el body
      });

    //console.log("Authorization HEADER on response: ", response.headers["authorization"]);

    // Si el loggin fue exitoso obtenemos el token JWT del header Authorization
    const jwtToken = response.headers["authorization"];
    if (!jwtToken) throw new Error("No se recibió el token JWT");

    // Decodificamos el token JWT en caso de que sea necesario ver su contenido (CLAIMS-Payload)
    const decodedToken: CustomJWTPayload = jwtDecode<CustomJWTPayload>(jwtToken);

    //console.log("Token decodificado: ", decodedToken);


    // Guardamos el token JWT en el sessionStorage
    sessionStorage.setItem("JWT-TOKEN", jwtToken);

    return response.data;
}