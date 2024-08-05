import { ProductInterface } from '../types/data';
import photoInBasket from "../assets/imageSmall.png"

export const productsDataForBasket: ProductInterface[] = [
    {
      title: "Essence Mascara Lash Princess",
      id: "1",
      ProductInBasketImage: photoInBasket,
      price: "110 $",
      countInBasket: 1,
      isDisabledInBasket: false
    },
    {
      title: "Essence Mascara Lash Princess",
      id: "2",
      ProductInBasketImage: photoInBasket,
      price: "110 $",
      countInBasket: 1,
      isDisabledInBasket: false
    },
    {
      title: "Essence Mascara Lash Princess",
      id: "3",
      ProductInBasketImage: photoInBasket,
      price: "110 $",
      countInBasket: 5,
      isDisabledInBasket: false
    },
    {
      title: "Essence Mascara Lash Princess",
      id: "4",
      ProductInBasketImage: photoInBasket,
      price: "110 $",
      isDisabledInBasket: true
    }
  ]