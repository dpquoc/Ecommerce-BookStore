import React from 'react'
import './SideMenu.scss'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SideMenu() {
    const [selected, setSelected] = useState("");
    const handleSelect = (option) => {
        setSelected(option);
    };
    return (
        <section id="sidebar">
            <Link to='/' className="brand">
                <i className='bx bxs-smile'></i>
                <span className="logoName">Book<span>S</span></span>
            </Link>
            <ul className="side-menu top">
                <li className={selected === "dashboard" ? "active" : ""} onClick={() => handleSelect("dashboard")}>

                    <Link to="/admin">
                        <i className='bx bxs-dashboard'></i>
                        <span className="text">Dashboard</span>
                    </Link>
                </li>
                <li className={selected === "products" ? "active" : ""} onClick={() => handleSelect("products")}>

                    <Link to="/admin/products">
                        <i className='bx bxs-dashboard'></i>
                        <span className="text">Products</span>
                    </Link>
                </li>
                <li className={selected === "users" ? "active" : ""} onClick={() => handleSelect("users")}>
                    <Link to="/admin/users">
                        <i className='bx bxs-shopping-bag-alt' ></i>
                        <span className="text">Users</span>
                    </Link>
                </li>
                <li className={selected === "blogs" ? "active" : ""} onClick={() => handleSelect("blogs")}>
                    <Link to="/admin/blogs">
                        <i className='bx bxs-doughnut-chart' ></i>
                        <span className="text">Blogs</span>
                    </Link>
                </li>
                <li className={selected === "contacts" ? "active" : ""} onClick={() => handleSelect("contacts")}>
                    <Link to="/admin/contacts">
                        <i className='bx bxs-message-dots' ></i>
                        <span className="text">Contacts</span>
                    </Link>
                </li>
            </ul>
            <ul className="side-menu">
                <li>
                    <a href="#" className="logout">
                        <i className='bx bxs-log-out-circle' ></i>
                        <span className="text">Logout</span>
                    </a>
                </li>
            </ul>
        </section>
    )
}
