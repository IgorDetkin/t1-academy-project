import React, { useState } from 'react';
import classes from "./loginPage.module.css";
import { Helmet } from 'react-helmet-async';
import { useFetchLoginMutation } from '../../store/services/loginService';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { Navigate } from 'react-router-dom';


const LoginPage: React.FC = () => {

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const jwt = useSelector((state: RootState) => state.auth.jwt);

    const dispatch: AppDispatch = useDispatch();

    const [fetchLogin, { isLoading, error}] = useFetchLoginMutation();

    const [userData, setUserData] = useState({ username: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    
    const loginSubmit =  async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            const res = await fetchLogin(userData);
            localStorage.setItem("jwt", res.data.token); // res.data.token - ответ на пост-запрос от сервера. Там токен лежит.
            // сохранили токен в local storage.

            dispatch(login({ username: res.data.username, password: res.data.password, id: res.data.id, jwt: res.data.token })); 
            // здесь мы передаем в слайс результат входа(имя, пароль, id(для корзины), токен) и меняем состояние на "авторизованы"

            //дальше происходит следующее: 
            //состояние поменялось на "авторизованы" и страница логина поменялась на маршруты из protected routes.
            //токен лёг в локал стораж.
                        
            //что надо сделать: чтобы при перезагрузке страницы мы делали проверку есть ли токен и 
            // если токен есть , то делать состояние "авторизованы"
            // при том проверка должна происходить где-то на уровне запроса 

        }
        catch (error) {
            console.error('Failed to login:', error);
        }
    }


  return (
    isAuthenticated && jwt !== undefined 
    ?   <Navigate to="/" replace />
    :   <>
        <Helmet>
            <title>Sign in | Goods4you</title>
        </Helmet>
        <main className={classes.loginPage}>
            <h1 className={classes.title}>Sign in</h1>
            <form className={classes.form} onSubmit={loginSubmit}>
                <input 
                    type="text" 
                    name="username"
                    className={classes.input}
                    placeholder="Login"
                    value={userData.username}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="password" 
                    name="password"
                    className={classes.input}
                    placeholder="Password"
                    value={userData.password}
                    onChange={handleChange}
                    autoComplete='false'
                    required
                />
                {isLoading 
                ? <button className={`${classes.submitButton} ${classes.submitButtonDisabled}`}  type="submit" disabled>Sign in</button>
                : <button className={classes.submitButton}  type="submit">Sign in</button>
                }
            {isLoading && <div className={classes.loading}>Loading...</div>}
            </form>
            {error && <p className={classes.emptyText}>Authorization failed. Сheck your login details.</p>}
        </main>
        </>
  )
}

export default LoginPage;