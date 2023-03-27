import './DetailsNews.scss'
import HeroBanner from '../../components/heroBanner/HeroBanner';

import pageHeaderProduct from '../../components/imgs/banner2.jpg'
import SearchForm from '../../components/searchForm/SearchForm';

function DetailsNews() {
    return (
        <>
            <div className="container">
                <HeroBanner
                    title="#news"
                    summary="Brings you news about books and authors along with our picks for great reads!"
                    srcImg={pageHeaderProduct}
                />
                <SearchForm />
                <div className="details-news-container">
                    <div className="news-content">
                        <h3 className="news-date">
                            March 26, 2023
                        </h3>
                        <h1>
                            Title 
                        </h1>
                        <h3 className="news-author">Posted by Duc</h3>
                        <div className="news-img">
                            <img src="https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1356&h=668&fit=crop" alt="" />
                        </div>
                        <div className="news-text-content">
                            Content here
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}

export default DetailsNews;