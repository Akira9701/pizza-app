import React, { FC } from 'react';

import { IPizzaItem } from '../types';

interface FormSelects {
    data: object;
    setData: Function;
    pizza: object;
    hanleChangeAlonePizza: Function;
}

const FormSelects: FC<FormSelects> = ({ data, setData, pizza, hanleChangeAlonePizza }) => {
    return (
        <>
            <div className="flex justify-center">
                <div className="mb-8 w-72">
                    <label
                        htmlFor="exampleInputEmail2"
                        className="htmlForm-label mb-2 inline-block text-gray-700"
                    >
                        Размер пиццы
                    </label>

                    <select
                        className="bg-no-repeatpx-3 form-select m-0 block w-full appearance-none rounded border
                        border-solid border-gray-300 bg-white bg-clip-padding py-1.5 text-base
                        font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                        defaultValue="small"
                        aria-label="Default select example"
                        onChange={(e) => {
                            setData((prevState) => ({
                                ...prevState,
                                size: e.target.selectedOptions[0].value,
                                price:
                                    pizza.price.default +
                                    pizza.price.crust[
                                        data.crust as keyof IPizzaItem['price']['crust']
                                    ] +
                                    pizza.price.size[
                                        e.target.selectedOptions[0]
                                            .value as keyof IPizzaItem['price']['size']
                                    ]
                            }));
                            hanleChangeAlonePizza('size', e.target.selectedOptions[0].value);
                        }}
                    >
                        {Object.entries(pizza.price.size).map(([key, value], index) => (
                            <option key={key} value={key}>
                                {key}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="mb-3 w-72">
                    <label
                        htmlFor="exampleInputEmail2"
                        className="htmlForm-label mb-2 inline-block text-gray-700"
                    >
                        Борты пиццы
                    </label>

                    <select
                        className="form-select m-0 block w-full appearance-none rounded border
                        border-solid border-gray-300 bg-white bg-clip-padding bg-no-repeat px-3 py-1.5
                        text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                        aria-label="Default select example"
                        onChange={(e) => {
                            setData((prevState) => ({
                                ...prevState,
                                crust: e.target.selectedOptions[0].value,
                                price:
                                    pizza.price.default +
                                    pizza.price.crust[
                                        e.target.selectedOptions[0]
                                            .value as keyof IPizzaItem['price']['crust']
                                    ] +
                                    pizza.price.size[data.size as keyof IPizzaItem['price']['size']]
                            }));
                            hanleChangeAlonePizza('crust', e.target.selectedOptions[0].value);
                        }}
                    >
                        {/* <option value="none">default</option> */}
                        {Object.entries(pizza.price.crust).map(([key, value]) => (
                            <option key={key} value={key}>
                                {key}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
};

export default FormSelects;
