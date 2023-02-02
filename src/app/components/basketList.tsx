import React, { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { changePizzaBasketSend, removePizzaFromBasket } from '../store/pizaSlice';

import BasketItem from './BasketItem';

const BasketList: FC = () => {
    const dispatch = useAppDispatch();
    const pizzaItemsDisplay = useAppSelector((state) => state.pizza.basketDisplay);
    const removeItem = (index: number): void => {
        dispatch(removePizzaFromBasket(index));
    };
    const changeItem = (el: object): void => {
        console.log(el);
        dispatch(changePizzaBasketSend(el));
    };

    return (
        <>
            {!!pizzaItemsDisplay.length ? (
                <div className="wrap">
                    {pizzaItemsDisplay.map((item, index) => {
                        return (
                            <BasketItem
                                key={item.id}
                                item={item}
                                index={index}
                                removeItem={removeItem}
                                changeItem={changeItem}
                            />
                        );
                    })}
                </div>
            ) : (
                <p>Ваша корзина пуста</p>
            )}
        </>
    );
};

export default BasketList;
