// src/components/layouts/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Про компанію */}
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              TechShop
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Найкращі технології за найкращими цінами. Швидка доставка по всій Україні.
            </p>
          </div>
          {/* Категорії */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Категорії</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Електроніка</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Комп'ютери</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Аудіо</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Аксесуари</a></li>
            </ul>
          </div>
          {/* Інформація */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Інформація</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Про нас</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Доставка та оплата</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Гарантія</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Контакти</a></li>
            </ul>
          </div>
          {/* Контакти */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Контакти</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>📞 +380 (68) 123-45-67</li>
              <li>✉️ info@techshop.ua</li>
              <li>📍 м. Київ, вул. Хрещатик, 1</li>
            </ul>
          </div>
        </div>
        {/* Копірайт */}
        <div className="border-t dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © 2024 TechShop. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;