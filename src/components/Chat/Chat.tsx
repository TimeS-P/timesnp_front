import { useState, useEffect } from 'react';
import { connectToChat, sendMessage, disconnect, ChatMessage, getMessagesFromChatId } from '../../services/Chat/chatService';

interface ChatProps {
  chatId: string;
  userId: string;
  nombreServicio?: string;
  chat: ChatResponse;
  className?: string;
}

export interface User {
  data: string;
}

export interface ChatResponse {
  data: {
    id: string;
    servicioGeneral: {
      id: string;
      nombre: string;
      descripcion: string;
      precio: number;
      tipoServicio: string;
      proveedorHasServicio?: string | null;
      contrataciones?: string[];
      fotos?: string[];
      reportes?: string[];
      mensajes?: ChatMessage[];
    };
  }
}

const Chat = ({ chat, userId, nombreServicio = 'Chat', className = '' }: ChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("messages: ", messages);
    console.log("UserId: ", userId);
  }, [messages]);

  const getMessages = async () => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
    connectToChat(chat.data.id, (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      disconnect();
    };
  }, [chat]);

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

  return (
    <div className={`flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-100 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-center px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-medium text-gray-800">
          {nombreServicio}
        </h2>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 min-h-0">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">Cargando mensajes...</div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="space-y-1">
              <p className="text-gray-600 font-medium">No hay mensajes</p>
              <p className="text-gray-400 text-sm">¡Comienza la conversación!</p>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.emisor === userId ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[75%] ${msg.emisor === userId ? 'order-2' : 'order-1'}`}>
                <div 
                  className={`px-4 py-3 rounded-2xl shadow-sm ${
                    msg.emisor === userId 
                      ? 'bg-blue-500 text-white rounded-br-md' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-md'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.mensaje}</p>
                </div>
                <div 
                  className={`text-xs mt-1 text-gray-400 px-1 ${
                  msg.emisor === userId ? 'text-right' : 'text-left'
                  }`}
                >
                  {msg.fecha}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex items-center space-x-3 bg-gray-50 rounded-full px-4 py-2 focus-within:bg-gray-100 transition-colors">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Pregunta lo que necesites"
            className="flex-1 bg-transparent placeholder-gray-500 text-gray-800 focus:outline-none text-sm"
          />
          <button 
            onClick={handleSend}
            disabled={newMessage.trim() === ''}
            className="p-2 text-gray-400 hover:text-blue-500 focus:outline-none disabled:text-gray-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;