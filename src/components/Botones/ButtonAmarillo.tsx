function ButtonAmarillo({ texto }: { texto: string }) {
  return (
    <button className="w-full bg-[#FFFFEA] text-[#D5AA75] py-2 rounded-md hover:bg-[#7483A2] transition-colors">
      {texto}
    </button>
  );
}

export default ButtonAmarillo;
