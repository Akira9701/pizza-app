import React, { Component } from 'react'
import PizzaList from '../components/pizzaList';
import { useAppSelector } from '../hooks/reduxHooks';
const PizzaPage = () => {
    const pizzaItems =  useAppSelector(state => state.pizza.pizza);
    if(pizzaItems.length === 0){
        return (
            <div className="flex justify-center items-center">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-white" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }else{
        console.log(pizzaItems);

        return ( 
            <PizzaList pizza={pizzaItems} />
        );
    }

}
 
export default PizzaPage