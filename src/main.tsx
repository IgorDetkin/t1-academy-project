import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App.tsx';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Catalog from './components/catalog/catalog.tsx';
import Error from './error/error.tsx';
import Basket from './components/basket/basket.tsx';
import Product from './components/product/product.tsx';
import { HelmetProvider } from 'react-helmet-async';

import { Provider } from 'react-redux';
import store from './store/store';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error/>,
    children: [
      { path: '/', element: <Catalog /> },
      { path: 'cart', element: <Basket /> },
      { path: 'product/:id', element: <Product/> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <Provider store={store}>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </Provider>
  </React.StrictMode>,
)