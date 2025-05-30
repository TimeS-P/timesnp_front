import React, { useState, useEffect } from "react";
import { getCategorias } from "../../services/CategoriasAndServices/authService";
import { createServicio } from "../../services/newServices/authService";
import { CustomJWTPayload } from "../../ts/interfaces/global"; 
import { jwtDecode } from "jwt-decode";

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

interface TipoPrecio {
  id: string;
  label: string;
}

interface FormularioCrearServicioProps {
  onClose: () => void;
  onSubmit: (data: FormularioData) => void;
}

interface FormularioData {
  nombre: string;
  descripcion: string;
  precio: number;
  idCategoria: string;
  idTipoPrecio: string;
  idProveedor: string;
}

const tiposPrecios: TipoPrecio[] = [
  { id: "98badd55-ef31-45df-a579-a75d65d195ea", label: "Por servicio" },
  { id: "e3c2f67d-23e3-409c-b8be-7ad906aa2113", label: "Por hora" },
  { id: "ccbb6618-87dc-4a0d-9539-ba36762ede47", label: "Por metro cuadrado" },
];

const diasSemana = [
  { id: "lunes", label: "Lunes" },
  { id: "martes", label: "Martes" },
  { id: "miercoles", label: "Miércoles" },
  { id: "jueves", label: "Jueves" },
  { id: "viernes", label: "Viernes" },
  { id: "sabado", label: "Sábado" },
  { id: "domingo", label: "Domingo" },
];

const FormularioCrearServicio: React.FC<FormularioCrearServicioProps> = ({
  onClose,
  onSubmit,
}) => {
  const [categorias, setCategorias] = useState<CategoriaInfo[]>([]);
  const [formData, setFormData] = useState<FormularioData>({
    nombre: "",
    descripcion: "",
    precio: 0,
    idCategoria: "",
    idTipoPrecio: "",
    idProveedor: decodedToken.id_perfil,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategorias();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "precio" ? parseFloat(value) || 0 : value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createServicio(formData);
      console.log("Datos del formulario:", formData);
      onClose();
    } catch (error) {
      console.error("Error al crear servicio:", error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.nombre &&
    formData.descripcion &&
    formData.precio > 0 &&
    formData.idCategoria &&
    formData.idTipoPrecio &&
    formData.idProveedor;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Crear Nuevo Servicio</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre del servicio */}
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre del Servicio *
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label
              htmlFor="descripcion"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Descripción *
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Precio */}
          <div>
            <label
              htmlFor="precio"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Precio *
            </label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Tipo de Precio */}
          <div>
            <label
              htmlFor="idTipoPrecio"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tipo de Precio *
            </label>
            <select
              id="idTipoPrecio"
              name="idTipoPrecio"
              value={formData.idTipoPrecio}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecciona un tipo de precio</option>
              {tiposPrecios.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.label}
                </option>
              ))}
            </select>
          </div>

          {/* Categoría */}
          <div>
            <label
              htmlFor="idCategoria"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Categoría del Servicio *
            </label>
            <select
              id="idCategoria"
              name="idCategoria"
              value={formData.idCategoria}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Días Libres */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Días Disponibles
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {diasSemana.map((dia) => (
                <label
                  key={dia.id}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{dia.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creando..." : "Crear Servicio"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioCrearServicio;