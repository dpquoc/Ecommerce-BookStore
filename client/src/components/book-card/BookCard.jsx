import { useEffect, useState } from "react";
import { ShoppingCartOutlined, HeartOutlined, StarFilled, HeartFilled } from '@ant-design/icons';
import { InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import './BookCard.scss'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getAllAuthors } from "../../store/authorSlice";
import { fetchAsyncAuthors } from "../../store/apiReq";
import { addToCart } from "../../store/cartSlice";
import axios from "axios";
import { BASE_URL } from "../../utils/apiURL";


function BookCard({ isbn, title, author_id, img, price, onsale, liked }) {
    const [isFavorite, setIsFavorite] = useState(liked ?? false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login.currentUser)
    const authors = useSelector(getAllAuthors)

    const [AllUser, setAllUser] = useState([]);
    const [listReview, setlistReview] = useState([]);

    const heartIcon = isFavorite ? <><HeartFilled /></> : <><HeartOutlined /></>;
    const heartClickAuth = () => {
        user ?? navigate('/login')
    };

    const heartClickLike = async (e) => {
        e.preventDefault();
    
        setIsFavorite(!isFavorite);
        if (isFavorite === false) {
            await axios.get(`${BASE_URL}likelist/${isbn}`, { withCredentials: true })
                .then(res => {
                    console.log(res.data)
                })
        } else {
            await axios.delete(`${BASE_URL}likelist/${isbn}`, { withCredentials: true })
                .then(res => {
                    console.log(res.data)
                })
        }
    };


    const newprice = Math.round((onsale ? (price - price * onsale / 100) : price) * 100) / 100;



    const handleAddToCart = () => {
        dispatch(addToCart({ isbn, title, newprice, img ,quantity:1}))
    }
    useEffect(() => {
        dispatch(fetchAsyncAuthors())
    }, [])

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
        <div className="box-card" style={{ color: 'var(--black)' }} >
            {onsale != 0 ? (
                <>
                    <span className="discount">-{onsale}%</span>
                </>
            ) : (<></>)}
            <Link to={`/products/${isbn}`}>
                <img src={img} alt="" />
            </Link>
            <div className='box-content'>
                <div className="author-starts">
                    <h3>by <Link to={`/search/${author[0]?.name}`}>{author[0]?.name}</Link></h3>
                    {avgRating ? <span><StarFilled style={{ color: 'gold' }} /> {avgRating}</span> : <></>}
                </div>
                <h2>{title}</h2>
                <div className='quantity'>
                    <div className="price">
                        {onsale != 0 ? (
                            <>
                                ${newprice} <span>${price}</span>
                            </>
                        ) : (<>${newprice}</>)}
                    </div>
                </div>
                <div className='btn-cart-like'>
                    <div href="" className="btn-cart" onClick={handleAddToCart}>Add to cart</div>
                    {user ? <div href="" className="btn-like" onClick={heartClickLike}>{heartIcon}</div>
                        : <div href="" className="btn-like" onClick={heartClickAuth}>{heartIcon}</div>
                    }
                </div>
            </div >
        </div>
    );
}

export default BookCard;