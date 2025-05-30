import { UUID } from "crypto";
import CarruselCategoria from "../components/Servicios/Header/CarruselCategoria";
import { getCategorias } from "../services/CategoriasAndServices/authService";
import { getServiciosPorCategoria, getServiciosRecomendados } from "../services/CategoriasAndServices/authService";
import { useEffect, useState } from "react";
import TarjetaServicio from "../components/Servicios/Body/TarjetaServicio";
import Filtrador from "../components/Servicios/Body/Filtrador";

interface CategoriaInfo {
  id: string;
  nombre: string;
  icono: string;
}

interface Perfil {
  id: string;
  nombre: string;
  // apellidoPaterno: string | null;
  // apellidoMaterno: string | null;
  // telefono: string | null;
  // foto: string | null;
  // puntos: number;
  // codigoCompartir: string;
  // fechaNacimiento: string | null; // Cambia a `Date | null` si deseas manejar fechas como objetos Date
  // genero: string | null;
  // descripcion: string | null;
  // usuario: Usuario;
  // verificacion: any | null; // Cambia `any` si tienes una estructura definida
}

interface TipoPrecio {
  id: string;
  unidad_medida: string;
}

interface Proveedor {
  id: string;
  rfc: string;
  perfil: Perfil;
}

interface IdProveedorHasServicio {
  id: string;
  calificacion: number;
  tipoPrecio: TipoPrecio;
  proveedor: Proveedor;
  diasLibres: any[]; // Cambia `any` si tienes una estructura definida
}

interface ServicioInfo {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  tipoServicio: string;
  fotosTrabajo: any[]; // Cambia `any` si tienes una estructura definida
  idProveedorHasServicio: IdProveedorHasServicio;
  contrataciones: any[]; // Cambia `any` si tienes una estructura definida
  idCombo: string | null;
}

function Servicios() {
  const [categories, setCategories] = useState<CategoriaInfo[]>([]);
  const [services, setServices] = useState<ServicioInfo[]>([]); // Cambia 'any' por el tipo adecuado para tus servicios

  // Estado para los servicios recomendados
  const [recommendedServices, setRecommendedServices] = useState<ServicioInfo[]>([]);

  const [selectedCategory, setSelectedCategory] = useState(
    "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaf"
  );
  const [filter, setFilter] = useState<string>("CALIF");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategorias();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchCategories();
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

  const fetchServicesByCategory = async (categoryId: string) => {
    try {
      const data = await getServiciosPorCategoria(categoryId, filter);
      setServices(data);
      setSelectedCategory(categoryId); // Actualiza la categoría seleccionada
    } catch (error) {
      console.error("Error fetching services by category: ", error);
    }
  };

  const fetchRecommendedServices = async () => {
    try {
      // Aquí deberías implementar la lógica para obtener los servicios recomendados
      // Por ejemplo, podrías hacer una llamada a una API o filtrar los servicios existentes
      const data = await getServiciosRecomendados();
      setRecommendedServices(data);
    } catch (error) {
      console.error("Error fetching recommended services: ", error);
    }
  }

  // Aquí puedes obtener los servicios por categoría
  useEffect(() => {
    fetchServicesByCategory("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaf");
    fetchRecommendedServices(); // Llama a la función para obtener servicios recomendados
  }, []);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter); // Actualiza el filtro seleccionado
    fetchServicesByCategory(selectedCategory); // Vuelve a obtener los servicios con el nuevo filtro
    console.log("Nuevo filtro seleccionado:", newFilter);
  };

  return (
    <div>
      <div className="container mx-auto">
        <CarruselCategoria
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          fetchServicesByCategory={fetchServicesByCategory}
        />
      </div>

      {/* Componente de filtrado añadido aquí */}
      <div className="flex justify-end my-8 mr-12">
        <Filtrador onFilterChange={handleFilterChange} />
      </div>

      {/* Si existen  servicios recomendados los mostramos */}
      {recommendedServices.length > 0 && (
        <div className="container mx-auto mb-8 border border-gray-200 p-6 rounded-lg ">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Servicios Recomendados</h2>
          <div className="grid grid-cols-3 gap-8">
            {recommendedServices.map((service) => (
              <TarjetaServicio
                key={service.id}
                id={service.id}
                nombreServicio={service.nombre}
                nombreProveedor={
                  service.proveedorHasServicio.proveedor.perfil.nombre
                }
                calificacion={service.proveedorHasServicio.calificacion}
                tipoPrecio={service.proveedorHasServicio.tipoPrecio.unidad_medida}
                precio={service.precio}
                descripcion={service.descripcion}
                ubicacion="Ubicación del proveedor" // Cambia esto según tu lógica
                disponibilidad="Lunes a Viernes" // Cambia esto según tu lógica
              />
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-8 mb-8 justify-items-center">
        {/* Aquí puedes mapear sobre tus servicios destacados */}
        {services.map((service) => (
          <TarjetaServicio
            key={service.id}
            id={service.id}
            nombreServicio={service.nombre}
            nombreProveedor={
              service.idProveedorHasServicio.proveedor.perfil.nombre
            }
            calificacion={service.idProveedorHasServicio.calificacion}
            tipoPrecio={service.idProveedorHasServicio.tipoPrecio.unidad_medida}
            precio={service.precio}
            descripcion={service.descripcion}
            ubicacion="Ubicación del proveedor" // Cambia esto según tu lógica
            disponibilidad="Lunes a Viernes" // Cambia esto según tu lógica
            //imagen="https://b2472105.smushcdn.com/2472105/wp-content/uploads/2023/09/Poses-Perfil-Profesional-Mujeres-ago.-10-2023-1-819x1024.jpg?lossy=1&strip=1&webp=1"
          />
        ))}
      </div>
    </div>
  );
}

export default Servicios;
