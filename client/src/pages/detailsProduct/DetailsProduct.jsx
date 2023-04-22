import './DetailsProduct.scss'
import React, { useState, useEffect } from "react";
import SearchForm from '../../components/searchForm/SearchForm';
import { Avatar } from "@mui/material"
import Rating from '@mui/material/Rating';
import { Form } from "antd";
import { CheckCircleFilled } from '@ant-design/icons'
import { useLocation } from 'react-router-dom';
import ScrollToTop from '../../utils/srcolltoTop';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearProductSingle, getProductSingle, getSingleProductStatus } from '../../store/productSlice';
import { fetchAsyncAuthor, fetchAsyncProductSingle } from '../../store/apiReq';
import { getAuthor, getAuthorStatus } from '../../store/authorSlice';
import { STATUS } from '../../utils/status';
import Loading from '../../components/loading/Loading';
import axios from 'axios';
import { BASE_URL } from '../../utils/apiURL';
import { Link } from 'react-router-dom';
import { addToCart } from "../../store/cartSlice";
const number_of_product = 20

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
    const user = useSelector((state) => state?.auth?.login?.currentUser);

    const [AllUser, setAllUser] = useState([]);
    const [listReview, setlistReview] = useState([]);
    const [valueRating, setvalueRating] = useState(0);
    const [valueReview, setvalueReview] = useState("");
    const [listCategory, setListCategory] = useState([]);

    const [valueQuantity, setValueQuantity] = useState(1);

    const onSubmitReview = async (e) => {
        if(!user) return alert("Please login to review");
        e.preventDefault();
        const post = {
            rating: valueRating,
            review: valueReview,
            book_isbn: id
        };
        await axios.post(`${BASE_URL}review`, post, { withCredentials: true })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        window.location.reload();
    }
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


    const filteredListReview = listReview?.filter(item => item.book_isbn === id);
    const updatedReview = filteredListReview?.map(item => {
        const userId = item.user_id;
        const userMatch = AllUser?.find(userItem => userItem.id === userId);
        if (userMatch) {
            return {
                ...item,
                fullname: userMatch?.fullname,
                avt_url: userMatch?.avt_url
            };
        }
        return item;
    });
    const avgRating = updatedReview?.reduce((total, item) => total + parseInt(item.rating), 0) / updatedReview?.length;

    useEffect(() => {
        if (productSingle && productSingle.author_id)
            dispatch(fetchAsyncAuthor(productSingle.author_id));
    }, [dispatch, productSingle.author_id]);

    const newprice = Math.round((productSingle.price - (productSingle.price * productSingle.on_sale / 100)) * 100) / 100;

    //list category
    const fetchCategory = async () => {
        await axios.get(`${BASE_URL}category/${id}`, { withCredentials: true })
            .then(res => {
                setListCategory(res.data.data)
            })
            .catch(err => {
                setListCategory([])
            })
    };
    useEffect(() => {
        fetchCategory();
    }, []);

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

    const handleAddtoCart = (id, title, newprice, img,) => {
        dispatch(addToCart({ id, title, newprice, img, quantity: valueQuantity }))
    }

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
                                    <Rating name="read-only" value={avgRating} precision={0.5} size='large' readOnly />
                                    <span className='number_of_review'>({updatedReview.length} customer review)</span>
                                </div>
                                <div className="product_intro">
                                    What can you do to save money with online shopping? You may be wondering if finding coupons and sales is time consuming. If you aren't into that, there are other options. You simply need to heed the tips in this piece and act on them.
                                </div>
                                <div className="product_buy">
                                    <div className="product_price">${newprice} {productSingle?.on_sale != 0 ? <><span>${productSingle?.price}</span> <p>(-{productSingle?.on_sale}%)</p></> : <></>}</div>
                                    <div className="number_of_product">{number_of_product} in stock</div>
                                    <div className="quantity_and_button">
                                        <div className="quantity">
                                            <input type="number" name="" min={1} max={number_of_product} onChange={(e) => setValueQuantity(e.target.value)} />
                                        </div>
                                        <div className="add_button" onClick={() =>
                                            handleAddtoCart(id, productSingle?.title, newprice, productSingle?.image_url, valueQuantity)}>
                                            ADD TO CART
                                        </div>
                                    </div>
                                </div>
                                <div className="product_categories">
                                    <span>Categories:</span>
                                    {listCategory.map((item, index) => (
                                        <div key={index} style={{ display: 'inline' }}>
                                            <Link to={`/category/${item}`}>{item}</Link>
                                            {index !== listCategory.length - 1 ? ", " : "."}
                                        </div>
                                    ))}
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
                                    <div className="reviews_quantity">{updatedReview?.length} reviews for '{productSingle?.title}'</div>
                                    {updatedReview?.map((review, index) => (
                                        <div className="item_review" key={index}>
                                            <Avatar
                                                className='review_avatar'
                                                variant="square" src={review?.avt_url}
                                                sx={{ fontSize: '3rem' }}
                                            >
                                                {review.avt_url ? <></> : (review.fullname && review.fullname.charAt(0).toUpperCase())}
                                            </Avatar>
                                            <div className="review_detail">
                                                <div className="review_name">{review?.fullname}</div>
                                                <div className="review_content">{review?.review}</div>
                                                <div className="review_rating">
                                                    <Rating name="read-only" value={parseInt(review?.rating)} size='large' readOnly />
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="review_add_form">
                                        {updatedReview?.some(item => item.user_id === user.id) ?
                                            <div className="thanks-for-review">
                                                <CheckCircleFilled style={{ color: '#22d122' }} /> Thanks for your review !
                                            </div>
                                            :
                                            <>
                                                <div className="form_title">
                                                    <span>Add a review</span>
                                                    {user ? <>You are only allowed to review once, so please consider carefully !</> : <>Please login before review *</>}
                                                </div>
                                                <Form className='form_content'>
                                                    <div className="form_input_row">
                                                        <div className='label'>Your rating *</div>
                                                        <Rating
                                                            className='rating'
                                                            name="rating"
                                                            value={valueRating}
                                                            onChange={(e) => {
                                                                setvalueRating(parseInt(e.target.value));
                                                            }}
                                                            size='large'
                                                        />
                                                    </div>
                                                    <div className="form_input_row">
                                                        <div className='label'>Your review *</div>
                                                        <textarea
                                                            name="review"
                                                            id=""
                                                            cols="30"
                                                            rows="5"
                                                            placeholder='Please write your thoughts...'
                                                            onChange={(e) => {
                                                                setvalueReview(e.target.value);
                                                            }}
                                                        >
                                                        </textarea>
                                                    </div>

                                                    <div className="form_input_row">
                                                        <div className=""></div>
                                                        <button className='submit_review' onClick={onSubmitReview}>Submit</button>
                                                    </div>
                                                </Form>
                                            </>
                                        }
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