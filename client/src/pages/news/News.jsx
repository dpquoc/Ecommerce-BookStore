import './News.scss'
import HeroBanner from '../../components/heroBanner/HeroBanner';

import pageHeaderProduct from '../../components/imgs/banner2.jpg'
import SearchForm from '../../components/searchForm/SearchForm';

import NewsCard from '../../components/news-card/NewsCard';
import ListTopProducts from '../../components/listTopProduct/ListTopProducts';
import { getAllProducts, getAllProductsStatus } from '../../store/productSlice';
import { fetchAsyncProducts } from '../../store/apiReq';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { BASE_URL } from '../../utils/apiURL';
import axios from 'axios';

function News() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAsyncProducts());
    }, []);
    const products = useSelector(getAllProducts);

    const [listBlog, setListBlog] = useState([]);

    useEffect(() => {
        fetchBlog()
    }, []);
    const fetchBlog = async () => {
        await axios.get(`${BASE_URL}blog`, { withCredentials: true })
            .then(res => {
                setListBlog(res.data.data)
            })
            .catch(err => {
                console.log(err)
                setListBlog([])
            })
    }

    return (
        <>
            <div className="container-news">
                <HeroBanner
                    title="#news"
                    summary="Brings you news about books and authors along with our picks for great reads!"
                    srcImg={pageHeaderProduct}
                />
                <SearchForm />
                <Breadcrumbs aria-label="breadcrumb" sx={{ marginLeft: '40px', marginBottom: '30px', fontSize: '1.6rem' }}>
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Link
                        underline="hover"
                        href="/material-ui/getting-started/installation/"
                        color="text.primary"
                    >
                        News
                    </Link>
                </Breadcrumbs>
                <div className='news-main-content'>

                    <div className="news">
                        {
                            listBlog.map((blog) => (
                                <NewsCard
                                    key={blog.id}
                                    id={blog.id}
                                    title={blog.title}
                                    banner_url={blog.banner_url}
                                    publish_date={blog.publish_date}
                                />

                            ))
                        }
                    </div>
                    <div className='sidebar-news'><ListTopProducts topProducts={products} /></div>
                </div>


            </div>
        </>
    );
}

export default News;
