import React, { useState, useEffect } from 'react';
import { User, FileText, CheckCircle, AlertTriangle, X, Eye } from 'lucide-react';

// Types
export interface Usuario {
  id: string;
  email: string;
  verificarCorreo: string | null;
  domicilios: any[];
  recuperarPassword: string | null;
  enabled: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  username: string;
}

export interface Perfil {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: string;
  foto: string | null;
  puntos: number;
  codigoCompartir: string;
  fechaNacimiento: string;
  genero: string;
  descripcion: string;
  usuario: Usuario;
  verificacion: any;
}

export interface Reporte {
  id: string;
  comentario: string;
  fecha: string;
  perfil: Perfil;
}

export interface ReportesResponse {
  message: string;
  data: Reporte[];
  OK: boolean;
}

// Mock data for ValidarUsuarios
export const mockUsuarios = [
  { id: '1', nombre: 'Amalia Rosas Fuente', status: 'pending' },
  { id: '2', nombre: 'Amalia Rosas Fuente', status: 'pending' },
  { id: '3', nombre: 'Amalia Rosas Fuente', status: 'pending' },
  { id: '4', nombre: 'Amalia Rosas Fuente', status: 'pending' },
  { id: '5', nombre: 'Amalia Rosas Fuente', status: 'pending' },
];

// Sidebar Component
const AdminSidebar: React.FC<{ activeRoute: string; setActiveRoute: (route: string) => void }> = ({ 
  activeRoute, 
  setActiveRoute 
}) => {
  return (
    <div className="w-64 bg-gradient-to-b from-orange-200 to-orange-300 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">Time</span>
        </div>
        <span className="font-bold text-gray-800">TimeSap</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <div className="space-y-2">
          <button
            onClick={() => setActiveRoute('reportes')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeRoute === 'reportes' 
                ? 'bg-white bg-opacity-50 text-gray-800' 
                : 'text-gray-700 hover:bg-white hover:bg-opacity-30'
            }`}
          >
            <FileText size={20} />
            <span>Reportes de Servicios</span>
          </button>
          
          <button
            onClick={() => setActiveRoute('validar')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeRoute === 'validar' 
                ? 'bg-white bg-opacity-50 text-gray-800' 
                : 'text-gray-700 hover:bg-white hover:bg-opacity-30'
            }`}
          >
            <CheckCircle size={20} />
            <span>Validar Usuarios</span>
          </button>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-orange-400 border-opacity-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
          <div>
            <p className="font-medium text-gray-800">Administrador</p>
            <p className="text-sm text-gray-600">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;