import React from 'react';
import ReactDOM from 'react-dom/client'; // Or 'react-dom' for older setups
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store'; // Adjust path to your store file

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);