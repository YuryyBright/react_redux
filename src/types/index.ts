export interface Product {
  id: number;         // числове поле
  name: string;       // рядок
  price: number;      // числове поле
  image: string;      // рядок — шлях або URL до зображення
  category: string;   // рядок — категорія продукту
  rating: number;     // числове поле — рейтинг
  isHot?: boolean;    // ? — поле не обов’язкове (може бути undefined)
  description: string;// рядок — опис
}

export interface CartItem extends Product {
    quantity: number;
}

export type Theme = 'light' | 'dark';