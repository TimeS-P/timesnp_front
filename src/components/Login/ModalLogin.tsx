import { useState } from "react";
import Login from "../Modals/ModalLogin";
import ModalForgotPassword from "../Modals/ModalForgotPassword";
import ImagenLogin from "./ImagenLogin";
import api from "../../lib/api/api";

interface ModalLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

function ModalLogin({ isOpen, onClose }: ModalLoginProps) {
  const [activeView, setActiveView] = useState('login');

  if (!isOpen) return null;
  
  const handleSwitchToForgotPassword = () => {
    setActiveView('forgotPassword');
  };

  const handleBackToLogin = () => {
    setActiveView('login');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-3xl flex">
        {/* Sección de imagen - mantenemos esto igual */}
        <div className="hidden md:block w-1/2 bg-[#162C51]">
          <ImagenLogin />
        </div>
        
        {/* Alternamos entre Login y ForgotPassword basado en el estado */}
        {activeView === 'login' ? (
          <Login 
            onClose={onClose} 
            onSwitchToForgotPassword={handleSwitchToForgotPassword} 
          />
        ) : (
          <ModalForgotPassword 
            onReturn={handleBackToLogin}
            onClose={onClose} 
            setActiveView={setActiveView}
          />
        )}
      </div>
    </div>
  );
}

export default ModalLogin;