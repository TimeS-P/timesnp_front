import React from "react";
import { Star, MapPin, Calendar, Sparkles, Brain, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TarjetaServicioIA({
  id,
  nombreServicio,
  nombreProveedor,
  calificacion,
  tipoPrecio,
  precio,
  descripcion,
  ubicacion,
  disponibilidad,
  razonRecomendacion = "Altamente valorado por usuarios similares"
}: {
  id: string;
  nombreServicio: string;
  nombreProveedor: string;
  calificacion: number;
  tipoPrecio: string;
  precio: number;
  descripcion: string;
  ubicacion: string;
  disponibilidad: string;
  razonRecomendacion?: string;
}) {
  // Función para manejar la navegación (placeholder)
  const handleVerMas = () => {
    console.log(`Navegando a servicio: ${id}`);
    // Aquí iría la lógica de navegación
  };

   const navigate = useNavigate();

  // Función para renderizar estrellas basadas en la calificación
  const renderEstrellas = (calificacion: number) => {
    const estrellas = [];
    const calificacionRedondeada = Math.round(calificacion * 2) / 2;
    for (let i = 1; i <= 5; i++) {
      if (i <= calificacionRedondeada) {
        estrellas.push(
          <Star key={i} size={14} fill="#FFD700" color="#FFD700" />
        );
      } else if (i - 0.5 === calificacionRedondeada) {
        estrellas.push(
          <Star
            key={i}
            size={14}
            fill="#FFD700"
            color="#FFD700"
            fillOpacity={0.5}
          />
        );
      } else {
        estrellas.push(<Star key={i} size={14} color="#FFD700" />);
      }
    }
    return estrellas;
  };

  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-white via-blue-50 to-purple-50 border border-blue-200 relative">
      {/* Badge de recomendación IA */}
      <div className="absolute top-3 right-3 z-10">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
          <Brain size={12} />
          <span>IA Recomienda</span>
        </div>
      </div>

      {/* Imagen del proveedor */}
      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        <img
          src="https://b2472105.smushcdn.com/2472105/wp-content/uploads/2023/09/Poses-Perfil-Profesional-Mujeres-ago.-10-2023-1-819x1024.jpg?lossy=1&strip=1&webp=1"
          alt={nombreProveedor}
          className="w-full h-full object-cover"
        />
        {/* Overlay con efectos */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        {/* Efectos de partículas brillantes */}
        <div className="absolute top-4 left-4">
          <Sparkles size={16} className="text-yellow-400 animate-pulse" />
        </div>
        <div className="absolute bottom-4 right-4">
          <Zap size={14} className="text-blue-400 animate-pulse" style={{animationDelay: '0.5s'}} />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-5">
        {/* Nombre del servicio */}
        <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">
          {nombreServicio}
        </h3>
        
        {/* Nombre del proveedor */}
        <p className="text-sm text-gray-700 mb-3">
          por <span className="font-semibold text-blue-700">{nombreProveedor}</span>
        </p>

        {/* Calificación con diseño mejorado */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <div className="flex">{renderEstrellas(calificacion)}</div>
            <span className="text-sm font-semibold text-gray-700 ml-1">{calificacion}</span>
          </div>
          {/* Precio destacado */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
            ${precio}
          </div>
        </div>

        {/* Razón de recomendación IA */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-lg p-3 mb-3">
          <div className="flex items-start gap-2">
            <Brain size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-blue-800 mb-1">¿Por qué te lo recomendamos?</p>
              <p className="text-xs text-blue-700">{razonRecomendacion}</p>
            </div>
          </div>
        </div>

        {/* Descripción */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
          {descripcion}
        </p>

        {/* Detalles de ubicación y disponibilidad */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-xs text-gray-600">
            <MapPin size={12} className="mr-2 text-red-500" />
            <span>{ubicacion}</span>
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <Calendar size={12} className="mr-2 text-green-500" />
            <span>{disponibilidad}</span>
          </div>
        </div>

        {/* Botón de acción mejorado */}
        <button
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          onClick={() => navigate(`/servicios/${id}`)}
        >
          <Sparkles size={16} />
          Ver Recomendación
        </button>
      </div>
    </div>
  );
}

export default TarjetaServicioIA;