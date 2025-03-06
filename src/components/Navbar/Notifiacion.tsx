import { IoNotificationsOutline } from 'react-icons/io5';

function Notifiacion() {
  const notificationCount = 5; // Aquí puedes poner la lógica para obtener el número de notificaciones

  return (
    <div className="relative inline-block cursor-pointer mx-4">
      <IoNotificationsOutline className="w-9 h-9" />
      {notificationCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
          {notificationCount}
        </span>
      )}
    </div>
  );
}

export default Notifiacion;