interface InputAzulProps {
    label: string;
    type: string;
    placeholder: string;
  }
  
  function InputNaranja({ label, type, placeholder }: InputAzulProps) {
    return (
      <>
        <label className="block text-sm font-medium mb-1 text-[#B66331]">
          {label}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B66331]"
        />
      </>
    );
  }
  
  export default InputNaranja;