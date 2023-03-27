import './News.scss'
import HeroBanner from '../../components/heroBanner/HeroBanner';

import pageHeaderProduct from '../../components/imgs/banner2.jpg'
import SearchForm from '../../components/searchForm/SearchForm';

import NewsCard from '../../components/news-card/NewsCard';

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

                <div className="news-main-content">
                    <NewsCard/>
                    <NewsCard />
                    <NewsCard />
                    <NewsCard />
                    <NewsCard />
                    <NewsCard/>
                    {/* <NewsCard
                        date="March 23, 2023"
                        title="Brings you news about books and authors along with our picks for great"
                        author="Duc"
                        img="https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1356&h=668&fit=crop"
                        content="Summary content"

                    />
                    <NewsCard
                        date="March 23, 2023"
                        title="Brings you news about books and authors along with our picks for great"
                        author="Duc"
                        img="https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1356&h=668&fit=crop"
                        content="Summary content"

                    />
                    <NewsCard
                        date="March 23, 2023"
                        title="Brings you news about books and authors along with our picks for great"
                        author="Duc"
                        img="https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1356&h=668&fit=crop"
                        content="Summary content"

                    />
                    <NewsCard
                        date="March 23, 2023"
                        title="Brings you news about books and authors along with our picks for great"
                        author="Duc"
                        img="https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1356&h=668&fit=crop"
                        content="Summary content"

                    /> */}

                    
                </div>
                
                
                
            </div>
        </>
    );
}

export default News;
