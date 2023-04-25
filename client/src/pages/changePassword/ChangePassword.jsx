import React from 'react'
import './ChangePassword.scss'
import { useState, useEffect } from 'react';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BASE_URL } from '../../utils/apiURL';
import axios from 'axios';
import { AiOutlineCheck } from "react-icons/ai";
import { Col, Row } from 'antd';
function ChangePassword() {

    const re_1digit = new RegExp("^(?=.*[0-9])");
    const re_8chart = new RegExp("^(?=.{8,})");
    const re_low = new RegExp("^(?=.*[a-z])");
    const re_up = new RegExp("^(?=.*[A-Z])");
    const re_spe = new RegExp("^(?=.*[!@#$%^&*])");

    const formik = useFormik({
        initialValues: {
            oldpassword: "",
            newpassword: "",
            confirm: ""
        },
        validationSchema: Yup.object({
            oldpassword: Yup.string()
                .required("Yêu câu nhập mật khẩu hiện tại"),
            newpassword: Yup.string()
                .required("Yêu cầu nhập đúng mật khẩu")
                .matches(/^(?=.*[0-9])/, "Mật khẩu phải chứa ít nhất 8 kí tự"),
            confirm: Yup.string()
                .oneOf([Yup.ref("newpassword"), null], "Nhập lại mật khẩu không chính xác")
                .required("Yêu cầu nhập lại mật khẩu"),
        }),
        onSubmit: async (values) => {
            const updateUser = {
                oldPassword: values.oldpassword,
                newPassword: values.newpassword,
            };
            await axios.post(`${BASE_URL}auth/updatepassword`, updateUser, { withCredentials: true })
                .then(res => {
                    if (res.data.status === "success") {
                        alert("Đổi mật khẩu thành công");
                        formik.resetForm();
                    }
                    else {
                        alert("Đổi mật khẩu thất bại");
                    }
                }
                )
        },
    });
    return (
        <div className='change-password'>
            <h1>Change Password</h1>
            <div className='container-change'>
                <form className="form-change" onSubmit={formik.handleSubmit}>
                    <div className='setpassword'>
                        <p >Old password: </p>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Input.Password
                                name="oldpassword"
                                id="oldpassword"
                                placeholder="Old password"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                style={{ width: 400, height: 50 }}
                                value={formik.values.oldpassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.oldpassword && formik.errors.oldpassword ? (
                                <div className="error" style={{ marginLeft: '10px' }}>{formik.errors.oldpassword}</div>
                            ) : null}
                        </div>
                    </div>
                    <div className='setpassword'>
                        <p >New password: </p>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Input.Password
                                name="newpassword"
                                id="newpassword"
                                placeholder="New password"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                style={{ width: 400, height: 50 }}
                                value={formik.values.newpassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.newpassword && formik.errors.newpassword ? (
                                <div className="error" style={{ marginLeft: '10px' }}>{formik.errors.newpassword}</div>
                            ) : null}
                        </div>
                    </div>
                    <div className='setpassword'>
                        <p >Confirm password: </p>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Input.Password
                                name="confirm"
                                id="confirm"
                                placeholder="Confirm password"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                style={{ width: 400, height: 50 }}
                                value={formik.values.confirm}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.confirm && formik.errors.confirm ? (
                                <div className="error" style={{ marginLeft: '10px' }}>{formik.errors.confirm}</div>
                            ) : null}
                        </div>
                    </div>
                    <Button type="submit" variant="contained" style={{ width: 400, height: 50, marginBottom: 20, marginTop: 30 }}>Change Password</Button>
                </form>
                <div className='require'>
                    <div className="footer__form">Mật khẩu bạn phải có: </div>
                    <ul className="check__pw">
                        <li className="">
                            {re_1digit.test(formik.values.newpassword) ? (
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
                            {re_8chart.test(formik.values.newpassword) ? (
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
                            {re_up.test(formik.values.newpassword) ? (
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
                            {re_low.test(formik.values.newpassword) ? (
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
                            {re_spe.test(formik.values.newpassword) ? (
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
                </div>
            </div>
        </div>
    )
}

export default ChangePassword