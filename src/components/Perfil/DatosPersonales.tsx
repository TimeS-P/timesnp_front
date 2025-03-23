import { Calendar, User } from "lucide-react";

interface DatosPersonalesProps {
  fechaNacimiento?: Date;
  genero?: string;
}

function DatosPersonales({ fechaNacimiento, genero }: DatosPersonalesProps) {
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
              <span className="text-gray-800 font-semibold">
                <span className="text-gray-800 font-semibold">
                  {fechaNacimiento
                    ? new Date(fechaNacimiento)
                        .toISOString()
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/")
                    : "Sin fecha"}
                </span>
              </span>
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <User className="mr-3 text-gray-500" size={20} />
          <div className="flex flex-col">
            <span className="text-gray-600">Género</span>
            <span className="text-gray-800 font-semibold">{genero}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatosPersonales;
