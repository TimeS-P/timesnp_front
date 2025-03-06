function ButtonNaranja({ texto }: { texto: string }) {
    return (
      <button className="w-full bg-[#B66331] text-white py-2 rounded-md hover:bg-[#915028] transition-colors">
        {texto}
      </button>
    );
  }
  
  export default ButtonNaranja;