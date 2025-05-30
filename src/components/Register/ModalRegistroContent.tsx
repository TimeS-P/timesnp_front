import React, { useEffect, useState } from "react";
import Input from "./Input";
import { Button } from "@heroui/react";
import ImagenLogin from "../Login/ImagenLogin";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import ModalRegistro from "./ModalRegistro";
import { registrarUsuario } from "../../services/CategoriasAndServices/authService";
import Notification from "../Notificaciones/Notificacion";

type Props = {
    // Aquí puedes definir las props que necesites
    // Por ejemplo, si necesitas una función para manejar el cierre del modal
    onClose?: () => void;
};

export interface FormData {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    confirmPassword: string;
    roles: string[];
}

const ModalRegistroContent = ({ onClose }: Props) => {


    // Estado para manejar los valores de los inputs
    const [formData, setFormData] = useState<FormData>({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        confirmPassword: "",
        roles: [
            "ROLE_USUARIO",
        ],
    });

    // Estado para manejar estado de notificacion modal
    const [notification, setNotification] = useState({
        show: false,
        message: "",
        isSuccess: false,
    });

    useEffect(() => {
        let notificationTimer: NodeJS.Timeout;
        let modalTimer: NodeJS.Timeout;
    
        if (notification.show) {
          // Cierra automáticamente todas las notificaciones después de 3 segundos
          notificationTimer = setTimeout(() => {
            setNotification((prev) => ({ ...prev, show: false }));
          }, 2000);
    
          // Si es una notificación de éxito, cierra el modal después
          if (notification.isSuccess) {
            modalTimer = setTimeout(() => {
              onClose?.(); // Cierra el modal si se proporciona la función onClose
            }, 1100);
          }
        }
    
        return () => {
          if (notificationTimer) clearTimeout(notificationTimer);
          if (modalTimer) clearTimeout(modalTimer);
        };
      }, [notification.show, notification.isSuccess]);



    const handleCloseNotification = () => {
        setNotification((prev) => ({ ...prev, show: false }));
    };

    // Función para manejar el envio del state
    const handleClicked = async () => {
        // Aquí puedes manejar el envío del formulario, por ejemplo, enviarlo a una API
        console.log("Datos del formulario:", formData);
        try {
            const data = await registrarUsuario(formData);
            if (data) {
                console.log("Usuario registrado exitosamente:", data);
                // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
                setNotification({
                    show: true,
                    message: "Usuario registrado exitosamente",
                    isSuccess: true,
                });
            } else {
                setNotification({
                    show: true,
                    message: "No se pudo registrar el usuario",
                    isSuccess: false,
                });
                throw new Error("No se pudo registrar el usuario");
            }

        } catch (error) {
            console.error("Error al registrar usuario:", error);
        }

    }

    return (
        <div className="flex flex-row rounded-xl bg-white w-full h-fit ">
            <div className="hidden md:block w-[50%] bg-[#162C51] rounded-tl-xl rounded-bl-xl">
                <ImagenLogin />
            </div>

            <Notification
                show={notification.show}
                message={notification.message}
                isSuccess={notification.isSuccess}
                onClose={handleCloseNotification}
            />

            <section className="flex flex-col justify-center items-center w-1/2 rounded-tr-xl rounded-br-xl bg-white space-y-6 py-8">
                <h1 className="text-[#B66331] w-[80%] text-3xl font-bold">Registrate</h1>
                <div className="flex flex-col w-[80%] space-y-1">
                    <div className="flex flex-row space-x-5">
                        <Input label="Nombre" placeholder="Ingresa tu nombre" name="nombre" formData={formData} setFormData={setFormData} />
                        <Input
                            label="Apellido"
                            placeholder="Ingresa tu apellido"
                            name="apellido" formData={formData} setFormData={setFormData}
                        />
                    </div>
                    <Input label="Correo Electronico" placeholder="Ingresa tu correo electronico" name="email" formData={formData} setFormData={setFormData} />
                    <Input label="Contraseña" placeholder="Ingresa Contraseña" name="password" formData={formData} setFormData={setFormData} />
                    <Input
                        label="Confirmar Contraseña"
                        placeholder="Ingresa tu contraseña"
                        name="confirmPassword" formData={formData} setFormData={setFormData}
                    />
                </div>
                <Button
                    color="primary"
                    className="bg-[#B66331] text-white w-[80%] rounded-xl text-lg font-semibold py-6"
                    onClick={handleClicked}
                >
                    Crear cuenta
                </Button>

                <footer className="w-[80%] flex flex-col justify-center  items-center space-y-[2%]">

                    <span className="w-full flex flex-row space-x-4 justify-between items-center text-[#B66331]">
                        <span className="w-full h-[1px] bg-[#B66331]"></span>
                        <Icon icon="material-symbols-light:circle-outline" width="24" height="24" />
                        <span className="w-full h-[1px] bg-[#B66331]"></span>
                    </span>
                    <div className="flex flex-row space-x-5 w-full justify-center items-center">
                        <label className="text-[#B66331]" htmlFor="">¿Ya tienes una cuenta?</label>
                        <Link to="#" className="text-[#B66331] font-bold text-lx hover:underline" >Inicia sesion</Link>
                    </div>


                </footer>

            </section>
        </div>
    );
};

export default ModalRegistroContent;