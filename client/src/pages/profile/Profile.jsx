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
import { Modal } from 'antd';



import { Table } from 'antd';

export default function Profile() {
  const { id } = useParams();
  useEffect(() => window.scrollTo(0, 0), []);
  const [userCurrent, setUserCurrent] = useState({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
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


  const presetKey = "oj8g6q4c"
  const cloudName = "dgmlu00dr"


  const handleUpdate = async () => {
    //update user

    const dataUpdate1 = {
      fullname: fullname,
      bday: bday,
      avt_url: avt_url
    }
    await axios.patch(`${BASE_URL}user/${id}`, dataUpdate1, { withCredentials: true })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
    window.location.reload();
  }




  const handleUpdateImg = async (e) => {
    //set avt_url
    const file = e.target && e.target.files && e.target.files[0] ? e.target.files[0] : null;
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", presetKey)
    await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
      .then(res => {
        setAvt_url(res.data.secure_url);
        //update user
        const dataUpdate = {
          avt_url: res.data.secure_url
        }
        axios.patch(`${BASE_URL}user/${id}`, dataUpdate, { withCredentials: true })
          .then(res => {
            console.log(res.data);
            window.location.reload();
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err)
      })
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
  useEffect(() => {
    setUsername(userCurrent.username || '');
    setEmail(userCurrent.email || '');
    setFullname(userCurrent.fullname || '');
    setBday(userCurrent.bday || '');
    setAvt_url(userCurrent.avt_url || '');
  }, [userCurrent]);

  const [modalOpen, setModalOpen] = useState(false);


  //api order

  const [orders, setOrders] = useState([])
  const fetchOrder = async () => {
    try {
      const res = await axios.get(`${BASE_URL}order`, { withCredentials: true })
      setOrders(res?.data.data)
    }
    catch (err) {
      setOrders([])
    }
  }
  //api product
  const [books, setBooks] = useState([])
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${BASE_URL}book`, { withCredentials: true })
      setBooks(res?.data.data)
    }
    catch (err) {
      setBooks([])
    }
  }
  //filter user
  const filteredOrders = orders.filter(order => order.user_id === id);
  for (let i = 0; i < orders.length; i++) {
    const order = filteredOrders[i];
    for (let j = 0; j < order.items.length; j++) {
      const item = order.items[j];
      const book = books.find(book => book.isbn === item.book_isbn);
      if (book) {
        item.title = book.title;
      }
    }
  }
  const columns = [
    {
      title: 'Num',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Products',
      dataIndex: 'title',
      key: 'title',
      responsive: ['lg'],
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      responsive: ['lg'],
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      responsive: ['lg'],
    },
  ];
  const [selectedOrder, setSelectedOrder] = useState(null);
  useEffect(() => {
    fetchProduct()
    fetchOrder()
  }, [])

  return (
    <>
      <div className="Profile_container">
        <div className="frame_container">
          <div className="Information_frame">
            <div className="img">
              <img src="https://gust.com/assets/blank_slate/Gust_Profile_CoverPhoto_Blank-21edf1e2890708d5a507204f49afc10b7dc58eb7baea100b68a1bc2c96948297.png" alt="" />
            </div>
            <div className="avatar">
              {
                userCurrent.avt_url ?
                  <Avatar className='avatar_img' src={userCurrent.avt_url} sx={{ fontSize: '3.5rem' }}>
                  </Avatar>
                  :
                  <Avatar className='avatar_img' sx={{ fontSize: '3.5rem' }}>
                    {(userCurrent.fullname && userCurrent.fullname.charAt(0).toUpperCase())}
                  </Avatar>
              }

              <IconButton className='edit-avt' color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={handleUpdateImg} />
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
              <input type="text" defaultValue={username} readOnly onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="lable_text">
              <label htmlFor="">EMAIL ADDRESS</label>
              <input type="text" defaultValue={email} readOnly onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="lable_text">
              <label htmlFor="">FULL NAME</label>
              <input type="text" defaultValue={fullname} onChange={(e) => setFullname(e.target.value)} />
            </div>
            <div className="lable_text">
              <label htmlFor="">BIRTHDAY</label>
              <input type="date" defaultValue={bday} onChange={(e) => setBday(e.target.value)} />
            </div>
            {/* <div className="lable_text">
              <label htmlFor="">NEW PASSWORD</label>
              <input type="text" />
            </div>
            <div className="lable_text">
              <label htmlFor="">CONFIRM PASSWORD</label>
              <input type="text" />
            </div> */}
            <button className='update_button' onClick={handleUpdate}>UPDATE PROFILE</button>
          </div>

          <div className="order_list_content">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>STATUS</th>
                  <th>ITEMS</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order,index) => (
                  <tr className={order.status === 'Done' ? 'paid' : 'not_paid'} key={order.id}>
                    <td className="link">
                      {index + 1}
                    </td>
                    <td>{order.status}</td>
                    <td className='link-items' onClick={() => { setSelectedOrder(order); setModalOpen(true); }}>See</td>
                    <td>{order.created_at}</td>
                    <td>${order.price}</td>
                    <Modal
                      title="Product Ordered"
                      centered
                      width='50%'
                      open={modalOpen}
                      onOk={() => setModalOpen(false)}
                      onCancel={() => setModalOpen(false)}
                    >
                      <Table columns={columns} dataSource={selectedOrder ? selectedOrder.items.map((item, index) => ({ ...item, key: index })) : []} />
                    </Modal>
                  </tr>
                ))}

                {/* <tr className='not_paid'>
                  <td >
                    <a href={`/`} className="link">
                      2
                    </a>
                  </td>
                  <td>Pending</td>
                  <td>Confirmed</td>
                  <td>Dec 12 2021</td>
                  <td>$34</td>
                </tr> */}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </>
  )
}
