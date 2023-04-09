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

import axios from "axios";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());

    await axios.post("http://localhost:80/api.php/auth/login", user)
        .then((res) => {
            if (res.data.status == "error") {
                dispatch(loginFalse());
                alert(res.data.message);
                // const target = document.querySelector(".overlayz");
                // setTimeout(() => {
                //     target.classList.toggle("none");
                // }, 3000);
            } else {
                // window.localStorage.setItem("user", JSON.stringify(res.data));
                // const user = JSON.parse(window.localStorage.getItem("user"));
                    alert(res.data.message);
                    dispatch(loginSuccess(res.data));
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
    await axios.get("http://localhost:80/api.php/auth/logout")
        .then((res) => {
            dispatch(logOutSuccess());
            alert(res.data.message);
            navigate("/login");
        });
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post("http://localhost:80/api.php/auth/register", user)
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




