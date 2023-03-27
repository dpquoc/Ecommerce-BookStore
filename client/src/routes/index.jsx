import Home from '../pages/home/Home'
import News from '../pages/news/News'
import NotFound from '../pages/404/NotFound';
import Products from '../pages/products/Products';
import DetailsProduct from '../pages/detailsProduct/DetailsProduct';

const publicRoutes = [
    { path: '/', component: Home},
    { path: '/products', component: Products},  
    { path: '/detailsProduct', component: DetailsProduct},  
    { path: '/news', component: News},  
    { path: '/news', component: News}, 
    { path: '*', component: NotFound},
]
export { publicRoutes };