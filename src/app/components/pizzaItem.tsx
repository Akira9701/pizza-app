import React, { Component, FC } from 'react'
import { IPizzaItem } from './pizzaList';
interface IPizzaItemComponent {
    pizza: IPizzaItem
}

const PizzaItem: FC<IPizzaItemComponent> = ({pizza}) => {   
    return ( 
        <li className='pizza-item flex flex-col	justify-center items-center cursor-pointer	'>
            <img className='w-40 h-40 mb-2 rounded-md' src={pizza.img} alt="" />
            <p className='h-12 text-center text-white font-medium		'>{pizza.name}</p>
        </li>
    );
}
 
export default PizzaItem;
