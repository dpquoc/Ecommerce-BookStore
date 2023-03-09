
import HeroBanner from '../../components/heroBanner/HeroBanner';
import SearchForm from '../../components/searchForm/SearchForm';

import pageHeaderProduct from '../../components/imgs/banner-01.jpg'

import './Products.scss'

function Products() {
    return (
        <>
            <div className="container">
                <HeroBanner
                    title="#products"
                    summary="A place where you can find the books you need!"
                    srcImg={pageHeaderProduct}
                />
                <SearchForm />
                
            </div>
        </>
    );
}

export default Products;
