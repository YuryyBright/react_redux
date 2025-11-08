// src/pages/Cart.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import {
  addToCart as addToCartAction,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from '../features/cart/cartSlice';
import { ShoppingCart, Trash2, Plus, Minus, X, Menu } from 'lucide-react';
import Button from '../components/shared/Button';
import type { CartItem } from '../types';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart) as CartItem[];
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 py-16 text-center"
      >
        <ShoppingCart className="w-24 h-24 mx-auto text-gray-400 mb-8" />
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Кошик порожній
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Додайте товари, щоб оформити замовлення
        </p>
      </motion.div>
    );
  }

  return (
    <>
      {/* Мобільний хедер (дублює основний, але з меню) */}
      <header className="lg:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
            TechShop
          </h1>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-3 bg-gray-100 dark:bg-gray-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="border-t border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <div className="p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
                <a href="/" className="block font-medium text-gray-700 dark:text-gray-300 hover:text-amber-500">
                  Головна
                </a>
                <a href="/compare" className="block font-medium text-gray-700 dark:text-gray-300 hover:text-amber-500">
                  Порівняння
                </a>
                <a href="/cart" className="block font-medium text-amber-500">
                  Кошик ({totalItems})
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 py-12"
      >
        <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
          Кошик ({totalItems})
        </h2>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl">
          <AnimatePresence>
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-6 p-8 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover border-4 border-gray-200 dark:border-gray-700"
                />

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {item.name}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400">{item.category}</p>
                </div>

                <div className="text-right">
                  <p className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                    ₴{(item.price * item.quantity).toLocaleString('uk-UA')}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    ₴{item.price} × {item.quantity}
                  </p>
                </div>

                <div className="flex items-center gap-3 ml-8">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-2xl font-bold w-12 text-center">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(addToCartAction(item))}
                    className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="ml-6 p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Підсумок */}
          <div className="p-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t-4 border-amber-500">
            <div className="flex justify-between items-center mb-8">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">Разом:</span>
              <span className="text-5xl font-bold bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                ₴{totalPrice.toLocaleString('uk-UA')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="primary"
                size="lg"
                className="w-full text-xl py-6 shadow-2xl hover:shadow-amber-500/50"
              >
                <ShoppingCart className="w-7 h-7" />
                Оформити замовлення
              </Button>
              <Button
                variant="danger"
                size="lg"
                className="w-full text-xl py-6"
                onClick={() => dispatch(clearCart())}
              >
                <Trash2 className="w-7 h-7" />
                Очистити кошик
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Cart;