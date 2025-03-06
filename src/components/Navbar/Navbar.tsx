import { useState } from "react";
import { Link } from "react-router-dom";
import ModalLogin from "../Login/ModalLogin";

function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-gray-100">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
            Inicio
          </Link>
          <Link to="/about" className="text-blue-600 hover:text-blue-800 font-medium">
            Acerca de
          </Link>
        </div>
        
        <button 
          onClick={handleOpenLoginModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Iniciar Sesión
        </button>
      </nav>
      
      <ModalLogin 
        isOpen={isLoginModalOpen} 
        onClose={handleCloseLoginModal}
      />
    </>
  );
}

export default Navbar;