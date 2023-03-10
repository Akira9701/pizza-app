import React, { FC } from 'react'
import { IPizzaItem } from '../types/index';
import { useAppDispatch } from '../hooks/reduxHooks'
import { addPizzaToOrder } from '../store/pizaSlice';
import { addPizzaToBasketDisplay, addPizzaToBasketSend, addToBasketSendAlone, addPizzaToBasketDisplayAlone } from '../store/pizaSlice';
interface IPizzaItemComponent {
    pizza: IPizzaItem,
 
}

const PizzaItem: FC<IPizzaItemComponent> = ({pizza}) => {   
    
    const dispatch = useAppDispatch();
    const handleAddItemToOrder = (): void => {
        dispatch(addToBasketSendAlone({
            id: pizza.id,
            size: "small",
            crust: "cheesy"
        }))
        dispatch(addPizzaToBasketDisplayAlone(pizza));
        dispatch(addPizzaToOrder(pizza));
        const formContainer = document.querySelector('.form-container');
        formContainer?.classList.toggle('hidden')
    }

    const handleAddItemToBasket = (): void =>{
        dispatch(addPizzaToBasketDisplay(pizza));
        dispatch(addPizzaToBasketSend({
            id: pizza.id,
            size: "small",
            crust: "cheesy"
        }))

    }

    return ( 
        <li className='pizza-item flex flex-col	justify-center items-center cursor-pointer' >
            <div className='flex flex-col w-full'>
                <img className=' mb-2 rounded-md' src={pizza.img} alt="" />
                <p className=' text-xl font-semibold font-montserrat h-16	 text-black		'>{pizza.name}</p>  
            </div>
            <div className="flex space-x-2 justify-center w-full mt-3">
                <button onClick={handleAddItemToOrder} type="button" className="  w-full inline-block px-6 py-2.5 bg-sky-800 text-white font-medium text-base font-montserrat leading-tight uppercase rounded shadow-md hover:bg-sky-900 hover:shadow-lg focus:bg-sky-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Заказать</button>
            </div>
            <div className="flex space-x-2 justify-center w-full mt-3">
                <button onClick={handleAddItemToBasket} type="button" className=" w-full inline-block px-6 py-2.5 bg-sky-800 text-white font-medium text-sm font-montserrat leading-tight uppercase rounded shadow-md hover:bg-sky-900 hover:shadow-lg focus:bg-sky-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Добавить в корзину</button>
            </div>
        </li>
    );
}
 
export default PizzaItem;
