import React from "react"
import { DeleteFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { useDispatch } from "react-redux"
import { addToCart, decreaseCartItem, removeFromCart } from "../../store/cartSlice"

import './CartItems.scss'

function CartItems({ isbn, img, title, newprice, quantity }) {
    const dispatch = useDispatch()

    const incCartitems = () => {
        dispatch(addToCart({ isbn, title, newprice }))
    }
    const descCartitems = () => {
        dispatch(decreaseCartItem(isbn))
    }
    const removeCartitems = () => {
        dispatch(removeFromCart(isbn))
    }
    return (
        <>
            <div className='box-items'>
                <img src={img} alt="" />
                <div className='content-item'>
                    <h3>{title}</h3>
                    <span className='price'>${newprice}</span>
                    <div className='number-qty'>
                        <div className='plus' onClick={incCartitems}>
                            <PlusOutlined />
                        </div>
                        <div className='num'>{quantity}</div>
                        <div className='minus' onClick={descCartitems}>
                            <MinusOutlined />
                        </div>
                    </div>
                </div>
                <DeleteFilled className='delete' onClick={removeCartitems} />
            </div>
        </>
    )
}

export default CartItems