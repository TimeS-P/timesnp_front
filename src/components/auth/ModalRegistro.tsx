import React from "react";
import Input from "./input";
import { Button } from "@heroui/react";

type Props = {};

const ModalRegistro = (props: Props) => {
  return (
    <div className="flex flex-row bg-slate-500 w-screen h-screen justify-center items-center">
      <div className="flex flex-row rounded-xl bg-white w-4/6 h-3/4">
        <div className="flex flex-row justify-center items-center w-1/2 bg-slate-200 rounded-xl">
          Contenedor Imagen
        </div>

        <section className="flex flex-col justify-center items-center w-1/2 rounded-tr-xl rounded-br-xl bg-red-200">
          <h1 className="text">Registro</h1>
          <div className="flex flex-col w-[70%] space-y-1">
            <div className="flex flex-row space-x-5">
              <Input label="Nombre" placeholder="Ingresa tu nombre" />
              <Input
                label="Correo Electronico"
                placeholder="Ingresa tu correo electronico"
              />
            </div>
            <Input label="Apellido" placeholder="Ingresa tu apellido" />
            <Input label="Contraseña" placeholder="IngresaContraseña" />
            <Input
              label="Confirmar Contraseña"
              placeholder="Ingresa tu contraseña"
            />

          </div>
          <Button color="primary" className="bg-[#B66331] text-white">
            Crear cuenta
          </Button>
        </section>
      </div>
    </div>
  );
};

export default ModalRegistro;
