import { Client, Message, IFrame } from '@stomp/stompjs';
import api from '../../lib/api/api';

// Definimos el tipo para un mensaje del chat
export interface ChatMessage {
    emisor: string;
    mensaje: string;
    fecha: string;
    chatId: string;
}

export interface User{
    data:string;
}

export interface ChatMessageResponse {
    message: string;
    OK: boolean;
    data:[
        {
            "id":string;
            "mensaje":string;
            "fecha":string;
            "emisor": {
                "id":string;
                "nombre":string | null;
                "apellidoPaterno":string | null;
                "apellidoMaterno":string | null;
                "telefono":string | null;
                "foto":string | null;
                "puntos":number;
                "codigoCompartir":string;
                "fechaNacimiento":string | null;
                "genero":string | null;
                "descripcion":string | null;
                "usuario": {
                    "id":string;
                    "email":string;
                    "verificarCorreo":string | null;
                    "domicilios":string[];
                    "recuperarPassword":string | null;
                    "enabled":boolean;
                    "accountNonExpired":boolean;
                    "accountNonLocked":boolean;
                    "credentialsNonExpired":boolean;
                    "username":string;
                };
                "verificacion":string | null;
            }
        }
    ]
}

export interface ChatFoto {
    id: string;
    url_foto: string;
    id_foto: string;
}

export interface ChatServicioGeneral {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    tipoServicio: string;
    proveedorHasServicio: string | null;
    contrataciones: string[];
    fotos: ChatFoto[];
    reportes: string[];
}

export interface ChatUsuario {
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
}

export interface ChatItem {
    id: string;
    servicioGeneral: ChatServicioGeneral;
    usuario: ChatUsuario;
}

export interface ChatsResponse {
    message: string;
    data: ChatItem[];
    OK: boolean;
}

export interface ChatResponse {
    data: {

        id:string;
        servicioGeneral: {
                id: string;
                nombre: string;
                descripcion: string;
                precio: number;
                tipoServicio: string;
                proveedorHasServicio?: string | null; // Cambiado a optional
                contrataciones?: string[]; // Cambiado a optional
                fotos?: string[]; // Cambiado a optional
                reportes?: string[]; // Cambiado a optional
                mensajes?: ChatMessage[]; // Cambiado a optional
            };
    }

    
}

// Configuración del cliente STOMP con tipos
const client: Client = new Client({
    brokerURL: 'ws://localhost:8080/ws-chat',
    debug: (str: string) => console.log(str),
    reconnectDelay: 5000,
});

// Función para conectar al chat y suscribirse a un chatId específico
export const connectToChat = (
    chatId: string,
    onMessageReceived: (message: ChatMessage) => void
): void => {
    client.onConnect = (): void => {
        client.subscribe(`/topic/chat/${chatId}`, (message: Message): void => {
            const parsedMessage: ChatMessage = JSON.parse(message.body);
            onMessageReceived(parsedMessage);
            console.log('Mensaje recibido:', parsedMessage);
        });
    };
    client.activate();
};

// Función para enviar un mensaje al backend
export const sendMessage = (chatId: string, message: ChatMessage): void => {
    client.publish({
        destination: `/app/chat/${chatId}`,
        body: JSON.stringify(message),
    });
};

export const createChat = async (idServicioGeneral: string): Promise<ChatResponse> => {
  try {
    const response = await api.get<ChatResponse>("http://localhost:8080/api/chat/create-chat?servicioId="+idServicioGeneral);
    console.log("Chat creado: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating combo: ", error);
    throw error;
  }
};

export const getUserId = async (): Promise<User> => {
    try {
        const response = await api.get<User>('http://localhost:8080/api/usuario/getId');
        console.log('User ID:', response.data);
        return response.data;
    } catch (error) {  
        console.error('Error fetching user ID:', error);
        throw error;
    }
};

export const getMessagesFromChatId = async (chatId: string): Promise<ChatMessageResponse> => {
    try {
        const response = await api.get<ChatMessageResponse>(`http://localhost:8080/api/chat/get-mensajes?chatId=${chatId}`);
        console.log('Mensajes del chat:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching chat messages:', error);
        throw error;
    }
};

export const getChatsClient = async (): Promise<ChatsResponse> => {
    try {
        const response = await api.get<ChatsResponse>('http://localhost:8080/api/chat/get-chats-usuario');
        console.log('Chats del cliente:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching client chats:', error);
        throw error;
    }
};

export const getChatsProveedor = async (): Promise<ChatsResponse> => {
    try {
        const response = await api.get<ChatsResponse>('http://localhost:8080/api/chat/get-chats-proveedor');
        console.log('Chats del proveedor:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching client chats:', error);
        throw error;
    }
};

// Función para desconectar el cliente
export const disconnect = (): void => {
    client.deactivate();
};