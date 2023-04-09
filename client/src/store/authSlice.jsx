import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
            //   isLogin: false,
            //   uploadAvt: false
        },
        register: {
            isFetching: false,
            error: false,
            success: false,
        },
        logout: {
            isFetching: false,
            error: false,
            //   isLogin: false,
            //   uploadAvt: false
        },
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFalse: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        registerStart: (state) => {
            state.register.isFetching = true
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
        },
        registerFalse: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },
        logOutStart: (state) => {
            state.logout.isFetching = true;
        },
        logOutSuccess: (state, action) => {
            state.logout.isFetching = true;
            state.login.currentUser = null;
            state.logout.error = false;
        },
        logOutFalse: (state) => {
            state.logout.isFetching = false;
            state.logout.error = true;
        },
    },
})

export const {
    loginStart,
    loginSuccess,
    loginFalse,
    registerStart,
    registerSuccess,
    registerFalse,
    logOutStart,
    logOutSuccess,
    logOutFalse,
} = authSlice.actions

export default authSlice
