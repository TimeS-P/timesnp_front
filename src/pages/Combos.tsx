import { Tarjeta } from "../components/Combos/TarjetaCombos";
import { useEffect, useState } from "react";
import ModalCombo from "../components/Combos/ModalCombo";
import { getCombos, ComboInfo, getRoles } from "../services/Combos/apiCombos";
import ToggleUserTypeButton from "../components/Combos/ToggleProveedorButton";
import ComboForm from "../components/Combos/ModalCrearCombo";

const Combos = () => {
const [isModalOpen, setIsModalOpen] = useState(false);
const [isCliente, setIsCliente] = useState(true); // Simulando que el usuario es un cliente. TODO: Cambiar por la lógica real de verificación de roles.
const [isProveedor, setIsProveedor] = useState(false);
const [combos, setCombos] = useState<Array<{
  nombre: string;
  description: string;
  precio: string;
  proveedor: string;
  foto: string;
}>>([]);
const [selectedCombo, setSelectedCombo] = useState<{
  nombre: string;
  description: string;
  precio: string;
  proveedor: string;
  foto: string;
} | null>(null);

  const initializateData = async () => {
    const response = await getCombos();
    const combosArray: ComboInfo[] = Array.isArray(response) ? response : [response];
    console.log("Combos: ", combosArray);
    setCombos(combosArray.map(combo => ({
      nombre: combo.servicioGeneral.nombre,
      description: combo.servicioGeneral.descripcion,
      precio: combo.servicioGeneral.precio,
      proveedor: combo.proveedor.perfil.nombre,
      foto: combo.servicioGeneral.fotos[0] || "/FondoLogin.png", // Asignar una foto por defecto si no hay
    })));
    
  };

  const setRoles = async () => {
    const response = await getRoles();
    if(response.length > 0){
      if(response.some((role) => role.nombre === "ROLE_PROVEEDOR")){
        console.log("El usuario es proveedor");
        setIsProveedor(true);
      }
    }
    console.log("Roles: ", response);
  }

  useEffect(() => {
    initializateData();
    setRoles();
  },[])


  const handleOpenModal = (combo: { nombre: string; description: string; precio: string; proveedor: string; foto: string }) => {
    setSelectedCombo(combo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCombo(null);
  };

  

  return (
    <>
        {isCliente ? (
            // Si el usuario es cliente, muestra la sección de Combos de clientes
            <div>
              <div className="flex justify-between items-center">
                <h1 className="font-extrabold text-xl p-5">Combos disponibles</h1>
                {isProveedor && (<ToggleUserTypeButton isCliente={setIsCliente}/>)}
              </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5"> 
                    {combos.map((combo, index) => (
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
              <div className="flex justify-between items-center">
                  <h1 className="font-extrabold text-xl p-5">Combos de otros proveedores a los que puedes unirte</h1>
                  {isProveedor && (<ToggleUserTypeButton isCliente={setIsCliente}/>)}
              </div>
                <div className="w-40 ml-5">
                    <ComboForm/>
                    
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5"> 
                    {combos.map((combo, index) => (
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