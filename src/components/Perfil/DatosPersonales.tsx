import { Calendar, User} from "lucide-react";

function DatosPersonales() {
  return (
    <div className="p-6 border-r border-gray-200 w-1/2">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        Datos personales
      </h3>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center">
          <Calendar className="mr-3 text-gray-500" size={20} />
          <div className="flex flex-col">
            <span className="text-gray-600">Fecha de nacimiento</span>
            <span className="text-gray-800 font-semibold">
              12 de marzo de 1998
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <User className="mr-3 text-gray-500" size={20} />
          <div className="flex flex-col">
            <span className="text-gray-600">Género</span>
            <span className="text-gray-800 font-semibold">
              Femenino
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatosPersonales;
