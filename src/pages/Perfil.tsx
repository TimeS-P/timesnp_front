import FotoPerfil from "../components/Perfil/FotoPerfil";
import NombrePerfil from "../components/Perfil/NombrePerfil";
import DatosPersonales from "../components/Perfil/DatosPersonales";
import DatosContacto from "../components/Perfil/DatosContacto";
import DescripcionPerfil from "../components/Perfil/DescripcionPerfil";
import ButtonAzul from "../components/Botones/ButtonAzul";
import { useState } from "react";
import ModalEditarPerfil from "../components/Perfil/ModalEditarPerfil";

function Perfil() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative bg-white">
      {/* Fondo naranja solo como decoración en la parte superior */}
      <div className="bg-[#b66331] w-full h-48 absolute"></div>

      {/* Contenido real del perfil */}
      <div className="relative py-12">
        <div className="flex flex-row justify-evenly">
          {/* Columna izquierda: Foto de perfil */}
          <FotoPerfil verificado={true} />

          {/* Columna derecha: Nombre y datos */}
          <div className="flex flex-col justify-evenly">
            {/* Nombre en la parte superior */}
            <NombrePerfil />

            {/* Sección de datos de contacto y personales */}
            <div className="my-8 space-y-4">
              <div className="bg-white shadow-lg shadow-black/20 rounded-tr-3xl rounded-bl-3xl overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Datos personales (izquierda) */}
                  <DatosPersonales />

                  {/* Datos de contacto (derecha) */}
                  <DatosContacto />
                </div>

                {/* Descripción (abajo) */}
                <DescripcionPerfil />
              </div>
              <ButtonAzul texto="Editar perfil" onClick={handleOpenModal} />
            </div>
          </div>
        </div>
      </div>
      {/* Modal para editar perfil */}
      {isModalOpen && <ModalEditarPerfil onClose={handleCloseModal} />}
    </div>
  );
}

export default Perfil;
