interface ApiResponse {
  success: boolean;
  message: string;
  OK?: boolean;
}

const BASE_URL = 'http://localhost:8080/api';

// Método para enviar solicitud de recuperación de contraseña
export const sendPasswordRecoveryEmail = async (
  email: string
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/forgot_password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      return { 
        success: true, 
        message: 'Se envió un correo de recuperación de contraseña' 
      };
    } else {
      return { 
        success: false, 
        message: data.message || 'Ocurrió un error al enviar el correo' 
      };
    }
  } catch (error) {
    console.error('Error en sendPasswordRecoveryEmail:', error);
    return { 
      success: false, 
      message: 'Error de conexión. Intenta más tarde' 
    };
  }
};

// Método para validar token de recuperación
export const fetchValidateToken = async (
  token: string
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/validate_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();

    if (response.ok) {
      if (data.message === "Token validado correctamente" && data.OK) {
        return { success: true, message: "Token validado correctamente" };
      } else {
        return { success: false, message: "Ha ocurrido un error inesperado" };
      }
    } else {
      if (data.message === "Token inválido") {
        return {
          success: false,
          message: "El token proporcionado no es válido",
        };
      } else if (data.message === "El token ha expirado") {
        return {
          success: false,
          message:
            "El enlace ha expirado. Por favor, solicita un nuevo enlace de recuperación",
        };
      } else {
        return {
          success: false,
          message: "Ha ocurrido un error al validar el token",
        };
      }
    }
  } catch (error) {
    console.error("Error en fetchValidateToken:", error);
    throw error;
  }
};

// Método para cambiar contraseña
export const fetchChangePassword = async (
  token: string,
  nuevaContrasena: string
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/cambiar_contrasena`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, nuevaContrasena }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: "Contraseña actualizada correctamente" };
    } else {
      return {
        success: false,
        message:
          data.message || "Ha ocurrido un error al cambiar la contraseña",
      };
    }
  } catch (error) {
    console.error("Error en fetchChangePassword:", error);
    throw error;
  }
};

