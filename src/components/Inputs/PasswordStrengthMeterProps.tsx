import React from 'react';

interface PasswordStrengthMeterProps {
  strength: "weak" | "medium" | "strong" | null;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ strength }) => {
  return (
    <div className="mt-2">
      <div className="flex items-center">
        <span className="text-xs mr-2">Fortaleza:</span>
        <div className="h-2 flex-grow flex rounded-full overflow-hidden bg-gray-200">
          <div
            className={`h-full ${
              strength === "weak" ? "bg-red-500 w-1/3" : 
              strength === "medium" ? "bg-yellow-500 w-2/3" : 
              "bg-green-500 w-full"
            }`}
          />
        </div>
        <span className="text-xs ml-2">
          {strength === "weak" ? "Débil" : 
           strength === "medium" ? "Media" : 
           "Fuerte"}
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Usa 8+ caracteres con letras mayúsculas, minúsculas, números y símbolos.
      </p>
    </div>
  );
};

export default PasswordStrengthMeter;