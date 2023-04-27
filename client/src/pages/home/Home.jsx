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
import book2 from '../../components/imgs/book2.jpg'
import book3 from '../../components/imgs/book3.jpg'
import book4 from '../../components/imgs/book4.jpg'
import book5 from '../../components/imgs/book5.jpg'
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

import { reviews } from '../../components/data/reviews';
import { getAllProducts } from '../../store/productSlice';
import { fetchAsyncProducts } from '../../store/apiReq';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../utils/apiURL';

function Home() {
    window.scrollTo(0, 0);
    const [expanded, setExpanded] = React.useState('');

    const handleChange1 = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAsyncProducts());
    }, []);

    const products = useSelector(getAllProducts);

    const [AllUser, setAllUser] = useState([]);
    const [listReview, setlistReview] = useState([]);

    useEffect(() => {
        fetchReview();
    }, []);
    const fetchReview = async () => {
        try {
            await axios.get(`${BASE_URL}review`, { withCredentials: true })
                .then(res => {
                    setlistReview(res.data.data)
                })
                .catch(err => {
                    setlistReview([])
                })
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchAllUser();
    }, []);
    const fetchAllUser = async () => {
        await axios.get(`${BASE_URL}user`, { withCredentials: true })
            .then(res => {
                setAllUser(res.data.data);
            })
            .catch(err => {
                setAllUser([]);
            })
    };

    const userReview = listReview.map(item => {
        const userId = item.user_id;
        const userMatch = AllUser.find(userItem => userItem.id === userId);
        const bookMatch = products.find(bookItem => bookItem.isbn === item.book_isbn);
        if (userMatch && bookMatch) {
            return {
                ...item,
                fullname: userMatch.fullname,
                avt_url: userMatch.avt_url,
                title: bookMatch.title,
            };
        }
        return item;
    });

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
                        <img src={book2} style={{ width: '100%', display: 'block' }} />
                    </SwiperSlide>
                    <SwiperSlide style={{ width: "300px", height: "400px" }}>
                        <img src={book3} style={{ width: '100%', display: 'block' }} />
                    </SwiperSlide>
                    <SwiperSlide style={{ width: "300px", height: "400px" }}>
                        <img src={book4} style={{ width: '100%', display: 'block' }} />
                    </SwiperSlide>
                    <SwiperSlide style={{ width: "300px", height: "400px" }}>
                        <img src={book5} style={{ width: '100%', display: 'block' }} />
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
                    <p>The bookshop can be a treasure trove for book enthusiasts,
                        offering a diverse selection of titles  that can range from popular bestsellers
                        to rare editions</p>
                </div>
                <div className="card authorWrite">
                    <div className="overlay"></div>
                    <div className="circle">
                        <EditTwoTone style={{ fontSize: '5rem' }} />
                    </div>
                    <h3>Hundreds of Authors</h3>
                    <p>The bookshop provides readers with a diverse selection of works by established and emerging writers,
                        and chance to discover different writing styles</p>
                </div>
                <div className="card SafeTransaction">
                    <div className="overlay"></div>
                    <div className="circle">
                        <SafetyCertificateTwoTone style={{ fontSize: '5rem', color: 'black' }} />
                    </div>
                    <h3>Easily Payment</h3>
                    <p>The bookshop offers a payment system that is fast, secure. 
                        We offer a range of payment options, including credit cards, online banking, 
                        and cash on delivery.</p>
                </div>
            </div>
            <div className="outstanding">
                <div className='introcduce-book'>
                    <h3>Featured Book</h3>
                    <h1>The Complete Idiots Guide to Graphic Design</h1>
                    <h4>Anggi Krisna</h4>
                    <p>Covers art supplies, software, concept development, reproduction needs, and much more
Sample projects include business cards, print and web ads, and graphic T-shirts
Follows the success of other titles aimed at the aspiring artist, including the Complete Idiots Guide® titles on digital photography, drawing, and manga
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



            <ListReview title="Review" reviews={userReview} />


            <div className="FAQs">
                <QuestionAnswerSharpIcon sx={{ fontSize: '2.8rem' }} />&nbsp;&nbsp;<h1 className='list-title'> FA<span className='highlight'>Q</span>s </h1>
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
                                How long will it take for me to receive my order?
                            </Typography>

                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{ textAlign: 'left', fontSize: '1.6rem' }}>
                                It usually takes 2-3 days for customers live in city, about 5-6 days for thats live in
                                countryside
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
                                Do you sell eBooks?
                            </Typography>

                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{ textAlign: 'left', fontSize: '1.6rem' }}>
                                No. We think nothing beats the feel of a real-life, proper, papery book in your hands.
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
                                How do I return an order that I don't want?
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{ textAlign: 'left', fontSize: '1.6rem' }}>
                                If you have received a book that you no longer want, you can return that within 14 days of the
                                delivery date for a full refund.
                                The refund will cover the cost of the books returned plus initial shipping costs to compensate for the return shipping.
                                <br></br>
                                To ensure your package is returned correctly please be sure to write the purchase order number prominently on the packaging.
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
                                I received an incorrect item. What should I do?
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{ textAlign: 'left', fontSize: '1.6rem' }}>
                                From time to time a human error results in an order with the wrong books in it!
                                If you’ve received wrong items, please reach out to the customer service team to request either a resend
                                or a refund of your order. Please include a picture of the incorrect items if at all possible.
                                Please be patient as we correspond to report any and all mispacked packages.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>

        </div>

    );
}

export default Home;
