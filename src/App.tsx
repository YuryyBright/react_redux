// src/App.tsx
import { Routes, Route } from 'react-router-dom';
// ❌ Видаліть Provider, useSelector, store
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Compare from './pages/Compare';
import './index.css';
import BottomNav from './components/layouts/BottomNav';

function App() {
  // ❌ Видаліть const theme = useSelector...

  return (
    // ❌ Видаліть <Provider> та <Router>
    // ❌ Видаліть <div className={theme === 'dark' ? 'dark' : ''}>
    
    // 👇 Цей div — це ваш головний контейнер.
    // Я також видалив з нього фонові класи, щоб вони бралися з <body>
    <div className="min-h-screen">
      <Header />
      <BottomNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;