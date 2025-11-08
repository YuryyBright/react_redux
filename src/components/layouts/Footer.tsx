// src/components/layouts/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t-4 border-amber-500 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-3xl font-black bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent mb-6">
              TechShop
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Преміум техніка за чесними цінами. Доставка по всій Україні за 1–3 дні.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Категорії</h4>
            <ul className="space-y-3">
              {['Електроніка', 'Комп\'ютери', 'Аудіо', 'Аксесуари'].map(item => (
                <li key={item}>
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-amber-500 font-medium transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Інформація</h4>
            <ul className="space-y-3">
              {['Про нас', 'Доставка та оплата', 'Гарантія', 'Контакти'].map(item => (
                <li key={item}>
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-amber-500 font-medium transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Контакти</h4>
            <ul className="space-y-4 text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-3 text-lg">
                <span>📞</span> +380 (68) 123-45-67
              </li>
              <li className="flex items-center gap-3 text-lg">
                <span>✉️</span> info@techshop.ua
              </li>
              <li className="flex items-center gap-3 text-lg">
                <span>📍</span> Київ, Хрещатик 1
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-gray-300 dark:border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            © 2025 TechShop. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;