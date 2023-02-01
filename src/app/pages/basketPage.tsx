import React, { Component } from 'react'
import BasketList from '../components/basketList';
import Form from '../components/form';
const BasketPage = () => {
    const toggleForm = () => {
        const formContainer = document.querySelector('.form-container');
        formContainer?.classList.toggle('hidden')
    }
    return ( 
        <div className='w-full min-h-96 bg-white rounded-md p-8'>
            <BasketList />
            <Form side='basket' />
            <div className="flex space-x-2 justify-center">
                <button onClick={toggleForm} type="button" className="inline-block px-6 py-2.5 bg-sky-800 text-white font-medium text-base font-montserrat leading-tight uppercase rounded shadow-md hover:bg-sky-900 hover:shadow-lg focus:bg-sky-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Заказать</button>
            </div>
        </div>
    );
}
 
export default BasketPage