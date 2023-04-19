import {
    loginStart,
    loginSuccess,
    loginFalse,
    registerStart,
    registerSuccess,
    registerFalse,
    logOutStart,
    logOutSuccess,
    logOutFalse,
} from "./authSlice";

import { BASE_URL } from "../utils/apiURL";

import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    await axios.post(`${BASE_URL}auth/login`, user,
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    )
        .then((res) => {
            if (res.data.status == "error") {
                dispatch(loginFalse());
                alert(res.data.message);
                // const target = document.querySelector(".overlayz");
                // setTimeout(() => {
                //     target.classList.toggle("none");
                // }, 3000);
            } else { 
                dispatch(loginSuccess(res.data));
                alert(res.data.message);
                navigate("/");

                // if (res.data.isAdmin == 'true' || user.isAdmin == 'true')
                //     setTimeout(() => {
                //         dispatch(loginSuccess(res.data));
                //     }, 3000);
            }
        });
};
export const logoutUser = async (dispatch, navigate) => {
    dispatch(logOutStart());
    try {
        localStorage.removeItem("user");
        await axios.get(`${BASE_URL}auth/logout`)
            .then((res) => {
                dispatch(logOutSuccess());
                alert(res.data.message);
                navigate("/login");
            });
    } catch (error) {
        dispatch(logOutFalse());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post(`${BASE_URL}auth/register`, user,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        )
            .then((res) => {
                if (res.data.status == "success") {
                    alert("Đăng kí thành công, Vui lòng đăng nhập");
                    dispatch(registerSuccess());
                    navigate("/login");
                } else {
                    alert("User đã bị trùng, Vui lòng đăng kí lại email hoặc username khác");
                    dispatch(registerFalse());
                }
            });
    } catch (error) {
        dispatch(registerFalse());
    }
};
//BOOK
export const fetchAsyncProducts = createAsyncThunk('books/get', async () => {
    const response = await fetch(`${BASE_URL}book`);
    const data = await response.json();
    return data.data;


});

export const fetchAsyncProductSingle = createAsyncThunk('book-single/get', async (id) => {
    const response = await fetch(`${BASE_URL}book/${id}`);
    const data = await response.json();
    return data.data;
});

//AUTHOR
export const fetchAsyncAuthors = createAsyncThunk('authors/get', async () => {
    const response = await fetch(`${BASE_URL}author`);
    const data = await response.json();
    return data.data;


});

export const fetchAsyncAuthor = createAsyncThunk('author/get', async (id_author) => {
    const response = await fetch(`${BASE_URL}author/${id_author}`);
    const data = await response.json();
    return data.data;
});

//SEARCH







