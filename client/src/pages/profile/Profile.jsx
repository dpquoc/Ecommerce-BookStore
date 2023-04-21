import React from 'react'
import './Profile.scss'

import { Avatar } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../../utils/apiURL"
import { CameraFilled } from '@ant-design/icons'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function Profile() {
  const { id } = useParams();
  useEffect(() => window.scrollTo(0, 0), []);
  const [userCurrent, setUserCurrent] = useState({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [bday, setBday] = useState('');
  const [avt_url, setAvt_url] = useState('');

  const fetchUserCurrent = async () => {
    await axios.get(`${BASE_URL}user/showme`, { withCredentials: true })
      .then(res => {
        setUserCurrent(res.data.data)
      })
      .catch(err => {
        setUserCurrent({})
      })
  };
  useEffect(() => {
    fetchUserCurrent();
  }, []);

  useEffect(() => {
    setUsername(userCurrent.username || '');
    setEmail(userCurrent.email || '');
    setFullname(userCurrent.fullname || '');
    setBday(userCurrent.bday || '');
    setAvt_url(userCurrent.avt_url || '');
  }, [userCurrent]);

  useEffect(() => {
    return () => {
      avt_url && URL.revokeObjectURL(avt_url);
    }
  }, [avt_url]);

  const handlePreviewAvt = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setAvt_url(reader.result);
    };
    reader.readAsDataURL(file);
    // const file = e.target.files[0];
    // file.preview = URL.createObjectURL(file);
    // setAvt_url(file.preview);
  }
  console.log(avt_url);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const dataUpdate = {
      username: username,
      email: email,
      fullname: fullname,
      bday: bday,
      avt_url: avt_url
    }
    await axios.patch(`${BASE_URL}user/${id}`, dataUpdate, { withCredentials: true })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
    window.location.reload();
  }

  const birthdate = new Date(userCurrent?.bday);
  const now = new Date();
  const diff = now.getTime() - birthdate.getTime();
  const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));



  const HandleClick1 = () => {
    document.querySelector(".Profile_setting").setAttribute("aria-selected", true);
    document.querySelector(".Order_list").setAttribute("aria-selected", false);
    document.querySelector(".Update_form").style.display = "grid";
    document.querySelector(".order_list_content").style.display = "none";
  };

  const HandleClick2 = () => {
    document.querySelector(".Profile_setting").setAttribute("aria-selected", false);
    document.querySelector(".Order_list").setAttribute("aria-selected", true);
    document.querySelector(".Update_form").style.display = "none";
    document.querySelector(".order_list_content").style.display = "flex";
  };

  return (
    <>
      <div className="Profile_container">
        <div className="frame_container">
          <div className="Information_frame">
            <div className="img">
              <img src="https://gust.com/assets/blank_slate/Gust_Profile_CoverPhoto_Blank-21edf1e2890708d5a507204f49afc10b7dc58eb7baea100b68a1bc2c96948297.png" alt="" />
            </div>
            <div className="avatar">
              {userCurrent.avt_url ?
                <Avatar className='avatar_img' src={userCurrent.avt_url} sx={{ fontSize: '3.5rem' }}>
                </Avatar>
                :
                <Avatar className='avatar_img' src={avt_url} sx={{ fontSize: '3.5rem' }}> 
                  {(userCurrent.fullname && userCurrent.fullname.charAt(0).toUpperCase())} 
                </Avatar>
              }

              <IconButton className='edit-avt' color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={handlePreviewAvt} />
                <CameraFilled style={{ color: '#0000008b', fontSize: '2rem' }} />
              </IconButton>

            </div>
            <div className="infor">
              <div className="infor_content">
                <span>{userCurrent.fullname}</span><br></br>
                Age: {age}
              </div>
            </div>

            <button
              className="Profile_setting tab"
              aria-selected="true"
              onClick={HandleClick1}
            >
              PROFILE SETTING
            </button>

            <button
              className="Order_list tab"
              aria-selected="false"
              onClick={HandleClick2}
            >
              ORDER LIST
            </button>

          </div>
        </div>

        <div className="tab_panel">

          <div className="Update_form">
            <div className="lable_text">
              <label htmlFor="">USERNAME</label>
              <input type="text" defaultValue={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="lable_text">
              <label htmlFor="">EMAIL ADDRESS</label>
              <input type="text" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="lable_text">
              <label htmlFor="">FULL NAME</label>
              <input type="text" defaultValue={fullname} onChange={(e) => setFullname(e.target.value)} />
            </div>
            <div className="lable_text">
              <label htmlFor="">BIRTHDAY</label>
              <input type="date" defaultValue={bday} onChange={(e) => setBday(e.target.value)} />
            </div>
            <div className="lable_text">
              <label htmlFor="">NEW PASSWORD</label>
              <input type="text" />
            </div>
            <div className="lable_text">
              <label htmlFor="">CONFIRM PASSWORD</label>
              <input type="text" />
            </div>
            <button className='update_button' onClick={handleUpdate}>UPDATE PROFILE</button>
          </div>

          <div className="order_list_content">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>STATUS</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                <tr className='paid'>
                  <td>
                    <a href={`/`} className="link">
                      1
                    </a>
                  </td>
                  <td>Paid</td>
                  <td>Dec 12 2021</td>
                  <td>$234</td>
                </tr>

                <tr className='not_paid'>
                  <td >
                    <a href={`/`} className="link">
                      2
                    </a>
                  </td>
                  <td>Not Paid</td>
                  <td>Dec 12 2021</td>
                  <td>$34</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
