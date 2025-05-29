import { useState, useEffect } from "react";
import FotoPerfil from "../components/Perfil/FotoPerfil";
import NombrePerfil from "../components/Perfil/NombrePerfil";
import DatosPersonales from "../components/Perfil/DatosPersonales";
import DatosContacto from "../components/Perfil/DatosContacto";
import DescripcionPerfil from "../components/Perfil/DescripcionPerfil";
import ButtonAzul from "../components/Botones/ButtonAzul";
import ModalEditarPerfil from "../components/Perfil/ModalEditarPerfil";
import { getUserInfo } from "../services/Perfil/authService";

interface UserInfo {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  codigoCompartir: string;
  descripcion: string | null;
  fechaNacimiento: Date | null;
  foto: string | null;
  genero: string | null;
  telefono: string;
  puntos: number;
  id: string;
  usuario: {
    id: string;
    email: string;
  };
}

function Perfil() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const data = await getUserInfo();
        setUserInfo(data);
        setError("");
        

        // Verifica si hay datos incompletos y abre el modal automáticamente
        if (datosIncompletos(data)) {
          setIsModalOpen(true);
        }
      } catch (err) {
        console.error("Error completo:", err);
        setError("Error al cargar la información del usuario");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const datosIncompletos = (data: UserInfo) => {
    return (
      !data.nombre ||
      !data.apellidoPaterno ||
      !data.fechaNacimiento ||
      !data.telefono ||
      !data.genero ||
      !data.descripcion ||
      !data.fechaNacimiento
    );
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleProfileUpdate = async () => {
    try {
      const updatedData = await getUserInfo();
      setUserInfo(updatedData);

      // Si los datos ya están completos, cierra el modal
      if (!datosIncompletos(updatedData)) {
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Error al actualizar la información del perfil", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Cargando...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="relative bg-white">
      <div className="bg-[#b66331] w-full h-48 absolute"></div>

      <div className="relative py-12">
        <div className="flex flex-row justify-evenly">
          <FotoPerfil />

          <div className="flex flex-col justify-evenly">
            <NombrePerfil
              nombre={userInfo?.nombre}
              apellidoPaterno={userInfo?.apellidoPaterno}
              apellidoMaterno={userInfo?.apellidoMaterno}
              codigoUsuario={userInfo?.codigoCompartir}
            />

            <div className="my-8 space-y-4">
              <div className="bg-white shadow-lg shadow-black/20 rounded-tr-3xl rounded-bl-3xl overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <DatosPersonales
                    fechaNacimiento={userInfo?.fechaNacimiento ?? undefined}
                    genero={userInfo?.genero || "Sin género"}
                  />
                  <DatosContacto
                    telefono={userInfo?.telefono || "Sin teléfono"}
                    correo={userInfo?.usuario.email || "Sin correo"}
                  />
                </div>

                <DescripcionPerfil
                  descripcion={userInfo?.descripcion || "Sin descripción"}
                />
              </div>
              <ButtonAzul texto="Editar perfil" onClick={handleOpenModal} />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ModalEditarPerfil
          onClose={handleCloseModal}
          onProfileUpdate={handleProfileUpdate}
          currentPhoto={userInfo?.foto || undefined}
          initialData={{
            nombre: userInfo?.nombre || "",
            apellidoPaterno: userInfo?.apellidoPaterno || "",
            apellidoMaterno: userInfo?.apellidoMaterno || "",
            telefono: userInfo?.telefono || "",
            fechaNacimiento: userInfo?.fechaNacimiento
              ? new Date(userInfo.fechaNacimiento)
              : undefined,
            descripcion: userInfo?.descripcion || "",
            genero: userInfo?.genero || "",
          }}
          isCompletaPerfil={!datosIncompletos(userInfo as UserInfo)}
        />
      )}
    </div>
  );
}

export default Perfil;
