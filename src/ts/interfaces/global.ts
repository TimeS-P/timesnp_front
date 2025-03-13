import { JwtPayload } from "jwt-decode";

export interface CustomJWTPayload extends JwtPayload {
    username: string;
    authorities: string; // Los roles vienen como un string separado por comas
    iat: number; // Tiempo en el que se emitió el token en
    exp: number; // Expiración del token en timestamp
}