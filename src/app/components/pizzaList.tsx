import React, { Component, FC } from 'react'
import PizzaItem from './pizzaItem'
import Form from './form'
import { IPizzaItem } from '../types/index';

interface PizzaList {
    pizza: IPizzaItem[]
}

const PizzaList: FC<PizzaList> = ({pizza}) => {



    return ( 
        <>
            <div>
                <ul className='pizza-list grid 2xl:grid-cols-5 md:grid-cols-4 gap-16 mb-1'>
                    {
                        pizza.map((item) => <PizzaItem key={item.id} pizza={item}   />)
                    }
                </ul>
                <div className="flex space-x-2 justify-center">
                    {/* <button
                        type="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        className="rounded-md text-2xl inline-block px-6 py-4 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-yellow-500 hover:shadow-lg focus:bg-yellow-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-500 active:shadow-lg transition duration-150 ease-in-out"
                        onClick={toggleActive}
                    >Заказать пиццу</button> */}
                </div>
            </div>
            <Form side='not-basket' />
        </>

    );
}
 
export default PizzaList;