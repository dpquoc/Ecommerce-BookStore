import React, { useEffect, useState } from "react";
import "./Register.scss";
import TextField from "@mui/material/TextField";
import { AiOutlineEye, AiOutlineCheck, AiOutlineCloseCircle } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../store/apiReq";

import { useDispatch } from "react-redux";
const target = document.querySelector(".overlayz");


const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => window.scrollTo(0, 0), []);

    const [type, setType] = useState("password");
    const [disabled, setDisabled] = useState(true);

    const re_1digit = new RegExp("^(?=.*[0-9])");
    const re_8chart = new RegExp("^(?=.{8,})");
    const re_low = new RegExp("^(?=.*[a-z])");
    const re_up = new RegExp("^(?=.*[A-Z])");
    const re_spe = new RegExp("^(?=.*[!@#$%^&*])");

    const formik = useFormik({
        initialValues: {
            fullname: "",
            username: "",
            password: "",
            confirm: "",
            email: "",
        },
        validationSchema: Yup.object({
            fullname: Yup.string()
                .required("Yêu cầu nhập họ và tên")
                .min(4, "Họ và tên yêu cầu tối thiểu 4 kí tự"),
            username: Yup.string()
                .required("Yêu cầu nhập tài khoản")
                .min(3, "Tài khoản yêu cầu tối thiểu 3 kí tự"),
            password: Yup.string()
                .required("Yêu cầu nhập đúng mật khẩu")
                .matches(/^(?=.*[0-9])/, "color"),
            confirm: Yup.string()
                .oneOf([Yup.ref("password"), null], "Nhập lại mật khẩu không chính xác")
                .required("Yêu cầu nhập lại mật khẩu"),
            email: Yup.string()
                .required("Vui lòng nhập email")
                .min(8, "Vui lòng nhập email chính xác")
                .matches(
                    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                    "Vui lòng nhập email chính xác"
                ),
        }),
        onSubmit: (values) => {
            const newUser = {
                fullname: values.fullname,
                username: values.username,
                password: values.password,
                email: values.email,
                // action: "getUserRegister",
            };
            registerUser(newUser, dispatch, navigate)
        },
    });
    useEffect(() => {
        if (
            formik.values.fullname &&
            formik.values.username &&
            formik.values.email &&
            formik.values.password &&
            formik.values.confirm
        ) {
            setDisabled(false);
        }
        else setDisabled(true);
    }, [formik.values.fullname, formik.values.email, formik.values.username, formik.values.password]);

    const icon = document.querySelector(".input__icon");

    return (
        <div className="register__form">
            <form className="form__register" onSubmit={formik.handleSubmit}>
                <div className="title">Đăng ký tài khoản</div>
                <TextField
                    name="fullname"
                    id="fullname"
                    label="Full Name"
                    variant="outlined"
                    value={formik.values.fullname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.fullname && formik.errors.fullname ? (
                    <div className="error_msg">{formik.errors.fullname}</div>
                ) : null}
                <TextField
                    name="email"
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="error_msg">{formik.errors.email}</div>
                ) : null}
                <TextField
                    id="username"
                    name="username"
                    label="Username"
                    variant="outlined"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username ? (
                    <div className="error_msg">{formik.errors.username}</div>
                ) : null}
                <TextField
                    id="password"
                    name="password"
                    label="Password"
                    type={type}
                    variant="outlined"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
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
                {formik.touched.password && formik.errors.password ? (
                    <div className="error_msg">{formik.errors.password}</div>
                ) : null}
                <TextField
                    id="confirm"
                    label="Nhập lại mật khẩu"
                    name="confirm"
                    type={type}
                    variant="outlined"
                    value={formik.values.confirm}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {formik.touched.confirm && formik.errors.confirm ? (
                    <div className="error_msg">{formik.errors.confirm}</div>
                ) : null}
                <div className="footer__form">Mật khẩu bạn phải có: </div>
                <ul className="check__pw">
                    <li className="">
                        {re_1digit.test(formik.values.password) ? (
                            <p className="color">
                                <AiOutlineCheck /> Ít nhất 1 số
                            </p>
                        ) : (
                            <p className="">
                                <AiOutlineCheck />
                                Ít nhất 1 số
                            </p>
                        )}
                    </li>
                    <li className="">
                        {re_8chart.test(formik.values.password) ? (
                            <p className="color">
                                <AiOutlineCheck />
                                Ít nhất 8 ký tự
                            </p>
                        ) : (
                            <p className="">
                                <AiOutlineCheck />
                                Ít nhất 8 ký tự
                            </p>
                        )}
                    </li>
                    <li className="">
                        {re_up.test(formik.values.password) ? (
                            <p className="color">
                                <AiOutlineCheck />
                                Chữ cái viết hoa (A-Z)
                            </p>
                        ) : (
                            <p className="">
                                <AiOutlineCheck />
                                Chữ cái viết hoa (A-Z)
                            </p>
                        )}
                    </li>
                    <li className="">
                        {re_low.test(formik.values.password) ? (
                            <p className="color">
                                <AiOutlineCheck />
                                Chữ cái viết thường (a-z)
                            </p>
                        ) : (
                            <p className="">
                                <AiOutlineCheck />
                                Chữ cái viết thường (a-z)
                            </p>
                        )}
                    </li>
                    <li className="">
                        {re_spe.test(formik.values.password) ? (
                            <p className="color">
                                <AiOutlineCheck />
                                Kí tự đặc biệt
                            </p>
                        ) : (
                            <p className="">
                                <AiOutlineCheck />
                                Kí tự đặc biệt
                            </p>
                        )}
                    </li>
                </ul>
                <p className="dieuKhoan">
                    Bằng việc bấm nút Đăng ký bên dưới, tôi xác nhận đã đọc, hiểu và đồng
                    ý với các <a href="#" style={{ color: '#ff7809' }}>Điều kiện và Điều khoản </a>của Book<span style={{ color: '#ff7809' }}>S</span>.
                </p>
                <Button type="submit" variant="contained" disabled={disabled}>
                    Đăng Kí
                </Button>
                <p className="noti__trans">Đã có tài khoản?</p>
                <Button variant="outlined" onClick={() => navigate("/login")}>
                    Đăng nhập
                </Button>
            </form>
            {/* <div className="overlayz none">
                <div className="box">

                    <div className="flex">
                        <AiOutlineCloseCircle
                            onClick={(e) => {
                                target.classList.toggle("none");
                            }}
                        />
                        <div className="title">Email Đã có người sử dụng</div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Register;
