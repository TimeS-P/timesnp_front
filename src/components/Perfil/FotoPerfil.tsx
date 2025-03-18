import React from 'react'

function FotoPerfil({ verificado = false }) {
  return (
    <div>
      <div className="w-96 bg-white shadow-lg shadow-black rounded-tr-3xl rounded-bl-3xl overflow-hidden flex flex-col">
        {/* Sección de imagen de perfil */}
        <div className="h-80 w-full">
          <img 
            src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyZmlsfGVufDB8fDB8fHww" 
            alt="Foto de perfil" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Sección de verificación/proveedor */}
        <div className="pt-8 flex flex-col items-center justify-center">
          {!verificado ? (
            <>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Verificación pendiente
              </h3>
              <p className="text-gray-600 text-center mb-6 max-w-xs">
                Para disfrutar de todas las funcionalidades, verifica tu identidad a través del correo electrónico enviado.
              </p>
              <div className="flex space-x-4 mb-8">
                <button className="px-6 py-3 bg-gray-200 text-gray-700 text-lg rounded-full hover:bg-gray-300 transition-colors">
                  Reenviar correo
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800">
                  Cuenta verificada
                </h3>
              </div>
              
              {/* Sistema de puntos */}
              <div className="flex items-center justify-center mb-6 bg-gray-100 px-6 py-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xl font-bold text-gray-800">1,250 puntos</span>
              </div>
              
              {/* Botón con forma esquinada que abarca todo el ancho */}
              <div className="w-full">
                <button className="w-full h- py-3 bg-[#5b2630] text-white text-lg hover:bg-[#35161c] transition-colors shadow-md flex items-center justify-center rounded-tr-2xl rounded-bl-2xl">
                  Convertirse en proveedor
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default FotoPerfil