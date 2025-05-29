import React, { useState } from 'react';

// Define the props interface for the CategoryItem component
interface CategoryItemProps {
  icon: React.ReactNode;
  id: string;
  name: string;
  isSelected?: boolean;
  onClick?: (id: string) => void;
}

// Category Item component
const ItemCategoria: React.FC<CategoryItemProps> = ({ id, icon, name, isSelected, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button 
      className={`flex flex-col items-center justify-center p-4 mx-2 rounded-lg shadow-md min-w-24 h-28 
                transition-all duration-300 ease-in-out 
                hover:shadow-lg hover:translate-y-1
                active:scale-95 active:shadow-inner
                ${isSelected ? 'bg-gray-50 shadow-lg border border-[#d5aa75]' : 'bg-white'}`}
      onClick={() => onClick?.(id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`text-3xl mb-2 transition-transform duration-300 ${isHovered || isSelected ? 'scale-110' : ''}`}>
        {icon}
      </div>
      <p className={`text-sm font-medium text-center transition-colors duration-300 ${isHovered || isSelected ? 'text-[#d5aa75]' : ''}`}>
        {name}
      </p>
    </button>
  );
};

export default ItemCategoria;