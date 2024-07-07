import React from 'react';
import classes from "./catalog.module.css";
import SearchForm from '../searchform/searchForm';
import CardList from '../cardlist/cardList';
import Promo from '../promo/promo';
import Faq from '../faq/faq';
import { Helmet } from 'react-helmet-async';


const Catalog: React.FC = () => {
  return (
    <>
    <Helmet>
      <title>Catalog | Goods4you</title>
    </Helmet>
    <main className={classes.catalogPage}>
      <Promo/>
      <section className={classes.catalog} id={"catalog"}>
          <h2 className={classes.title}>Catalog</h2>
          <SearchForm/>
          <div className={classes.wrapper}>
              <CardList/>
          </div>
          <button className={classes.buttonMore}>Show more</button>
      </section>
      <Faq/>
    </main>
    </>
  )
}

export default Catalog