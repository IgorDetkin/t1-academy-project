import React, { useState } from 'react';
import classes from "./card.module.css";
import { ProductInterface } from '../../types/data';
import Controls from '../controls/controls';

const Card: React.FC<ProductInterface> = ({ title, price, image, countInBasket }) => {

    const countNumber = countInBasket || 0;
    const [count, setCount] = useState<number>(countNumber);
    
    const addCount = () => {
        setCount(prev => prev + 1);
     }; 
     const removeCount = () => {
         setCount(prev => prev - 1);
      };
 
  return (
    <article className={classes.card}>
        <div className={classes.imageContainer}>
            <img src={image} alt="product" className={classes.cardImage}/>
            <div className={classes.overlay}>Show details</div>
        </div>
        <div className={classes.container}>
            <div className={classes.titleAndPrice}>
                <p className={classes.title}>{title}</p>
                <span className={classes.price}>{price}</span>
            </div>
            <div className={classes.controlContainer} onClick={(e):void => e.preventDefault()}>
                {   count
                    ? <Controls 
                            countInBasket={count}
                            addCount={addCount}
                            removeCount={removeCount}
                        />
                    :  <button className={classes.addButton} onClick={() =>  addCount()} aria-label='add to cart'>
                            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 7.14286H16.6038L13.0359 0.34668C12.8589 0.00908289 12.475 -0.101141 12.1784 0.10185C11.8823 0.304841 11.7865 0.743572 11.9641 1.08189L15.1461 7.14286H4.85388L8.03587 1.08184C8.21348 0.743524 8.11767 0.304793 7.82164 0.101802C7.52439 -0.101189 7.14173 0.00903482 6.96411 0.346631L3.39617 7.14281H0V8.57139H1.35651L2.94432 18.2512C3.11033 19.2648 3.88547 20 4.78761 20H15.2124C16.1145 20 16.8896 19.2648 17.055 18.252L18.6434 8.57139H20C20 8.57139 20 7.14286 20 7.14286ZM15.8264 17.989C15.7715 18.3266 15.5133 18.5715 15.2124 18.5715H4.78761C4.4867 18.5715 4.22854 18.3266 4.173 17.9883L2.62789 8.57139H17.3721L15.8264 17.989Z" fill="white"/>
                        </svg>
                    </button>
                }
            </div>
        </div>
    </article>
  )
}

export default Card