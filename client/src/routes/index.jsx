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
import WishList from '../pages/wishlist/WishList';
import Search from '../pages/search/Search';
import Category from '../pages/category/Category';

const publicRoutes = [
    { path: '/', component: Home},
    { path: '/products', component: Products},  
    { path: '/products/:id', component: DetailsProduct},  
    { path: '/news', component: News},  
    { path: '/contact', component: Contact},
    { path: '/detailsNews/:id', component: DetailsNews},
    { path: '/about', component: About},
    { path: '/login', component: Login},
    { path: '/about', component: About},
    { path: '/register', component: Register},
    { path: '/checkout', component: Checkout},
    { path: '/profile/:id', component: Profile},
    { path: '/wishlist', component: WishList},
    { path: '/search/:searchForm', component: Search},
    { path: '/category/:category', component: Category},
    { path: '*', component: NotFound },

]

export { publicRoutes };