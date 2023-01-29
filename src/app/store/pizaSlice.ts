import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPizza = createAsyncThunk<Pizza[], undefined, {rejectValue: string}>(
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

type Pizza = any;

type PizzaState = {
    pizza: Pizza[]
}

const initialState: PizzaState = {
    pizza: []
}

const pizaSlice = createSlice({
    name: 'pizza', 
    initialState,
    reducers: {
        // addPizza(state, action){
        //     console.log(action);
        //     state.pizza = [...action.payload]
        // },
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
// export const {addPizza} = pizaSlice.actions;
export default pizaSlice.reducer;