// src/components/layouts/Header.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { toggleTheme } from '../../features/theme/themeSlice';
import { Link } from 'react-router-dom';
import { ShoppingCart, BarChart3, Sun, Moon, Menu, X } from 'lucide-react';
import Badge from '../shared/Badge';
import DesktopNav from './DesktopNav'; // <-- Імпортуйте ОБ'ЄДНАНУ навігацію

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const cartCount = useSelector((state: RootState) => state.cart.reduce((sum, item) => sum + item.quantity, 0));
  const compareCount = useSelector((state: RootState) => state.compare.length);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <>
      {/* Десктоп */}
      <header className="hidden lg:block bg-white dark:bg-gray-900 border-b-4 border-slate-600 shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Логотип */}
            <Link to="/" className="flex items-center gap-4">
              <div className="w-14 h-14 bg-slate-600 flex items-center justify-center shadow-xl">
                <span className="text-white font-black text-3xl">T</span>
              </div>
              <h1 className="text-5xl font-black text-slate-700 dark:text-slate-300">
                TechShop
              </h1>
            </Link>

            {/* 👇 ВАША НОВА ОБ'ЄДНАНА НАВІГАЦІЯ 👇 */}
            <DesktopNav />

            {/* Іконки (Кошик, Тема, Порівняння) */}
            <div className="flex items-center gap-6">
            
              <button
                onClick={() => dispatch(toggleTheme())}
                className="p-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all shadow-xl"
              >
                {theme === 'light' ? (
                  <Moon className="w-7 h-7 text-gray-600" />
                ) : (
                  <Sun className="w-7 h-7 text-slate-400" />
                )}
              </button>

              <Link to="/compare" className="relative p-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all shadow-xl">
                <BarChart3 className="w-7 h-7" />
                <Badge count={compareCount} />
              </Link>

              <Link to="/cart" className="relative p-4 bg-slate-600 text-white hover:bg-slate-700 transition-all shadow-2xl">
                <ShoppingCart className="w-7 h-7" />
                <Badge count={cartCount} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Мобільний хедер (без змін) */}
      {/* ... (ваш код мобільного хедера) ... */}
    </>
  );
};

export default Header;