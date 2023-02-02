import React, { FC } from 'react';

import BasketList from '../components/BasketList';
import Form from '../components/Form';

const BasketPage: FC = () => {
    const toggleForm = (): void => {
        const formContainer = document.querySelector('.form-container');
        formContainer?.classList.toggle('hidden');
    };
    return (
        <div className="min-h-96 w-full rounded-md bg-white p-8">
            <BasketList />
            <Form side="basket" />
            <div className="flex justify-center space-x-2">
                <button
                    onClick={toggleForm}
                    type="button"
                    className="inline-block rounded bg-sky-800 px-6 py-2.5 font-montserrat
                    text-base font-medium uppercase leading-tight text-white shadow-md transition
                    duration-150 ease-in-out hover:bg-sky-900 hover:shadow-lg focus:bg-sky-900
                    focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                >
                    Заказать
                </button>
            </div>
        </div>
    );
};

export default BasketPage;
