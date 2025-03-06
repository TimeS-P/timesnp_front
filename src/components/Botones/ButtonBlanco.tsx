function ButtonBlanco({ texto }: { texto: string }) {
  return (
    <button className="w-full bg-white text-[#162C51] py-2 rounded-md hover:bg-[#7483A2] transition-colors">
      {texto}
    </button>
  );
}

export default ButtonBlanco;
