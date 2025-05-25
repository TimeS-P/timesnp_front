import { useState, useEffect } from 'react';
import { ChatItem } from '../../services/Chat/chatService';

interface ChatSidebarProps {
  chats: ChatItem[];
  selectedChatId?: string;
  onChatSelect: (chat: ChatItem) => void;
  className?: string;
}

const ChatSidebar = ({ 
  chats, 
  selectedChatId, 
  onChatSelect, 
  className = '' 
}: ChatSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredChats, setFilteredChats] = useState<ChatItem[]>(chats);

  useEffect(() => {
    const filtered = chats.filter(chat => 
      chat.usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.servicioGeneral.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredChats(filtered);
  }, [chats, searchTerm]);


  return (
    <div className={`flex flex-col h-full bg-white border-r border-gray-200 ${className}`}>
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Mensajes</h2>
        
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar chats..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-4 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-gray-500 text-sm">
              {searchTerm ? 'No se encontraron chats' : 'No tienes chats aún'}
            </p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => onChatSelect(chat)}
                className={`
                  relative p-4 rounded-xl cursor-pointer transition-all duration-200
                  hover:bg-gray-50 active:bg-gray-100
                  ${selectedChatId === chat.id 
                    ? 'bg-blue-50 border border-blue-200' 
                    : 'bg-white hover:shadow-sm'
                  }
                `}
              >
                <div className="flex items-start space-x-4">
                  {/* Chat Info */}
                  <div className="flex-1 min-w-0 space-y-2">
                    {/* User Name and Time */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {chat.usuario.email}
                      </h3>
                    </div>
                    
                    {/* Service Info */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                        {chat.servicioGeneral.tipoServicio}
                      </span>
                      <span className="text-sm text-gray-700 font-semibold">
                        ${chat.servicioGeneral.precio.toLocaleString()}
                      </span>
                    </div>
                    
                    {/* Service Name */}
                    <p className="text-sm text-gray-600 truncate">
                      {chat.servicioGeneral.nombre}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
        <div className="text-xs text-gray-500 text-center">
          {filteredChats.length} {filteredChats.length === 1 ? 'chat' : 'chats'}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;