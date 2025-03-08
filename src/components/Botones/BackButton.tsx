import React from 'react';
import { IoChevronBack } from "react-icons/io5";

interface BackButtonProps {
  onClick: () => void;
  text: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, text }) => {
  return (
    <button 
      onClick={onClick}
      className="text-[#162C51] hover:underline inline-flex items-center text-sm"
    >
      <IoChevronBack className="mr-1" /> {text}
    </button>
  );
};

export default BackButton;