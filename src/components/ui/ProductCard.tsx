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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 group"
    >
      <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-900">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.isHot && (
          <span className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            🔥 ХІТ ПРОДАЖІВ
          </span>
        )}
        <button
          onClick={() => dispatch(addToCompare(product))}
          className={`absolute top-4 right-4 p-3 rounded-xl shadow-lg transition-all ${
            isInCompare
              ? 'bg-amber-500 text-white'
              : 'bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-amber-500 hover:text-white'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
        </button>
      </div>
     
      <div className="p-6 space-y-4">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
            {product.category}
          </span>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1 line-clamp-2">
            {product.name}
          </h3>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
          {product.description}
        </p>
       
        <div className="flex items-center gap-2">
          <span className="text-amber-500 text-lg">★</span>
          <span className="text-gray-700 dark:text-gray-300 font-semibold">
            {product.rating} / 5.0
          </span>
          <span className="text-gray-500 dark:text-gray-500 text-sm ml-2">(відгуки)</span>
        </div>
       
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              ₴{product.price.toLocaleString('uk-UA')}
            </span>
          </div>
          <Button 
            onClick={() => dispatch(addToCartAction(product))} 
            variant="primary" 
            size="md"
            className="shadow-xl"
          >
            <ShoppingCart className="w-5 h-5" />
            Купити
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;