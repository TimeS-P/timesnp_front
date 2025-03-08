interface ButtonAzulProps {
  texto: string;
  onClick?: () => void;
}

function ButtonAzul({ texto, onClick }: ButtonAzulProps) {
  return (
    <button onClick={onClick} className="w-full bg-[#162C51] text-white py-2 rounded-md hover:bg-[#7483A2] transition-colors">
      {texto}
    </button>
  );
}

export default ButtonAzul;
