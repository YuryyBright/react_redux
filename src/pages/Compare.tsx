// src/pages/Compare.tsx
import React from 'react';
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Порівняння товарів</h2>
        <div className="text-center py-12">
          <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Додайте товари для порівняння</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Порівняння товарів ({compareItems.length})</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-4 bg-gray-100 dark:bg-gray-700">Характеристика</th>
              {compareItems.map(product => (
                <th key={product.id} className="p-4 bg-gray-100 dark:bg-gray-700">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded mb-2 mx-auto" />
                    <button
                      onClick={() => dispatch(removeFromCompare(product.id))}
                      className="absolute top-0 right-0 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b dark:border-gray-700">
              <td className="p-4 font-bold">Назва</td>
              {compareItems.map(product => (
                <td key={product.id} className="p-4">{product.name}</td>
              ))}
            </tr>
            <tr className="border-b dark:border-gray-700">
              <td className="p-4 font-bold">Ціна</td>
              {compareItems.map(product => (
                <td key={product.id} className="p-4 text-blue-600 dark:text-blue-400 font-bold">₴{product.price}</td>
              ))}
            </tr>
            <tr className="border-b dark:border-gray-700">
              <td className="p-4 font-bold">Категорія</td>
              {compareItems.map(product => (
                <td key={product.id} className="p-4">{product.category}</td>
              ))}
            </tr>
            <tr className="border-b dark:border-gray-700">
              <td className="p-4 font-bold">Рейтинг</td>
              {compareItems.map(product => (
                <td key={product.id} className="p-4">
                  <span className="text-yellow-500">★</span> {product.rating}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold">Дія</td>
              {compareItems.map(product => (
                <td key={product.id} className="p-4">
                  <Button onClick={() => dispatch(addToCartAction(product))} variant="primary" size="sm" className="w-full">
                    <ShoppingCart className="w-4 h-4" />
                    Купити
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Compare;