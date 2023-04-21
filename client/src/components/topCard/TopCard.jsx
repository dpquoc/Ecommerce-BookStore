import React from 'react'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getAllAuthors } from "../../store/authorSlice";
import { fetchAsyncAuthors } from "../../store/apiReq";
import axios from "axios";
import { BASE_URL } from "../../utils/apiURL";
import Rating from '@mui/material/Rating';
import './TopCard.scss'
export default function TopCard({ isbn, title, author_id, img, price, onsale }) {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAsyncAuthors())
    }, [])
    const authors = useSelector(getAllAuthors)

    const [AllUser, setAllUser] = useState([]);
    const [listReview, setlistReview] = useState([]);

    const author = authors.filter((author) => author.id === author_id)
    //rating book
    const fetchReview = async () => {
        await axios.get(`${BASE_URL}review`, { withCredentials: true })
            .then(res => {
                setlistReview(res.data.data)
            })
            .catch(err => {
                setlistReview([])
            })
    };
    useEffect(() => {
        fetchReview();
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
    useEffect(() => {
        fetchAllUser();
    }, []);

    const filteredListReview = listReview.filter(item => item.book_isbn === isbn);
    const updatedReview = filteredListReview.map(item => {
        const userId = item.user_id;
        const userMatch = AllUser.find(userItem => userItem.id === userId);
        if (userMatch) {
            return {
                ...item,
                fullname: userMatch.fullname,
                avt_url: userMatch.avt_url
            };
        }
        return item;
    });
    const avgRating = updatedReview.reduce((total, item) => total + parseInt(item.rating), 0) / updatedReview.length;
    return (
        <div>
            {
                avgRating === 5 && (
                    <div className='card-topProducts'>
                        <img src={img} width={100} />
                        <div className='product-info'>
                            <h4>{title}</h4>
                            <h3>by <a href="">{author[0]?.name}</a></h3>
                            <Rating name="read-only" value={avgRating} readOnly size="large" />
                            <p className='price'>${Math.round((price - price * onsale / 100) * 100) / 100}</p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
