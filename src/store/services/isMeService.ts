import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export interface LoginState {
    id: number;
    firstName: string;
    lastName: string;
}

export const isMeService = createApi({
    reducerPath: 'checkMeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
    endpoints: (builder) => ({
        fetchCheckIsMe: builder.query<LoginState, string>({
            query: (jwt) => ({
                url: 'auth/me',
                headers: {
                    'Authorization': `Bearer ${jwt}`, 
                }, 
            }),
          }),
    })     
})

export const { useFetchCheckIsMeQuery } = isMeService;