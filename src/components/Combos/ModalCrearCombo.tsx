import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { createCombo } from '../../services/Combos/apiCombos';
import Notification from '../Notificaciones/Notificacion';
import LoadingButton from '../Botones/LoadingButton';

const ComboForm = () => {
  // Estado para controlar si el modal está abierto o cerrado
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Estados para almacenar los valores del formulario
  const [formData, setFormData] = useState<{
    nombre: string;
    precio: string;
    detalles: string;
    imagen: File | null;
  }>({
    nombre: '',
    precio: '',
    detalles: '',
    imagen: null
  });

  // Estado para notificaciones
    const [notification, setNotification] = useState({
      show: false,
      message: "",
      isSuccess: false,
    });
  
    // Efecto para manejar las notificaciones y el cierre automático
    useEffect(() => {
      let notificationTimer: NodeJS.Timeout;
      let modalTimer: NodeJS.Timeout;
  
      if (notification.show) {
        // Cierra automáticamente todas las notificaciones después de 3 segundos
        notificationTimer = setTimeout(() => {
          setNotification((prev) => ({ ...prev, show: false }));
        }, 2000);
  
        // Si es una notificación de éxito, cierra el modal después
        if (notification.isSuccess) {
          modalTimer = setTimeout(() => {
            closeModal();
            window.location.reload(); // Recargar la página
          }, 1100);
        }
      }
  
      return () => {
        if (notificationTimer) clearTimeout(notificationTimer);
        if (modalTimer) clearTimeout(modalTimer);
      };
    }, [notification.show, notification.isSuccess]);

  // Manejador de cambios en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejador de cambios en el input de archivos
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        imagen: e.target.files[0]
      });
    }
  };

  // Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Función para guardar el formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Datos del formulario:', formData);
    const formDataToSend = new FormData();
    formDataToSend.append('nombre', formData.nombre);
    formDataToSend.append('precio', formData.precio);
    formDataToSend.append('descripcion', formData.detalles);
    if (formData.imagen) {
      formDataToSend.append('imagen', formData.imagen);
    }
    try{
      const res = await createCombo(formDataToSend);
      console.log('Respuesta del servidor:', res);
      if(res.OK){
        setNotification({
          show: true,
          message: "Combo creado con éxito",
          isSuccess: true,
        });
      }else{
        setNotification({
          show: true,
          message: "Error al crear el combo",
          isSuccess: false,
        });
      }
    }catch (error) {
      console.error('Error al crear el combo:', error);
      setNotification({
        show: true,
        message: "Error al crear el combo",
        isSuccess: false,
      });
    }finally{
      setIsLoading(false);
    }
    
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, show: false }));
  };

  return (
    <div className="p-4">
      
      {/* Botón para abrir el modal */}
      <button onClick={openModal} className="w-40 bg-[#162C51] text-white py-2 rounded-md hover:bg-[#7483A2] transition-colors flex gap-2">
                        <IoIosAddCircleOutline className="text-2xl ml-2"/>
                        Crear combo
        </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Notification
            show={notification.show}
            message={notification.message}
            isSuccess={notification.isSuccess}
            onClose={handleCloseNotification}
          />
          <div className="bg-white rounded-lg shadow-xl w-full min-w-[600px] max-w-md mx-4 overflow-hidden">
            {/* Sección de carga de imagen */}
            <div className="bg-gray-200 h-48 flex items-center justify-center relative">
              {formData.imagen ? (
                <img 
                  src={URL.createObjectURL(formData.imagen)} 
                  alt="Vista previa" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <div className="text-gray-500 mb-2">
                    <svg className="w-12 h-12 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              )}
              
              {/* Input para subir imagen (oculto pero funcional) */}
              <input 
                type="file" 
                id="imagen" 
                name="imagen"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            <div className="border-t border-gray-300 my-2"></div>

            <form onSubmit={handleSubmit} className="p-4">
              {/* Nombre del Combo */}
              <div className="mb-4">
                <label htmlFor="nombre" className="block text-[#B66331] font-medium mb-1">
                  Nombre del Combo*
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#cf9577]"
                />
              </div>

              {/* Precio */}
              <div className="mb-4">
                <label htmlFor="precio" className="block text-[#B66331] font-medium mb-1">
                  Precio*
                </label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  value={formData.precio}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#cf9577]"
                />
              </div>

              {/* Detalles del combo */}
              <div className="mb-4">
                <label htmlFor="detalles" className="block text-[#B66331] font-medium mb-1">
                  Detalles del combo*
                </label>
                <textarea
                  id="detalles"
                  name="detalles"
                  value={formData.detalles}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#cf9577]"
                />
              </div>

              {/* Botones de acción */}
              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-300"
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Regresar
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition duration-300 disabled:opacity-60"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                  )}
                  {isLoading ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComboForm;