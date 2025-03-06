import { Search } from "lucide-react";

function Buscador() {
  return (
    <div className="flex items-center bg-white border-2 border-[#6A6867] text-[#A3A3A3] rounded-md px-3 py-1 w-full">
      <Search className="w-5 h-5" />
      <span className="mx-2">|</span>
      <input
        type="text"
        placeholder="Buscar"
        className="bg-transparent focus:outline-none w-full"
      />
    </div>
  );
}

export default Buscador;
