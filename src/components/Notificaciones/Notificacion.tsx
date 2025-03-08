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
    <div className={`absolute top-4 right-4 left-4 p-4 rounded-md shadow-md flex justify-between items-center ${
      isSuccess ? "bg-green-100 text-green-800 border-l-4 border-green-500" : "bg-red-100 text-red-800 border-l-4 border-red-500"
    }`}>
      <div className="flex items-center">
        {isSuccess ? <IoCheckmarkCircle className="h-5 w-5 mr-2" /> : <IoWarning className="h-5 w-5 mr-2" />}
        <p>{message}</p>
      </div>
      <button
        onClick={onClose}
        className="text-gray-600 hover:text-gray-800"
      >
        <IoClose className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Notification;