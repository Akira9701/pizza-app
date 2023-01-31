import { IPizzaItemBasket } from './../types/index';
import { IPizzaItem } from '../types/index';
import { createSlice, createAsyncThunk, compose } from "@reduxjs/toolkit";
export const getPizza = createAsyncThunk<IPizzaItem[], undefined, {rejectValue: string}>(
    'pizza/getPizza',
    async function(_, {rejectWithValue}){
            const response = await fetch('https://shift-winter-2023-backend.onrender.com/api/pizza')
            if(!response.ok){
                return rejectWithValue('Server Error'); 
            }
            const json = await response.json(); 
            return json;
            
    }
);



type PizzaState = {
    pizza: IPizzaItem[]
    basketDisplay: IPizzaItem[]
    basketSend: IPizzaItemBasket[];
    order: IPizzaItem
}

const initialState: PizzaState = {
    pizza: [],
    basketDisplay: [],
    basketSend: [],
    order: {
        classifications: {
            new: true,
            spicy: false,
            vegetarian: false,
        },
        id: 0,
        img: "",
        ingridients: [],
        name: "",
        price:{
            default: 0,
            crust: {
                cheesy: 0,
                cheesySausage: 0,
            },
            size:{
                large: 0,
                medium: 0,
                small: 0
            }
        }
    }
}

const pizaSlice = createSlice({
    name: 'pizza', 
    initialState,
    reducers: {
        // addPizza(state, action){
        //     console.log(action);
        //     state.pizza = [...action.payload]
        // },
        addPizzaToBasketDisplay(state, action){
            state.basketDisplay.push(action.payload);
        },
        addPizzaToBasketSend(state, action){
            state.basketSend.push(action.payload);
            console.log(state.basketSend);
        },
        addPizzaToOrder(state, action){
            state.order = {...action.payload};
            console.log(state.order)
        },
        changePizzaBasketSend(state, action){
            const basketSend = [...state.basketSend];
            console.log(action.payload.item);
            basketSend[action.payload.index] = action.payload.item;
            state.basketSend = basketSend;
            console.log(state.basketSend);
        },
        removePizzaFromBasket(state, action){
            const basketSend = [...state.basketSend]
            const basketDisplay = [...state.basketDisplay]
            basketSend.splice(action.payload, 1)
            basketDisplay.splice(action.payload, 1)
            state.basketDisplay = basketDisplay;
            state.basketSend = basketSend;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getPizza.pending, (state, action) => {
                console.log('Loading')
            }).addCase(getPizza.fulfilled, (state, action) => {
                state.pizza = action.payload;
                console.log('Seted')
                // console.log(action);
                // console.log(state.pizza);
            }).addCase(getPizza.rejected, (state, action) => {
                console.log('Danger')
            })
    }
})
export const {addPizzaToBasketDisplay,addPizzaToBasketSend , addPizzaToOrder, changePizzaBasketSend, removePizzaFromBasket} = pizaSlice.actions;
export default pizaSlice.reducer;