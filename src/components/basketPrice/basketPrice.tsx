import React from 'react';
import classes from "./basketPrice.module.css";
import { BasketPriceState } from '../../store/slices/basketSlice';

const BasketPrice: React.FC<BasketPriceState> = ({total, discountedTotal, totalProducts}) => {
  return (
    <aside className={classes.prices}>
        <div className={classes.countAndPrice}>
            <div className={classes.containerCountAndPrice}>
                <h3 className={classes.titleCount}>Total count</h3>
                <span className={classes.count}>{totalProducts} items</span>
            </div>
            <div className={classes.containerCountAndPrice}>
                <h3 className={classes.titlePrice}>Price without discount</h3>
                <span className={classes.numPrice}>{total}$</span>
            </div>
        </div>
        <div className={classes.totalPrice}>
            <h2 className={classes.titleTotalPrice}>Total price</h2>
            <span className={classes.numTotalPrice}>{discountedTotal}$</span>
        </div>
  </aside>
  )
}

export default BasketPrice