import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import RecuperarContrasena from "../pages/RecuperarContasena";
import Perfil from "../pages/Perfil";
import Combos from "../pages/Combos";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/forgot_password" element={<RecuperarContrasena />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/combos" element={<Combos/>} />
    </Routes>
  );
};

export default AppRoutes;