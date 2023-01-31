import React, { Component } from 'react'
import { useAppSelector } from '../hooks/reduxHooks';
import BasketItem from './basketItem';

const BasketList = () => {
    const pizzaItemsDisplay =  useAppSelector(state => state.pizza.basketDisplay);
    


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