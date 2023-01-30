import React, { FC } from 'react'
interface IField {
    value: string,
    title: string,
    name: string,
    type: string,
    error: string
    onChange: Function
}
const TextField:FC<IField> = ({value, title, onChange, name, type, error}) => {
    return ( 
        <div className="htmlForm-group mb-3  w-72 h-24	">
            <label htmlFor="exampleInputEmail2" className="htmlForm-label inline-block mb-2 text-gray-700">{title}</label>
            <input type={type} className="htmlForm-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail2"
            aria-describedby="emailHelp" placeholder={title} value={value} name={name} onChange={onChange}/>
            {
                error.length > 0 ? <div className="invalid-feedback block">{error}</div> : ""
            }

        </div>    
    );
}
 
export default TextField;