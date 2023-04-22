
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

import {
    Select,
    Slider
} from 'antd';

import './Products.scss'

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
import axios from 'axios';
import { BASE_URL } from '../../utils/apiURL';

function Products() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAsyncProducts());
    }, []);
    const products = useSelector(getAllProducts);
    const productStatus = useSelector(getAllProductsStatus);
    const [selected, setSelected] = useState("all");
    const [changeFilter, setChangeFilter] = useState([5, 50]);
    const [listSort, setListSort] = useState([]);
    const [valueSort, setValueSort] = useState(0);
    const handleSelect = (option) => {
        setSelected(option);
    };

    const handleSort = async (value) => {
        setValueSort(value)
        setChangeFilter(value)
        await axios.get(`${BASE_URL}book?sort=${value}&min_price=${value[0]}&max_price=${value[1]}`
            , { withCredentials: true })
            .then(res => {
                setListSort(res.data.data)
            })
            .catch(err => {
                setListSort([])
            })
    };



    return (
        <>
            <div className="container-products">
                <HeroBanner
                    title="#products"
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
                            href="/material-ui/getting-started/installation/"
                            color="text.primary"
                        >
                            Products
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
                            <p className='text'>
                                "{listSort.length > 0 ? selected === "sale" ? listSort.filter((card) => (card.onsale > 0)).length : listSort.length 
                                    : selected === "sale" ? products.filter((card) => (card.onsale > 0)).length : products.length} total products"</p>
                            <div className='sort-price'>
                                <p>Sort by price: </p>
                                <Select
                                    onChange={handleSort}
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
                                <Slider range defaultValue={changeFilter} onChange={handleSort} />
                                {/* <div className='ResetBtn'>Reset</div> */}
                            </div>
                        </div>
                    </div>
                    <div className='products-content'>
                        <div className='left-content'>
                            {
                                productStatus === STATUS.LOADING ?
                                    <Loading />
                                    :
                                    listSort.length > 0 ?
                                        (selected === "sale" ?

                                            <ListProducts
                                                products={listSort.filter((card) => (card.onsale > 0))}
                                                style={{ backgroundColor: '#eee' }}
                                            />
                                            :
                                            <ListProducts
                                                products={listSort}
                                                style={{ backgroundColor: '#eee' }}
                                            />)
                                        :
                                        (selected === "sale" ?
                                            <ListProducts
                                                products={products.filter((card) => (card.onsale > 0))}
                                                style={{ backgroundColor: '#eee' }}
                                            />
                                            :
                                            <ListProducts
                                                products={products}
                                                style={{ backgroundColor: '#eee' }}
                                            />)
                            }

                        </div>
                        <div className='right-content' style={{ paddingTop: '10px',marginBottom:'50px' }}>
                            <Sidebar categorys={categorys} />
                            {
                                <ListTopProducts topProducts={products} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;
