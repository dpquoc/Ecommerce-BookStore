import { useState } from "react";
import { ShoppingCartOutlined, HeartOutlined, StarFilled, HeartFilled } from '@ant-design/icons';
import { InputNumber } from 'antd';

import './BookCard.scss'
import { useDispatch } from "react-redux";
import { cartActions } from '../../store/cartSlice'

function BookCard({ id, title, author, cover, rating, price, sale }) {
    const [isFavorite, setIsFavorite] = useState(false);

    const heartIcon = isFavorite ? <><HeartFilled /></> : <><HeartOutlined /></>;

    const heartClick = () => {
        setIsFavorite(!isFavorite);
    };
    const dispatch = useDispatch()
    const addToCart = () => {
        dispatch(cartActions.addToCart({ id, title, newprice, cover }))
    }
    const newprice =  (sale ? (price - price * sale / 100) : price);
    return (
        <>
            <div className="box-card">
                {sale ? (
                    <>
                        <span className="discount">-{sale}%</span>
                    </>
                ) : (<></>)}
                <img src={cover} alt="" />
                <div className='box-content'>
                    <div className="author-starts">
                        <h3>by <a href="">{author}</a></h3>
                        <span><StarFilled style={{ color: 'gold' }} /> {rating}</span>
                    </div>
                    <h2>{title}</h2>
                    <div className='quantity'>
                        <div className="price">
                            {sale ? (
                                <>
                                    ${newprice} <span>${price}</span>
                                </>
                            ) : (<>${newprice}</>)}
                        </div>
                    </div>
                    <div className='btn-cart-like'>
                        <div href="" className="btn-cart" onClick={addToCart}>Add to cart</div>
                        <div href="" className="btn-like" onClick={heartClick}>{heartIcon}</div>
                    </div>
                </div >
            </div>
        </>
    );
}

export default BookCard;