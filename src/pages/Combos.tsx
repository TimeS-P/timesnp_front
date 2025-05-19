import { Tarjeta } from "../components/Combos/TarjetaCombos";
import { useEffect, useState } from "react";
import ModalCombo from "../components/Combos/ModalCombo";
import { getCombos, ComboInfo, getRoles, getComboProveedor } from "../services/Combos/apiCombos";
import ToggleUserTypeButton from "../components/Combos/ToggleProveedorButton";
import ComboForm from "../components/Combos/ModalCrearCombo";

const Combos = () => {
const [isModalOpen, setIsModalOpen] = useState(false);
const [isCliente, setIsCliente] = useState(true); // Simulando que el usuario es un cliente. TODO: Cambiar por la lógica real de verificación de roles.
const [isProveedor, setIsProveedor] = useState(false);
const [combos, setCombos] = useState<Array<{
  id: string;
  nombre: string;
  description: string;
  precio: string;
  proveedor: string;
  foto: string;
  idServicioGeneral: string;
}>>([]);
const [combosProveedor, setCombosProveedor] = useState<Array<{
  id:string;
  nombre: string;
  description: string;
  precio: string;
  proveedor: string;
  foto: string;
  idServicioGeneral: string;
}>>([]);

const [selectedCombo, setSelectedCombo] = useState<{
  id:string;
  nombre: string;
  description: string;
  precio: string;
  proveedor: string;
  foto: string;
  idServicioGeneral: string;
} | null>(null);

  const initializateData = async () => {
    const response = await getCombos();
    const combosArray: ComboInfo[] = Array.isArray(response) ? response : [response];
    console.log("Combos: ", combosArray);
    setCombos(combosArray.map(combo => ({
      id: combo.id,
      nombre: combo.servicioGeneral.nombre,
      description: combo.servicioGeneral.descripcion,
      precio: combo.servicioGeneral.precio,
      proveedor: combo.proveedor.perfil.nombre,
      foto: combo.servicioGeneral.fotos[0] ? combo.servicioGeneral.fotos[0].url_foto : "/FondoLogin.png", // Asignar una foto por defecto si no hay
      idServicioGeneral: combo.servicioGeneral.id
    })));
    
  };

  const initializateDataProveedor = async () => {
    const response = await getComboProveedor();
    const combosArray: ComboInfo[] = Array.isArray(response) ? response : [response];
    console.log("Combos-proveedor: ", combosArray);
    setCombosProveedor(combosArray.map(combo => ({
      id: combo.id,
      nombre: combo.servicioGeneral.nombre,
      description: combo.servicioGeneral.descripcion,
      precio: combo.servicioGeneral.precio,
      proveedor: combo.proveedor.perfil.nombre,
      foto: combo.servicioGeneral.fotos[0] ? combo.servicioGeneral.fotos[0].url_foto : "/FondoLogin.png", // Asignar una foto por defecto si no hay
      idServicioGeneral: combo.servicioGeneral.id
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
    initializateDataProveedor();
  },[])


  const handleOpenModal = (combo: {id:string; nombre: string; description: string; precio: string; proveedor: string; foto: string ; idServicioGeneral: string }) => {
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
                <h1 className="font-extrabold text-xl p-5 pl-8">Combos disponibles</h1>
                {isProveedor && (<ToggleUserTypeButton isCliente={setIsCliente}/>)}
              </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5"> 
                    {combos.map((combo, index) => (
                      <div key={index} onClick={() => handleOpenModal(combo)}>
                        <Tarjeta
                          nombre={combo.nombre}
                          description={combo.description}
                          precio={combo.precio}
                          foto={combo.foto}
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
                  <h1 className="font-extrabold text-xl p-5 pl-8">Tus combos</h1>
                  {isProveedor && (<ToggleUserTypeButton isCliente={setIsCliente}/>)}
              </div>
                <div className="w-40 ml-5">
                    <ComboForm/>
                    
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5"> 
                    {combosProveedor.map((combo, index) => (
                      <div key={index} onClick={() => handleOpenModal(combo)}>
                        <Tarjeta
                          nombre={combo.nombre}
                          description={combo.description}
                          precio={combo.precio}
                          foto={combo.foto}
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