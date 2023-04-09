import Home from '../pages/home/Home'
import News from '../pages/news/News'
import NotFound from '../pages/404/NotFound';
import Products from '../pages/products/Products';
import Contact from '../pages/contact/Contact';
import DetailsProduct from '../pages/detailsProduct/DetailsProduct';
import DetailsNews from '../pages/detailsNews/DetailsNews';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Checkout from '../pages/checkout/Checkout';
import Profile from '../pages/profile/Profile';
import About from '../pages/about/About';

const publicRoutes = [
    { path: '/', component: Home},
    { path: '/products', component: Products},  
    { path: '/detailsProduct', component: DetailsProduct},  
    { path: '/news', component: News},  
    { path: '/contact', component: Contact},
    { path: '/detailsNews', component: DetailsNews},
    { path: '/login', component: Login},
    { path: '/register', component: Register},
    { path: '/checkout', component: Checkout},
    { path: '/profile', component: Profile},
    { path: '*', component: NotFound },

]

export { publicRoutes };