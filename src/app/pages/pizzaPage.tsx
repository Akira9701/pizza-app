import React, { FC } from 'react';

import PizzaList from '../components/PizzaList';
import { useAppSelector } from '../hooks/reduxHooks';

const PizzaPage: FC = () => {
    const pizzaItems = useAppSelector((state) => state.pizza.pizza);
    console.log(pizzaItems);
    if (pizzaItems.length === 0) {
        return (
            <div className="flex items-center justify-center">
                <div
                    className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4 text-blue-300"
                    role="status"
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    } else {
        return <PizzaList pizza={pizzaItems} />;
    }
};

export default PizzaPage;
