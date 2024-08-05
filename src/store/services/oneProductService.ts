import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ImagesProductItem {
    images?: string[];
}


export interface ProductItem extends ImagesProductItem {
    id: number;
    title: string;
    category?: string;
    stock?: number;
    description?: string;
    rating?: number;
    warrantyInformation?: string;
    shippingInformation?: string;
    price: number;
    discountPercentage: number;
    quantity?: number;
}

export const oneProductService = createApi({
    reducerPath: 'oneProductApi',
    // baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dummyjson.com/',
        prepareHeaders: (headers) => {
          const token = localStorage.getItem('jwt')
          if (token) {
            headers.set('Authorization', `Bearer ${token}`);
          }
          return headers;
        },
      }),

    endpoints: (builder) => ({
    fetchOneProduct: builder.query<ProductItem, number>({
        query: (id) => {
            return `products/${id}`;
        },
      }),
}) 
});


export const { useFetchOneProductQuery } = oneProductService;