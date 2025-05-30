import React, { useState } from "react";
import { Star, MapPin, Calendar, User, Heart } from "lucide-react";
import ReviewsSection from "./ReviewsSection";
import PhotoGallery from "./PhotoGalley";
import ContratacionPopup from "../../Contratacion/ContratacionPopup";
import { useParams } from "react-router-dom";

interface Domicilio {
  calle: string;
  numero: string;
  colonia: string;
  ciudad: string;
  estado: string;
  pais: string;
}

interface ProveedorInfo {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  foto: string;
  domicilio: Domicilio;
  direccion?: string;
}

interface ServicioCompletoProps {
  serviceData?: {
    name: string;
    rating: number;
    reviews: number;
    price: number;
    category: string;
    availability: string;
    avatar: string;
    description: string;
    serviceTitle: string;
    tipoPrecio: string;
    includes: string[];
    gallery: string[];
    reviewsData: any[];
    proveedorInfo: ProveedorInfo;
  };
}

const ServicioCompleto: React.FC<ServicioCompletoProps> = ({ serviceData }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Datos del perfil - usar datos reales o valores por defecto
  const profile = serviceData || {
    name: "Amalia Rosas González",
    rating: 4.9,
    reviews: 105,
    price: 2500,
    category: "Belleza",
    availability: "Lunes y Jueves",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616c619e39e?w=100&h=100&fit=crop&crop=face",
    description:
      "Resalta tu belleza con un maquillaje diseñado especialmente para ti. Ya sea para una boda, graduación, sesión de fotos o cualquier evento especial, ofrecemos un servicio personalizado que se adapta a tu estilo y realza tus mejores rasgos.",
    serviceTitle: "Maquillaje profesional",
    tipoPrecio: "servicio" as const,
    includes: [
      "Asesoría personalizada para elegir el look ideal.",
      "Productos de alta calidad para una piel impecable y de larga duración.",
      "Técnicas profesionales para un acabado perfecto.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1531531909218-b012b6b7b2a6?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571844307880-751c6d86f3f3?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop",
    ],
    proveedorInfo: {
      id: "1",
      nombre: "Amalia",
      apellidoPaterno: "Rosas",
      apellidoMaterno: "González",
      foto: "https://images.unsplash.com/photo-1494790108755-2616c619e39e?w=100&h=100&fit=crop&crop=face",
      domicilio: {
        calle: "Av. Principal",
        numero: "123",
        colonia: "Centro",
        ciudad: "Morelia",
        estado: "Michoacán",
        pais: "México"
      },
      direccion: "Morelia, Michoacán, México"
    },
    reviewsData: [],
  };

  // Preparar datos para el popup de contratación
  const contratacionData = {
    nombre: profile.name,
    rating: profile.rating,
    reviews: profile.reviews,
    price: profile.price,
    tipoPrecio: profile.tipoPrecio,
    serviceTitle: profile.serviceTitle,
    availability: profile.availability,
    avatar: profile.avatar,
    ubicacion: profile.proveedorInfo.direccion || "Ubicación no disponible"
  };

  const handleContratarClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="min-h-screen py-4">
      <div className="max-w-6xl mx-auto bg-white p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {profile.serviceTitle || "Servicio profesional"}
            </h1>

            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">{profile.rating}</span>
                <span className="text-gray-500">
                  ({profile.reviews} reseñas)
                </span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">{profile.name}</span>
            </div>

            <div className="flex items-center gap-4 text-gray-600">
              <span className="font-semibold text-lg">
                ${profile.price} {profile.tipoPrecio === 'servicio' ? 'Por servicio' : profile.tipoPrecio === 'Por hora' ? 'por hora' : profile.tipoPrecio === 'Por diía' ? 'por día' : profile.tipoPrecio == 'Por semana' ? 'por semana' : profile.tipoPrecio === 'Por mes' ? 'por mes' : profile.tipoPrecio === 'Por metro cuadrado' ? 'por metro cuadrado' : profile.tipoPrecio }
              </span>
              <span className="text-gray-400">|</span>
              <span>{profile.category}</span>
              <span className="text-gray-400">|</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Disponible: {profile.availability}</span>
              </div>
            </div>

            {/* País, ciudad */}
            <div className="flex items-center gap-4 mt-3">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600">
                {profile.proveedorInfo.direccion || "Ubicación no disponible"}
              </span>
            </div>
          </div>

          {/* Profile Card */}
          <div className="bg-gray-50 rounded-lg p-4 w-72">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{profile.name}</h3>
              </div>
            </div>
            <button 
              onClick={handleContratarClick}
              className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Contratar
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1 mb-6">
          <button
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === "description"
                ? "bg-orange-200 text-orange-800"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Descripción
          </button>
          <button
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === "reviews"
                ? "bg-orange-200 text-orange-800"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reseñas
          </button>
        </div>

        {/* Content */}
        {activeTab === "description" && (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              {profile.description}
            </p>
          </div>
        )}

        {activeTab === "reviews" && (
          <ReviewsSection reviewsData={profile.reviewsData} />
        )}

        {/* Gallery - Solo se muestra en la pestaña de Descripción */}
        {activeTab === "description" && (
          <PhotoGallery images={profile.gallery} />
        )}
      </div>

      {/* Popup de Contratación */}
      <ContratacionPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        data={contratacionData}
      />
    </div>
  );
};

export default ServicioCompleto;