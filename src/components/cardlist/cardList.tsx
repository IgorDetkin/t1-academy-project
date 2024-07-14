import React from 'react'
import classes from "./cardList.module.css";
import Card from '../card/card';
// import { productsData } from '../../utils/database';
import {Link } from "react-router-dom";
import { CatalogItemsState } from '../../store/services/catalogService';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { BasketItem, fetchBasket } from '../../store/slices/basketSlice';

const CardList: React.FC <CatalogItemsState> = ({products}) => {

  const productsFromBasket  = useSelector((state: RootState) => state.basket.products);
  // console.log(productsFromBasket);
  
  const sumArray = products?.map(item1 => {
    const matchingItem = productsFromBasket?.find(item2 => item2.id === item1.id);
    return {
      ...item1,
      quantity: matchingItem ? matchingItem.quantity : 0
    };  
  });


  return (
    <section className={classes.list}>

      {sumArray?.map(item =>  (
        <Link 
          to={`/product/${item.id}`} 
          key={item.id}
          className={classes.linkUnstyled}
          >
        <Card 
            {...item}      
            // quantity={5}   
        />
        </Link> 
      )
      )}
     </section>
  )
}

export default CardList