import React, { Component } from 'react'
import PizzaList from '../components/pizzaList';
import { useAppSelector } from '../hooks/reduxHooks';
const PizzaPage = () => {
    const pizzaItems =  useAppSelector(state => state.pizza.pizza);
    if(pizzaItems.length === 0){
        console.log(pizzaItems);
        return <p>Loading</p>
    }else{
        console.log(pizzaItems);

        return ( 
            <PizzaList pizza={pizzaItems} />
        );
    }

}
 
export default PizzaPage