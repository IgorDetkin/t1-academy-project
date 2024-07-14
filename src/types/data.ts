export interface ProductInterface {
    id?: number;
    title?: string;
    image?: string | undefined;
    ProductBigImage?: string | undefined;
    ProductMiniImage?: string | undefined;    
    ProductInBasketImage?: string | undefined;    
    discount?: string;
    price?: string;
    priceInProduct?: string;
    oldprice?: string;
    category?: string;
    description?: string;
    rating?: number;
    amount?: string;
    warrantly?: string;
    ships?: string;
    countInBasket?: number | undefined;
    isDisabledInBasket?: boolean; 
}

