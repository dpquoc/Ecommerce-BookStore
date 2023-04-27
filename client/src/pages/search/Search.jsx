
import HeroBanner from '../../components/heroBanner/HeroBanner';
import SearchForm from '../../components/searchForm/SearchForm';

import pageHeaderProduct from '../../components/imgs/banner-01.jpg'
import ListTopProducts from '../../components/listTopProduct/ListTopProducts';
import ListProducts from '../../components/listProducts/ListProducts';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


import { STATUS } from '../../utils/status';
import Loading from '../../components/loading/Loading';
import Sidebar from '../../components/sidebar/Sidebar';
import { getAllProducts, getAllProductsStatus } from '../../store/productSlice';
import { fetchAsyncAuthors, fetchAsyncProducts } from '../../store/apiReq';
import { getAllAuthors } from '../../store/authorSlice';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { BASE_URL } from '../../utils/apiURL';
import axios from 'axios';
import {
    Select,
    Slider
} from 'antd';

import './Search.scss'

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

function Search() {
    const { searchForm } = useParams();
    const dispatch = useDispatch();

    const [selected, setSelected] = useState("all");
    const [changeFilter, setChangeFilter] = useState([5, 50]);
    const [valueSort, setValueSort] = useState(0);

    const handleSelect = (option) => {
        setSelected(option);
    };



    const [listSearch, setListSearch] = useState([]);
    useEffect(() => {
        dispatch(fetchAsyncProducts());
    }, []);
    const products = useSelector(getAllProducts);
    const productStatus = useSelector(getAllProductsStatus);
    const authors = useSelector(getAllAuthors)
    useEffect(() => {
        dispatch(fetchAsyncAuthors())
    }, [])

    const authorStatus = (authors.filter(author => author.name === searchForm)[0]?.id) && true;
    const search = authors.filter(author => author.name === searchForm)[0]?.id ?? searchForm;
    console.log(search)
    

    const fetchSearch = async () => {
        await axios.get(`${BASE_URL}book?search_title=${search}&sort=${valueSort}&min_price=${changeFilter[0]}&max_price=${changeFilter[1]}`
            , { withCredentials: true })
            .then(res => {
                setListSearch(res.data.data)
            })
            .catch(err => {
                setListSearch([])
            })
    };

    const fetchSearchAuthor = async () => {
        await axios.get(`${BASE_URL}book?search_author=${search}&sort=${valueSort}&min_price=${changeFilter[0]}&max_price=${changeFilter[1]}`
            , { withCredentials: true })
            .then(res => {
                setListSearch(res.data.data)
            })
            .catch(err => {
                setListSearch([])
            })
    };
    
    useEffect(() => {
        setListSearch([])
        if (authorStatus) {
            fetchSearchAuthor();
        }
        else {
            fetchSearch();
        }
    }, [search, valueSort, changeFilter, authorStatus, selected]);
    return (
        <>
            <div className="container-products">
                <HeroBanner
                    title="#search"
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
                            href={`/search/${searchForm}`}
                            color="text.primary"
                        >
                            Search
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
                            <p className='text'>"The search for '{searchForm}' returned {selected === "sale" ? listSearch?.filter((card) => (card.onsale > 0))?.length : listSearch.length} products"</p>
                            <div className='sort-price'>
                                <p>Sort by price: </p>
                                <Select
                                    onChange={(value) => setValueSort(value)}
                                    defaultValue={valueSort}
                                    style={{ width: 120 }}
                                    options={[
                                        { value: 0, label: 'None' },
                                        { value: 1, label: 'Increase' },
                                        { value: 2, label: 'Decrease' }
                                    ]}
                                />
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='filter'>
                                Filter price: ${changeFilter[0]} - ${changeFilter[1]}
                                <br /><br />
                                <Slider range defaultValue={changeFilter} onChange={(e) => setChangeFilter(e)} />
                                {/* <div className='ResetBtn'>Reset</div> */}
                            </div>
                        </div>
                    </div>
                    <div className='products-content'>
                        <div className='right-content' style={{ paddingTop: '10px', marginBottom: '50px' }}>
                            <Sidebar categorys={categorys} />
                            <ListTopProducts topProducts={products} />
                        </div>
                        <div className='left-content'>
                            {
                                selected === "sale" ?
                                    <ListProducts
                                        products={listSearch.filter((card) => (card.onsale > 0))}
                                        style={{ backgroundColor: '#eee' }}
                                    />
                                    : <ListProducts
                                        products={listSearch}
                                        style={{ backgroundColor: '#eee' }}
                                    />
                            }

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Search;
