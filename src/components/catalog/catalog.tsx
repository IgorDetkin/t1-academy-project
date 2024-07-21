import React, { useEffect, useState } from 'react';
import classes from "./catalog.module.css";
import SearchForm from '../searchform/searchForm';
import CardList from '../cardlist/cardList';
import Promo from '../promo/promo';
import Faq from '../faq/faq';
import { Helmet } from 'react-helmet-async';
import { CatalogItem, useFetchCatalogItemsQuery } from '../../store/services/catalogService';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { logout } from '../../store/slices/authSlice';

const Catalog: React.FC  = () => {
  const dispatch: AppDispatch = useDispatch();
  const token = localStorage.getItem('jwt');

  const { data, isLoading, error, } = token 
    ? useFetchCatalogItemsQuery(194) 
    : { data: null, isLoading: false, error: null };
  
  if (!token) {
    dispatch(logout());
  }; 

  const [visibleItems, setVisibleItems] = useState<number>(12);
  // const visibleProducts = data?.products?.slice(0, visibleItems);

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
          ? <h2 className={classes.emptyText}>Error. Loading failed. Try again later.</h2> 
          : (isLoading 
              ? <h2 className={classes.emptyText}>Loading...</h2> 
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