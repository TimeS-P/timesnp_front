import LogoNav from "./LogoNav";
import Categorias from "./Categorias";
import Buscador from "./Buscador";
import Menu from "./Menu";
import Notifiacion from "./Notifiacion";

function Navbar() {
  return (
    <>
      <nav className="flex items-center justify-between py-4 px-12 bg-[#F1E0CC]">
        <LogoNav />
        <div className="flex flex-col items-center space-y-4">
          <Categorias />
          <Buscador />
        </div>
        <div className="flex items-center">
          <Notifiacion />
          <Menu/>
        </div>
      </nav>
    </>
  );
}

export default Navbar;