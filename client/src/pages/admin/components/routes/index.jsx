import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "../../pages/Products";
import Users from "../../pages/Users";
import Blogs from "../../pages/Blogs";
import Contacts from "../../pages/Contacts";
import Dashboard from "../../pages/Dashboard";
import Admins from "../../pages/Admins";

const AppRoutes = [
    { path: '/', component: Dashboard},
    { path: '/products', component: Products},
    { path: '/users', component: Users}, 
    { path: '/admins', component: Admins}, 
    { path: '/blogs', component: Blogs},  
    { path: '/contacts', component: Contacts},  
]

export { AppRoutes };