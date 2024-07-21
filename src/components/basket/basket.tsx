import React from 'react';
import classes from "./basket.module.css";
import BasketCardlist from '../basketCardlist/basketCardlist';
import BasketPrice from '../basketPrice/basketPrice';
import { Helmet } from 'react-helmet-async';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';


const Basket: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const token = localStorage.getItem('jwt');

  const { 
    products, 
    isLoading, 
    error, 
    id, 
    total, 
    discountedTotal, 
    totalProducts, 
    totalQuantity 
  } = useSelector((state: RootState) => state.basket);

  if (!token) {
    dispatch(logout());
  }; 
  

  return (
    <>
     <Helmet>
        <title>My cart | Goods4you</title>
    </Helmet>
    <main className={classes.basket}>
        <h1 className={classes.title}>My cart</h1>
        <div className={classes.container}>
          {error  
            ? <h2 className={classes.emptyText}>Error. Loading failed. Try again later.</h2>
            : 
            (isLoading 
              ? <h2 className={classes.emptyText}>Loading...</h2>
              : <> 
                { 
                  products && products.length > 0
                  ?
                  <>
                    <BasketCardlist 
                      id={id}
                      products={products}
                    />
                    <BasketPrice
                      // id={id}
                      // products={products}
                      total={total}
                      discountedTotal={discountedTotal}
                      totalProducts={totalProducts}
                      totalQuantity={totalQuantity}
                    />
                  </>
                  : 
                  <h2 className={classes.emptyText}>no items</h2>
                } 
                 </> 
              )
          }
        </div>
    </main>
    </>
  )
}

export default Basket;
