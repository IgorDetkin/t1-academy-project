import React, { useEffect, useState } from 'react';
import classes from "./product.module.css";
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useFetchOneProductQuery } from '../../store/services/oneProductService';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import RatingStars from '../ratingStars/ratingStars';
import Controls from '../controls/controls';
import ImagesList from '../imagesList/imagesList';
import { addItemToBasket, fetchUpdateData, removeItemFromBasket } from '../../store/slices/basketSlice';
import { logout } from '../../store/slices/authSlice';

const Product: React.FC = ({}) => {
    const dispatch: AppDispatch = useDispatch();
    const { id: basketId, products } = useSelector((state: RootState) => state.basket);

    const { id } = useParams<{ id: string }>();

    const token = localStorage.getItem('jwt');

    const { data, error, isLoading } = token 
      ? useFetchOneProductQuery(Number(id)) 
      : { data: null, isLoading: false, error: null };
    
    if (!token) {
      dispatch(logout());
    }

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
        dispatch(addItemToBasket({id: data?.id}))
        setCount(prev => prev + 1);
      if (!products || !data ) return;  
      let updatedProducts;
        if(productInBasket) {
          updatedProducts = products?.map(item => item.id === Number(id) ? { ...item, quantity: count + 1 } : item);
        }
        else {
          const newProductInBasket = { 
            id: data.id, 
            title: data.title, 
            price: data.price,
            thumbnail: undefined,  
            quantity: 1, 
            discountPercentage: data.discountPercentage, 
          };
          updatedProducts = [...products, newProductInBasket];
        }
        dispatch(fetchUpdateData({ id: basketId, products: updatedProducts  }));
     }; 


     const removeCount = () => {
        dispatch(removeItemFromBasket({id: data?.id}))
        setCount(prev => prev - 1);
        const updatedProducts = products?.map(item => item.id === Number(id) ? { ...item, quantity: count - 1 } : item);
        dispatch(fetchUpdateData({ id: basketId, products: updatedProducts  }));
      };


      useEffect(() => { // количество товаров в корзине не тянулось в контролс, пришлось сделать хук 
        setCount(productWithQuantity.quantity);
      }, [productWithQuantity.quantity]);


  return (
    <>
    <Helmet>
        <title>{`${productWithQuantity?.title} | Goods4you`}</title>
    </Helmet>
    <main className={classes.product}>
        
        {error
            ? <h2 className={classes.emptyText}>Error. Loading failed. Try again later.</h2>
            :
            (isLoading
            ? <h2 className={classes.emptyText}>Loading...</h2> 
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
                                    stock={data?.stock}
                            />  
                                : <button className={classes.addButton} 
                                    onClick={() =>  addCount()}
                                  >Add to cart</button>
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