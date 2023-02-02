import React, { FC } from 'react';

import { IPizzaItem } from '../types/index';

interface IPizzaItemComponent {
    pizza: IPizzaItem;
    addToOrder?: Function;
    addToBasket?: Function;
}

const PizzaItem: FC<IPizzaItemComponent> = ({ pizza, addToOrder, addToBasket }) => {
    return (
        <>
            <div className="flex w-full flex-col">
                <img className=" mb-2 rounded-md" src={pizza.img} alt="" />
                <p className="h-16 font-montserrat text-xl font-semibold text-black ">
                    {pizza.name}
                </p>
            </div>
            {addToOrder && (
                <div className="mt-3 flex w-full justify-center space-x-2">
                    <button
                        onClick={() => addToOrder(pizza)}
                        type="button"
                        className="  inline-block w-full rounded bg-sky-800 px-6 py-2.5 font-montserrat text-base
                        font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out
                        hover:bg-sky-900 hover:shadow-lg focus:bg-sky-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                    >
                        Заказать
                    </button>
                </div>
            )}
            {addToBasket && (
                <div className="mt-3 flex w-full justify-center space-x-2">
                    <button
                        onClick={() => addToBasket(pizza)}
                        type="button"
                        className=" inline-block w-full rounded bg-sky-800 px-6 py-2.5 font-montserrat text-sm
                        font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out
                        hover:bg-sky-900 hover:shadow-lg focus:bg-sky-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                    >
                        Добавить в корзину
                    </button>
                </div>
            )}
        </>
    );
};

export default PizzaItem;
