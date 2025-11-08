// src/pages/Home.tsx
import React from 'react';
import { useGetProductsQuery } from '../api/shopApi';
import { useFilteredProducts } from '../hooks/useFilteredProducts';
import Carousel from '../components/ui/Carousel';
import ProductCard from '../components/ui/ProductCard';
import Slider from '@mui/material/Slider';

const Home: React.FC = () => {

  const { data: products = [], isLoading } = useGetProductsQuery();

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
    filteredProducts,
    hotDeals,
    sortOrder,
    setSortOrder,
    priceRange,
    setPriceRange,
    minPrice,
    maxPrice,
  } = useFilteredProducts(products);

  if (isLoading) return <div className="text-center py-12 text-gray-600 dark:text-gray-400">Завантаження...</div>;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 flex-1">
      {hotDeals.length > 0 && <Carousel products={hotDeals} />}
      {/* Нова панель фільтрів з інпутом, селектами та слайдером */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6 space-y-4">
        <input
          type="text"
          placeholder="Пошук товарів..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={sortOrder || ''}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc' | null)}
          className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="">Без сортування</option>
          <option value="asc">Ціна: зростання</option>
          <option value="desc">Ціна: спадання</option>
        </select>
        <div className="px-4">
          <Slider
            value={priceRange}
            onChange={(_, newValue) => setPriceRange(newValue as [number, number])}
            valueLabelDisplay="auto"
            min={minPrice}
            max={maxPrice}
            aria-labelledby="range-slider"
          />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {selectedCategory === 'Всі' ? 'Всі товари' : selectedCategory}
      </h2>
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Товари не знайдено
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
            Спробуйте змінити фільтри або пошуковий запит
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;