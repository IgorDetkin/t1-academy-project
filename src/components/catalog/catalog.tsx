import React, { useEffect, useState } from 'react';
import classes from "./catalog.module.css";
import SearchForm from '../searchform/searchForm';
import CardList from '../cardlist/cardList';
import Promo from '../promo/promo';
import Faq from '../faq/faq';
import { Helmet } from 'react-helmet-async';
import { CatalogItem, useFetchCatalogItemsQuery } from '../../store/services/catalogService';
// import { AppDispatch, RootState } from '../../store/store';
// import { useDispatch, useSelector } from 'react-redux';

const Catalog: React.FC  = () => {
  const { data, isLoading, error, } = useFetchCatalogItemsQuery(194);

  const [visibleItems, setVisibleItems] = useState<number>(12);
  // const visibleProducts = data?.products?.slice(0, visibleItems);
  // console.log(visibleProducts)

  const [searchReq, setSearchReq] = useState <string>('');
  const [filteredProducts, setFilteredProducts] = useState<CatalogItem[]>([]);

  useEffect(() => {
    if(data?.products) {
      setFilteredProducts(
        data.products.filter((item) => 
        item.title.toLowerCase().includes(searchReq.toLowerCase())
        )
      )
    }
  }, [data, searchReq])

  const visibleProducts = filteredProducts.slice(0, visibleItems);

  return (
    <>
    <Helmet>
      <title>Catalog | Goods4you</title>
    </Helmet>
    <main className={classes.catalogPage}>
      <Promo/>
      <section className={classes.catalog} id={"catalog"}>
          <h2 className={classes.title}>Catalog</h2>
          <SearchForm
            setSearchReq={setSearchReq}
          />
          {error 
          ? <h2 className={classes.emptyText}>Произошла ошибка</h2> 
          : (isLoading 
              ? <h2 className={classes.emptyText}>Идет загрузка</h2> 
              : 
                (visibleProducts.length 
                  ? <>
                      <div className={classes.wrapper}>
                        <CardList
                          products={visibleProducts}
                        />
                      </div>          
                      {(visibleProducts   
                        && filteredProducts 
                        && visibleProducts?.length < filteredProducts.length
                        ) 
                        &&  <button 
                              className={classes.buttonMore}
                              onClick={() => setVisibleItems(visibleItems + 12)}
                            >Show more
                            </button>
                      } 
                    </>
                  : <h2 className={classes.emptyText}>No items</h2> 

                )
            )
          }        
      </section>
      <Faq/>
    </main>
    </>
  )
}

export default Catalog