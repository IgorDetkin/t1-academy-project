import React from 'react';
import classes from "./basketCardlist.module.css";
import BasketCard from '../basketCard/basketCard';
import { productsDataForBasket } from '../../utils/databaseForBasket';

const BasketCardlist: React.FC  = () => {
  return (
    <section className={classes.list}>
      {productsDataForBasket.slice(0, 4).map(item => (
        <div key={Math.random()}>
        <BasketCard
          id={item.id}        
          title={item.title}
          price={item.price}
          image={item.ProductInBasketImage}
          countInBasket={item.countInBasket}
          isDisabledInBasket={item.isDisabledInBasket}
        />
        </div>
      )
      )}
    </section>

  )
}

export default BasketCardlist