import React, { useState, useEffect } from "react";
import { getContratacionesByPerfil } from "../services/Contratacion/authService";
import { CustomJWTPayload } from "../ts/interfaces/global";
import { jwtDecode } from "jwt-decode";
import ResenaForm from "../components/Contratacion/ResenaForm"; // Ajusta la ruta según tu estructura
import { crearResena } from "../services/Contratacion/authService";
import { crearReporte } from "../services/Contratacion/authService";

// Interfaces
interface Contratacion {
  id: string;
  fechaInicio: string;
  fechaFin: string;
  total: number;
  cantidad: number;
  resenas: any[];
}

interface ContratacionResponse {
  message: string;
  data: Contratacion[];
  OK: boolean;
}

// Componente de tarjeta de contratación
const ContratacionCard: React.FC<{
  contratacion: Contratacion;
  onHacerResena: (id: string) => void;
}> = ({ contratacion, onHacerResena }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount);
  };

  const getDurationInDays = () => {
    const inicio = new Date(contratacion.fechaInicio);
    const fin = new Date(contratacion.fechaFin);
    const diffTime = Math.abs(fin.getTime() - inicio.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 0 ? 1 : diffDays;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 hover:border-blue-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <div className="text-xs text-gray-500 mb-1">ID de Contratación</div>
          <div className="text-sm font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
            {contratacion.id.slice(0, 8)}...
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(contratacion.total)}
          </div>
          <div className="text-sm text-gray-500">
            {contratacion.cantidad} servicio
            {contratacion.cantidad !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            <span className="font-medium text-gray-700">Inicio:</span>
          </div>
          <span className="text-gray-600">
            {formatDate(contratacion.fechaInicio)}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
            <span className="font-medium text-gray-700">Fin:</span>
          </div>
          <span className="text-gray-600">
            {formatDate(contratacion.fechaFin)}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
            <span className="font-medium text-gray-700">Duración:</span>
          </div>
          <span className="text-gray-600">
            {getDurationInDays()} día{getDurationInDays() !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4">
        {contratacion.resenas && contratacion.resenas.length > 0 ? (
          <div className="bg-green-50 border border-green-200 p-3 rounded-md">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-green-600">✓</span>
              <span className="text-sm font-medium text-green-800">
                Reseña completada
              </span>
            </div>
            <div className="text-xs text-green-600">
              {contratacion.resenas.length} reseña
              {contratacion.resenas.length !== 1 ? "s" : ""} realizada
              {contratacion.resenas.length !== 1 ? "s" : ""}
            </div>
          </div>
        ) : (
          <button
            onClick={() => onHacerResena(contratacion.id)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-md hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md"
          >
            <span className="text-lg">⭐</span>
            Hacer Reseña
          </button>
        )}
      </div>
    </div>
  );
};

// Componente principal
const GetContrataciones: React.FC = () => {
  const [contrataciones, setContrataciones] = useState<Contratacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showResenaForm, setShowResenaForm] = useState<string | null>(null);

  // Decodificar JWT
  const jwtToken = sessionStorage.getItem("JWT-TOKEN");
  let decodedToken: CustomJWTPayload | null = null;

  if (jwtToken) {
    try {
      decodedToken = jwtDecode<CustomJWTPayload>(jwtToken);
    } catch (e) {
      console.error("Error decodificando token:", e);
      decodedToken = null;
    }
  }

  // Cargar contrataciones
  useEffect(() => {
    const fetchContrataciones = async () => {
      if (!jwtToken) {
        setError(
          "No se encontró token de autenticación. Por favor, inicia sesión."
        );
        setLoading(false);
        return;
      }

      if (!decodedToken?.id_perfil) {
        setError("Token inválido. Por favor, inicia sesión nuevamente.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getContratacionesByPerfil(
          decodedToken.id_perfil
        );

        if (response.OK && response.data) {
          setContrataciones(response.data);
          setError(null);
        } else {
          setError(response.message || "Error al obtener las contrataciones");
        }
      } catch (err) {
        console.error("Error fetching contrataciones:", err);
        setError(
          "Error de conexión. Por favor, verifica tu conexión a internet."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchContrataciones();
  }, [decodedToken?.id_perfil, jwtToken]);

  // Manejar envío de reseña
  const handleResenaSubmit = async (data: ResenaFormData) => {
    try {
      if (!showResenaForm) {
        throw new Error(
          "No se ha seleccionado una contratación para la reseña."
        );
      }

      console.log("Enviando reseña:", {
        contratacionId: showResenaForm,
        idPerfil: decodedToken?.id_perfil,
        ...data,
      });

      // Simular delay de API
      const response = await crearResena({
        contratacionId: showResenaForm,
        comentario: data.comentario,
        calificacion: data.calificacion,
      });

      if (data.reportarServicio) {
        console.log({
          idPerfil: decodedToken?.id_perfil,
          comentario: data.comentario,
          idContratacion: showResenaForm,
        });
        const response = await crearReporte({
          idPerfil: decodedToken?.id_perfil,
          comentario: data.comentario,
          idContratacion: showResenaForm,
        });
        console.log("Reporte enviado:", response);
      }

      console.log("Respuesta de la API:", response);
      setShowResenaForm(null);

      // Recargar contrataciones para mostrar el cambio
      // En una implementación real, podrías actualizar el estado local
      // o hacer una nueva petición para obtener los datos actualizados
    } catch (error) {
      console.error("Error enviando reseña:", error);
      throw error; // Re-throw para que ResenaForm maneje el error
    }
  };

  // Estados de carga
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
        <div className="text-gray-600 text-lg">Cargando contrataciones...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Error al cargar
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Mis Contrataciones
          </h1>
          <p className="text-gray-600 text-lg">
            Aquí puedes ver todas tus contrataciones y dejar reseñas sobre los
            servicios recibidos
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              Total: {contrataciones.length} contratacion
              {contrataciones.length !== 1 ? "es" : ""}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Con reseña:{" "}
              {
                contrataciones.filter((c) => c.resenas && c.resenas.length > 0)
                  .length
              }
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              Pendientes:{" "}
              {
                contrataciones.filter(
                  (c) => !c.resenas || c.resenas.length === 0
                ).length
              }
            </span>
          </div>
        </div>

        {/* Contenido principal */}
        {contrataciones.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-300 text-8xl mb-6">📋</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-3">
              No tienes contrataciones aún
            </h3>
            <p className="text-gray-500 text-lg mb-6">
              Cuando realices una contratación aparecerá aquí para que puedas
              dejar tu reseña
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Volver
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {contrataciones.map((contratacion) => (
              <ContratacionCard
                key={contratacion.id}
                contratacion={contratacion}
                onHacerResena={setShowResenaForm}
              />
            ))}
          </div>
        )}

        {/* Modal de reseña */}
        {showResenaForm && (
          <ResenaForm
            contratacionId={showResenaForm}
            onClose={() => setShowResenaForm(null)}
            onSubmit={handleResenaSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default GetContrataciones;
