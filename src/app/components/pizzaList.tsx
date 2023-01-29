import React, { Component, FC } from 'react'
import PizzaItem from './pizzaItem'
export interface IPizzaItem {
    classifications: {
        new: boolean,
        spicy: boolean,
        vegetarian: boolean,
    },
    id: number,
    img: string,
    ingridients: string[],
    name: string,
    price:{
        default: number,
        crust: {
            cheesy: number,
            cheesySausage: number,
        },
        size:{
            large: number,
            medium: number,
            small: number
        }
    }

}

interface PizzaList {
    pizza: IPizzaItem[]
}

const PizzaList: FC<PizzaList> = ({pizza}) => {
    return ( 
        <div>
            <ul className='pizza-list grid grid-cols-6 gap-4 mb-1'>
                {
                    pizza.map((item) => <PizzaItem key={item.id} pizza={item}  />)
                }
            </ul>
            <div className="flex space-x-2 justify-center">
                <button
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="rounded-md text-2xl inline-block px-6 py-4 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-yellow-500 hover:shadow-lg focus:bg-yellow-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-500 active:shadow-lg transition duration-150 ease-in-out"
                >Заказать пиццу</button>
            </div>
        </div>
    );
}
 
export default PizzaList;