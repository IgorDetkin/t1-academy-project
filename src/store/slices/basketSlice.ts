import { /*PayloadAction,*/ createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASKET_URL } from "../../utils/api";
// import { AppDispatch,  RootState } from '../store';
// import { fetchBasket } from "./actionCreators";

export interface BasketItem  { //для товара в корзине
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedTotal: number,
    thumbnail: string;
}

export interface BasketPriceState { //для блока цены
    total?: number | undefined;
    discountedTotal?: number | undefined;
    userId?: number | undefined;
    totalProducts?: number | undefined;
    totalQuantity?: number | undefined;
}

export interface BasketItemState extends BasketPriceState { //для всей корзины
    id: number | undefined; //id корзины
    products: BasketItem[] | null;
    isLoading?: boolean;
    error?: string | null;
}

// export interface BasketsState {
//     carts: BasketItemState[];
//     total?: number;
//     skip?: number;
//     limit?: number;
//     isLoading?: boolean;
//     error?: string | null;
// }


const initialState: BasketItemState = {
    id: 0,
    products: null,
    total: undefined,
    discountedTotal: undefined,
    userId: undefined, //   HARDCODE??
    totalProducts: undefined,
    totalQuantity: undefined,
    isLoading: false,
    error: '',
}




export const fetchBasket =  createAsyncThunk<BasketItemState>(
    'basket/fetchBasket',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(BASKET_URL);
            const data = await response.json();
            return data.carts[0];
        }

        catch(err) {
            const error = err as Error;
            return rejectWithValue(error.message)
        }
    }
)




export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        // funcInReducers: (state, action: PayloadAction<number>) => {
        //     state.count += action.payload;
        // }

        // basketFetchingPending(state) {
        //     state.isLoading = true;
        // },
        // basketFetchingSuccess(state, action: PayloadAction<BasketItem[]>) {
        //     state.isLoading = false;
        //     state.error = ' ';
        //     state.basketItems = action.payload;
        // },
        // basketFetchingError(state, action: PayloadAction<string>) {
        //     state.isLoading = false;
        //     state.error = action.payload;
        // }
    },
     extraReducers: (builder) => {
        builder
            .addCase(fetchBasket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchBasket.fulfilled, (state, action) => {
                state.isLoading = false;
                    state.error = '';
                    state.products = action.payload?.products;
                    state.total = action.payload?.total;
                    state.discountedTotal = action.payload?.discountedTotal;
                    state.userId = action.payload?.userId;
                    state.totalProducts = action.payload?.totalProducts;
                    state.totalQuantity = action.payload?.totalQuantity;
            })
            .addCase(fetchBasket.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

     } 
})

// export const { funcInReducers } = basketSlice.actions;


// export const { basketFetchingPending, basketFetchingSuccess, basketFetchingError } = basketSlice.actions;
// export const selectBasketItems = (state: RootState) => state.basket.count;


export default basketSlice.reducer;

// export const { funcInReducers } = basketSlice.actions;

// export const selectData = (state: RootState) => state.reducer.count;









// import { createSlice } from '@reduxjs/toolkit';
// import { RootState } from '../store';

// interface ExampleState {
//   data: string[];
// }

// const initialState: ExampleState = {
//   data: [],
// };

// const exampleSlice = createSlice({
//   name: 'example',
//   initialState,
//   reducers: {}
// });

// export type { ExampleState };
// export default exampleSlice.reducer;