// apiFacade.ts

import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
    // Spring Boot backend url
    baseURL: "http://localhost:8080/api",
    //baseURL: "https://pokeapi.co/api/v2",
    timeout: 5000, // 2 seconds
    headers: {        
        "Content-type": "application/json"
    },
    withCredentials: true // Asegura que se envíen las cookies
});

// Request interceptor para agregar el token CSRF a las peticiones y el JWT si existe
instance.interceptors.request.use(
    config => {

        // Obtiene el token CSRF del sessionStorage
        const token : string | null = sessionStorage.getItem("XSRF-TOKEN");
        // Obtener token JWT del sessionStorage
        const jwt: string | null = sessionStorage.getItem("JWT-TOKEN");

        // Si el token JWT existe, lo agrega a los headers
        if (jwt) {
            config.headers["Authorization"] = jwt;
        }

        // Si el token CSRF existe, lo agrega a los headers
        if (token) {
            config.headers["X-XSRF-TOKEN"] = token;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response interceptor para guardar el token CSRF en el sessionStorage
instance.interceptors.response.use(
    response => {
        // Si el token CSRF viene en las cookies de la response se guarda en sessionStorage
        const xsrfToken: string | undefined = Cookies.get("XSRF-TOKEN");

        if (xsrfToken) {
            sessionStorage.setItem("XSRF-TOKEN", xsrfToken);
        }

        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance;