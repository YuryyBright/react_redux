// src/components/layouts/Header.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { toggleTheme } from '../../features/theme/themeSlice';
import { Link } from 'react-router-dom';
import { ShoppingCart, BarChart3, Sun, Moon } from 'lucide-react';
import Badge from '../shared/Badge';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const cartCount = useSelector((state: RootState) => state.cart.reduce((sum, item) => sum + item.quantity, 0));
  const compareCount = useSelector((state: RootState) => state.compare.length);

  return (
    <header className={`bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Верхній рядок: логотип та іконки */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            TechShop
          </h1>
         
          <div className="flex items-center gap-4">
            {/* Кнопка перемикання теми */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Перемикач теми"
            >
              {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
            </button>
           
            {/* Кнопка порівняння */}
            <Link
              to="/compare"
              className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Порівняння товарів"
            >
              <BarChart3 className="w-6 h-6" />
              <Badge count={compareCount} />
            </Link>
           
            {/* Кнопка кошика */}
            <Link
              to="/cart"
              className="relative p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              aria-label="Кошик"
            >
              <ShoppingCart className="w-6 h-6" />
              <Badge count={cartCount} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;