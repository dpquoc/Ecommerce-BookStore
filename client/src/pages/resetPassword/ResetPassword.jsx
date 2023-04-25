import React from 'react'

import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from "axios"
import { BASE_URL } from "../../utils/apiURL"
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Input } from 'antd';
import { Button } from "@mui/material";
import { LockFilled, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { AiOutlineCheck } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import './ResetPassword.scss'
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/apiReq';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const re_1digit = new RegExp("^(?=.*[0-9])");
  const re_8chart = new RegExp("^(?=.{8,})");
  const re_low = new RegExp("^(?=.*[a-z])");
  const re_up = new RegExp("^(?=.*[A-Z])");
  const re_spe = new RegExp("^(?=.*[!@#$%^&*])");

  const formik = useFormik({
    initialValues: {
      newpassword: "",
      confirm: ""
    },
    validationSchema: Yup.object({
      newpassword: Yup.string()
        .required("Yêu cầu nhập đúng mật khẩu")
        .matches(/^(?=.*[0-9])/, "Mật khẩu phải chứa ít nhất 8 kí tự"),
      confirm: Yup.string()
        .oneOf([Yup.ref("newpassword"), null], "Nhập lại mật khẩu không chính xác")
        .required("Yêu cầu nhập lại mật khẩu"),
    }),
    onSubmit: async (values) => {
      const datanewpassword = {
        token: searchParams.get('token'),
        user: searchParams.get('user'),
        new_password: values.newpassword,
      };
      await axios.post(`${BASE_URL}reset-password`, datanewpassword, { withCredentials: true })
        .then(res => {
          if (res.data.status === "success") {
            alert("Đổi mật khẩu thành công");
            formik.resetForm();
            logoutUser(dispatch, navigate);
          }
          else {
            alert("Đổi mật khẩu thất bại");
          }
        })
    },
  });

  return (
    <div className='reset-password'>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component="h1" variant="h4" marginX="auto" fontSize="3rem" marginBottom="20px">
            New password
          </Typography>
          <LockFilled style={{ fontSize: '5rem', marginBottom: '40px' }} />
          <form className="form-reset" onSubmit={formik.handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '10px 0' }}>
              <Input.Password
                name="newpassword"
                id="newpassword"
                placeholder="New password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                style={{ height: 40 }}
                value={formik.values.newpassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.newpassword && formik.errors.newpassword ? (
                <div className="error" style={{ marginLeft: '10px', color: 'red' }}>{formik.errors.newpassword}</div>
              ) : null}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '10px 0' }}>
              <Input.Password
                name="confirm"
                id="confirm"
                placeholder="Confirm password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                style={{ height: 40 }}
                value={formik.values.confirm}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirm && formik.errors.confirm ? (
                <div className="error" style={{ marginLeft: '10px', color: 'red' }}>{formik.errors.confirm}</div>
              ) : null}
            </div>
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
            <Button type="submit" variant="contained" style={{ width: '100%', height: 50, marginBottom: 20, marginTop: 20, fontSize: '2rem' }}>
              Update Password
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  )
}

export default ResetPassword