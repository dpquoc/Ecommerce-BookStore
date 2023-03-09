import { useState } from "react";
import { ShoppingCartOutlined, HeartOutlined, StarFilled, HeartFilled } from '@ant-design/icons';
import { InputNumber } from 'antd';
import './Card.scss'

import book1 from '../imgs/book1.jpg'

function BookCard({ id, title, author, cover, rating, price, sale }) {
    const [isFavorite, setIsFavorite] = useState(false);

    const heartIcon = isFavorite ? <><HeartFilled /></> : <><HeartOutlined /></>;

    const heartClick = () => {
        setIsFavorite(!isFavorite);
    };
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
                                    ${price - price * sale / 100} <span>${price}</span>
                                </>
                            ) : (<>${price}</>)}
                        </div>
                        <InputNumber min={1} defaultValue={1} style={{ width: '58px' }} />
                    </div>
                    <div className='btn-cart-like'>
                        <div href="" className="btn-cart">Add to cart</div>
                        <div href="" className="btn-like" onClick={heartClick}>{heartIcon}</div>
                    </div>
                </div >
            </div>
        </>
    );
}

export default BookCard;