import { configureStore } from "@reduxjs/toolkit";
import {shopApi} from '../api/shopApi'
import cartReducer from '../features/cart/cartSlice';
import compareReducer from '../features/compare/compareSlice';
import themeReducer from '../features/theme/themeSlice';

export const store = configureStore({
    reducer:{
        cart: cartReducer,
        compare: compareReducer,
        theme: themeReducer,
        [shopApi.reducerPath]: shopApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shopApi.middleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch