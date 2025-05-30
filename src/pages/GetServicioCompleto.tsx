import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { getServicioPorId } from '../services/CategoriasAndServices/authService';
import ServicioCompleto from '../components/Servicios/ServicioCompleto/ServicioCompleto';
import { 
  Servicio, 
  ServicioTransformado, 
  ReviewTransformada,
  DIAS_SEMANA,
  DiaSemana
} from '../types/ServiciosInterfaces/ServiciosInterfaces';

function GetServicioCompleto() {
  const { id } = useParams<{ id: string }>();
  const [servicio, setServicio] = useState<Servicio | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServicio = async () => {
      try {
        setLoading(true);
        const data = await getServicioPorId(id as string);
        setServicio(Array.isArray(data) ? data[0] : data);
        setError(null);
      } catch (error) {
        console.error("Error fetching servicio: ", error);
        setError("Error al cargar el servicio");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchServicio();
    }
  }, [id]);

  // Función para transformar los datos del servicio al formato que espera ServicioCompleto
  const transformServiceData = (serviceData: Servicio): ServicioTransformado | null => {
    if (!serviceData) return null;

    const id = serviceData.id;
    const proveedor = serviceData.idProveedorHasServicio?.proveedor;
    const perfil = proveedor?.perfil;
    const usuario = perfil?.usuario;
    const domicilio = usuario?.domicilios?.[0];

    // Transformar las fotos de trabajo
    const gallery: string[] = serviceData.fotosTrabajo?.map(foto => 
      foto.url_foto.startsWith('http') ? foto.url_foto : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkoN9uJNfsmulBf3KxVFSCsqIhPq5GFlv0Cw&s`
    ) || [];

    // Transformar las reseñas
    const reviews: ReviewTransformada[] = serviceData.contrataciones?.flatMap(contratacion => 
      contratacion.resenas?.map(resena => ({
        name: `${contratacion.id}`, // Puedes ajustar esto según necesites
        date: new Date(contratacion.fechaFin).toLocaleDateString('es-ES'),
        avatar: "https://b2472105.smushcdn.com/2472105/wp-content/uploads/2023/09/Poses-Perfil-Profesional-Mujeres-ago.-10-2023-1-819x1024.jpg?lossy=1&strip=1&webp=1",
        comment: resena.comentario,
        rating: resena.calificacion
      })) || []
    ) || [];

    // Crear días disponibles (inverso de días libres)
    const diasLibres: DiaSemana[] = serviceData.idProveedorHasServicio?.diasLibres?.map(dia => dia.dia) || [];
    const diasDisponibles = DIAS_SEMANA.filter(dia => !diasLibres.includes(dia));

    return {
      id: id,
      name: `${perfil?.nombre || ''} ${perfil?.apellidoPaterno || ''} ${perfil?.apellidoMaterno || ''}`.trim(),
      rating: serviceData.idProveedorHasServicio?.calificacion || 0,
      reviews: reviews.length,
      price: serviceData.precio,
      category: serviceData.tipoServicio === 'SERVICIO' ? 'Servicio' : serviceData.tipoServicio,
      availability: diasDisponibles.slice(0, 2).join(' y '), // Mostrar solo los primeros 2 días
      avatar: "https://b2472105.smushcdn.com/2472105/wp-content/uploads/2023/09/Poses-Perfil-Profesional-Mujeres-ago.-10-2023-1-819x1024.jpg?lossy=1&strip=1&webp=1",
      description: serviceData.descripcion,
      serviceTitle: serviceData.nombre,
      tipoPrecio: serviceData.idProveedorHasServicio?.tipoPrecio?.unidad_medida || 'Por servicio',
      includes: [
        
      ],
      gallery: gallery,
      reviewsData: reviews,
      proveedorInfo: {
        email: usuario?.email || '',
        telefono: perfil?.telefono,
        direccion: domicilio ? `${domicilio.calle} ${domicilio.numero}, ${domicilio.colonia}, ${domicilio.ciudad}` : null,
        verificado: perfil?.verificacion?.verificado || false,
        puntos: perfil?.puntos || 0
      }
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando servicio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  if (!servicio) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Servicio no encontrado</p>
      </div>
    );
  }

  const transformedData = transformServiceData(servicio);

  if (!transformedData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Error al procesar los datos del servicio</p>
      </div>
    );
  }

  return (
    <div>
      <ServicioCompleto serviceData={transformedData} />
    </div>
  );
}

export default GetServicioCompleto;