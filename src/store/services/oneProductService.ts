import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export interface ImageProductItem {
//     image: string
// }

export interface ImagesProductItem {
    images?: string[];
}


export interface ProductItem extends ImagesProductItem {
    id: number;
    title: string;
    category: string;
    stock: number | string;
    description: string;
    rating: number;
    warrantyInformation: string;
    shippingInformation: string;
    price: number;
    discountPercentage: number;
    quantity?: number;
}

export const oneProductService = createApi({
    reducerPath: 'oneProductApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
    endpoints: (builder) => ({
        // fetchOneProduct: builder.query<ProductItem , void> ({
        //     query: () => ({
        //         url: 'products/'
        //     })
        // }),
        fetchOneProduct: builder.query<ProductItem, number>({
            query: (id) => `products/${id}`,
          }),
    }) 
})


export const { useFetchOneProductQuery } = oneProductService;

