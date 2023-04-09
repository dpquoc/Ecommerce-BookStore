import React from 'react'
import './admin.scss'
import SideMenu from './components/sideMenu/SideMenu'
import { Route, Routes } from 'react-router-dom'

import Products from './pages/Products';
import Users from "./pages/Users";
import Blogs from "./pages/Blogs";
import Contacts from "./pages/Contacts";
import { AppRoutes } from './components/routes';

export default function Admin() {
    return (
        <>
            <SideMenu />
            <Routes>
                {AppRoutes.map((route, index) => {
                    const Content = route.component;
                    return <Route key={index} path={route.path} element={ <Content />} />;
                })}
            </Routes>
        </>
    )
}
