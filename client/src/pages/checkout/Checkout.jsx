import React from 'react'
import './Checkout.scss'

import { Form } from "antd";
import { MinusOutlined, PlusOutlined, DeleteFilled, ClearOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseCartItem, removeFromCart } from '../../store/cartSlice';
import { useEffect } from 'react';
import { getCartTotal, clearCart } from '../../store/cartSlice';
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/apiURL';

export default function Checkout() {
  const dispatch = useDispatch()

  const amountTotal = useSelector((state) => state.cart.totalAmount)
  const cartItems = useSelector((state) => state.cart.itemsList)

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cartItems])

  const incCartitems = (isbn, title, newprice) => {
    dispatch(addToCart({ isbn, title, newprice }))
  }
  const descCartitems = (isbn) => {
    dispatch(decreaseCartItem(isbn))
  }
  const removeCartitems = (isbn) => {
    dispatch(removeFromCart(isbn))
  }

  const handleCheckout = async (e) => {
    e.preventDefault();
    const items = cartItems.map(item => {
      return {
        book_isbn: item.isbn,
        quantity: item.quantity
      }
    })
    const data = {
      name: name,
      address: address,
      telephone: phone,
      email: email,
      items: items
    }
    await axios.post(`${BASE_URL}order`, data, { withCredentials: true })
      .then(res => {
        console.log(res.data)
        dispatch(clearCart())
        alert('Order Success')
      })
      .catch(err => {
        console.log(err)
        alert('Order Failed')
      }
      )


  }

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
                    <th className='num-cart'>NUM</th>
                    <th className='product_th'>PRODUCT</th>
                    <th className='price_th'>PRICE</th>
                    <th className='quantity_th'>QUANTITY</th>
                    <th className='price_th'>TOTAL PRICE</th>
                    <th className='remove_th'>REMOVE</th>
                  </tr>
                  {cartItems.map((item, index) => (
                    <tr className='item-cart' key={index}>
                      <td>
                        {index + 1}
                      </td>
                      <td >
                        <div className="img_title">
                          <div className="checkout_product_img">
                            <img src={item.img} alt="" />
                          </div>
                          <div className="checkout_product_title">
                            {item.title}
                          </div>
                        </div>
                      </td>
                      <td>${item.newprice}</td>
                      <td className='quantity-cart'>
                        <div className='plus' onClick={() => incCartitems(item.isbn, item.title, item.newprice)}>
                          <PlusOutlined />
                        </div>
                        <div className='num'>{item.quantity}</div>
                        <div className='minus' onClick={() => descCartitems(item.isbn)}>
                          <MinusOutlined />
                        </div>
                      </td>
                      <td>${item.totalPrice}</td>
                      <td ><DeleteFilled className='delete' onClick={() => removeCartitems(item.isbn)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='clear_button' onClick={() => dispatch(clearCart())}><ClearOutlined style={{ fontSize: '2rem', marginRight: '10px' }} />CLEAR CART</div>
          </div>
          <div className="checkout_infor">
            <div className="ship_info">
              <div className="title">
                SHIPPING ADDRESS & TOTAL
              </div>
              <Form className='shipping_form'>
                <input type="text" className="fullname" placeholder='Name' onChange={(e) => setName(e.target.value)} />
                <input type="text" className="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <input type="text" className="Telephone" placeholder='Telephone' onChange={(e) => setPhone(e.target.value)} />
                <input type="text" className="address" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
              </Form>
            </div>
            <table className="checkout_info_table">
              <tbody>
                <tr>
                  <th>MRP:</th>
                  <td>${amountTotal}</td>
                </tr>
                <tr>
                  <th>Sub-Total</th>
                  <td>${amountTotal}</td>
                </tr>
                <tr className='last_row'>
                  <th>Total:</th>
                  <td>${amountTotal}</td>
                </tr>
              </tbody>
            </table>
            <div className='checkout_button' onClick={handleCheckout}>CHECKOUT</div>
          </div>
        </div>
      </div>
    </>
  )
}
