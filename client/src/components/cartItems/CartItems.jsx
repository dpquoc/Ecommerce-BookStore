import React from "react"
import { DeleteFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { useDispatch } from "react-redux"
import { cartActions } from '../../store/cartSlice'
import './CartItems.scss'

function CartItems({ id, cover, title, newprice, quantity, totalPrice }) {
    const dispatch = useDispatch()

    const incCartitems = () => {
        dispatch(cartActions.addToCart({ id, title, newprice }))
    }
    const descCartitems = () => {
        dispatch(cartActions.decreaseCartItem(id))
    }
    const removeCartitems = () => {
        dispatch(cartActions.removeFromCart(id))
    }
    return (
        <>
            <div className='box-items'>
                <img src={cover} alt="" />
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