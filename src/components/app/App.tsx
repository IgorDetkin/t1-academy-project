import React from 'react';
import classes from './App.module.css'
import Header from '../header/header';
import Footer from '../footer/footer';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {
  
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