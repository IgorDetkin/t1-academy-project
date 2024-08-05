import { configureStore } from '@reduxjs/toolkit';
import basketReducer from "./slices/basketSlice";
import { catalogService } from './services/catalogService';
import { oneProductService } from './services/oneProductService';
import { loginService } from './services/loginService';
import authReducer from './slices/authSlice';
import { isMeService } from './services/isMeService';

const store = configureStore({
  reducer: {
    [catalogService.reducerPath]: catalogService.reducer,
    [oneProductService.reducerPath]: oneProductService.reducer,
    [loginService.reducerPath]: loginService.reducer,
    [isMeService.reducerPath]: isMeService.reducer,
    basket: basketReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(
      catalogService.middleware, 
      oneProductService.middleware, 
      loginService.middleware,
      isMeService.middleware
    )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;