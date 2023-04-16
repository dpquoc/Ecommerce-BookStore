import React from 'react'
import './Checkout.scss'

import { Form } from "antd";



export default function Checkout() {
  return (
    <>
      <div className="checkout_wrapper">
        <div className="checkout_container">
          <div className="product_ship_info">
            <div className="product_info">
              <div className="title">
                ITEMS
              </div>
              <table className="product_table">
                <tbody>
                  <tr>
                    <th className='product_th'>PRODUCT</th>
                    <th className='price_th'>PRICE</th>
                    <th className='quantity_th'>QUANTITY</th>
                  </tr>
                  <tr>
                    <td>
                      <div className="img_title">
                        <div className="checkout_product_img">
                          <img src="https://down-vn.img.susercontent.com/file/d5cbed2edb52b876e08c68bb14c97ef7_tn" alt="" />
                        </div>
                        <div className="checkout_product_title">
                          Thiên tài bên trái kẻ điên bên phải 
                        </div>
                      </div>
                    </td>
                    <td>22$</td>
                    <td>
                      <input type="number" name="" id="" min={1}/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="img_title">
                        <div className="checkout_product_img">
                          <img src="https://down-vn.img.susercontent.com/file/d5cbed2edb52b876e08c68bb14c97ef7_tn" alt="" />
                        </div>
                        <div className="checkout_product_title">
                          Thiên tài bên trái kẻ điên bên phải 
                        </div>
                      </div>
                    </td>
                    <td>22$</td>
                    <td>
                      <input type="number" name="" id="" min={1}/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="ship_info">
              <div className="title">
                SHIPPING ADDRESS  
              </div>
              <Form className='shipping_form'>
                <input type="text" className="fullname" placeholder='Name' />
                <input type="text" className="email" placeholder='Email'/>
                <input type="text" className="Telephone" placeholder='Telephone'/>
                <input type="text" className="address" placeholder="Address"/>
              </Form>
            </div>
          </div>
          <div className="checkout_infor">
            <table className="checkout_info_table">
              <tbody>
                <tr>
                  <th>MRP:</th>
                  <td>200$</td>
                </tr>
                <tr>
                  <th>Sub-Total</th>
                  <td>200$</td>
                </tr>
                <tr className='last_row'>
                  <th>Total:</th>
                  <td>200$</td>
                </tr>
              </tbody>
            </table>
            <div className='checkout_button'>CHECKOUT</div>
          </div>
        </div>
      </div>
    </>  
  )
}
