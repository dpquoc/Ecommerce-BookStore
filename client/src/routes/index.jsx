import Home from '../pages/home/Home'
import News from '../pages/news/News'
import NotFound from '../pages/404/NotFound';
import Products from '../pages/products/Products';
import DetailsProduct from '../pages/detailsProduct/DetailsProduct';
import DetailsNews from '../pages/detailsNews/DetailsNews';
import About from '../pages/about/About';

const publicRoutes = [
    { path: '/', component: Home},
    { path: '/products', component: Products},  
    { path: '/detailsProduct', component: DetailsProduct},  
    { path: '/news', component: News},  
    { path: '*', component: NotFound },
    { path: '/detailsNews', component: DetailsNews },
    { path: '/about', component: About},
]
export { publicRoutes };