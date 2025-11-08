import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Compare from './pages/Compare';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';
import './index.css'; // Імпорт CSS з Tailwind
function App() {
  const theme = useSelector((state: RootState) => state.theme.theme); // Але краще useEffect для document.classList.add('dark')

  return (
    <Provider store={store}>
      <Router>
        <div className={theme === 'dark' ? 'dark' : ''}>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/compare" element={<Compare />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;