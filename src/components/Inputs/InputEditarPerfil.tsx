import React from "react";

interface InputEditarPerfilProps {
  label: string;
  type: string;
  nombre: string;
  data: string;
  errors: string;
  tipo: string; // Puede ser "obligatorio" o "opcional"
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputEditarPerfil({
  label,
  type,
  nombre,
  data,
  errors,
  tipo,
  placeholder,
  handleChange,
}: InputEditarPerfilProps) {
  const isRequired = tipo === "obligatorio"; // Verifica si el tipo es obligatorio

  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">
        {label}
        <span className={isRequired ? "text-red-600" : "text-gray-500"}>
          {isRequired ? " *" : " (Opcional)"}
        </span>
      </label>
      <input
        type={type}
        name={nombre}
        value={data}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
          errors
            ? "border-red-500 focus:ring-red-200"
            : "focus:ring-blue-200 border-gray-300"
        }`}
      />
      {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
    </div>
  );
}

export default InputEditarPerfil;
