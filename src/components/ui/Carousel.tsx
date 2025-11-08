// src/components/ui/Carousel.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart as addToCartAction } from '../../features/cart/cartSlice';
import { ShoppingCart } from 'lucide-react';
import Button from '../shared/Button';
import type { Product } from '../../types';

interface CarouselProps {
  products: Product[];
}

const Carousel: React.FC<CarouselProps> = ({ products }) => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [products.length]);

  const goToSlide = (index: number) => setCurrentIndex(index);

  if (products.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-pink-600 p-8 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-white mb-2">🔥 Гарячі пропозиції</h2>
          <p className="text-white/90 mb-6">Обмежені за часом знижки на топові товари</p>
         
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {products[currentIndex].name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {products[currentIndex].description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-blue-600">
                ₴{products[currentIndex].price}
              </span>
              <Button onClick={() => dispatch(addToCartAction(products[currentIndex]))} variant="primary">
                <ShoppingCart className="w-5 h-5" />
                Купити
              </Button>
            </div>
          </div>
         
          <div className="flex gap-2 mt-6">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
       
        <div className="hidden md:block">
          <img
            src={products[currentIndex].image}
            alt={products[currentIndex].name}
            className="w-80 h-80 object-cover rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;