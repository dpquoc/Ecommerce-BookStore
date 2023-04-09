import React from "react";

import "./Login.scss";

import TextField from "@mui/material/TextField";
import { AiOutlineEye, AiOutlineCloseCircle } from "react-icons/ai";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import { useRef, useState, useEffect, useContext } from 'react';



import { css } from "@emotion/react";
import { loginUser } from "../../store/apiReq";

// import axios from "axios";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #ffffff;
`;

const Login = () => {
    const target = document.querySelector(".overlayz");
    window.scrollTo(0, 0);
    let [loading, setLoading] = useState(false);

    const [type, setType] = useState("password");
    const [disabled, setDisable] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            username: username,
            password: password,
        };
        loginUser(newUser, dispatch, navigate);
    }

    // useEffect(() => {
    //     if (username && password) setDisable(false);
    //     else setDisable(true);
    // }, [username, password]);

    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const res = await axios.post("http://localhost:80/api.php/auth/login",
    //             { username, password },
    //             {
    //                 headers: { 'Content-Type': 'application/json' },
    //                 withCredentials: true
    //             }
    //         );
    //         if (res.data.status == "error") {
    //             alert(res?.data?.message);
    //         }
    //         else {
    //             const accessToken = res?.data?.accessToken;
    //             const roles = res?.data?.roles;
    //             const fullname = res?.data?.fullname;
    //             setAuth({ username, password, roles, accessToken, fullname })
    //             setUsername('');
    //             setPassword('');
    //             setSuccess(true);
    //             navigate('/')
    //         }
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // };
    const icon = document.querySelector(".input__icon");
    return (
        <>
            {/* {loading && (
        <div className="overlay__loading">
          <DotLoader
            color={"#ffffff"}
            loading={loading}
            css={override}
            size={150}
          />
        </div>
      )} */}
            <div className="login__form">
                <form className="form__login" onSubmit={handleSubmit}>
                    <div className="Title">Đăng nhập</div>
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                    <TextField
                        id="password"
                        label="Mật khẩu"
                        type={type}
                        variant="outlined"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        InputProps={{
                            endAdornment: (
                                <AiOutlineEye
                                    className="input__icon"
                                    onClick={() => {
                                        icon.classList.toggle("icon__active");
                                        if (type == "password") setType("text");
                                        else setType("password");
                                    }}
                                />
                            ),
                        }}
                    />
                    <div className="fogot__pw">
                        <div className="remember__pw">
                            <input type="checkbox" />
                            <p>Ghi nhớ tài khoản</p>
                        </div>
                        <p>Quên mật khẩu?</p>
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        // disabled={disabled}
                        // onClick={() => {
                        //     setLoading(true);
                        //     setTimeout(() => {
                        //         setLoading(false);
                        //         setSuccess(true);
                        //     }, 3000);
                        // }}
                    >
                        Đăng nhập
                    </Button>
                    <p style={{ color: "gray", fontSize: "12px", textAlign: "center" }}>
                        Chưa có tài khoản ?
                    </p>
                    <Button variant="outlined" onClick={() => navigate("/register")}>
                        Đăng kí
                    </Button>
                </form>
            </div>
            {/* <div className="overlayz none">
                <div className="box">

                    <div className="flex">
                        <AiOutlineCloseCircle
                            onClick={(e) => {
                                target.classList.toggle("none");
                            }}
                        />
                        <div className="title">Email hoặc mật khẩu sai!</div>
                    </div>
                </div>
            </div> */}
        </>
    );
};
export default Login;
