// src/pages/Compare.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { addToCart as addToCartAction } from '../features/cart/cartSlice';
import { removeFromCompare } from '../features/compare/compareSlice';
import { BarChart3, ShoppingCart, X } from 'lucide-react';
import Button from '../components/shared/Button';
import type { Product } from '../types';

const Compare: React.FC = () => {
  const dispatch = useDispatch();
  const compareItems = useSelector((state: RootState) => state.compare) as Product[];

  if (compareItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 py-16 text-center"
      >
        <BarChart3 className="w-20 h-20 mx-auto text-gray-400 mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Порівняння товарів
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Додайте товари для порівняння
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 py-12"
    >
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-10 text-center bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
        Порівняння товарів ({compareItems.length})
      </h2>

      <div className="overflow-x-auto rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
              <th className="text-left p-8 font-bold text-gray-900 dark:text-white text-lg uppercase tracking-wider">
                Характеристика
              </th>
              {compareItems.map((product) => (
                <th key={product.id} className="p-8 text-center min-w-[280px]">
                  <div className="relative group">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      src={product.image}
                      alt={product.name}
                      className="w-40 h-40 object-cover rounded-2xl shadow-xl mx-auto border-4 border-white dark:border-gray-700"
                    />
                    <button
                      onClick={() => dispatch(removeFromCompare(product.id))}
                      className="absolute -top-3 -right-3 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                    {product.name}
                  </h3>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {/* Ціна */}
            <tr className="bg-gray-50/50 dark:bg-gray-900/50">
              <td className="p-8 font-bold text-gray-900 dark:text-white text-lg">Ціна</td>
              {compareItems.map((product) => (
                <td key={product.id} className="p-8 text-center">
                  <span className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                    ₴{product.price.toLocaleString('uk-UA')}
                  </span>
                </td>
              ))}
            </tr>

            {/* Категорія */}
            <tr>
              <td className="p-8 font-bold text-gray-900 dark:text-white">Категорія</td>
              {compareItems.map((product) => (
                <td key={product.id} className="p-8 text-center">
                  <span className="inline-block px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                    {product.category}
                  </span>
                </td>
              ))}
            </tr>

            {/* Рейтинг */}
            <tr className="bg-gray-50/50 dark:bg-gray-900/50">
              <td className="p-8 font-bold text-gray-900 dark:text-white">Рейтинг</td>
              {compareItems.map((product) => (
                <td key={product.id} className="p-8 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl text-amber-500">★</span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {product.rating}
                    </span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Опис */}
            <tr>
              <td className="p-8 font-bold text-gray-900 dark:text-white">Опис</td>
              {compareItems.map((product) => (
                <td key={product.id} className="p-8 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-4 max-w-xs mx-auto">
                    {product.description}
                  </p>
                </td>
              ))}
            </tr>

            {/* Дія */}
            <tr className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
              <td className="p-8 font-bold text-gray-900 dark:text-white">Дія</td>
              {compareItems.map((product) => (
                <td key={product.id} className="p-8 text-center">
                  <Button
                    onClick={() => dispatch(addToCartAction(product))}
                    variant="primary"
                    size="lg"
                    className="shadow-2xl hover:shadow-amber-500/50"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    Додати в кошик
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Compare;