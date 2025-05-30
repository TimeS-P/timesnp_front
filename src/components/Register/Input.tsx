import { Checkbox } from "@heroui/react";
import React from "react";
import { FormData } from "./ModalRegistroContent";

type Props = {
    label: string;
    placeholder: string;
    type?: string;

    name: string;

    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    formData: FormData;
};

const Input = ({ label, placeholder, type = "text", formData, setFormData, name }: Props) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }


    return type == "text" ? (
        <div className="flex flex-col w-full space-y-2">
            <label htmlFor="" className="text-[#B66331] text-lg font-semibold">
                {" "}
                {label}
            </label>
            <input
                type="text"
                name={name}
                value={formData[name as keyof FormData] || ""}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full rounded-xl text-slate-600 bg-slate-[#F5F5F5] py-2 px-5 border-[1.5px] border-[#B66331] focus:outline-none"
            />
        </div>
    ) : (
        <Checkbox color="default" className="text-white flex justify-center items-center w-[90%]"> {label} </Checkbox>
    );
};

export default Input;