// src/pages/Cart.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { addToCart as addToCartAction, decreaseQuantity, removeFromCart, clearCart } from '../features/cart/cartSlice';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import Button from '../components/shared/Button';
import type { CartItem } from '../types';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart) as CartItem[];

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Кошик</h2>
        <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Кошик порожній</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Кошик ({totalItems})</h2>
      <div className="space-y-4 mb-6">
        {cartItems.map(item => (
          <div key={item.id} className="flex gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
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
          </div>
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
  );
};

export default Cart;