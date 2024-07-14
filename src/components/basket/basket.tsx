import React from 'react';
import classes from "./basket.module.css";
import BasketCardlist from '../basketCardlist/basketCardlist';
import BasketPrice from '../basketPrice/basketPrice';
import { Helmet } from 'react-helmet-async';
import {  RootState } from '../../store/store';
import { useSelector } from 'react-redux';
// import { BasketItemState, fetchBasket } from '../../store/slices/basketSlice';


const Basket: React.FC = () => {
  // const dispatch: AppDispatch = useDispatch();
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


  // useEffect(() => {
  //   dispatch(fetchBasket());
  //   // console.log(products)
  // }, [])

  
  return (
    <>
     <Helmet>
        <title>My cart | Goods4you</title>
    </Helmet>
    <main className={classes.basket}>
        <h1 className={classes.title}>My cart</h1>
        <div className={classes.container}>
          {error  
            ? <h2 className={classes.emptyText}>Error: {error}</h2>
            : (isLoading 
              ? <h2 className={classes.emptyText}>Идет Загрузка</h2>
              : <> 
                { products 
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
