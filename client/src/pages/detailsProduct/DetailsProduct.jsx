import './DetailsProduct.scss'
import React, { useState, useEffect } from "react";
import SearchForm from '../../components/searchForm/SearchForm';
import { Avatar } from "@mui/material"
import Rating from '@mui/material/Rating';
import { Form } from "antd";
import { useLocation } from 'react-router-dom';
import ScrollToTop from '../../utils/srcolltoTop';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearProductSingle, getProductSingle, getSingleProductStatus } from '../../store/productSlice';
import { fetchAsyncAuthor, fetchAsyncProductSingle } from '../../store/apiReq';
import { getAuthor, getAuthorStatus } from '../../store/authorSlice';
import { STATUS } from '../../utils/status';
import Loading from '../../components/loading/Loading';

const number_of_product = 20;

const reviews_of_book = [
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
];


function DetailsProduct() {
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => window.scrollTo(0, 0), []);
    useEffect(() => {
        dispatch(clearProductSingle())
        dispatch(fetchAsyncProductSingle(id));
    }, [id]);

    const productSingle = useSelector(getProductSingle);
    const productSingleStatus = useSelector(getSingleProductStatus);
    const author = useSelector(getAuthor)
    const authorStatus = useSelector(getAuthorStatus)


    useEffect(() => {
        if (productSingle && productSingle.author_id)
            dispatch(fetchAsyncAuthor(productSingle.author_id));
    }, [dispatch, productSingle.author_id]);

    const newprice = Math.round((productSingle.price - (productSingle.price * productSingle.on_sale / 100)) * 100) / 100;
    const [value, setValue] = useState(0);

    useEffect(() => {
        document.querySelector(".detail_product_wrapper input").setAttribute("value", 1);
        function translateImg() {
            const slideWidth = document.querySelector(".detail_product_wrapper .img_slide_wrapper").clientWidth;
            document.querySelector('.detail_product_wrapper .img_slide').style.transform = `translateX(${- imgId * slideWidth}px)`;
        }


        const tabSelectItems = document.querySelectorAll(".detail_product_wrapper .tab_list .tab_select");

        for (let i = 0; i < tabSelectItems.length; i++) {
            tabSelectItems[i].addEventListener('click', (event) => {
                tabSelectItems[(i + 1) % 2].setAttribute("aria-selected", false);
                tabSelectItems[i].setAttribute("aria-selected", true);
                if (i == 0) {
                    document.querySelector(".detail_product_wrapper .tab_panel_content .description_tab_panel").style.display = "flex";
                    document.querySelector(".detail_product_wrapper .tab_panel_content .reviews_tab_panel").style.display = "none";
                } else {
                    document.querySelector(".detail_product_wrapper .tab_panel_content .description_tab_panel").style.display = "none";
                    document.querySelector(".detail_product_wrapper .tab_panel_content .reviews_tab_panel").style.display = "flex";
                }
            });
        }

    }, []);
    // if(productSingleStatus === STATUS.LOADING)
    // return <Loading />
    // if(authorStatus === STATUS.Loading)
    // return <Loading />

    return (
        <>
            <div className="detail_page_container">
                <SearchForm />
                <div className="detail_product_wrapper">
                    <div className="detail_product_container">
                        <div className="product_summary">
                            <div className="product_img_slider">
                                <div className="img_slide_wrapper">
                                    <div className="img_slide">

                                        <img src={productSingle?.image_url} alt="" />

                                    </div>
                                </div>


                            </div>

                            <div className="summarize">
                                <div className="product_title">
                                    {productSingle?.title}
                                </div>
                                <div className="product_rating">
                                    <Rating name="read-only" value={4} size='large' readOnly />
                                    <span className='number_of_review'>(2 customer review)</span>
                                </div>
                                <div className="product_intro">
                                    What can you do to save money with online shopping? You may be wondering if finding coupons and sales is time consuming. If you aren't into that, there are other options. You simply need to heed the tips in this piece and act on them.
                                </div>
                                <div className="product_buy">
                                    <div className="product_price">${newprice} {productSingle?.on_sale != 0 ? <><span>${productSingle?.price}</span> <p>(-{productSingle?.on_sale}%)</p></> : <></>}</div>
                                    <div className="number_of_product">{number_of_product} in stock</div>
                                    <div className="quantity_and_button">
                                        <div className="quantity">
                                            <input type="number" name="" min={1} max={number_of_product} />
                                        </div>
                                        <div className="add_button">ADD TO CART</div>
                                    </div>
                                </div>


                                <div className="product_categories">
                                    <span>Categories:</span>
                                    Culture, Life Style
                                </div>
                                <div className="products_tag">
                                    <span>Tags:</span>
                                    Dream, Music, Sound
                                </div>
                            </div>
                        </div>

                        <div className="product_detail">
                            <div className="book_detail">
                                <div className="title">Book Details</div>
                                <table className="book_infor">
                                    <tbody>
                                        <tr>
                                            <th>Page</th>
                                            <td>{productSingle?.pages} Page</td>
                                        </tr>

                                        <tr>
                                            <th>Cover Design</th>
                                            <td>{productSingle?.cover_designer}</td>
                                        </tr>

                                        <tr>
                                            <th>Publisher</th>
                                            <td>{productSingle?.publisher}</td>
                                        </tr>

                                        <tr>
                                            <th>Language</th>
                                            <td>{productSingle?.lang}</td>
                                        </tr>

                                        <tr>
                                            <th>Released</th>
                                            <td>{productSingle?.released}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="author">
                                <div className="title">About the Author</div>
                                <div className="author_infor">
                                    <div className="author_name">
                                        {author?.name}
                                    </div>
                                    <div className="author_description">
                                        {author?.description}
                                    </div>
                                </div>
                                <div className="author_img">
                                    <Avatar className='avatar_img' src={author?.img_url} />
                                </div>

                            </div>

                        </div>

                        <div className="description_and_review">
                            <div className="tab_list">
                                <div className="tab_select" aria-selected="true">Description</div>
                                <div className="tab_select" aria-selected="false">Reviews</div>
                            </div>
                            <div className="tab_panel_content">
                                <div className="description_tab_panel">
                                    {productSingle?.description}
                                </div>

                                <div className="reviews_tab_panel">
                                    <div className="reviews_quantity">{reviews_of_book.length} reviews for '{productSingle.title}'</div>
                                    {reviews_of_book.map((review, index) => (
                                        <div className="item_review" key={index}>
                                            <Avatar className='review_avatar' variant="square" src={review["cover"]} />
                                            <div className="review_detail">
                                                <div className="review_name">{review["name"]}</div>
                                                <div className="review_content">{review["review"]}</div>
                                                <div className="review_rating">
                                                    <Rating name="read-only" value={review["rating"]} size='large' readOnly />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="review_add_form">
                                        <div className="form_title">
                                            <span>Add a review</span>
                                            Your email address will not be published. Required fields are marked *
                                        </div>
                                        <Form className='form_content'>
                                            <div className="form_input_row">
                                                <div className='label'>Your rating *</div>
                                                <Rating
                                                    className='rating'
                                                    name="simple-controlled"
                                                    value={value}
                                                    onChange={(event, newValue) => {
                                                        setValue(newValue);
                                                    }}
                                                    size='large'
                                                />
                                            </div>
                                            <div className="form_input_row">
                                                <div className='label'>Your review *</div>
                                                <textarea name="" id="" cols="30" rows="5"></textarea>
                                            </div>
                                            
                                            <div className="form_input_row">
                                                <div className=""></div>
                                                <button className='submit_review'>Submit</button>
                                            </div>
                                        </Form>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetailsProduct;