import { Search } from "lucide-react";

function Buscador() {
  return (
    <div className="flex items-center bg-white border border-gray-300 text-gray-500 rounded-full px-4 py-1 w-96 shadow-sm hover:shadow-md transition-shadow duration-300 focus-within:ring-0 focus-within:ring-[#c5825a] focus-within:border-[#c5825a]">
      <input
        type="text"
        placeholder="Buscar servicios..."
        className="bg-transparent focus:outline-none w-full ml-3 text-gray-600 placeholder-gray-400"
      />
      <button className="bg-[#c5825a] hover:bg-[#a06949] text-white rounded-full p-2 ml-2">
        <Search className="w-4 h-4" />
      </button>
    </div>
  );
}

export default Buscador;
