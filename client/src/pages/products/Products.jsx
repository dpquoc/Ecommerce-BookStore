
import HeroBanner from '../../components/heroBanner/HeroBanner';
import SearchForm from '../../components/searchForm/SearchForm';
import './Products.scss'

function Products() {
    return (
        <>
            <div className="container">
                <HeroBanner title="#products" summary="A place where you can find the books you need!" />
                <SearchForm />
            </div>
        </>
    );
}

export default Products;
