import { useState } from 'react';
import { fetchChangePassword } from '../../services/ForgotPassword/authService';

export type PasswordStrength = "weak" | "medium" | "strong" | null;

const usePasswordForm = (token: string, onSuccess: (message: string) => void, onError: (message: string) => void) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>(null);

  const checkPasswordStrength = (password: string): PasswordStrength => {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;
    
    const score = [hasLowerCase, hasUpperCase, hasNumber, hasSpecialChar, isLongEnough].filter(Boolean).length;
    
    if (score <= 2) return "weak";
    if (score <= 4) return "medium";
    return "strong";
  };

  const handlePasswordChange = (e: { target: { value: string } }): void => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword) {
      setPasswordStrength(checkPasswordStrength(newPassword));
    } else {
      setPasswordStrength(null);
    }
  };

  const handleConfirmPasswordChange = (e: { target: { value: string } }): void => {
    setConfirmPassword(e.target.value);
  };

  const validateForm = (): boolean => {
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      onError("Las contraseñas no coinciden");
      return false;
    }
    
    // Validar que la contraseña no esté vacía
    if (!password.trim()) {
      onError("La contraseña no puede estar vacía");
      return false;
    }

    // Validar fortaleza de contraseña
    if (passwordStrength === "weak") {
      onError("La contraseña es demasiado débil. Incluye letras mayúsculas, minúsculas, números y caracteres especiales.");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    // Limpiar errores anteriores
    onError("");
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await fetchChangePassword(token, password);
      
      if (result.success) {
        onSuccess("Contraseña actualizada correctamente");
      } else {
        onError(result.message || "Ha ocurrido un error al cambiar la contraseña");
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      onError("Error de conexión. Intenta más tarde");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    password,
    confirmPassword,
    passwordStrength,
    isSubmitting,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit
  };
};

export default usePasswordForm;