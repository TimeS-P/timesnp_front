import ImagenLogin from "./ImagenLogin";
import Login from "./Login";

interface ModalLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

function ModalLogin({ isOpen, onClose }: ModalLoginProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black rounded-lg overflow-hidden w-full max-w-4xl">
        <div className="flex flex-row">
          {/* Lado izquierdo - Imagen o contenido */}
          <ImagenLogin />

          {/* Lado derecho - Formulario de login */}
          <Login onClose={onClose} />
        </div>
      </div>
    </div>
  );
}

export default ModalLogin;
