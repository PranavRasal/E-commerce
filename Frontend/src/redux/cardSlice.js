import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
}
const cardSlice = createSlice({
    name:'card',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id);
            if(itemIndex >= 0){
                state.cartItems[itemIndex].quantity += 1;
            }else{
                const tempProduct = {...action.payload, quantity: 1};
                state.cartItems.push(tempProduct);
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart:(state,action)=>{
            const nextCartItems = state.cartItems.filter(cartItem => cartItem._id !== action.payload._id);  
            state.cartItems = nextCartItems;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        clearCart:(state)=>{
            state.cartItems = [];
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        }
    }
});

export const {addToCart, removeFromCart, clearCart} = cardSlice.actions;
export default cardSlice.reducer;