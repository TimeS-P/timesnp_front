import React from 'react';
import { IoWarning, IoClose } from "react-icons/io5";

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
      <div className="flex justify-between">
        <div className="flex">
          <IoWarning className="h-5 w-5 mr-2" />
          <span>{message}</span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800"
        >
          <IoClose className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;