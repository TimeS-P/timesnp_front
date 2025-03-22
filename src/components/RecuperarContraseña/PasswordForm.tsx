import React from 'react';
import InputAzul from "../Inputs/InputAzul";
import ButtonAzul from "../Botones/ButtonAzul";
import PasswordStrengthMeter from "../Inputs/PasswordStrengthMeterProps";
import usePasswordForm from '../../hooks/ForgotPassword/usePasswordForm';

interface PasswordFormProps {
  token: string;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ token, onSuccess, onError }) => {
  const {
    password,
    confirmPassword,
    passwordStrength,
    isSubmitting,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit
  } = usePasswordForm(token, onSuccess, onError);

  return (
    <div>
      <div className="space-y-4">
        <div>
          <InputAzul
            label="Nueva contraseña"
            type="password"
            placeholder="Ingresa tu nueva contraseña"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordStrength && (
            <PasswordStrengthMeter strength={passwordStrength} />
          )}
        </div>
        <div>
          <InputAzul
            label="Confirmar contraseña"
            type="password"
            placeholder="Repite tu nueva contraseña"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
      </div>
      
      <div className="mt-8">
        {isSubmitting ? (
          <ButtonAzul texto="Actualizando contraseña" />
        ) : (
          <ButtonAzul texto="Cambiar contraseña" onClick={handleSubmit}/>
        )}
      </div>
    </div>
  );
};

export default PasswordForm;