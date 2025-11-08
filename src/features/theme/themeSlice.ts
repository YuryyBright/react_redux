// src/features/theme/themeSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  theme: 'light' | 'dark';
}

const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';

const initialState: ThemeState = {
  theme: savedTheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      state.theme = newTheme;
      localStorage.setItem('theme', newTheme);
      // КРИТИЧНО: додаємо/видаляємо клас dark
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;