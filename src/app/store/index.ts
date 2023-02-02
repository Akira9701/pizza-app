import { configureStore } from '@reduxjs/toolkit';

import pizzaSlice from './pizaSlice';

const store = configureStore({
    reducer: {
        pizza: pizzaSlice
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
