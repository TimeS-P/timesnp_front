interface DescripcionPerfilProps {
  descripcion?: string;
}

function DescripcionPerfil({ descripcion }: DescripcionPerfilProps) {
  return (
    <div className="w-full max-w-4xl">
      <div className="p-6 border-t border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          Descripción
        </h3>
        <p className="text-gray-800 text-justify">
          {descripcion}
        </p>
      </div>
    </div>
  );
}

export default DescripcionPerfil;
