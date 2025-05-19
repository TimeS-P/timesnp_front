import { Client, Message, IFrame } from '@stomp/stompjs';
import api from '../../lib/api/api';

// Definimos el tipo para un mensaje del chat
export interface ChatMessage {
    emisor: string;
    mensaje: string;
    fecha: string;
}

export interface ChatResponse {
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
            mensajes?: string[]; // Cambiado a optional
        };
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
    return response.data;
  } catch (error) {
    console.error("Error creating combo: ", error);
    throw error;
  }
};

// Función para desconectar el cliente
export const disconnect = (): void => {
    client.deactivate();
};