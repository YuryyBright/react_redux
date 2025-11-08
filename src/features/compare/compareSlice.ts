import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types';

const initialState: Product[] = [];

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addToCompare: (state, action: PayloadAction<Product>) => {
      if (state.find((p) => p.id === action.payload.id)) {
        return state.filter((p) => p.id !== action.payload.id);
      }
      if (state.length >= 4) return state; // Ліміт
      state.push(action.payload);
    },
    removeFromCompare: (state, action: PayloadAction<number>) => {
      return state.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addToCompare, removeFromCompare } = compareSlice.actions;
export default compareSlice.reducer;