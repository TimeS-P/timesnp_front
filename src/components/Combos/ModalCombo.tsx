import React, { useEffect, useState } from 'react';
import ButtonAzul from '../Botones/ButtonAzul';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { deleteCombo } from '../../services/Combos/apiCombos';
import Notification from '../Notificaciones/Notificacion';
import { IoIosChatboxes } from 'react-icons/io';
import ChatModal from './Chat';
import { createChat } from '../../services/Chat/chatService';

interface ComboDetails {
  id: string;
  nombre: string;
  description: string;
  precio: string | number;
  proveedor: string;
  foto: string;
  idServicioGeneral: string;
}

interface ModalDetalleComboProps {
  combo: ComboDetails;
  onClose: () => void;
  isCliente: boolean;
}

const ModalCombo: React.FC<ModalDetalleComboProps> = ({ combo, onClose, isCliente }) => {

  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [activeChat, setActiveChat] = useState<string>("");
  const [notification, setNotification] = useState({
        show: false,
        message: "",
        isSuccess: false,
      });

    const setChat = async () => {
      try {
        const response = await createChat(combo.idServicioGeneral);
        console.log("Chat creado: ", response);
        setActiveChat(response.id);
      } catch (error) {
        console.error("Error al crear el chat: ", error);
      }
    }

    const openChat = () => {
      setChat();
      setIsChatOpen(true);
      
    };

    const closeChat = () => {
      setIsChatOpen(false);
    };
    
      // Efecto para manejar las notificaciones y el cierre automático
      useEffect(() => {
        let notificationTimer: NodeJS.Timeout;
        let modalTimer: NodeJS.Timeout;
    
        if (notification.show) {
          // Cierra automáticamente todas las notificaciones después de 3 segundos
          notificationTimer = setTimeout(() => {
            setNotification((prev) => ({ ...prev, show: false }));
          }, 2000);
    
          if (notification.isSuccess) {
            modalTimer = setTimeout(() => {
              onClose();
              window.location.reload(); // Recargar la página
            }, 1100);
          }
        }
    
        return () => {
          if (notificationTimer) clearTimeout(notificationTimer);
          if (modalTimer) clearTimeout(modalTimer);
        };
      }, [notification.show, notification.isSuccess]);
  

  const handleDelete = async (id: string) => {
    try{
      const res = await deleteCombo(id);
      if(res.OK){
        setNotification({
          show: true,
          message: "Combo eliminado correctamente",
          isSuccess: true,
        });
      }else{
        setNotification({
          show: true,
          message: "Error al eliminar el combo",
          isSuccess: false,
        });
      }
    }catch(error){
      console.error("Error al eliminar el combo: ", error);
      setNotification({
          show: true,
          message: "Error al eliminar el combo",
          isSuccess: false,
      });
    }
  };

  const handleConfirmDelete = () => {
    setShowConfirmModal(false);
    handleDelete(combo.id);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, show: false }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <ChatModal
        chatId={"ChatId"}
        userId={"userId"}
        isOpen={isChatOpen}
        onClose={closeChat}
        idChat={activeChat}
        nombreServicio={"nombreServicio"}
      />
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <Notification
            show={notification.show}
            message={notification.message}
            isSuccess={notification.isSuccess}
            onClose={handleCloseNotification}
        />
        <div className="relative">
        <img
          src={combo.foto}
          alt={`Combo ${combo.nombre}`}
          className="w-full h-48 object-cover rounded-xl"
        />
        <div className="flex justify-center mb-5">
          <div 
            className="absolute top-full transform -translate-y-1/2 bg-white shadow-lg max-w-fit p-4 rounded-xl"
          >
            <h2 className="text-black text-xl font-bold">{combo.nombre}</h2>
          </div>
        </div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <p className="text-gray-700 font-medium">Proveedor: <span className="font-normal">{combo.proveedor}</span></p>
            <p className="text-gray-700 font-medium mt-2">Precio: <span className="text-green-600 font-semibold">${combo.precio}</span></p>
            <p className="text-gray-700 font-medium mt-2">Descripción:</p>
            <p className="text-gray-600 mt-2">{combo.description}</p>
          </div>
        
          <div className='flex justify-end'>
              {isCliente ?
              
                (
                <div className="mt-6 w-36 flex justify-between gap-5">
                  <button className='transition duration-300 ease-in-out hover:scale-110 text-4xl text-[#162C51] 'onClick={openChat}>
                    <IoIosChatboxes />
                  </button>
                  <ButtonAzul
                    texto="Reservar"
                    onClick={() => {
                      // Aquí puedes agregar reservar
                      console.log(`Unido al combo: ${combo.nombre}`);
                      onClose();
                    }}
                  />
                </div>
                )
                :
                (
                 <div className='flex gap-2'>
                   <button
                     onClick={() => {
                       // Aquí puedes agregar la lógica para unirte al combo
                       console.log(`Unido al combo: ${combo.nombre}`);
                       onClose();
                     }}
                     className='transition duration-300 ease-in-out hover:scale-110'
                   >
                      <FaEdit className="text-blue-500 w-8 h-8" />
                   </button>
                   <button
                     
                     onClick={() => {
                       // Aquí puedes agregar la lógica para unirte al combo
                       setShowConfirmModal(true)
                       console.log(`Combo eliminado: ${combo.id}`);
                     }}
                     className='transition duration-300 ease-in-out hover:scale-110'
                   >
                    <MdDelete className="text-red-500 w-8 h-8" />
                    
                   </button>
                 </div>
                )
              }
              
            
          </div>
        </div>
      </div>
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">¿Estás seguro de que deseas eliminar este combo?</h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalCombo;