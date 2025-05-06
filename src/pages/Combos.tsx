import { IoIosAddCircleOutline } from "react-icons/io";
import { Tarjeta } from "../components/Combos/TarjetaCombos";
import { useState } from "react";
import ModalCombo from "../components/Combos/ModalCombo";

const Combos = () => {
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedCombo, setSelectedCombo] = useState(null);

  const isCliente = true; // Simulando que el usuario es un cliente. TODO: Cambiar por la lógica real de verificación de roles.
  const onClick = () => {
    console.log("Unirse al combo de proveedor");
  }

  const handleOpenModal = (combo) => {
    setSelectedCombo(combo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCombo(null);
  };

  const combosData = [
    {
      nombre: "Combo básico para el hogar",
      description: "Incluye cosas para el hogar",
      precio: "1500",
      proveedor: "Proveedor 1",
      foto: "/FondoLogin.png",
    },
    {
      nombre: "Combo básico para el hogar",
      description: "Incluye cosas para el hogar",
      precio: "1500",
      proveedor: "Proveedor 1",
      foto: "/FondoLogin.png",
    },
    {
      nombre: "Combo básico para el hogar",
      description: "Incluye cosas para el hogar",
      precio: "1500",
      proveedor: "Proveedor 1",
      foto: "/FondoLogin.png",
    },
    {
      nombre: "Combo básico para el hogar",
      description: "Incluye cosas para el hogar",
      precio: "1500",
      proveedor: "Proveedor 1",
      foto: "/FondoLogin.png",
    },
    {
      nombre: "Combo básico para el hogar",
      description: "Incluye cosas para el hogar",
      precio: "1500",
      proveedor: "Proveedor 1",
      foto: "/FondoLogin.png",
    },
    // Agregar más combos según sea necesario
  ];

  return (
    <>
        {isCliente ? (
            // Si el usuario es cliente, muestra la sección de Combos de clientes
            <div>
                <h1 className="font-extrabold text-xl p-5">Combos disponibles</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5"> 
                    {combosData.map((combo, index) => (
                      <div key={index} onClick={() => handleOpenModal(combo)}>
                        <Tarjeta
                          nombre={combo.nombre}
                          description={combo.description}
                          precio={combo.precio}
                        />
                      </div>
                    ))}
                    {isModalOpen && selectedCombo && (
                      <ModalCombo
                        combo={selectedCombo}
                        onClose={handleCloseModal}
                        isCliente={isCliente} // Pasar el estado de isCliente al modal
                      />
                    )}
                </div>
            </div>
        ):(
            // Si el usuario es proveedor, muestra la sección de Acceso de proveedores
            <div>
                <h1 className="font-extrabold text-xl p-5">Combos de otros proveedores a los que puedes unirte</h1>
                <div className="w-40 ml-5">
                    <button onClick={onClick} className="w-full bg-[#162C51] text-white py-2 rounded-md hover:bg-[#7483A2] transition-colors flex gap-2">
                        <IoIosAddCircleOutline className="text-2xl ml-2"/>
                        Crear combo
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5"> 
                    {combosData.map((combo, index) => (
                      <div key={index} onClick={() => handleOpenModal(combo)}>
                        <Tarjeta
                          nombre={combo.nombre}
                          description={combo.description}
                          precio={combo.precio}
                        />
                      </div>
                    ))}
                    {isModalOpen && selectedCombo && (
                      <ModalCombo
                        combo={selectedCombo}
                        onClose={handleCloseModal}
                        isCliente={isCliente} // Pasar el estado de isCliente al modal
                      />
                    )}
                </div>
            </div>
        )}
    </>
  )
}

export default Combos