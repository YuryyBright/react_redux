import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Theme } from '../../types';


const initialState: {theme: Theme} = {theme: 'light'}


const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme:(state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light'
        }
    }
})


export const {toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;