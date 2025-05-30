import { UUID } from "crypto";
import CarruselCategoria from "../components/Servicios/Header/CarruselCategoria";
import { getCategorias } from "../services/CategoriasAndServices/authService";
import { getServiciosPorCategoria } from "../services/CategoriasAndServices/authService";
import { useEffect, useState } from "react";
import TarjetaServicio from "../components/Servicios/Body/TarjetaServicio";
import Filtrador from "../components/Servicios/Body/Filtrador";
import { CustomJWTPayload } from "../ts/interfaces/global";
import { jwtDecode } from "jwt-decode";
import FormularioCrearServicio from "../components/Servicios/FormularioCrearServicio";

const jwtToken = sessionStorage.getItem("JWT-TOKEN");
let decodedToken: CustomJWTPayload | null = null;

if (jwtToken) {
  try {
    decodedToken = jwtDecode<CustomJWTPayload>(jwtToken);
  } catch (e) {
    decodedToken = null;
  }
}

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

interface FormularioData {
  nombre: string;
  descripcion: string;
  precio: number;
  categoriaId: string;
  tipoPrecioId: string;
  diasLibres: string[];
}

function Servicios() {
  const [categories, setCategories] = useState<CategoriaInfo[]>([]);
  const [services, setServices] = useState<ServicioInfo[]>([]); // Cambia 'any' por el tipo adecuado para tus servicios
  const [selectedCategory, setSelectedCategory] = useState(
    "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaf"
  );
  const [filter, setFilter] = useState<string>("CALIF");
  const [showFormulario, setShowFormulario] = useState(false);

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

  // Aquí puedes obtener los servicios por categoría
  useEffect(() => {
    fetchServicesByCategory("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaf");
  }, []);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter); // Actualiza el filtro seleccionado
    fetchServicesByCategory(selectedCategory); // Vuelve a obtener los servicios con el nuevo filtro
    console.log("Nuevo filtro seleccionado:", newFilter);
  };

  const handleCrearServicio = async (data: FormularioData) => {
    try {
      // Aquí irá tu lógica para hacer el POST al API
      console.log("Datos del formulario:", data);
      
      // Ejemplo de cómo podrías estructurar los datos para el POST:
      const postData = {
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio,
        categoriaId: data.categoriaId,
        tipoPrecioId: data.tipoPrecioId,
        diasLibres: data.diasLibres
      };
      
      // Aquí harías el fetch POST a tu API
      // const response = await fetch('/api/servicios', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${jwtToken}`
      //   },
      //   body: JSON.stringify(postData)
      // });
      
      // if (response.ok) {
      //   // Refrescar la lista de servicios
      //   await fetchServicesByCategory(selectedCategory);
      // }
      
    } catch (error) {
      console.error("Error al crear servicio:", error);
      throw error;
    }
  };

  // Función para renderizar el botón o mensaje según las restricciones
  const renderCrearServicioButton = () => {
    // Verificar si existe el token JWT
    if (!jwtToken || !decodedToken) {
      return null; // No mostrar nada si no hay token
    }

    // Verificar si está verificado
    if (decodedToken.isVerified) {
      return (
        <div className="flex justify-center my-6">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg">
            <p className="text-center">
              <span className="font-medium">¡Verifica tu cuenta!</span>
              <br />
              Necesitas verificar tu cuenta para poder crear servicios.
            </p>
          </div>
        </div>
      );
    }

    // Si está verificado, mostrar el botón
    return (
      <div className="flex justify-center my-6">
        <button
          onClick={() => setShowFormulario(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
        >
          + Crear Servicio
        </button>
      </div>
    );
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

      {/* Botón crear servicio con restricciones */}
      {renderCrearServicioButton()}

      {/* Componente de filtrado añadido aquí */}
      <div className="flex justify-end my-8 mr-12">
        <Filtrador onFilterChange={handleFilterChange} />
      </div>

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

      {/* Modal del formulario */}
      {showFormulario && (
        <FormularioCrearServicio
          onClose={() => setShowFormulario(false)}
          onSubmit={handleCrearServicio}
        />
      )}
    </div>
  );
}

export default Servicios;