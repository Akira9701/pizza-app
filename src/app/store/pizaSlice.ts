import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IPizzaItem, IPizzaItemBasket } from '../types/index';

import { instance } from '../utils/axios';

export const getPizza = createAsyncThunk<IPizzaItem[], undefined, { rejectValue: string }>(
    'pizza/getPizza',
    async function (_, { rejectWithValue }) {
        const response = await fetch('https://shift-winter-2023-backend.onrender.com/api/pizza');
        if (!response.ok) {
            return rejectWithValue('Server Error');
        }
        const json = await response.json();
        return json;
    }
);

type PizzaState = {
    pizza: IPizzaItem[];
    basketDisplay: IPizzaItem[];
    basketSend: IPizzaItemBasket[];
};

const initialState: PizzaState = {
    pizza: [],
    basketDisplay: [],
    basketSend: []
};

const pizaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        addPizzaToBasketDisplay(state, action) {
            state.basketDisplay.push(action.payload);
        },
        addPizzaToBasketDisplayAlone(state, action) {
            state.basketDisplay = [action.payload];
        },
        addPizzaToBasketSend(state, action) {
            state.basketSend.push(action.payload);
            console.log(state.basketSend);
        },
        addToBasketSendAlone(state, action) {
            state.basketSend = [action.payload];
        },
        changePizzaBasketSend(state, action) {
            const basketSend = [...state.basketSend];
            basketSend[action.payload.index] = action.payload.item;
            state.basketSend = basketSend;
            console.log(state.basketSend);
        },
        removePizzaFromBasket(state, action) {
            const basketSend = [...state.basketSend];
            const basketDisplay = [...state.basketDisplay];
            basketSend.splice(action.payload, 1);
            basketDisplay.splice(action.payload, 1);
            state.basketDisplay = basketDisplay;
            state.basketSend = basketSend;
        },
        clearBasket(state, action) {
            state.basketSend = [];
            state.basketDisplay = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPizza.fulfilled, (state, action) => {
            state.pizza = action.payload;
        });
    }
});
export const {
    addPizzaToBasketDisplay,
    addPizzaToBasketSend,
    changePizzaBasketSend,
    removePizzaFromBasket,
    addToBasketSendAlone,
    addPizzaToBasketDisplayAlone,
    clearBasket
} = pizaSlice.actions;
export default pizaSlice.reducer;
