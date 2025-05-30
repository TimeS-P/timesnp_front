import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import ModalLogin from "../Login/ModalLogin";
import { jwtDecode } from "jwt-decode";
import { CustomJWTPayload } from "../../ts/interfaces/global";
import ModalRegistro from "../Register/ModalRegistro";

function Menu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate(); // Inicializa el hook useNavigate

  useEffect(() => {
    const token = sessionStorage.getItem("JWT-TOKEN");

    //Si el token existe, se decodea el token y se obtiene el email
    if (token !== null) {
      const decodedToken: CustomJWTPayload = jwtDecode<CustomJWTPayload>(sessionStorage.getItem("JWT-TOKEN") || "");
      const email = decodedToken.username;
      setEmail(email);
    };
    setIsLoggedIn(!!token);
  }, []);

  const handleOpenLoginModal = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      setIsDropdownOpen(false);
    }
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleMenuClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      sessionStorage.removeItem("JWT-TOKEN");
      setIsLoggedIn(false);
      setIsLoggingOut(false);
      setIsDropdownOpen(false);
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <div className="relative ml-4">
        <button
          onClick={handleMenuClick}
          className="flex items-center space-x-2 bg-white hover:bg-gray-100 p-2 rounded-full border border-gray-200 transition-all duration-300"
        >
          <div className="hidden sm:flex items-center justify-center w-8 h-8">
            <IoMenu className="text-xl text-gray-700" />
          </div>
          <img
            src="https://i.pinimg.com/474x/2e/4f/d3/2e4fd3fd8f2aff9c26b15c1f1c23b11e.jpg"
            alt="User Profile"
            className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg overflow-hidden z-10">
            {isLoggedIn ? (
              // Si el usuario está logueado, mostrar opciones de perfil y logout
              <>
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{email}</p>
                </div>
                <ul>
                  <li>
                    <a
                      href="/perfil"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                    >
                      Editar perfil
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contrataciones"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                    >
                      Contrataciones
                    </a>
                  </li>
                  <li className="border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className={`block w-full text-left px-4 py-3 text-sm font-medium transition-colors duration-150 ${
                        isLoggingOut
                          ? "text-gray-500 cursor-not-allowed"
                          : "text-red-600 hover:bg-gray-50"
                      }`}
                    >
                      {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
                    </button>
                  </li>
                </ul>
              </>
            ) : (
              // Si el usuario NO está logueado, mostrar opciones de login/registro
              <ul>
                <li>
                  <button
                    onClick={handleOpenLoginModal}
                    className="block w-full text-left px-4 py-3 text-sm font-medium text-[#162C51] hover:bg-gray-50 transition-colors duration-150"
                  >
                    Iniciar sesión
                  </button>
                </li>
                <li>
                  <ModalRegistro />
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
      <ModalLogin isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </>
  );
}

export default Menu;
