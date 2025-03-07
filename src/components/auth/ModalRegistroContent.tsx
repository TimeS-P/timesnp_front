import React from "react";
import Input from "./Input";
import { Button } from "@heroui/react";
import ImagenLogin from "../Login/ImagenLogin";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import ModalRegistro from "./ModalRegistro";

type Props = {};

const ModalRegistroContent = (props: Props) => {
  return (
    <div className="flex flex-row rounded-xl bg-white w-full h-full">
      <div className="hidden md:block w-[50%] bg-[#162C51] rounded-tl-xl rounded-bl-xl">
        <ImagenLogin />
      </div>

      <section className="flex flex-col justify-center items-center w-1/2 rounded-tr-xl rounded-br-xl bg-white space-y-6">
        <h1 className="text-[#B66331] w-[80%] text-3xl font-bold">Registrate</h1>
        <div className="flex flex-col w-[80%] space-y-1">
          <div className="flex flex-row space-x-5">
            <Input label="Nombre" placeholder="Ingresa tu nombre" />
            <Input
              label="Apellido"
              placeholder="Ingresa tu apellido"
            />
          </div>
          <Input label="Correo Electronico" placeholder="Ingresa tu correo electronico" />
          <Input label="Contraseña" placeholder="Ingresa Contraseña" />
          <Input
            label="Confirmar Contraseña"
            placeholder="Ingresa tu contraseña"
          />
        </div>
        <Button color="primary" className="bg-[#B66331] text-white w-[80%] rounded-xl text-lg font-semibold py-6">
          Crear cuenta
        </Button>

        <footer className="w-[80%] flex flex-col justify-center  items-center space-y-[2%]">

          <span className="w-full flex flex-row space-x-4 justify-between items-center text-[#B66331]">
            <span className="w-full h-[1px] bg-[#B66331]"></span>
            <Icon icon="material-symbols-light:circle-outline" width="24" height="24" />
            <span className="w-full h-[1px] bg-[#B66331]"></span>
          </span>
          <div className="flex flex-row space-x-5 w-full justify-center items-center"> 
            <label className= "text-[#B66331]" htmlFor="">¿Ya tienes una cuenta?</label>
            <Link to="#"  className= "text-[#B66331] font-bold text-lx hover:underline" >Inicia sesion</Link>
          </div>

          <div className="w-full flex justify-center">
            <Input type="checkbox" label="Al registrarme, he leido y acepto los terminos y la Politica de Privacidad" placeholder="" />
          </div>
        </footer>
        
      </section>
    </div>
  );
};

export default ModalRegistroContent;
