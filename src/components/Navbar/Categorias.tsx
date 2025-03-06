import ItemNavbar from "./ItemNavbar"

function Categorias() {
  return (
    <div className="flex space-x-6 font-medium">
        <ItemNavbar nombre="Servicios" to="/servicios" />
        <ItemNavbar nombre="Chat" to="/chat" />
        <ItemNavbar nombre="Combos" to="/combos" />
    </div>
  )
}

export default Categorias