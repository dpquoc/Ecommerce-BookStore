import Banner from '../../components/banner/Banner';
import SearchForm from '../../components/searchForm/SearchForm';

import featuredBook1 from '../../components/imgs/home1-featured-01.jpg'
import featuredBook2 from '../../components/imgs/home1-featured-02.jpg'
import book1 from '../../components/imgs/book1.jpg'

import { ReadOutlined, EditTwoTone, SafetyCertificateTwoTone } from '@ant-design/icons';

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination } from "swiper";

import './Home.scss'
import ListProducts from '../../components/listProducts/ListProducts';

const products = [
    {
        id: 123,
        cover: "https://hostacmee.space/demo/bookchoix/wp-content/uploads/2021/03/mastering-the-kitchen-572x764-1.jpg",
        category: "Food",
        title: "Mastering the Kitchen Series",
        author: "Ellie Thomson, Harry",
        rating: 4,
        price: 21,
        sale: 0
    },
    {
        id: 456,
        cover: "https://hostacmee.space/demo/bookchoix/wp-content/uploads/2021/03/mastering-the-kitchen-572x764-1.jpg",
        category: "Food",
        title: "Mastering the Kitchen Series",
        author: "Ellie Thomson, Harry",
        rating: 4,
        price: 21,
        sale: 15
    },
    {
        id: 789,
        cover: "https://hostacmee.space/demo/bookchoix/wp-content/uploads/2021/03/mastering-the-kitchen-572x764-1.jpg",
        category: "Food",
        title: "Mastering the Kitchen Series",
        author: "Ellie Thomson, Harry",
        rating: 4,
        price: 21,
        sale: 15
    },
    {
        id: 23,
        cover: "https://hostacmee.space/demo/bookchoix/wp-content/uploads/2021/03/mastering-the-kitchen-572x764-1.jpg",
        category: "Food",
        title: "Mastering the Kitchen Series",
        author: "Ellie Thomson, Harry",
        rating: 4,
        price: 21,
        sale: 15
    },
    {
        id: 13,
        cover: "https://hostacmee.space/demo/bookchoix/wp-content/uploads/2021/03/mastering-photography-572x764-1.jpg",
        category: "Food",
        title: "Mastering the Kitchen Series",
        author: "Ellie Thomson, Harry",
        rating: 4,
        price: 21,
        sale: 15
    },
];

function Home() {
    return (

        <div id="container-home">
            <Banner />
            <SearchForm />
            <div className="list-products">
                <h1>Popular Book<span>S</span></h1>
                <Swiper
                    style={{ width: '100%', padding: '50px 0' }}
                    effect={"coverflow"}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2,
                        slideShadows: true,
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[EffectCoverflow]}
                    className="mySwiper swiper-books"
                >
                    <SwiperSlide style={{ width: "300px", height: "400px" }}>
                        <img src={book1} style={{ width: '100%', display: 'block' }} />
                    </SwiperSlide>
                    <SwiperSlide style={{ width: "300px", height: "400px" }}>
                        <img src={book1} style={{ width: '100%', display: 'block' }} />
                    </SwiperSlide>
                    <SwiperSlide style={{ width: "300px", height: "400px" }}>
                        <img src={book1} style={{ width: '100%', display: 'block' }} />
                    </SwiperSlide>
                    <SwiperSlide style={{ width: "300px", height: "400px" }}>
                        <img src={book1} style={{ width: '100%', display: 'block' }} />
                    </SwiperSlide>
                    <SwiperSlide style={{ width: "300px", height: "400px" }}>
                        <img src={book1} style={{ width: '100%', display: 'block' }} />
                    </SwiperSlide>
                </Swiper>

            </div>
            <div className='sticker-mark'>
                <div className="card tonsofbook">
                    <div className="overlay"></div>
                    <div className="circle">
                        <ReadOutlined style={{ fontSize: '5rem' }} />
                    </div>
                    <h3>Tons of Books</h3>
                    <p>The store has a lot of good books that you want to find,
                        and there are all kinds of books for you to choose from,
                        books will be updated continuously every day.</p>
                </div>
                <div className="card authorWrite">
                    <div className="overlay"></div>
                    <div className="circle">
                        <EditTwoTone style={{ fontSize: '5rem' }} />
                    </div>
                    <h3>Hundreds of Authors</h3>
                    <p>The store has a lot of good books that you want to find,
                        and there are all kinds of books for you to choose from,
                        books will be updated continuously every day.</p>
                </div>
                <div className="card SafeTransaction">
                    <div className="overlay"></div>
                    <div className="circle">
                        <SafetyCertificateTwoTone style={{ fontSize: '5rem', color: 'black' }} />
                    </div>
                    <h3>Easily Payment</h3>
                    <p>The store has a lot of good books that you want to find,
                        and there are all kinds of books for you to choose from,
                        books will be updated continuously every day.</p>
                </div>
            </div>
            <div className="outstanding">
                <div className='introcduce-book'>
                    <h3>Featured Book</h3>
                    <h1>The Complete Idiots Guide to Graphic Design</h1>
                    <h4>Anggi Krisna</h4>
                    <p>From advanced selectors to generated content to web fonts, and from gradients, shadows,
                        and rounded corners to elegant animations, CSS3 hold a
                        universe of creative possibilities. No one can better guide you through these galaxies than Dan Cederholm.
                    </p>
                    <a className='btn-featured'>See More</a>
                </div>
                <div className='featured-book'>
                    <img src={featuredBook1} alt="" />
                </div>
                <div className='featured-category' >
                    <img src={featuredBook2} alt="" />
                    <h3>Featured Category</h3>
                    <p>A Complete Idiot Guide to Programming</p>
                </div>
            </div>

            <ListProducts title="Sale" products={products} style={{ backgroundColor: '#eee' }} />

        </div>
    );
}

export default Home;
