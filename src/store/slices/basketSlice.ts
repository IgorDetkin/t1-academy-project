import { /*PayloadAction,*/ createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface BasketItem  { //для товара в корзине
    id: number;
    title: string;
    price: number;
    quantity: number;
    total?: number;
    discountPercentage: number;
    discountedTotal?: number,
    thumbnail?: string;
}

export interface BasketPriceState { //для блока цены
    total?: number | undefined;
    discountedTotal?: number | undefined;
    userId?: number | undefined;
    totalProducts?: number | undefined;
    totalQuantity?: number | undefined;
    
    firstname?: string ;
    lastname?: string ;
}

export interface BasketItemState extends BasketPriceState { //для всей корзины
    id: number | string | undefined; //id корзины
    products?: BasketItem[] | null;
    isLoading?: boolean;
    error?: string | null;
}

export interface BasketsState {
    carts: BasketItemState[] | null;
}


const initialState: BasketItemState = {
    id: 0,
    products: null,
    total: undefined,
    discountedTotal: undefined,
    userId: undefined,
    totalProducts: undefined,
    totalQuantity: undefined,
    isLoading: false,
    error: '',
}

export const fetchBasket =  createAsyncThunk(
    'basket/fetchBasket',
    async (userId: number, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://dummyjson.com/carts/user/${userId}`);
            const data = await response.json();
            return data.carts[0];
        }

        catch(err) {
            const error = err as Error;
            return rejectWithValue(error.message)
        }
    }
)


export const fetchUpdateData = createAsyncThunk( 
    "basket/fetchUpdateBasket",
    async (updatedBasket: BasketItemState, { rejectWithValue }) => {
      try {
        const response = await fetch(`https://dummyjson.com/carts/${updatedBasket.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                merge: false,
                // id: updatedBasket.id,
                products: updatedBasket.products
            })
        })

        const data = await response.json();
        return data;
    } 
      catch (err) {
        const error = err as Error;
        return rejectWithValue(error.message)
      }

    }
  );



export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        // addItemToBasket(state, action: PayloadAction<BasketItem>) {
            addItemToBasket(state, action) {
            const item = state.products?.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            } 
            else {
                state.products?.push({ ...action.payload, quantity: 1 });
            }
        },
        removeItemFromBasket(state, action) {
            const item = state.products?.find((item) => item.id === action.payload.id);
            if(item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } 
                else {
                    item.quantity = 0;
                }
           }
        },
        deleteItemsFromBasket(state, action) {
            const item = state.products?.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity = 0
            }
        }
    },
     extraReducers: (builder) => {
        builder
            .addCase(fetchBasket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchBasket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = '';
                state.id = action.payload?.id
                state.products = action.payload?.products || [];
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


            .addCase(fetchUpdateData.pending, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchUpdateData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = '';
                state.id = action.payload?.id
                state.products = action.payload?.products || [];
                state.total = action.payload?.total;
                state.discountedTotal = action.payload?.discountedTotal;
                state.userId = action.payload?.userId;
                state.totalProducts = action.payload?.totalProducts;
                state.totalQuantity = action.payload?.totalQuantity;
            })
            .addCase(fetchUpdateData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
     } 
})


export const { addItemToBasket, removeItemFromBasket, deleteItemsFromBasket } = basketSlice.actions;

export default basketSlice.reducer;