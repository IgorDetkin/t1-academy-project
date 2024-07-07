import React from 'react';
import classes from "./basketPrice.module.css";

const BasketPrice: React.FC = () => {
  return (
    <aside className={classes.prices}>
        <div className={classes.countAndPrice}>
            <div className={classes.containerCountAndPrice}>
                <h3 className={classes.titleCount}>Total count</h3>
                <span className={classes.count}>3 items</span>
            </div>
            <div className={classes.containerCountAndPrice}>
                <h3 className={classes.titlePrice}>Price without discount</h3>
                <span className={classes.numPrice}>700$</span>
            </div>
        </div>
        <div className={classes.totalPrice}>
            <h2 className={classes.titleTotalPrice}>Total price</h2>
            <span className={classes.numTotalPrice}>590$</span>
        </div>
  </aside>
  )
}

export default BasketPrice