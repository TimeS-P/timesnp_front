import api from "./api";
import { jwtDecode } from "jwt-decode";
import { CustomJWTPayload } from "../../ts/interfaces/global";

// Prueba
export const login = async (email:string , password:string) : Promise<any> => {

    // Agregamos el email y password al header Authorization en base 64
    // Genera la credencial en formato Basic Auth
    const auth = `Basic ${btoa(`${email}:${password}`)}`;

    // Hace la petición con el header Authorization
    const response = await api.get<any>("/auth/login", {
        headers: {
            Authorization: auth, // Agrega el header Authorization con las credenciales en base 64
        },
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