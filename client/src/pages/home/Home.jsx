import Banner from '../../components/banner/Banner';
import BookCard from '../../components/card/Card';
import SearchForm from '../../components/searchForm/SearchForm';

import book1 from '../../components/imgs/book1.jpg'
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
            <ListProducts title="Sale" products={products} />
        </div>
    );
}

export default Home;
