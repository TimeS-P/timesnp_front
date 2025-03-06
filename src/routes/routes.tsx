import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import RecuperarContrasena from "../pages/RecuperarContasena";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/forgot_password" element={<RecuperarContrasena />} />
    </Routes>
  );
};

export default AppRoutes;