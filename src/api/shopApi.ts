import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product } from '../types';

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }), // Заміни на свій API
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => 'products',
      transformResponse: (response: any[]) => response.map((item) => ({
        id: item.id,
        name: item.title,
        price: item.price,
        image: item.image,
        category: item.category,
        rating: item.rating.rate,
        isHot: Math.random() > 0.5, // Симуляція isHot
        description: item.description,
      })),
    }),
  }),
});

export const { useGetProductsQuery } = shopApi;