import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export interface LoginState {
    id: number;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    gender: string;
    image: string;
    token: string;
    refreshToken?: string;
}

export const loginService = createApi({
    reducerPath: 'loginApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
    endpoints: (builder) => ({
        fetchLogin:  builder.mutation({
            query: (loginData) => ({
                url: 'auth/login',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: loginData
            })       
        })
    }) 
})

export const { useFetchLoginMutation } = loginService;