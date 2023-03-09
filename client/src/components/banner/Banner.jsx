// import './style.scss'
import BannerBg from '../imgs/slider-bg.png'
import Reading from '../imgs/reading-books.png'
import Searching from '../imgs/searching-online.png'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Banner.scss';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';

const dataBanner = [
    {
        title: 'Search book easily',
        content: 'The Best Store Online That Every Book Lover Must Visit ',
        srcImg: Reading
    },
    {
        title: 'Search book easily',
        content: 'The Best Store Online That Every Book Lover Must Visit ',
        srcImg: Searching
    },
]

function Banner() {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    return (
        <>
            <div className='banner'>
                <img src={BannerBg} className="img-bg" alt="" />
                <Swiper
                    spaceBetween={40}
                    centeredSlides={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    onAutoplayTimeLeft={onAutoplayTimeLeft}
                    className="mySwiper"
                >
                    {dataBanner.map((data, index) => (
                        <SwiperSlide key={index}>
                            <div className='container-banner swiper-slide swiper-'>
                                <div className='main-banner'>
                                    <div className='main-content-banner'>
                                        <span className='title'>{data.title}</span>
                                        <p className='content'>{data.content}</p>
                                        <a href="" className='btn'>Explore Now</a>
                                    </div>
                                </div>
                                <img src={data.srcImg} className="img-banner" alt="" />
                            </div>
                        </SwiperSlide>
                    ))}

                    <div className="autoplay-progress" slot="container-end">
                        <svg viewBox="0 0 48 48" ref={progressCircle}>
                            <circle cx="24" cy="24" r="20"></circle>
                        </svg>
                        <span ref={progressContent}></span>
                    </div>
                </Swiper>
            </div>
        </>
    );
}
export default Banner;