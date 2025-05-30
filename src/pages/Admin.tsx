import { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import ReportesServicios from "../components/admin/ReportesServicios";
import ValidarUsuarios from "../components/admin/ValidarUsuarios";

// Main App Component
const Admin: React.FC = () => {
  const [activeRoute, setActiveRoute] = useState('reportes');

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar activeRoute={activeRoute} setActiveRoute={setActiveRoute} />
      
      {activeRoute === 'reportes' ? <ReportesServicios /> : <ValidarUsuarios />}
    </div>
  );
};

export default Admin;