import React from 'react'
import './Profile.scss'

import {Avatar} from "@mui/material"

export default function Profile() {

  const HandleClick1 = event => {
    document.querySelector(".Profile_setting").setAttribute("aria-selected", true);
    document.querySelector(".Order_list").setAttribute("aria-selected", false);
    document.querySelector(".Update_form").style.display = "grid";
    document.querySelector(".order_list_content").style.display = "none";
  };

  const HandleClick2 = event => {
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
              <Avatar className='avatar_img'/>
            </div>
            <div className="infor">
              <div className="infor_content">
                <span>Lê Trung Đức</span><br></br>
                ABC XYZ
              </div>
            </div>

            <button
              className="Profile_setting tab"
              aria-selected="true"
              onClick={HandleClick1}
            >PROFILE SETTING</button>
              
            <button
              className="Order_list tab"
              aria-selected="false"
              onClick={HandleClick2}
            >ORDER LIST</button>

          </div>
        </div>
    
        <div className="tab_panel">
          
          <div className="Update_form">
            <div className="lable_text">
              <label htmlFor="">USERNAME</label>
              <input type="text" />
            </div>
            <div className="lable_text">
              <label htmlFor="">EMAIL ADDRESS</label>
              <input type="text" />
            </div>
            <div className="lable_text">
              <label htmlFor="">FULL NAME</label>
              <input type="text" />
            </div>
            <div className="lable_text">
              <label htmlFor="">BIRTHDAY</label>
              <input type="date" />
            </div>
            <div className="lable_text">
              <label htmlFor="">NEW PASSWORD</label>
              <input type="text" />
            </div>
            <div className="lable_text">
              <label htmlFor="">CONFIRM PASSWORD</label>
              <input type="text" />
            </div>
            <button className='update_button'>UPDATE PROFILE</button>
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
