import React from 'react';
import classes from "./promo.module.css";
import { HashLink } from 'react-router-hash-link';

const Promo: React.FC = () => {
  return (
    <section className={classes.promo}>
        <div className={classes.container}>
            <h1 className={classes.mainTitle}>Any products from famous brands with worldwide delivery</h1>
            <p className={classes.description}>We sell smartphones, laptops, clothes, shoes and many other products at low prices</p>
            <HashLink smooth to="/#catalog" className={classes.link}>Go to shopping
            </HashLink>
            <div className={classes.bg}>Goods4you</div>
        </div>
        
    </section>
  )
}

export default Promo