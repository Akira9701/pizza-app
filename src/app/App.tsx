import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import PizzaPage from "./pages/pizzaPage";
import BasketPage from "./pages/basketPage";
import { getPizza } from "./store/pizaSlice";
import { useEffect } from 'react';
import { useAppDispatch } from "./hooks/reduxHooks";

const App = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getPizza());
    }, [])

    return ( 
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<PizzaPage/>} />
                    <Route path="basket" element={<BasketPage />} />
                </Route>
            </Routes>
        </>
     
    );
}
 
export default App;