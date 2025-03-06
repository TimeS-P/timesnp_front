import ButtonAzul from "../components/Botones/ButtonAzul"
import InputAzul from "../components/Inputs/InputAzul"

function RecuperarContrasena() {
  return (
    <div className="mx-12 mt-8">
      <h2 className="text-2xl font-bold text-[#162C51] my-4">
        Recuperar contraseña
      </h2>
      <div className="space-y-4">
        <InputAzul
          label="Contraseña"
          type="password"
          placeholder="Ingresa tu contraseña"
        />
        <InputAzul
          label="Repetir contraseña"
          type="password"
          placeholder="Repite tu contraseña"
        />
      </div>
      <div className="flex justify-center mt-4">
        <ButtonAzul texto="Cambiar contraseña" />
      </div>
    </div>
  )
}

export default RecuperarContrasena