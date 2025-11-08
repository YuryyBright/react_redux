// src/components/layouts/Sidebar.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { addToCart as addToCartAction, decreaseQuantity, removeFromCart, clearCart } from '../../features/cart/cartSlice';
import { addToCompare, removeFromCompare } from '../../features/compare/compareSlice';
import { ShoppingCart, Trash2, Plus, Minus, X } from 'lucide-react';
import Button from '../shared/Button';
import type { CartItem, Product } from '../../types';

interface SidebarProps {
  type: 'cart' | 'compare';
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ type, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart) as CartItem[];
  const compareItems = useSelector((state: RootState) => state.compare) as Product[];

  const items = type === 'cart' ? cartItems : compareItems;

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3 }}
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {type === 'cart' ? `Кошик (${totalItems})` : `Порівняння товарів (${compareItems.length})`}
            </h2>
            <button onClick={onClose} className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="text-center py-12">
            {type === 'cart' ? <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" /> : <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />}
            <p className="text-gray-600 dark:text-gray-400">{type === 'cart' ? 'Кошик порожній' : 'Додайте товари для порівняння'}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (type === 'cart') {
    return (
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3 }}
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Кошик ({totalItems})
            </h2>
            <button onClick={onClose} className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="space-y-4 mb-6">
            {cartItems.map(item => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
              >
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{item.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-bold">₴{item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="p-1 rounded bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(addToCartAction(item))}
                      className="p-1 rounded bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="ml-auto p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="border-t dark:border-gray-700 pt-4 space-y-4">
            <div className="flex justify-between text-xl font-bold">
              <span className="text-gray-900 dark:text-white">Всього:</span>
              <span className="text-blue-600 dark:text-blue-400">₴{totalPrice}</span>
            </div>
            <Button variant="primary" size="lg" className="w-full">
              Оформити замовлення
            </Button>
            <Button variant="danger" size="md" className="w-full" onClick={() => dispatch(clearCart())}>
              <Trash2 className="w-5 h-5" />
              Очистити кошик
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // For compare
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3 }}
      className="fixed right-0 top-0 h-full w-full max-w-4xl bg-white dark:bg-gray-800 shadow-2xl overflow-y-auto"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Порівняння товарів ({compareItems.length})
          </h2>
          <button onClick={onClose} className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
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
    </motion.div>
  );
};

export default Sidebar;