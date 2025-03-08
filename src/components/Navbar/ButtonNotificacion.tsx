import { IoNotificationsOutline } from 'react-icons/io5';
import { useState } from 'react';

function ButtonNotificacion() {
  const [isOpen, setIsOpen] = useState(false);
  const notificationCount = 5;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-700 rounded-full hover:bg-gray-100  transition-all duration-300"
      >
        <IoNotificationsOutline className="w-6 h-6" />
        {notificationCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {notificationCount > 9 ? '9+' : notificationCount}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10">
          <div className="px-4 py-2 font-medium border-b border-gray-100">
            Notificaciones
          </div>
          <div className="max-h-96 overflow-y-auto">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">Notificación {item}</p>
                <p className="text-xs text-gray-500">Hace {item} minutos</p>
              </div>
            ))}
          </div>
          <div className="px-4 py-2 text-center text-sm text-[#162C51]">
            <a href="/notificaciones" className="font-medium hover:underline">Ver todas</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default ButtonNotificacion;