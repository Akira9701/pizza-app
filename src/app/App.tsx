import React, { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAppDispatch } from './hooks/reduxHooks';
import Layout from './layouts/layout';
import BasketPage from './pages/basketPage';
import PizzaPage from './pages/pizzaPage';
import { getPizza } from './store/pizaSlice';

const App: FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getPizza());
    }, []);

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<PizzaPage />} />
                    <Route path="basket" element={<BasketPage />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
