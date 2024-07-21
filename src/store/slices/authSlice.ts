import { createSlice } from "@reduxjs/toolkit";

  export interface AuthState {
    username: string | number | null;
    password: string | number | null;
    userId: number | undefined;
    isAuthenticated: boolean;
    jwt: string ;
    firstName?: string | null;
    lastName?: string | null; 
  }

export const initialState: AuthState = {
    username: '',
    password: '',
    userId: undefined,
    isAuthenticated: false,
    jwt: '',
}  

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      login(state, action) {
        state.username = action.payload.username;
        state.password = action.payload.password;
        state.userId = action.payload.id; 
        state.isAuthenticated = true;
        state.jwt = action.payload.jwt;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
      },
      logout(state) {
        state.username = '';
        state.password = '';
        state.userId = undefined;
        state.isAuthenticated = false;
        state.jwt = '';
        state.firstName = '';
        localStorage.removeItem("jwt");
      },
    },
  });

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
