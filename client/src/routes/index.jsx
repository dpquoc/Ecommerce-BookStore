import Home from '../pages/home/Home'
import News from '../pages/news/News'
import NotFound from '../pages/404/NotFound';
import Products from '../pages/products/Products';
import DetailsProduct from '../pages/detailsProduct/DetailsProduct';
import DetailsNews from '../pages/detailsNews/DetailsNews';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';

const publicRoutes = [
    { path: '/', component: Home},
    { path: '/products', component: Products},  
    { path: '/detailsProduct', component: DetailsProduct},  
    { path: '/news', component: News},  
    { path: '/detailsNews', component: DetailsNews},
    { path: '/login', component: Login},
    { path: '/register', component: Register},
    { path: '*', component: NotFound },
]
export { publicRoutes };