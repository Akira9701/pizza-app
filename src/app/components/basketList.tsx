import React, { Component } from 'react'
import PizzaList from '../components/pizzaList';
import { useAppSelector } from '../hooks/reduxHooks';
import BasketItem from './basketItem';

const BasketList = () => {
    const pizzaItemsDisplay =  useAppSelector(state => state.pizza.basketDisplay);
    const pizzaItemsSend =  useAppSelector(state => state.pizza.basketSend);
    


    if(pizzaItemsDisplay.length > 0){
        return ( 
            <div className='wrap'>
                {
                    pizzaItemsDisplay.map((item, index) => {
                        return (
    
                            <BasketItem key={item.id} item={item} index={index}  />
                            
                        )
                    })
                }
            </div>    
        );
    }else{
        return <p>Ваша корзина пуста</p>
    }
}
 
export default BasketList;