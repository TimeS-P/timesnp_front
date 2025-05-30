import React from 'react';
import { IoCheckmarkCircle, IoWarning, IoClose } from "react-icons/io5";

interface NotificationProps {
  show: boolean;
  message: string;
  isSuccess: boolean;
  onClose: () => void;
} 

const Notification: React.FC<NotificationProps> = ({ show, message, isSuccess, onClose }) => {
  if (!show) return null;
  
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-white p-4 rounded-lg shadow-lg border-l-4 border-solid min-w-[300px]" style={{ borderColor: isSuccess ? '#22c55e' : '#ef4444' }}>
      <div className="flex-shrink-0">
        {isSuccess ? <IoCheckmarkCircle size={24} className="text-green-500" /> : <IoWarning size={24} className="text-red-500" />}
      </div>
      <div className="flex-grow text-gray-700">
        {message}
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <IoClose size={20} />
      </button>
    </div>
  );
};

export default Notification;