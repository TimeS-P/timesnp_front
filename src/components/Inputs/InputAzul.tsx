import { ChangeEvent } from "react";

interface InputAzulProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function InputAzul({ label, type, placeholder, value, onChange }: InputAzulProps) {
  return (
    <>
      <label className="block text-sm font-medium mb-1 text-[#162C51]">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#162C51]"
      />
    </>
  );
}

export default InputAzul;
