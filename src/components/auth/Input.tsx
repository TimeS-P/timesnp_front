import React from 'react'

type Props = {
    label: string;
    placeholder: string;
}

const Input = (props: Props) => {
     const label = props.label;
     const placeholder = props.placeholder;

  return (
    <div className='flex flex-col w-full space-y-2'>
       <label htmlFor="" className='text-[#B66331] text-xl font-semibold'> {label}</label>
       <input type = "text" placeholder={placeholder} className='w-full rounded-3xl text-slate-600 bg-slate-[#F5F5F5] py-3 px-5 border-[1.5px] border-[#B66331] focus:outline-none' />
    </div>
  )
}

export default Input