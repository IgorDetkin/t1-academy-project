import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BasketItem } from "../slices/basketSlice";
// RTK-QUERY

export interface CatalogItem {
    id: number;
    title: string;
    price: number;
    discountPercentage: number;
    thumbnail: string; 
    quantity: number;
}

export interface CatalogItemsState {
    products: CatalogItem[] | undefined,
    total?: number,
    skip?: number,
    limit?: number,
    productsFromBasket?: BasketItem[] | undefined;
}


export const catalogService = createApi({
    reducerPath: 'catalogApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
    endpoints: (builder) => ({
        fetchCatalogItems: builder.query<CatalogItemsState , number> ({
            query: (total: number = 194) => ({
                url: 'products/search?q=',
                // url: 'products/search?q=sili',  
                params: {
                    limit: total,
                }
            })
        })
    }) 
})


export const { useFetchCatalogItemsQuery } = catalogService;