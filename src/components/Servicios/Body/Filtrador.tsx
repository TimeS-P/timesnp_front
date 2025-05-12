import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, DollarSign, Star, ArrowUpAZ, ArrowDownAZ } from "lucide-react";

interface FiltradorProps {
  onFilterChange: (filter: string) => void; // Función para manejar el cambio de filtro
}

const Filtrador: React.FC<FiltradorProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("CALIF"); // Estado para rastrear el filtro seleccionado
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilterClick = (filter: string): void => {
    setSelectedFilter(filter); // Actualiza el filtro seleccionado
    onFilterChange(filter); // Llama a la función con el filtro seleccionado
    setIsOpen(false); // Cierra el menú desplegable
  };

  // Función para determinar si un filtro está seleccionado
  const isSelected = (filter: string): boolean => selectedFilter === filter;

  // Función para obtener las clases CSS según si está seleccionado o no
  const getItemClasses = (filter: string): string => {
    return `px-4 py-2 text-sm ${
      isSelected(filter)
        ? "bg-[#f8e1e6] text-[#78323f] font-medium"
        : "text-gray-900 hover:bg-gray-100"
    } cursor-pointer flex items-center`;
  };

  // Texto para mostrar en el botón según el filtro seleccionado
  const getButtonText = () => {
    switch (selectedFilter) {
      case "PRECIO_ASC":
        return "Precio: Menor a mayor";
      case "PRECIO_DESC":
        return "Precio: Mayor a menor";
      case "CALIF":
        return "Calificación: Mejor a peor";
      case "ALF":
        return "Alfabético: A-Z";
      default:
        return "Ordenar por:";
    }
  };

  return (
    <div className="mb-6 relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#78323f] hover:bg-[#b55c6d] text-white px-4 py-2 rounded-lg flex items-center justify-between min-w-48"
      >
        <span>{getButtonText()}</span>
        <ChevronDown className={`ml-2 w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <div className="py-2">
            {/* Categoría Calificación */}
            <div className="px-4 py-2 text-gray-400 font-semibold">Calificación</div>
            <div
              className={getItemClasses("CALIF")}
              onClick={() => handleFilterClick("CALIF")}
            >
              <Star className="w-4 h-4 mr-2" />
              <span>Mejor a peor</span>
            </div>

            {/* Categoría Precio */}
            <div className="px-4 py-2 text-gray-400 font-semibold">Precio</div>
            <div
              className={getItemClasses("PRECIO_ASC")}
              onClick={() => handleFilterClick("PRECIO_ASC")}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              <span>Menor a mayor</span>
            </div>
            <div
              className={getItemClasses("PRECIO_DESC")}
              onClick={() => handleFilterClick("PRECIO_DESC")}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              <span>Mayor a menor</span>
            </div>

            {/* Categoría Alfabético */}
            <div className="px-4 py-2 text-gray-400 font-semibold">Alfabético</div>
            <div
              className={getItemClasses("ALF")}
              onClick={() => handleFilterClick("ALF")}
            >
              <ArrowUpAZ className="w-4 h-4 mr-2" />
              <span>A-Z</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filtrador;