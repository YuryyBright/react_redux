// src/components/layouts/CategoryNav.tsx (НОВИЙ ФАЙЛ)

import { Popover, Transition } from '@headlessui/react';
import { ChevronDown, Tag } from 'lucide-react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

// TODO: Цей масив ви маєте отримувати з вашого shopApi
const categories = [
  {
    name: 'Електроніка',
    href: '/category/electronics',
    subcategories: [
      { name: 'Смартфони', href: '/category/smartphones' },
      { name: 'Ноутбуки', href: '/category/laptops' },
      { name: 'Телевізори', href: '/category/tvs' },
      { name: 'Аксесуари', href: '/category/accessories' },
    ],
  },
  {
    name: "Побутова техніка",
    href: '/category/appliances',
    subcategories: [
      { name: 'Холодильники', href: '/category/refrigerators' },
      { name: 'Пральні машини', href: '/category/washing-machines' },
      { name: 'Мікрохвильовки', href: '/category/microwaves' },
    ],
  },
  {
    name: 'Комплектуючі',
    href: '/category/components',
    subcategories: [
      { name: 'Процесори', href: '/category/cpu' },
      { name: 'Відеокарти', href: '/category/gpu' },
    ],
  },
];

const CategoryNav: React.FC = () => {
  return (
    <nav className="hidden lg:flex items-center gap-8">
      {categories.map((category) => (
        <Popover key={category.name} className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
                  ${open ? 'text-slate-600 dark:text-slate-400' : 'text-gray-700 dark:text-gray-300'}
                  group inline-flex items-center gap-2 text-xl font-bold hover:text-slate-600 transition-colors
                `}
              >
                <span>{category.name}</span>
                <ChevronDown
                  className={`
                    ${open ? 'transform rotate-180 text-slate-600' : ''}
                    h-6 w-6 text-gray-400 transition-transform duration-300
                  `}
                />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-1/2 z-10 mt-5 w-screen max-w-xs -translate-x-1/2 transform px-4 sm:px-0">
                  <div className="overflow-hidden rounded-lg shadow-2xl ring-1 ring-black ring-opacity-5">
                    <div className="relative grid gap-6 bg-white dark:bg-gray-800 p-7">
                      {category.subcategories.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="-m-3 flex items-center rounded-lg p-3 transition duration-150 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Tag className="h-6 w-6 flex-shrink-0 text-slate-500" />
                          <div className="ml-4">
                            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                              {item.name}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      ))}
      {/* Простий лінк для прикладу */}
      <Link to="/sales" className="text-xl font-bold text-gray-700 dark:text-gray-300 hover:text-slate-600 transition-colors">
        Акції
      </Link>
    </nav>
  );
};

export default CategoryNav;