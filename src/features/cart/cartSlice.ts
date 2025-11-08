import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '../../types';
import { i } from 'framer-motion/client';

const initialState: CartItem[] = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart:(state, action:PayloadAction<Product>)=>{
            const existing = state.find((item) => item.id ===action.payload.id);
            if (existing){
                existing.quantity +=1;
            }else{
                state.push({
                    ...action.payload,
                    quantity:1
                })
            }
        },
        decreaseQuantity: (state, action:PayloadAction<number>) =>{
            const item = state.find((item)=> item.id ===action.payload);
            if (item && item.quantity>1) item.quantity -=1;
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
        return state.filter((item) => item.id !== action.payload);
        },clearCart: (state) => {
            return [];
        },
    }
});

export const {addToCart, decreaseQuantity, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;

