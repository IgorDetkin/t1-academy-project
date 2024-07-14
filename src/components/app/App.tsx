import React, { useEffect } from 'react';
import classes from './App.module.css'
import Header from '../header/header';
import Footer from '../footer/footer';
import { Outlet } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import { useDispatch,  } from 'react-redux';
import { fetchBasket } from '../../store/slices/basketSlice';


const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBasket())
  }, [])

  return (
  <>
    <div className={classes.app}>
      <Header/>
      <div className={classes.appMainContent}>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  </>
  )
}

export default App;

// className в данном файле используются, чтобы футер прибивался к низу экрана, если контента мало.