import React, { FC, useEffect, useState } from 'react';

import { IPizzaItem } from '../types';

interface IPizzaItemBasketComponent {
    item: IPizzaItem;
    index: number;
    removeItem: Function;
    changeItem: Function;
}
const BasketItem: FC<IPizzaItemBasketComponent> = ({ item, index, removeItem, changeItem }) => {
    const [sendData, setSendData] = useState({ id: item.id, size: 'small', crust: 'cheesy' });
    const toggleData = (e: React.ChangeEvent<HTMLSelectElement>, type: string): void => {
        setTimeout(() => {
            setSendData((prevState) => ({
                ...prevState,
                [type]: e.target.selectedOptions[0].value
            }));
            console.log(33);
        });
    };
    useEffect(() => {
        changeItem({ item: { ...sendData }, index: index });
    }, [sendData]);

    return (
        <div className="mb-8 flex justify-between rounded-md bg-slate-200  p-8	drop-shadow-lg		">
            <div className="img-block mr-6 h-40 w-40 overflow-hidden rounded-md	">
                <img className="h-full w-full" src={item.img} alt="" />
            </div>
            <div className="info-block mr-6 pt-5">
                <p className="info-title mb-1 font-montserrat text-2xl font-semibold	">
                    Пицца {item.name}
                </p>
                <ul>
                    {item.ingredients.map((el) => (
                        <li className="font-montserrat" key={el}>
                            - {el}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="data-block mr-6 flex pt-4">
                <div className="mr-3 flex justify-center">
                    <div className="mb-3 w-72">
                        <label
                            htmlFor="exampleInputEmail2"
                            className="htmlForm-label info-title mb-4 inline-block font-montserrat text-2xl font-semibold "
                        >
                            Борты пиццы
                        </label>

                        <select
                            className="py-1.5text-base form-select m-0 block w-full appearance-none rounded border border-solid border-gray-300 bg-white
                            bg-clip-padding bg-no-repeat px-3 font-normal text-gray-700 transition ease-in-out focus:border-blue-600
                            focus:bg-white focus:text-gray-700 focus:outline-none"
                            aria-label="Default select example"
                            onChange={(e) => toggleData(e, 'crust')}
                        >
                            {Object.entries(item.price.crust).map(([key, value]) => (
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
                            className="htmlForm-label info-title mb-4 inline-block font-montserrat text-2xl font-semibold "
                        >
                            Размеры пиццы
                        </label>

                        <select
                            className="form-select m-0  block  w-full  appearance-none  rounded  border  border-solid  border-gray-300 
                            bg-white bg-clip-padding bg-no-repeat  px-3 py-1.5 text-base  font-normal  text-gray-700  transition 
                            ease-in-out  focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                            aria-label="Default select example"
                            onChange={(e) => toggleData(e, 'size')}
                        >
                            {Object.entries(item.price.size).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {key}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="data-price pt-4">
                <p className="info-title mb-4 font-montserrat text-2xl font-semibold	">
                    Цена в сумме:
                </p>
                <p className="font-base font-montserrat font-semibold">
                    <span className="font-normal">Цена: &nbsp;</span>
                    {item.price.default +
                        item.price.crust[sendData.crust as keyof IPizzaItem['price']['crust']] +
                        item.price.size[sendData.size as keyof IPizzaItem['price']['size']]}
                    &nbsp; рублей
                </p>
            </div>
            <div
                className="remove-btn flex h-auto w-fit cursor-pointer items-center"
                onClick={() => removeItem(index)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    className="bi bi-x-circle"
                    viewBox="0 0 16 16"
                >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </div>
        </div>
    );
};

export default BasketItem;
