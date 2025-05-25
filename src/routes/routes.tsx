import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import RecuperarContrasena from "../pages/RecuperarContasena";
import Perfil from "../pages/Perfil";
import Servicios from "../pages/Servicios";
import ServicioCompleto from "../components/Servicios/ServicioCompleto/ServicioCompleto";
import GetServicioCompleto from "../pages/GetServicioCompleto";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Servicios/>} />
      <Route path="*" element={<NotFound />} />
      <Route path="/forgot_password" element={<RecuperarContrasena />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/servicios/:id" element={<GetServicioCompleto />} />
    </Routes>
  );
};

export default AppRoutes;