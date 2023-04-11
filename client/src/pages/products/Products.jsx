
import HeroBanner from '../../components/heroBanner/HeroBanner';
import SearchForm from '../../components/searchForm/SearchForm';

import pageHeaderProduct from '../../components/imgs/banner-01.jpg'
import ListTopProducts from '../../components/listTopProduct/ListTopProducts';
import ListProducts from '../../components/listProducts/ListProducts';
import { products } from '../../components/data/products'
import React, { useState } from 'react';

import {
    Select,
    Slider
} from 'antd';

import './Products.scss'
function Products() {
    const [selected, setSelected] = useState("all");
    const handleSelect = (option) => {
        setSelected(option);
    };
    const handleChangeSelect = (value) => {
        console.log(`selected ${value}`);
    };
    const handleChangeSlider = (value) => {
        console.log(`selected ${value}`);
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

                    <div className='sort-content'>
                        <div className='left-content'>
                            <div className='sort-price'>
                                <p>Sort by price: </p>
                                <Select
                                    onChange={handleChangeSelect}
                                    defaultValue="None"
                                    style={{ width: 120 }}
                                    options={[
                                        { value: 'None', label: 'None' },
                                        { value: 'Increase', label: 'Increase' },
                                        { value: 'Decrease', label: 'Decrease' }
                                    ]}
                                />
                            </div>
                            <div className='type-products'>
                                <div className={selected === "all" ? "selected" : ""} onClick={() => handleSelect("all")}>
                                    All
                                </div>
                                <div className={selected === "sale" ? "selected" : ""} onClick={() => handleSelect("sale")}>
                                    Sale
                                </div>
                            </div>
                            <p className='text'>"10 total products"</p>

                        </div>
                        <div className='right-content'>
                            <div className='filter'>
                                Filter price:
                                <Slider range defaultValue={[5, 100]} onChange={handleChangeSlider} />
                                <div className='ResetBtn'>Reset</div>
                            </div>
                        </div>
                    </div>
                    <div className='products-content'>
                        <div className='left-content'>
                            <ListProducts products={products} style={{ backgroundColor: '#eee' }} />
                        </div>
                        <div className='right-content' style={{paddingTop:'10px'}}>
                            <ListTopProducts topProducts={products} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;
