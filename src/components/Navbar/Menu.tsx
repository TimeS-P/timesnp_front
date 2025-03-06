import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import ModalLogin from "../Login/ModalLogin";

function Menu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simula el estado de sesión

  const handleOpenLoginModal = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
    }
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleMenuClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div
        onClick={handleMenuClick}
        className="relative flex items-center bg-white rounded-full p-2 space-x-2 cursor-pointer"
      >
        {/* Botón de Menú */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full">
          <IoMenu className="text-2xl" />
        </div>

        {/* Imagen de perfil */}
        <img
          src="https://i.pinimg.com/474x/2e/4f/d3/2e4fd3fd8f2aff9c26b15c1f1c23b11e.jpg"
          alt="User Profile"
          className="w-11 h-11 rounded-full"
        />

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-14 right-0 w-48 bg-white shadow-lg rounded-lg py-2">
            <ul className="text-sm">
              <li className="p-3 hover:bg-gray-100 cursor-pointer">Perfil</li>
              <li className="p-3 hover:bg-gray-100 cursor-pointer">
                Contrataciones
              </li>
              {/* Línea divisoria */}
              <hr className="my-2 border-t border-gray-300" />
              <li
                className="p-3 hover:bg-gray-100 cursor-pointer  font-medium text-[#162C51]"
                onClick={handleOpenLoginModal}
              >
                {isLoggedIn ? "Cerrar sesión" : "Iniciar sesión"}
              </li>
            </ul>
          </div>
        )}
      </div>
      {/* Modal de Login */}
      <ModalLogin isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </>
  );
}

export default Menu;
