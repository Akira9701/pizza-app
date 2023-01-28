import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import PizzaPage from "./pages/pizzaPage";
import BasketPage from "./pages/basketPage";

const App = () => {
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