// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter as Router } from 'react-router-dom'; // <-- Імпортуйте Router
import App from './App.tsx';
import './index.css';

// ЗАСТОСОВУЄМО ТЕМУ ПРИ ЗАПУСКУ (Цей код у вас правильний)
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);