import React, { useState, useRef, useEffect } from "react";
import { X, Camera, User } from "lucide-react";
import { JSX } from "@emotion/react/jsx-runtime";
import InputEditarPerfil from "../Inputs/InputEditarPerfil";
import { updateUserInfo } from "../../services/Perfil/authService";
import Notification from "../Notificaciones/Notificacion";

interface FormData {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: string;
  fechaNacimiento: Date;
  descripcion: string;
  genero: string;
  fotoUrl?: string;
}

interface FormErrors {
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  telefono?: string;
  fechaNacimiento?: string;
  descripcion?: string;
  genero?: string;
}

interface ModalEditarPerfilProps {
  onClose: () => void;
  onProfileUpdate: (formData: FormData) => void;
  currentPhoto?: string;
  initialData?: Partial<FormData>;
  datosCompletos?: boolean;
  isCompletaPerfil?: boolean;
}

function ModalEditarPerfil({
  onClose,
  onProfileUpdate,
  currentPhoto = "/default-profile.jpg",
  initialData,
  isCompletaPerfil,
}: ModalEditarPerfilProps): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    telefono: "",
    fechaNacimiento: new Date(),
    descripcion: "",
    genero: "",
    fotoUrl: currentPhoto,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [previewImage, setPreviewImage] = useState<string>(currentPhoto);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    isSuccess: boolean;
  }>({
    show: false,
    message: "",
    isSuccess: false,
  });

  // Cargar datos iniciales cuando se monta el componente
  useEffect(() => {
    if (initialData) {
      setFormData((prevData) => ({
        ...prevData,
        ...initialData,
        fotoUrl: currentPhoto,
      }));
    }
  }, [initialData, currentPhoto]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Solo validamos después de cada cambio si ya se ha enviado el formulario previamente
    if (formSubmitted) {
      validateForm();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      // Crear URL para previsualizar la imagen
      const filePreviewUrl = URL.createObjectURL(file);
      setPreviewImage(filePreviewUrl);

      // Aquí normalmente se subiría el archivo a un servidor
      // Por ahora, solo guardamos la URL temporal
      setFormData({
        ...formData,
        fotoUrl: filePreviewUrl,
      });
    }
  };

  const openFileSelector = (): void => {
    // Abrir diálogo para seleccionar archivo
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validaciones de campos obligatorios
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.apellidoPaterno.trim())
      newErrors.apellidoPaterno = "El apellido paterno es obligatorio";
    if (!formData.telefono.trim())
      newErrors.telefono = "El número de teléfono es obligatorio";
    if (!formData.fechaNacimiento)
      newErrors.fechaNacimiento = "La fecha de nacimiento es obligatoria";
    if (!formData.genero) newErrors.genero = "El género es obligatorio";
    if (!formData.descripcion.trim())
      newErrors.descripcion = "La descripción es obligatoria";

    // Validación de formato de teléfono (10 dígitos)
    const phoneRegex = /^\d{10}$/;
    if (formData.telefono && !phoneRegex.test(formData.telefono)) {
      newErrors.telefono = "El teléfono debe tener 10 dígitos";
    }

    setErrors(newErrors);

    // Actualizar el estado de validez del formulario
    const isValid = Object.keys(newErrors).length === 0;

    return isValid;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // Marcamos que el formulario ha sido enviado para activar las validaciones continuas
    setFormSubmitted(true);

    // Validamos el formulario
    const isValid = validateForm();

    if (isValid) {
      setIsLoading(true);
      try {
        const response = await updateUserInfo(formData);

        if (response) {
          // Mostrar notificación de éxito
          setNotification({
            show: true,
            message: "Perfil actualizado correctamente",
            isSuccess: true,
          });

          // Llamar a la función de actualización de perfil
          onProfileUpdate(formData);

          // Cerrar el modal después de 3 segundos
          setTimeout(() => {
            onClose();
          }, 3000);
        } else {
          // Mostrar notificación de error
          setNotification({
            show: true,
            message: "Error al actualizar el perfil",
            isSuccess: false,
          });
        }
      } catch (error) {
        console.error("Error al actualizar el perfil:", error);
        setNotification({
          show: true,
          message: "Error de conexión. Inténtalo de nuevo más tarde.",
          isSuccess: false,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Función para cerrar la notificación
  const closeNotification = () => {
    setNotification({
      ...notification,
      show: false,
    });
  };

  // Función para intentar cerrar el modal
  const handleCloseModal = () => {
    console.log("isCompletaPerfil", isCompletaPerfil);
    if (isCompletaPerfil) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[100vh] overflow-y-auto">
        {/* Componente de notificación, que salga chiquito en la esquina derecha */}
        <div className="relative">
          <Notification
            show={notification.show}
            message={notification.message}
            isSuccess={notification.isSuccess}
            onClose={closeNotification}
          />
        </div>
        {/* Encabezado rojo con título y botón de cerrar */}
        <div className="bg-[#5b2630] py-3 px-6 flex justify-between items-center rounded-t-lg">
          <h2 className="text-white text-xl font-bold">
            {!isCompletaPerfil ? "Completa tu perfil" : "Editar Perfil"}
          </h2>
          <button
            onClick={handleCloseModal}
            className={`text-white ${
              isCompletaPerfil
                ? "hover:text-gray-200 cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            } focus:outline-none`}
            disabled={!isCompletaPerfil}
          >
            <X size={24} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Sección de foto de perfil */}
          <div className="mb-8 flex flex-col items-center">
            <div className="relative mb-2">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-gray-300">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Foto de perfil"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={64} className="text-gray-400" />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={openFileSelector}
                className="absolute bottom-0 right-0 bg-[#5b2630] text-white p-2 rounded-full hover:bg-[#3a181e] focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <Camera size={18} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <p className="text-sm text-gray-600">
              Haz clic en el icono de cámara para cambiar la foto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna izquierda */}
            <div className="space-y-2">
              {/* Nombre */}
              <InputEditarPerfil
                label="Nombre"
                type="text"
                nombre="nombre"
                data={formData.nombre}
                errors={errors.nombre || ""}
                tipo="obligatorio"
                placeholder="Ingresa tu nombre"
                handleChange={handleChange}
              />

              {/* Apellido Materno (Opcional) */}
              <InputEditarPerfil
                label="Apellido Materno"
                type="text"
                nombre="apellidoMaterno"
                data={formData.apellidoMaterno}
                errors={errors.apellidoMaterno || ""}
                tipo="opcional"
                placeholder="Ingresa tu apellido materno"
                handleChange={handleChange}
              />

              {/* Género */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Género <span className="text-red-600">*</span>
                </label>
                <select
                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.genero
                      ? "border-red-500 focus:ring-red-200"
                      : "focus:ring-blue-200 border-gray-300"
                  }`}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Prefiero no decir">Prefiero no decir</option>
                </select>
                {errors.genero && (
                  <p className="text-red-500 text-sm mt-1">{errors.genero}</p>
                )}
              </div>
            </div>

            {/* Columna derecha */}
            <div className="space-y-2">
              {/* Apellido Paterno */}
              <InputEditarPerfil
                label="Apellido Paterno"
                type="text"
                nombre="apellidoPaterno"
                data={formData.apellidoPaterno}
                errors={errors.apellidoPaterno || ""}
                tipo="obligatorio"
                placeholder="Ingresa tu apellido paterno"
                handleChange={handleChange}
              />

              {/* Número de teléfono */}
              <InputEditarPerfil
                label="Teléfono"
                type="tel"
                nombre="telefono"
                data={formData.telefono}
                errors={errors.telefono || ""}
                tipo="obligatorio"
                placeholder="10 dígitos"
                handleChange={handleChange}
              />

              {/* Fecha de nacimiento */}
              <InputEditarPerfil
                label="Fecha de Nacimiento"
                type="date"
                nombre="fechaNacimiento"
                data={
                  formData.fechaNacimiento
                    ? new Date(formData.fechaNacimiento)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                errors={errors.fechaNacimiento || ""}
                tipo="obligatorio"
                placeholder="Selecciona tu fecha de nacimiento"
                handleChange={handleChange}
              />
            </div>
          </div>

          {/* Descripcion */}
          <div className="mt-4">
            <label className="block text-gray-700 font-medium pb-2">
              Descripción <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.descripcion
                    ? "border-red-500 focus:ring-red-200"
                    : "focus:ring-blue-200 border-gray-300"
                }`}
                rows={4}
                placeholder="Escribe una breve descripción sobre ti"
              />
              {errors.descripcion && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.descripcion}
                </p>
              )}
            </div>
          </div>

          {/* Botón de actualizar */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className={`bg-[#5b2630] text-white py-2 px-6 rounded-lg hover:bg-[#461c24] focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Actualizando..." : "Actualizar Perfil"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEditarPerfil;
