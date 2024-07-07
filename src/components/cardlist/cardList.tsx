import React from 'react'
import classes from "./cardList.module.css";
import Card from '../card/card';
import { productsData } from '../../utils/database';
import {Link } from "react-router-dom";

const CardList: React.FC = () => {
  return (
    <section className={classes.list}>
      {productsData.map(item =>  (
        <Link 
          to={`/product/${item.id}`} 
          key={item.id}
          className={classes.linkUnstyled}
          >
        <Card 
          title={item.title}
          price={item.price}
          image={item.image}
          countInBasket={item.countInBasket}
        />
        </Link> 
      )
      )}
     </section>
  )
}

export default CardList