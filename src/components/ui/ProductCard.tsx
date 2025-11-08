// src/components/ui/ProductCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { addToCart as addToCartAction } from '../../features/cart/cartSlice';
import { addToCompare } from '../../features/compare/compareSlice';
import { ShoppingCart, BarChart3 } from 'lucide-react';
import Button from '../shared/Button';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const isInCompare = useSelector((state: RootState) => state.compare.some(p => p.id === product.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.isHot && (
          <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
            🔥 ХІТ
          </span>
        )}
        <button
          onClick={() => dispatch(addToCompare(product))}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all ${
            isInCompare
              ? 'bg-blue-600 text-white'
              : 'bg-white/90 text-gray-700 hover:bg-white'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
        </button>
      </div>
     
      <div className="p-6">
        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
          {product.category}
        </span>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {product.description}
        </p>
       
        <div className="flex items-center mb-4">
          <span className="text-yellow-500 mr-2">★</span>
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            {product.rating}
          </span>
        </div>
       
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ₴{product.price}
          </span>
          <Button onClick={() => dispatch(addToCartAction(product))} variant="primary" size="sm">
            <ShoppingCart className="w-4 h-4" />
            Купити
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;