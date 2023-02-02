import React, { FC } from 'react';

import { useAppDispatch } from '../hooks/reduxHooks';
import {
    addPizzaToBasketDisplay,
    addPizzaToBasketDisplayAlone,
    addPizzaToBasketSend,
    addToBasketSendAlone
} from '../store/pizaSlice';
import { IPizzaItem } from '../types/index';

import Form from './Form';
import PizzaItem from './PizzaItem';

interface IPizzaList {
    pizza: IPizzaItem[];
}

const PizzaList: FC<IPizzaList> = ({ pizza }) => {
    const dispatch = useAppDispatch();

    const handleAddItemToOrder = (item: IPizzaItem): void => {
        dispatch(
            addToBasketSendAlone({
                id: item.id,
                size: 'small',
                crust: 'cheesy'
            })
        );
        dispatch(addPizzaToBasketDisplayAlone(item));
        const formContainer = document.querySelector('.form-container');
        formContainer?.classList.toggle('hidden');
    };

    const handleAddItemToBasket = (item: IPizzaItem): void => {
        dispatch(addPizzaToBasketDisplay(item));
        dispatch(
            addPizzaToBasketSend({
                id: item.id,
                size: 'small',
                crust: 'cheesy'
            })
        );
    };

    return (
        <>
            <div>
                <ul className="pizza-list mb-1 grid gap-16 md:grid-cols-4 2xl:grid-cols-5">
                    {pizza.map((item) => (
                        <li
                            key={item.id}
                            className="pizza-item flex cursor-pointer	flex-col items-center justify-center"
                        >
                            <PizzaItem
                                pizza={item}
                                addToBasket={handleAddItemToBasket}
                                addToOrder={handleAddItemToOrder}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <Form side="not-basket" />
        </>
    );
};

export default PizzaList;
