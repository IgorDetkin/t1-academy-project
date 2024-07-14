import React, { useEffect, useState } from 'react';
import classes from "./product.module.css";
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ProductItem, useFetchOneProductQuery } from '../../store/services/oneProductService';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import RatingStars from '../ratingStars/ratingStars';
import Controls from '../controls/controls';
import ImagesList from '../imagesList/imagesList';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

const Product: React.FC <ProductItem> = () => {

    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading } = useFetchOneProductQuery(Number(id));    

    const productsFromBasket  = useSelector((state: RootState) => state.basket.products); //получить продукты из стейта

    const productInBasket = productsFromBasket?.find(item => item.id === data?.id); //найти товар в корзине, id которого равен id товара на странице

    const productWithQuantity = {
        ...data,
        quantity: productInBasket ? productInBasket.quantity : 0
      }; 

    const finalPrice = data && (data.price / 100 * (100 - data.discountPercentage)).toFixed(2);

    const countInBasket = productWithQuantity.quantity;
    const [count, setCount] = useState<number>(countInBasket);

    const addCount = () => {
        setCount(prev => prev + 1);
     }; 
     const removeCount = () => {
         setCount(prev => prev - 1);
      };

      useEffect(() => { // количество товаров в корзине не тянулось в контролс, пришлось сделать хук 
        setCount(productWithQuantity.quantity);
      }, [productWithQuantity.quantity]);


      const getErrorMessage = (error: FetchBaseQueryError | SerializedError): string => {
        if ('status' in error) { // FetchBaseQueryError
          if (typeof error.data === 'string') {
            return error.data;
          } else if (error.data && typeof error.data === 'object' && 'message' in error.data) {
            return (error.data as { message: string }).message;
          }
          return 'An unknown error occurred';
        } else {
          return error.message || 'An unknown error occurred'; // SerializedError
        }
      };


  return (
    <>
    <Helmet>
        <title>{`${productWithQuantity?.title} | Goods4you`}</title>
    </Helmet>
    <main className={classes.product}>
        
        {error
            ? <h2 className={classes.emptyText}>Error: {getErrorMessage(error)}</h2>
            :
            (isLoading
            ? <h2 className={classes.emptyText}>Идет загрузка</h2> 
            :
            <div className={classes.container}>
                <ImagesList
                    images={productWithQuantity.images}
                />

                <section className={classes.info}>
                    <h1 className={classes.title}>{productWithQuantity?.title}</h1>

                    <div className={classes.ratingAndCategory}>
                    <RatingStars
                            rating={productWithQuantity?.rating}
                    />
                        <span className={classes.categories}>{productWithQuantity?.category}</span>
                    </div>
                    <p className={classes.amount}>In stock - {productWithQuantity?.stock}</p>
                    <p className={classes.description}>
                        {productWithQuantity?.description}
                    </p>
                    <div className={classes.otherDetails}>
                        <p className={classes.otherDetail}>{productWithQuantity?.warrantyInformation}</p>
                        <p className={classes.otherDetail}>{productWithQuantity?.shippingInformation}</p>
                    </div>
                    <div className={classes.buyContainer}>
                        <div className={classes.priceAndDiscount}>
                            <div className={classes.priceBlock}>
                                <h2 className={classes.price}>{finalPrice}$</h2>
                                <span className={classes.oldPrice}>{productWithQuantity?.price}$</span>
                            </div>
                            <div className={classes.discountBlock}>
                                <span className={classes.yourDiscount}>Your discount:</span>
                                <span className={classes.countDiscount}>{productWithQuantity?.discountPercentage}%</span>
                            </div>
                        </div>
                        {/* <div className={classes.controlContainer}> */}
                            {count > 0  
                                ? <Controls 
                                    countInBasket={count}
                                    addCount={addCount}
                                    removeCount={removeCount}
                                    size='big'
                                    sizeControl='bigControl'
                            />  
                                : <button className={classes.addButton} onClick={() =>  addCount()}>Add to cart</button>
                            }
                        
                        {/* </div> */}
                    
                    
                    </div>
                </section>
            </div>
            )
        }
    </main>
    </>
  )
}

export default Product;