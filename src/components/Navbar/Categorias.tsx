import ItemNavbar from "./ItemNavbar"

function Categorias() {
  return (
    <div className="flex flex-row space-x-20">
        <ItemNavbar nombre="Servicios" to="/servicios" />
        <ItemNavbar nombre="Chat" to="/chat" />
        <ItemNavbar nombre="Combos" to="/combos" />
    </div>
  )
}

export default Categorias