// components/ProviderInfo.tsx
import React from "react";
import { Star, MapPin } from "lucide-react";
import { ContratacionData } from "../../types/ContratacionInterfaces/ContratacionInterfaces";

interface ProviderInfoProps {
  data: ContratacionData;
}

const ProviderInfo: React.FC<ProviderInfoProps> = ({ data }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-5 border border-indigo-100">
      <div className="flex items-center gap-4">
        <img
          src={data.avatar}
          alt={data.nombre}
          className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md"
        />

        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg mb-1">
            {data.nombre}
          </h3>
          <p className="text-gray-600 mb-2 text-sm">{data.serviceTitle}</p>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-semibold">{data.rating}</span>
              <span className="text-gray-500">({data.reviews})</span>
            </div>

            <div className="flex items-center gap-1 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{data.ubicacion}</span>
            </div>
          </div>
        </div>

        <div className="text-right bg-white rounded-lg p-3 shadow-sm">
          <div className="text-xs text-gray-500">Precio</div>
          <div className="text-xl font-bold text-gray-900">${data.price}</div>
          <div className="text-xs text-gray-500">{data.tipoPrecio}</div>
        </div>
      </div>
    </div>
  );
};

export default ProviderInfo;