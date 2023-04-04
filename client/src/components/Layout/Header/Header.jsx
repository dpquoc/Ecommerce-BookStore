import './Header.scss'
import { Link } from 'react-router-dom';
import React, { useState } from "react";

import { HeartOutlined, ShoppingCartOutlined, MenuOutlined, UserOutlined, DeleteFilled } from '@ant-design/icons'

import CartItems from '../../cartItems/CartItems'
import { useSelector } from "react-redux"

function Header() {

    const [cardOpen, setCardOpen] = useState(false)

    // const quantity = useSelector((state) => state.cart.totalQuantity)
    const cartItems = useSelector((state) => state.cart.itemsList)

    let total = 0
    const itemsLists = useSelector((state) => state.cart.itemsList)
    itemsLists.forEach((item) => {
        total += item.totalPrice
    })
    return (
        <div className="header">
            <div className="menu-btn icon-btn" ><MenuOutlined /></div>
            <h1>
                Book<span>S</span>
            </h1>
            <nav className="navbar">
                <Link className='links-nav' to="/">Home</Link>
                <Link className='links-nav' to="/products">Products</Link>
                <Link className='links-nav' to="/news">News</Link>
                <Link className='links-nav' to="">About</Link>
                <Link className='links-nav' to="">Contact</Link>
            </nav>
            <div className='icons'>
                <div className="icon-btn"><HeartOutlined /></div>
                <div className="icon-btn" onClick={() => setCardOpen(!cardOpen)}><ShoppingCartOutlined /></div>
                <div className="icon-btn"><UserOutlined /></div>

            </div>
            <div className={cardOpen ? "shopping-cart active" : "shopping-cart"}>
                {cartItems.map((item, index) => (
                    <CartItems
                        key={index}
                        id={item.id}
                        cover={item.cover}
                        title={item.title}
                        newprice={item.newprice}
                        quantity={item.quantity}
                        totalPrice={item.totalPrice}
                    />
                ))}
                <div className='total'> Total : ${total}</div>
                <a href="#" className='btn'>Checkout</a>
            </div>
        </div>
    );
}
export default Header;