import React, { FC } from 'react'
import { IPizzaItem } from '../types/index';
import { useAppDispatch } from '../hooks/reduxHooks'
import { addPizzaToOrder } from '../store/pizaSlice';
interface IPizzaItemComponent {
    pizza: IPizzaItem,
 
}

const PizzaItem: FC<IPizzaItemComponent> = ({pizza}) => {   

    const dispatch = useAppDispatch();
    const handleAddItemToOrder = (): void => {
        dispatch(addPizzaToOrder(pizza));
        const formContainer = document.querySelector('.form-container');
        formContainer?.classList.toggle('hidden')
    }

    return ( 
        <li className='pizza-item flex flex-col	justify-center items-center cursor-pointer' onClick={handleAddItemToOrder}>
            <img className='w-40 h-40 mb-2 rounded-md' src={pizza.img} alt="" />
            <p className='h-12 text-center text-white font-medium		'>{pizza.name}</p>
        </li>
    );
}
 
export default PizzaItem;
