import React from 'react';
import classes from "./controls.module.css";
import { controlProps } from '../../types/controls';


const Controls: React.FC<controlProps> = ({ countInBasket, addCount, removeCount, size, sizeControl} ) => {

    const itemWord = `${countInBasket && countInBasket > 1 ? 'items' : 'item'}`

    return (
    <div className={`${classes.controls} ${classes[size]}` }>
        <button className={`${classes.control} ${sizeControl && classes[sizeControl]}`}  onClick={() => removeCount()} aria-label='remove from cart'>
            <svg aria-hidden="true" width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5 3.50024L1.5 3.50024C0.671573 3.50024 0 2.82867 0 2.00024C0 1.17182 0.671573 0.500244 1.5 0.500244L16.5 0.500244C17.3284 0.500244 18 1.17182 18 2.00024C18 2.82867 17.3284 3.50024 16.5 3.50024Z" fill="white"/>
            </svg>
        </button>
        <div className={classes.count}>{countInBasket} {itemWord}</div>
        <button className={`${classes.control} ${sizeControl && classes[sizeControl]}`} onClick={() => addCount()} aria-label='add to cart'>
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 10L1 10C0.447715 10 0 9.55228 0 9C0 8.44772 0.447716 8 1 8L17 8C17.5523 8 18 8.44772 18 9C18 9.55228 17.5523 10 17 10Z" fill="white"/>
                <path d="M8 17L8 1C8 0.447715 8.44772 0 9 0C9.55228 0 10 0.447716 10 1L10 17C10 17.5523 9.55228 18 9 18C8.44772 18 8 17.5523 8 17Z" fill="white"/>
            </svg>
        </button>
    </div>
  )
}

export default Controls;