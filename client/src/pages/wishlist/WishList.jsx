
import HeroBanner from '../../components/heroBanner/HeroBanner';
import SearchForm from '../../components/searchForm/SearchForm';

import pageHeaderProduct from '../../components/imgs/banner-01.jpg'
import ListTopProducts from '../../components/listTopProduct/ListTopProducts';
import ListProducts from '../../components/listProducts/ListProducts';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllProducts, getAllProductsStatus } from '../../store/productSlice';
import { fetchAsyncProducts } from '../../store/apiReq';
import { STATUS } from '../../utils/status';
import Loading from '../../components/loading/Loading';
import Sidebar from '../../components/sidebar/Sidebar';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { BASE_URL } from '../../utils/apiURL';
import axios from 'axios';
import {
    Select,
    Slider
} from 'antd';

import './Wishlist.scss'

const categorys = [
    {
        id: 1,
        name: 'Drama'
    },
    {
        id: 2,
        name: 'Inspiration'
    },
    {
        id: 3,
        name: 'Life Style'
    },
    {
        id: 4,
        name: 'Love Story'
    },
    {
        id: 5,
        name: 'Business'
    },
    {
        id: 6,
        name: 'Culture'
    },
    {
        id: 7,
        name: 'Science'
    },
]

function WishList() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAsyncProducts());
    }, []);
    const products = useSelector(getAllProducts);
    const productStatus = useSelector(getAllProductsStatus);
    const [selected, setSelected] = useState("all");
    const [changeFilter, setChangeFilter] = useState([5, 100]);
    const [listLiked, setlistLiked] = useState([]);
    const handleSelect = (option) => {
        setSelected(option);
    };
    const handleChangeSelect = (value) => {
        console.log(`selected ${value}`);
    };
    const fetchLiked = async () => {
        await axios.get(`${BASE_URL}likelist/my`, { withCredentials: true })
        .then(res => {
            setlistLiked(res.data.data)
        })
        .catch(err => {
            setlistLiked([])
        })
    };

    useEffect(() => {
        fetchLiked();
    }, []);

    const filteredProducts = products.filter(product => {
        return listLiked.some(item => item.book_isbn === product.isbn);
    });

    return (
        <>
            <div className="container-products">
                <HeroBanner
                    title="#wishlist"
                    summary="A place where you can find the books you need!"
                    srcImg={pageHeaderProduct}
                />
                <SearchForm />
                <div className='main-content'>
                    <Breadcrumbs aria-label="breadcrumb" sx={{ marginLeft: '40px', marginBottom: '30px', fontSize: '1.6rem' }}>
                        <Link underline="hover" color="inherit" href="/">
                            Home
                        </Link>
                        <Link
                            underline="hover"
                            href="/products"
                            color="inherit"
                        >
                            Products
                        </Link>
                        <Link
                            underline="hover"
                            href="/wishlist"
                            color="text.primary"
                        >
                            Wishlist
                        </Link>
                    </Breadcrumbs>
                    <div className='sort-content'>
                        <div className='left-content'>

                            <div className='type-products'>
                                <div className={selected === "all" ? "selected" : ""} onClick={() => handleSelect("all")}>
                                    All
                                </div>
                                <div className={selected === "sale" ? "selected" : ""} onClick={() => handleSelect("sale")}>
                                    Sale
                                </div>
                            </div>
                            <p className='text'>"{selected === "sale" ? filteredProducts.filter((card) => (card.onsale > 0)).length : filteredProducts.length} total products liked"</p>
                            
                        </div>
                        <div className='right-content'>
                            
                        </div>
                    </div>
                    <div className='products-content'>
                        <div className='left-content'>
                            {
                                productStatus === STATUS.LOADING ?
                                    <Loading />
                                    :
                                    selected === "sale" ?
                                        <ListProducts
                                            products={filteredProducts?.filter((card) => (card.onsale > 0))}
                                            style={{ backgroundColor: '#eee' }}
                                            liked={true}
                                        />
                                        : <ListProducts
                                            products={filteredProducts}
                                            style={{ backgroundColor: '#eee' }}
                                            liked={true}
                                        />
                            }
                        </div>
                        <div className='right-content' style={{ paddingTop: '10px',marginBottom:'50px' }}>
                            <Sidebar categorys={categorys} />
                            <ListTopProducts topProducts={products} /> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WishList;
