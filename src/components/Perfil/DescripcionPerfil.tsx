import React from "react";

function DescripcionPerfil() {
  return (
    <div className="w-full max-w-4xl">
      <div className="p-6 border-t border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          Descripción
        </h3>
        <p className="text-gray-800 text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
          nunc vel tincidunt tincidunt, nunc elit consectetur elit, nec
          ultricies purus nunc vel metus. Nullam nec libero auctor, lobortis
          turpis eu, luctus purus. Nulla facilisi.
        </p>
      </div>
    </div>
  );
}

export default DescripcionPerfil;
