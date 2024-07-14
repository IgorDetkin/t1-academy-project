import { configureStore } from '@reduxjs/toolkit';
import basketReducer from "./slices/basketSlice";
import { catalogService } from './services/catalogService';
import { oneProductService } from './services/oneProductService';

// interface RootState {
//     reducer: BasketItemState;
// }

//пока не разросся редакс, убрал rootReducer .
// const rootReducer = combineReducers({
//     basketReducer 
// })

const store = configureStore({
  reducer: {
    // reducer: rootReducer,
    [catalogService.reducerPath]: catalogService.reducer,
    [oneProductService.reducerPath]: oneProductService.reducer,
    basket: basketReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(catalogService.middleware, oneProductService.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;