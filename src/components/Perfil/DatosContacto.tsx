import { Phone, Mail } from "lucide-react";

function DatosContacto() {
  return (
    <div className="p-6 border-l border-gray-200 w-1/2">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        Información de contacto
      </h3>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center">
          <Phone className="mr-3 text-gray-500" size={20} />
          <div className="flex flex-col">
            <span className="text-gray-600">Número de teléfono</span>
            <span className="text-gray-800 font-semibold">
              4431261199
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <Mail className="mr-3 text-gray-500" size={20} />
          <div className="flex flex-col">
            <span className="text-gray-600">Correo</span>
            <span className="text-gray-800 font-semibold">
              alexyanguie5@gmail.com
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DatosContacto