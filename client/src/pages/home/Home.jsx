// import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Banner from '../../components/banner/Banner';
import SearchForm from '../../components/searchForm/SearchForm';

import featuredBook1 from '../../components/imgs/home1-featured-01.jpg'
import featuredBook2 from '../../components/imgs/home1-featured-02.jpg'
import book1 from '../../components/imgs/book1.jpg'
import blog from '../../components/imgs/blog.jpg'
import Button from '@mui/material/Button';

import { ReadOutlined, EditTwoTone, SafetyCertificateTwoTone } from '@ant-design/icons';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import ManageAccountsSharpIcon from '@mui/icons-material/ManageAccountsSharp';
import NotificationsActiveSharpIcon from '@mui/icons-material/NotificationsActiveSharp';
import QuestionAnswerSharpIcon from '@mui/icons-material/QuestionAnswerSharp';
import PaymentsSharpIcon from '@mui/icons-material/PaymentsSharp';


import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles



import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow } from "swiper";

import './Home.scss'
import ListProducts from '../../components/listProducts/ListProducts';
import ListReview from '../../components/listReview/ListReview';

const products = [
    {
        id: 123,
        cover: "https://hostacmee.space/demo/bookchoix/wp-content/uploads/2021/03/mastering-the-kitchen-572x764-1.jpg",
        category: "Food",
        title: "Mastering the Kitchen Series",
        author: "Ellie Thomson, Harry",
        rating: 4,
        price: 21,
        quantity: 1,
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
        quantity: 1,
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
        quantity: 1,
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
        quantity: 1,
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
        quantity: 1,
        sale: 15
    },
];
const reviews = [
    {
        id: 1,
        name: "Maureen Burrows",
        cover: "https://raw.githubusercontent.com/paul-duvall/website_images/master/reviewer2.jpg",
        rating: 4.5,
        review: "Under the gifted guidance of Ron Burgandy, one of James Cameron's talented team, imaginative modern cooking from a kitchen brigade at the top of its game"
    },
    {
        id: 2,
        name: "Magnus Mahoney",
        cover: "https://raw.githubusercontent.com/paul-duvall/website_images/master/reviewer1.jpg",
        rating: 5,
        review: "On my midweek visit, every seat was taken by 6.15pm, the atmosphere was electric, the air filled with charcoal smoke, music and laughter"
    },
    {
        id: 3,
        name: "Rhonda Barajas",
        cover: "https://raw.githubusercontent.com/paul-duvall/website_images/master/reviewer3.jpg",
        rating: 5,
        review: "The friendly and welcoming staff act like they genuinely care, first and foremost, about you having a really good time. I'll drink to that"
    },
    {
        id: 4,
        name: "Rhonda Barajas",
        cover: "https://raw.githubusercontent.com/paul-duvall/website_images/master/reviewer3.jpg",
        rating: 5,
        review: "The friendly and welcoming staff act like they genuinely care, first and foremost, about you having a really good time. I'll drink to that"
    },
    {
        id: 5,
        name: "Rhonda Barajas",
        cover: "https://raw.githubusercontent.com/paul-duvall/website_images/master/reviewer3.jpg",
        rating: 5,
        review: "The friendly and welcoming staff act like they genuinely care, first and foremost, about you having a really good time. I'll drink to that"
    },
    {
        id: 6,
        name: "Rhonda Barajas",
        cover: "https://raw.githubusercontent.com/paul-duvall/website_images/master/reviewer3.jpg",
        rating: 5,
        review: "The friendly and welcoming staff act like they genuinely care, first and foremost, about you having a really good time. I'll drink to that"
    }
];

function Home() {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange1 = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 1,
                marginLeft: 500,
                marginRight: 500,
            }}
        />
    );

    window.scrollTo(0, 0);
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
                    initialSlide={2}
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
            </div><br></br>

            <ListProducts title="Sale" products={products} style={{ backgroundColor: '#eee' }} />
            <ListReview title="Review" reviews={reviews} />
            <ColoredLine color="gray" />

            <div className="Blog-container" >
                <h1 >Blog</h1>
                <br></br>
                <div className="card">
                    <div className="img1">
                        <img src={blog} alt="" />
                    </div>
                    <div className="content_blog" >
                        <h2>There's goting to be a musical about meghan</h2>
                        <p><CalendarMonthTwoToneIcon sx={{ fontSize: 20 }} /> 20th April 2023</p>
                        <p className="p1">Creepeth green light appear let rule only you're divide and lights moving and isn't given creeping deep.</p>
                        <Button size="large">Read more</Button>
                    </div>
                </div>
                <div className="card">
                    <div className="img1">
                        <img src={blog} alt="" />
                    </div>
                    <div className="content_blog" >
                        <h2>There's goting to be a musical about meghan</h2>
                        <p><CalendarMonthTwoToneIcon sx={{ fontSize: 20 }} /> 20th April 2023</p>
                        <p className="p1">Creepeth green light appear let rule only you're divide and lights moving and isn't given creeping deep.</p>
                        <Button size="large">Read more</Button>
                    </div>
                </div>
                <div className="card">
                    <div className="img1">
                        <img src={blog} alt="" />
                    </div>
                    <div className="content_blog" >
                        <h2>There's goting to be a musical about meghan</h2>
                        <p><CalendarMonthTwoToneIcon sx={{ fontSize: 20 }} /> 20th April 2023</p>
                        <p className="p1">Creepeth green light appear let rule only you're divide and lights moving and isn't given creeping deep.</p>
                        <Button size="large">Read more</Button>
                    </div>
                </div>
                <div className="card">
                    <div className="img1">
                        <img src={blog} alt="" />
                    </div>
                    <div className="content_blog" >
                        <h2>There's goting to be a musical about meghan</h2>
                        <p><CalendarMonthTwoToneIcon sx={{ fontSize: 20 }} /> 20th April 2023</p>
                        <p className="p1">Creepeth green light appear let rule only you're divide and lights moving and isn't given creeping deep.</p>
                        <Button size="large">Read more</Button>
                    </div>
                </div>
            </div>


            <div className="FAQs">
                <QuestionAnswerSharpIcon />&nbsp;&nbsp;<h1> FAQs </h1>
                <br></br>
                <div className="tag111">

                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange1('panel1')} style={{ border: '1px solid', backgroundColor: 'white' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >

                            <Typography sx={{ width: '20%', }}>
                                <ManageAccountsSharpIcon sx={{ fontSize: 30 }} />
                            </Typography>
                            <Typography sx={{ width: '80%', textAlign: 'left', fontSize: "20px" }}>
                                How to change password?
                            </Typography>

                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                Aliquam eget maximus est, id dignissim quam.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange1('panel2')} style={{ border: '1px solid', background: 'white' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography sx={{ width: '20%', }}>
                                <PaymentsSharpIcon sx={{ fontSize: 30 }} />
                            </Typography>
                            <Typography sx={{ width: '80%', textAlign: 'left', fontSize: "20px" }}>
                                How to pay online?
                            </Typography>

                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                Aliquam eget maximus est, id dignissim quam.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div className="tag111">
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange1('panel3')} style={{ border: '1px solid', background: 'white' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                        >
                            <Typography sx={{ width: '20%', }}>
                                <ManageAccountsSharpIcon sx={{ fontSize: 30 }} />
                            </Typography>
                            <Typography sx={{ width: '80%', textAlign: 'left', fontSize: "20px" }}>
                                Can we refund new book?
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                Aliquam eget maximus est, id dignissim quam.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange1('panel4')} style={{ border: '1px solid', }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                        >
                            <Typography sx={{ width: '20%', }}>
                                <NotificationsActiveSharpIcon sx={{ fontSize: 30 }} />
                            </Typography>
                            <Typography sx={{ width: '80%', textAlign: 'left', fontSize: "20px" }}>
                                How to receive notifications?
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                Aliquam eget maximus est, id dignissim quam.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>

        </div>

    );
}

export default Home;
