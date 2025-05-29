import { useState, useEffect, use } from 'react';
import { connectToChat, sendMessage, disconnect, ChatMessage, getMessagesFromChatId } from '../../services/Chat/chatService';

interface ChatModalProps {
  chatId: string;
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  nombreServicio?: string;
  chat: ChatResponse;
}

export interface User{
    data:string;
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

const ChatModal = ({ chat, userId, isOpen, onClose, nombreServicio = 'Chat' }: ChatModalProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    console.log("messages: ", messages);
    console.log("UserId: ", userId);
  },[messages])

  const getMessages = async () => {
    try {
      console.log("Chat: ", chat);
      const response = await getMessagesFromChatId(chat.data.id);
      if (response.OK) {
        const messages = response.data.map((msg: any) => ({
          emisor: msg.emisor.id,
          mensaje: msg.mensaje,
          fecha: msg.fecha,
          chatId: chat.data.id,
        }));
        setMessages(messages);
      }
      console.log('Messages fetched:', response);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }

  useEffect(() => {
    if (isOpen) {
      getMessages();
      connectToChat(chat.data.id, (message: ChatMessage) => {
        setMessages((prev) => [...prev, message]);
      });
    }
    return () => {
      if (isOpen) {
        disconnect();
      }
    };
  }, [chat, isOpen]);


  const handleSend = (): void => {
    if (newMessage.trim() === '') return;
    console.log("Emisor: ", userId);
    const message: ChatMessage = {
      emisor: userId,
      mensaje: newMessage,
      fecha: new Date().toISOString(),
      chatId: chat.data.id,
    };
    console.log('Sending message:', message);
    sendMessage(chat.data.id, message);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 flex flex-col h-96">
        {/* Encabezado del chat */}
        <div className="bg-blue-900 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
          <h3 className="font-medium">{nombreServicio}</h3>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        {/* Contenido del chat */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              No hay mensajes. ¡Comienza la conversación!
            </div>
          ) : (
            messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-3 max-w-[80%] ${msg.emisor === userId ? 'ml-auto' : 'mr-auto'}`}
              >
                <div 
                  className={`px-4 py-2 rounded-lg shadow-sm ${
                    msg.emisor === userId 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.mensaje}
                </div>
                <div 
                  className={`text-xs mt-1 text-gray-500 ${
                    msg.emisor === userId ? 'text-right' : 'text-left'
                  }`}
                >
                  {new Date(msg.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Área de entrada de mensaje */}
        <div className="border-t p-3 flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe un mensaje..."
            className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleSend}
            disabled={newMessage.trim() === ''}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none disabled:bg-blue-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;