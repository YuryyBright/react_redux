import { useMemo, useState, useEffect } from 'react';
import type { Product } from '../types';

export const useFilteredProducts = (products: Product[]) => {
  // -------------------------
  // Локальні стани
  // -------------------------
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Всі');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);

  // -------------------------
  // Список категорій
  // -------------------------
  const categories = useMemo(
    () => ['Всі', ...Array.from(new Set(products.map(p => p.category)))],
    [products]
  );

  // -------------------------
  // Встановлюємо початковий priceRange при зміні продуктів
  // -------------------------
  useEffect(() => {
    if (products.length === 0) return;
    const prices = products.map(p => p.price);
    setPriceRange([Math.min(...prices), Math.max(...prices)]);
  }, [products]);

  // -------------------------
  // Фільтр + сортування
  // -------------------------
  const filteredProducts = useMemo(() => {
    let result = products;

    // Фільтр по категорії
    if (selectedCategory !== 'Всі') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Пошук
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Фільтр по діапазону цін
    result = result.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Сортування по ціні
    if (sortOrder) {
      result = [...result].sort((a, b) =>
        sortOrder === 'asc' ? a.price - b.price : b.price - a.price
      );
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortOrder, priceRange]);

  // -------------------------
  // Гарячі пропозиції
  // -------------------------
  const hotDeals = useMemo(
    () => filteredProducts.filter(p => p.isHot),
    [filteredProducts]
  );

  // -------------------------
  // Повертаємо все з хука
  // -------------------------
  return {
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
  };
};
