import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import RecuperarContrasena from "../pages/RecuperarContasena";
import Perfil from "../pages/Perfil";
import Servicios from "../pages/Servicios";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Servicios/>} />
      <Route path="*" element={<NotFound />} />
      <Route path="/forgot_password" element={<RecuperarContrasena />} />
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  );
};

export default AppRoutes;