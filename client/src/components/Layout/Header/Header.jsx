import './Header.scss'
import { Link } from 'react-router-dom';
import React, { useState } from "react";

import {HeartOutlined, ShoppingCartOutlined, MenuOutlined,UserOutlined, DeleteFilled } from '@ant-design/icons'

import book1 from '../../imgs/book1.jpg'


function Header() {
    const handleCartClick = () => {
        if (document.querySelector('.search-form.active')) {
            document.querySelector('.search-form.active').classList.remove('active');
        }
        if (document.querySelector('.header .navbar.active')) {
            document.querySelector('.header .navbar.active').classList.remove('active');
        }
        return document.querySelector('.shopping-cart').classList.toggle('active');
    }
    const handleMenuClick = () => {
        if (document.querySelector('.search-form.active')) {
            document.querySelector('.search-form.active').classList.remove('active');
        }
        if (document.querySelector('.shopping-cart.active')) {
            document.querySelector('.shopping-cart.active').classList.remove('active');
        }
        return document.querySelector('.header .navbar').classList.toggle('active');
    }
    // window.onscroll = () => {
    //     if (document.querySelector('.search-form.active')) {
    //         document.querySelector('.search-form.active').classList.remove('active');
    //     }
    //     if (document.querySelector('.shopping-cart.active')) {
    //         document.querySelector('.shopping-cart.active').classList.remove('active');
    //     }
    //     if (document.querySelector('.header .navbar.active')) {
    //         document.querySelector('.header .navbar.active').classList.remove('active');
    //     }
    // }
    return (
        <div className="header">
            <div className="menu-btn icon-btn" onClick={handleMenuClick}><MenuOutlined /></div>
            <h1>
                Book<span>S</span>
            </h1>
            <nav className="navbar">
                <Link className='links-nav' to="/">Home</Link>
                <Link className='links-nav' to="/products">Products</Link>
                <Link className='links-nav' to="/news">News</Link>
                <Link className='links-nav' to="">About</Link>
                <Link className='links-nav' to="/contact">Contact</Link>
            </nav>
            <div className='icons'> 
                <div className="icon-btn"><HeartOutlined /></div>
                <div className="icon-btn" onClick={handleCartClick}><ShoppingCartOutlined /></div>
                <div className="icon-btn"><UserOutlined /></div>
                
            </div>
            <div className='shopping-cart'>
                <div className='box'>
                    <img src={book1} alt="" />
                    <div className='content'>
                        <h3>Harry Potter And The Philosopher's Stone</h3>
                        <span className='price'>$8.99/-</span>
                        <span className='quantity'>Qty : 1</span>
                    </div>
                    <DeleteFilled className='delete' />
                </div>
                <div className='box'>
                    <img src={book1} alt="" />
                    <div className='content'>
                        <h3>Harry Potter And The Philosopher's Stone</h3>
                        <span className='price'>$8.99/-</span>
                        <span className='quantity'>Qty : 1</span>
                    </div>
                    <DeleteFilled className='delete' />
                </div>
                <div className='box'>
                    <img src={book1} alt="" />
                    <div className='content'>
                        <h3>Harry Potter And The Philosopher's Stone</h3>
                        <span className='price'>$8.99/-</span>
                        <span className='quantity'>Qty : 1</span>
                    </div>
                    <DeleteFilled className='delete' />
                </div>
                <div className='total'> Total : $26.97/-</div>
                <a href="#" className='btn'>Checkout</a>
            </div>
        </div>
    );
}

export default Header;