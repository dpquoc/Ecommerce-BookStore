import './News.scss'
import HeroBanner from '../../components/heroBanner/HeroBanner';

import pageHeaderProduct from '../../components/imgs/banner2.jpg'
import SearchForm from '../../components/searchForm/SearchForm';

import NewsCard from '../../components/news-card/NewsCard';
import ListTopProducts from '../../components/listTopProduct/ListTopProducts';
import {products} from '../../components/data/products'

function News() {
    return (
        <>
            <div className="container-news">
                <HeroBanner
                    title="#news"
                    summary="Brings you news about books and authors along with our picks for great reads!"
                    srcImg={pageHeaderProduct}
                />
                <SearchForm />

                <div className='news-main-content'>
                    <div className="news">   
                        
                            <NewsCard/>
                            <NewsCard />
                            <NewsCard />
                            <NewsCard />
                            <NewsCard />
                            <NewsCard/>
                            
                    </div>
                    <div className='sidebar-news'><ListTopProducts topProducts={products} /></div>
                </div>
                
                
            </div>
        </>
    );
}

export default News;
