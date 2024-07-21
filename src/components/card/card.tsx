import React, { useState } from 'react';
import classes from "./card.module.css";
import Controls from '../controls/controls';
import { CatalogItem } from '../../store/services/catalogService';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToBasket, fetchUpdateData, removeItemFromBasket } from '../../store/slices/basketSlice';


const Card: React.FC<CatalogItem> = ({ id, title, price, discountPercentage, thumbnail, quantity, stock }) => {
    const dispatch: AppDispatch = useDispatch();
    

    const { id: basketId, products } = useSelector((state: RootState) => state.basket);


    const finalPriceForOneProduct = (price / 100 * (100 - discountPercentage)).toFixed(2);
    const countNumber = quantity;
    const [count, setCount] = useState<number>(countNumber);
    
    const addCount = () => {
        dispatch(addItemToBasket({id}))
        setCount(prev => prev + 1);
        
        if (!products) return;
        const productFromCatalog = products?.find(item => item.id === id ); //сравниваем ид товаров из корзины и в каталоге
        let updatedProducts;

        if (productFromCatalog) {
          updatedProducts = products?.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } 

        else {
          const newProductInBasket = { id, title, price, thumbnail, quantity: 1, discountPercentage };
          updatedProducts = [...products, newProductInBasket];
        // updatedProducts = products?.push(newProductInBasket)  
        }
        dispatch(fetchUpdateData({ id: basketId, products: updatedProducts  }));
     }; 





     const removeCount = () => {
        dispatch(removeItemFromBasket({id}))
         setCount(prev => prev - 1);
        
        const updatedProducts = products?.map(item => item.id === id ? { ...item, quantity: count - 1 } : item);
        dispatch(fetchUpdateData({ id: basketId, products: updatedProducts  }));
      };
 
  return (
    <article className={classes.card}>
        <div className={classes.imageContainer}>
            <img src={thumbnail} alt="product" className={classes.cardImage}/>
            <div className={classes.overlay}>Show details</div>
        </div>
        <div className={classes.container}>
            <div className={classes.titleAndPrice}>
                <p className={classes.title}>{title}</p>
                <span className={classes.price}>{finalPriceForOneProduct} $</span>
            </div>
            <div className={classes.controlContainer} onClick={(e):void => e.preventDefault()}>
                {   count
                    ? <Controls 
                            countInBasket={count}
                            addCount={addCount}
                            removeCount={removeCount}
                            size='small'
                            stock={stock}
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