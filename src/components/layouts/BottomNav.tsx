// src/components/layouts/BottomNav.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { toggleTheme } from '../../features/theme/themeSlice';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart3, ShoppingCart, Sun, Moon } from 'lucide-react';
import Badge from '../shared/Badge';

const BottomNav: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const cartCount = useSelector((state: RootState) => state.cart.reduce((sum, item) => sum + item.quantity, 0));
  const compareCount = useSelector((state: RootState) => state.compare.length);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t-4 border-slate-600 shadow-2xl z-50">
      <div className="flex justify-around items-center py-4 px-6">
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 transition-all ${
            isActive('/') ? 'text-slate-600 dark:text-slate-400' : 'text-gray-500 dark:text-gray-500'
          }`}
        >
          <Home className="w-7 h-7" />
          <span className="text-xs font-bold">Головна</span>
        </Link>

        <Link
          to="/compare"
          className={`flex flex-col items-center gap-1 transition-all relative ${
            isActive('/compare') ? 'text-slate-600 dark:text-slate-400' : 'text-gray-500 dark:text-gray-500'
          }`}
        >
          <BarChart3 className="w-7 h-7" />
          {compareCount > 0 && <Badge count={compareCount} />}
          <span className="text-xs font-bold">Порівняти</span>
        </Link>

        <Link
          to="/cart"
          className={`flex flex-col items-center gap-1 transition-all relative ${
            isActive('/cart') ? 'text-slate-600 dark:text-slate-400' : 'text-gray-500 dark:text-gray-500'
          }`}
        >
          <ShoppingCart className="w-8 h-8" />
          {cartCount > 0 && <Badge count={cartCount} />}
          <span className="text-xs font-bold">Кошик</span>
        </Link>

   
        <button
        onClick={() => dispatch(toggleTheme())}
        className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-slate-600 dark:hover:text-slate-400 transition-all"
        >
        {theme === 'light' ? (
            <Moon className="w-7 h-7" />
        ) : (
            <Sun className="w-7 h-7 text-slate-400" />
        )}
        <span className="text-xs font-bold">Тема</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;