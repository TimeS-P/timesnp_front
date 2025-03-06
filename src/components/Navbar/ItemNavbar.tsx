import { Link } from "react-router-dom";

interface ItemNavbarProps {
  nombre: string;
  to: string;
}


function ItemNavbar({ nombre, to }: ItemNavbarProps) {
  return (
    <Link to={to} className="text-black hover:bg-[#D5AA75] hover:text-white hover:rounded-2xl font-medium px-4 py-1">
      {nombre}
    </Link>
  );
}

export default ItemNavbar;
