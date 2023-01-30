import { IPizzaItem } from '../types/index';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
    basket: IPizzaItem[]
    order: IPizzaItem
}

const initialState: PizzaState = {
    pizza: [],
    basket: [],
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
        addPizzaToBasket(state, action){
            state.basket = [...state.basket, action.payload];
            console.log(state.basket)
        },
        addPizzaToOrder(state, action){
            state.order = {...action.payload};
            console.log(state.order)
        }

    },
    // extraReducers: {
    //     [getPizza.pending]: (state, action) => {
    //         console.log('Loading')
    //     },
    //     [getPizza.fulfilled]: (state, action) => {
    //         console.log('Set')

    //     },
    //     [getPizza.rejected]: (state, action) => {

    //     },
    // }
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
export const {addPizzaToBasket, addPizzaToOrder} = pizaSlice.actions;
export default pizaSlice.reducer;