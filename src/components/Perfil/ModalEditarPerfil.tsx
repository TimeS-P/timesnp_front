import React, { useState, useRef } from "react";
import { X, Calendar, Camera, User } from "lucide-react";
import { JSX } from "@emotion/react/jsx-runtime";

interface FormData {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: string;
  correoPaypal: string;
  fechaNacimiento: string;
  genero: string;
  fotoUrl?: string;
}

interface FormErrors {
  nombre?: string;
  apellidoPaterno?: string;
  telefono?: string;
  correoPaypal?: string;
  fechaNacimiento?: string;
  genero?: string;
}

interface ModalEditarPerfilProps {
  onClose: () => void;
  currentPhoto?: string;
}

function ModalEditarPerfil({ onClose, currentPhoto = "/default-profile.jpg" }: ModalEditarPerfilProps): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    telefono: "",
    correoPaypal: "",
    fechaNacimiento: "",
    genero: "",
    fotoUrl: currentPhoto
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [previewImage, setPreviewImage] = useState<string>(currentPhoto);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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
        fotoUrl: filePreviewUrl
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
    if (!formData.apellidoPaterno.trim()) newErrors.apellidoPaterno = "El apellido paterno es obligatorio";
    if (!formData.telefono.trim()) newErrors.telefono = "El número de teléfono es obligatorio";
    if (!formData.correoPaypal.trim()) newErrors.correoPaypal = "El correo de PayPal es obligatorio";
    if (!formData.fechaNacimiento) newErrors.fechaNacimiento = "La fecha de nacimiento es obligatoria";
    if (!formData.genero) newErrors.genero = "El género es obligatorio";
    
    // Validación de formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.correoPaypal && !emailRegex.test(formData.correoPaypal)) {
      newErrors.correoPaypal = "Formato de correo no válido";
    }
    
    // Validación de formato de teléfono (10 dígitos)
    const phoneRegex = /^\d{10}$/;
    if (formData.telefono && !phoneRegex.test(formData.telefono)) {
      newErrors.telefono = "El teléfono debe tener 10 dígitos";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (validateForm()) {
      // Aquí iría la lógica para actualizar el perfil
      console.log("Datos del formulario:", formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[100vh] overflow-y-auto">
        {/* Encabezado rojo con título y botón de cerrar */}
        <div className="bg-[#5b2630] py-3 px-6 flex justify-between items-center rounded-t-lg">
          <h2 className="text-white text-xl font-bold">Editar Perfil</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 focus:outline-none"
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
            <p className="text-sm text-gray-600">Haz clic en el icono de cámara para cambiar la foto</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna izquierda */}
            <div className="space-y-2">
              {/* Nombre */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Nombre <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.nombre ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-200 border-gray-300"
                  }`}
                />
                {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
              </div>

              {/* Apellido Paterno */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Apellido Paterno <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="apellidoPaterno"
                  value={formData.apellidoPaterno}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.apellidoPaterno ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-200 border-gray-300"
                  }`}
                />
                {errors.apellidoPaterno && (
                  <p className="text-red-500 text-sm mt-1">{errors.apellidoPaterno}</p>
                )}
              </div>

              {/* Apellido Materno (Opcional) */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Apellido Materno <span className="text-gray-400">(Opcional)</span>
                </label>
                <input
                  type="text"
                  name="apellidoMaterno"
                  value={formData.apellidoMaterno}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

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
                    errors.genero ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-200 border-gray-300"
                  }`}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                  <option value="prefiero-no-decir">Prefiero no decir</option>
                </select>
                {errors.genero && <p className="text-red-500 text-sm mt-1">{errors.genero}</p>}
              </div>
            </div>

            {/* Columna derecha */}
            <div className="space-y-2">
              {/* Número de teléfono */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Número de teléfono <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="10 dígitos"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.telefono ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-200 border-gray-300"
                  }`}
                />
                {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
              </div>

              {/* Correo de PayPal */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Correo de PayPal <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="correoPaypal"
                  value={formData.correoPaypal}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.correoPaypal ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-200 border-gray-300"
                  }`}
                />
                {errors.correoPaypal && (
                  <p className="text-red-500 text-sm mt-1">{errors.correoPaypal}</p>
                )}
              </div>

              {/* Fecha de nacimiento */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Fecha de nacimiento <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.fechaNacimiento ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-200 border-gray-300"
                    }`}
                  />
                </div>
                {errors.fechaNacimiento && (
                  <p className="text-red-500 text-sm mt-1">{errors.fechaNacimiento}</p>
                )}
              </div>
            </div>
          </div>

          {/* Botón de actualizar */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="bg-[#5b2630] blue-600 text-white py-2 px-6 rounded-lg hover:bg-[#461c24] focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
            >
              Actualizar Perfil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEditarPerfil;