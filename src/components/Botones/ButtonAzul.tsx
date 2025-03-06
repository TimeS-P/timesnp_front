function ButtonAzul({ texto }: { texto: string }) {
  return (
    <button className="w-full bg-[#162C51] text-white py-2 rounded-md hover:bg-[#7483A2] transition-colors">
      {texto}
    </button>
  );
}

export default ButtonAzul;
