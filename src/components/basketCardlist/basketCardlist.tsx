import React from 'react';
import classes from "./basketCardlist.module.css";
import BasketCard from '../basketCard/basketCard';
import { BasketItemState } from '../../store/slices/basketSlice';

const BasketCardlist: React.FC<BasketItemState>  = ({id, products }) => {
  return (
    <section className={classes.list}>

      {products && products.map((item) => (
        <div key={item.id}>
           <BasketCard
              // id={item.id}
              {...item}        
           />
        </div>
      )
      )}
    </section>
  )
}

export default BasketCardlist