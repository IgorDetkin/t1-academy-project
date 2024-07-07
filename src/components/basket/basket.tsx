import React from 'react';
import classes from "./basket.module.css";
import BasketCardlist from '../basketCardlist/basketCardlist';
import BasketPrice from '../basketPrice/basketPrice';
import { Helmet } from 'react-helmet-async';

const Basket: React.FC = () => {
  return (
    <>
     <Helmet>
        <title>My cart | Goods4you</title>
    </Helmet>
    <main className={classes.basket}>
        <h1 className={classes.title}>My cart</h1>
        <div className={classes.container}>
          <BasketCardlist/>
          <BasketPrice/>
        </div>
    </main>
    </>
  )
}

export default Basket;