import LogoNav from "./LogoNav";
import Categorias from "./Categorias";
import Buscador from "./Buscador";
import Menu from "./Menu";
import ButtonNotificacion from "./ButtonNotificacion";

function Navbar() {
  return (
    <>
      <nav className="flex items-center justify-between py-4 px-12 bg-white shadow-md">
        <LogoNav />
        <Categorias />
        <Buscador />
        <div className="flex items-center">
          <ButtonNotificacion />
          <Menu />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
