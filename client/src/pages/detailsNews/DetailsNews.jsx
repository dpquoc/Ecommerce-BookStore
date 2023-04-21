import './DetailsNews.scss'
import HeroBanner from '../../components/heroBanner/HeroBanner';

import pageHeaderProduct from '../../components/imgs/banner2.jpg'
import SearchForm from '../../components/searchForm/SearchForm';
import { BASE_URL } from '../../utils/apiURL';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
function DetailsNews() {
    const { id } = useParams();
    const [newsSingle, setNewsSingle] = useState([]);
    useEffect(() => {
        fetchNewsSingle()
    }, []);
    const fetchNewsSingle = async () => {
        await axios.get(`${BASE_URL}blog/${id}`, { withCredentials: true })
            .then(res => {
                setNewsSingle(res.data.data)
            })
            .catch(err => {
                console.log(err)
                setNewsSingle([])
            })
    }
    const contentArray = newsSingle?.content?.split('.');
    const firstPart = contentArray?.slice(0, Math.ceil(contentArray.length / 2)).join('.');
    const secondPart = contentArray?.slice(Math.ceil(contentArray.length / 2)).join('.');

    return (
        <>
            <div className="container-detailNews">
                <HeroBanner
                    title="#news"
                    summary="Brings you news about books and authors along with our picks for great reads!"
                    srcImg={pageHeaderProduct}
                />
                <SearchForm />
                <div className="details-news-container">
                    <div className="news-content">
                        <h3 className="news-date" >
                        Date published: {newsSingle?.publish_date}
                        </h3>
                        <h1>
                            {newsSingle?.title}
                        </h1>
                        <h3 className="news-author">Posted by BookS</h3>
                        <div className="news-text-content">
                            {firstPart}.
                        </div>
                        <div className="news-img">
                            <img src={newsSingle?.banner_url} alt="" />
                        </div>
                        <div className="news-text-content">
                            {secondPart}.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetailsNews;