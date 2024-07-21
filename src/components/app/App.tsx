import React, { useEffect } from 'react';
import classes from './App.module.css'
import Header from '../header/header';
import Footer from '../footer/footer';
import { Outlet } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector,  } from 'react-redux';
import { fetchBasket } from '../../store/slices/basketSlice';
import { useFetchCheckIsMeQuery } from '../../store/services/isMeService';
import { login, logout } from '../../store/slices/authSlice';


const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const {isAuthenticated, userId, jwt } = useSelector((state: RootState) => state.auth);
  
  const { data, error } = useFetchCheckIsMeQuery(jwt, {skip: !jwt});  
    
  // useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      dispatch(login({ jwt: token, id: data?.id, firstName: data?.firstName, lastName: data?.lastName }));
    }
    if(error) {
      dispatch(logout())
    }      
  // }, [dispatch, data, error]);


  useEffect(() => {
    if(isAuthenticated && userId) {
      dispatch(fetchBasket(userId))
    }
  }, [dispatch, isAuthenticated, userId]);  
  

  return (
  <>
    <div className={classes.app}>
      <Header />
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


    //вариант при котором всё работает правильно, но реакт ругается. Альтернатива - всё обернутое в useEffect
    // const token = localStorage.getItem('jwt');  
    // if (token) {
    //   dispatch(login({ jwt: token, id: data?.id, firstName: data?.firstName, lastName: data?.lastName }));
    // }
    // if(error) {
    //     dispatch(logout())
    // }      