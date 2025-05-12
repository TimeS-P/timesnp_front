import React from 'react';
import { Star, Clock, Calendar, MapPin, Award } from 'lucide-react';

function TarjetaServicio({ 
  nombreServicio,
  nombreProveedor,
  calificacion,
  tipoPrecio,
  descripcion,
  ubicacion,
  disponibilidad,
}: {
  nombreServicio: string;
  nombreProveedor: string;
  calificacion: number;
  tipoPrecio: string;
  descripcion: string;
  ubicacion: string;
  disponibilidad: string;
}) {
  // Función para renderizar estrellas basadas en la calificación
  const renderEstrellas = (calificacion : number) => {
    const estrellas = [];
    const calificacionRedondeada = Math.round(calificacion * 2) / 2; // Redondear a 0.5 más cercano
    
    for (let i = 1; i <= 5; i++) {
      if (i <= calificacionRedondeada) {
        estrellas.push(<Star key={i} size={16} fill="#FFD700" color="#FFD700" />);
      } else if (i - 0.5 === calificacionRedondeada) {
        estrellas.push(<Star key={i} size={16} fill="#FFD700" color="#FFD700" fillOpacity={0.5} />);
      } else {
        estrellas.push(<Star key={i} size={16} color="#FFD700" />);
      }
    }
    
    return estrellas;
  };

  return (
    <div className="max-w-md rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200">
      <div className="flex">
        {/* Imagen del proveedor del servicio */}
        <div className="w-1/3 bg-gray-100">
          <img src={"https://b2472105.smushcdn.com/2472105/wp-content/uploads/2023/09/Poses-Perfil-Profesional-Mujeres-ago.-10-2023-1-819x1024.jpg?lossy=1&strip=1&webp=1"} alt={nombreProveedor} className="w-full h-full object-cover" />
        </div>
        
        {/* Contenido principal */}
        <div className="w-2/3 p-4">
          {/* <div className="text-xs font-semibold text-[#5B2630] uppercase mb-1">{categoria}</div> */}
          
           
          {/* Nombre del servicio */}
          <h2 className="text-xl font-bold text-gray-900 mb-1">{nombreServicio}</h2>
          
          {/* Nombre del proveedor */}
          <p className="text-sm text-gray-700 mb-2">por <span className="font-medium">{nombreProveedor}</span></p>
          
          {/* Calificación */}
          <div className="flex items-center mb-2">
            <div className="flex mr-1">
              {renderEstrellas(calificacion)}
            </div>
            <span className="text-sm text-gray-600">{calificacion}</span>
          </div>
          
          {/* Tipo de precio */}
          <div className="bg-gray-100 rounded-md px-3 py-2 font-bold text-gray-800 mb-2">
            {tipoPrecio}
          </div>
          
          {/* Descripción breve */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{descripcion}</p>
          
          {/* Detalles adicionales */}
          <div className="space-y-1">
            <div className="flex items-center text-xs text-gray-500">
              <MapPin size={14} className="mr-1" /> {ubicacion}
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <Calendar size={14} className="mr-1" /> {disponibilidad}
            </div>
          </div>
        </div>
      </div>
      
      {/* Botones de acción */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-center">
        <button className="px-4 py-1 bg-[#162C51] border border-[#162C51] rounded-md text-sm font-medium text-white hover:bg-[#1d3867]">
          Ver más detalles
        </button>
      </div>
    </div>
  );
}

export default TarjetaServicio;