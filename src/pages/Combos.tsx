import { IoIosAddCircleOutline } from "react-icons/io";
import { Tarjeta } from "../components/Combos/TarjetaCombos";

const Combos = () => {

  const isCliente = true; // Simulando que el usuario es un cliente. TODO: Cambiar por la lógica real de verificación de roles.
  const onClick = () => {
    console.log("Unirse al combo de proveedor");
  }
  return (
    <>
        {isCliente ? (
            // Si el usuario es cliente, muestra la sección de Combos de clientes
            <div>
                <h1 className="font-extrabold text-xl p-5">Combos disponibles</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5"> 
                    <Tarjeta nombre={"Combo básico para el hogar"} description={"Incluye cosas para el hogar"} precio={"$1500"}/>  
                    <Tarjeta nombre={"Combo básico para el hogar"} description={"Incluye cosas para el hogar"} precio={"$1500"}/> 
                    <Tarjeta nombre={"Combo básico para el hogar"} description={"Incluye cosas para el hogar"} precio={"$1500"}/> 
                    <Tarjeta nombre={"Combo básico para el hogar"} description={"Incluye cosas para el hogar"} precio={"$1500"}/> 
                    <Tarjeta nombre={"Combo básico para el hogar"} description={"Incluye cosas para el hogar"} precio={"$1500"}/> 
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
                    <Tarjeta nombre={"Combo básico para el hogar"} description={"Incluye cosas para el hogar"} precio={"$1500"}/>  
                    <Tarjeta nombre={"Combo básico para el hogar"} description={"Incluye cosas para el hogar"} precio={"$1500"}/> 
                    <Tarjeta nombre={"Combo básico para el hogar"} description={"Incluye cosas para el hogar"} precio={"$1500"}/> 
                    <Tarjeta nombre={"Combo básico para el hogar"} description={"Incluye cosas para el hogar"} precio={"$1500"}/> 
                    <Tarjeta nombre={"Combo básico para el hogar"} description={"Incluye cosas para el hogar"} precio={"$1500"}/> 
                </div>
            </div>
        )}
    </>
  )
}

export default Combos