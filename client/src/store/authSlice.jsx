import { createSlice } from "@reduxjs/toolkit"


const fetchFromLocalStorage = () => {
    let user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    } else {
        return null;
    }
}
const storeInLocalStorage = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
}

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: fetchFromLocalStorage(),
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
            storeInLocalStorage(state.login.currentUser)
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
            storeInLocalStorage(state.login.currentUser)
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
