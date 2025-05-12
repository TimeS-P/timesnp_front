import { useState } from "react";
import ItemCategoria from "./ItemCategoria";
import { UUID } from "crypto";

// Define the CategoryItemProps interface
interface CategoryItemProps {
  id: string;
  nombre: string;
  icono: string;
}

interface CarruselCategoriaProps {
  categories: CategoryItemProps[];
  selectedCategory: String;
  setSelectedCategory: (categoryId: string) => void;
  fetchServicesByCategory: (categoryId: string) => void;
}

function CarruselCategoria({ categories, selectedCategory, setSelectedCategory, fetchServicesByCategory }: CarruselCategoriaProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate how many items to show based on viewport
  // This is a simple implementation; you might want to use a more sophisticated approach
  const itemsToShow = 12;
  const maxIndex = Math.max(0, categories.length - itemsToShow);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(maxIndex, prevIndex + 1));
  };

  const handleSelectCategory = (id : string) => {
    setSelectedCategory(id);
    fetchServicesByCategory(id);
  };

  return (
    <div className="w-full">
      <div className="relative flex items-center py-4 ">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="absolute left-0 z-10 p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div className="flex items-center overflow-hidden w-full mx-10  py-2">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}px)` }}
          >
            {categories.map((category, index) => (
              <ItemCategoria
                key={index}
                id={category.id}
                icon={category.icono}
                name={category.nombre}
                isSelected={selectedCategory === category.id}
                onClick={handleSelectCategory}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          className="absolute right-0 z-10 p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default CarruselCategoria;
