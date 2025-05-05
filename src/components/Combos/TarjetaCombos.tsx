
interface TarjetaProps {
  nombre: string;
  description: string;
  precio: string | number;
}

export const Tarjeta = ({nombre, description, precio}: TarjetaProps) => {
  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-4 transform transition-transform duration-300 hover:scale-105">
        <img
          src="/FondoLogin.png"
          alt="Combo"
          className="w-full h-32 object-cover rounded-t-lg"
        />
        <h2 className="text-lg font-bold mt-2">{nombre}</h2>
        <p className="text-gray-600">{description}</p>
        <p className="text-gray-800 font-semibold mt-2">{precio}</p>
      </div>
    </div>
  )
}
