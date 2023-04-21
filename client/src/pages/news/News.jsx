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

function News() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAsyncProducts());
    }, []);
    const products = useSelector(getAllProducts);

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

                        <NewsCard />
                        <NewsCard />
                        <NewsCard />
                        <NewsCard />
                        <NewsCard />
                        <NewsCard />

                    </div>
                    <div className='sidebar-news'><ListTopProducts topProducts={products} /></div>
                </div>


            </div>
        </>
    );
}

export default News;
