import React, { FC } from 'react';

interface IField {
    value: string;
    title: string;
    name: string;
    type: string;
    error: string;
    readonly?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const TextField: FC<IField> = ({ value, title, onChange, name, type, error, readonly }) => {
    return (
        <div className="htmlForm-group mb-2  h-24 w-72	">
            <label htmlFor={name} className="htmlForm-label mb-2 inline-block text-gray-700">
                {title}
            </label>
            <input
                type={type}
                className="htmlForm-control m-0 block w-full rounded border border-solid border-gray-300 bg-white
                bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out
                focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                readOnly={readonly}
                aria-describedby="emailHelp"
                placeholder={title}
                value={value}
                name={name}
                onChange={onChange}
            />
            {!!error.length && <div className="invalid-feedback block">{error}</div>}
        </div>
    );
};

export default TextField;
