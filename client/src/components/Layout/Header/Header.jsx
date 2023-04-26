import './Header.scss'
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { HeartOutlined, ShoppingCartOutlined, MenuOutlined, UserOutlined, DeleteFilled } from '@ant-design/icons'

import CartItems from '../../cartItems/CartItems'
import { useDispatch, useSelector } from "react-redux"
import { getCartTotal } from '../../../store/cartSlice'
import {
    Menu,
    MenuItem,
    Avatar,
    ListItemIcon,
    Divider,
} from '@mui/material';

import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import { logoutUser } from '../../../store/apiReq';
import axios from "axios";
import { BASE_URL } from '../../../utils/apiURL';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        logoutUser(dispatch, navigate);
    }

    const user = useSelector((state) => state.auth.login.currentUser)

    const [userCurrent, setUserCurrent] = useState({});
    const fetchUserCurrent = async () => {
        try {
            const res = await axios.get(`${BASE_URL}user/showme`, { withCredentials: true })
            setUserCurrent(res?.data.data)
        }
        catch (err) {
            setUserCurrent({})
        }
    };
    useEffect(() => {

        fetchUserCurrent();
    }, []);

    const [cardOpen, setCardOpen] = useState(false)

    const quantityTotal = useSelector((state) => state.cart.totalQuantity)
    const amountTotal = useSelector((state) => state.cart.totalAmount)
    const cartItems = useSelector((state) => state.cart.itemsList)

    useEffect(() => {
        dispatch(getCartTotal());
    }, [cartItems])

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCheckout = () => {
        user ? navigate('/checkout') : navigate('/login')
    }
    return (
        <div className="header">
            <div className="menu-btn icon-btn" ><MenuOutlined /></div>
            <h1>
                Book<span>S</span>
            </h1>
            <nav className="navbar">
                <Link className='links-nav' to="/">Home</Link>
                <Link className='links-nav' to="/products">Products</Link>
                <Link className='links-nav' to="/news">News</Link>
                <Link className='links-nav' to="/about">About</Link>
                <Link className='links-nav' to="/contact">Contact</Link>

            </nav>
            <div className='icons'>
                <div className="icon-btn-cart" onClick={() => setCardOpen(!cardOpen)}>
                    <ShoppingCartOutlined />
                    {quantityTotal === 0 ? <></> : <span className="quantity-cart">{quantityTotal}</span>}
                </div>
                {
                    user
                        ? (<>
                            {
                                userCurrent.avt_url ?
                                    <Avatar
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        src={userCurrent.avt_url}
                                    >
                                    </Avatar>
                                    :
                                    <Avatar
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        {userCurrent.fullname && userCurrent.fullname.charAt(0).toUpperCase()}
                                    </Avatar>
                            }
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 17,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <Link to={`/profile/${userCurrent?.id}`}>
                                    <MenuItem sx={{ fontSize: '1.5rem', color: 'black' }}>
                                        Hi, {userCurrent?.fullname}
                                    </MenuItem>
                                </Link>
                                <Divider />
                                {userCurrent?.role === 'admin' && (
                                    <Link to='/admin'>
                                        <MenuItem onClick={handleClose} sx={{ fontSize: '1.5rem', color: 'black' }}>
                                            <ListItemIcon>
                                                <SettingsIcon />
                                            </ListItemIcon>
                                            Admin page
                                        </MenuItem>
                                    </Link>
                                )}
                                <Link to='/wishlist'>
                                    <MenuItem onClick={handleClose} sx={{ fontSize: '1.5rem', color: 'black' }}>
                                        <ListItemIcon>
                                            <FavoriteIcon />
                                        </ListItemIcon>
                                        WishList
                                    </MenuItem>
                                </Link>
                                <Link to='/changepassword'>
                                    <MenuItem onClick={handleClose} sx={{ fontSize: '1.5rem', color: 'black' }}>
                                        <ListItemIcon>
                                            <LockResetOutlinedIcon style={{ fontSize: '1.5rem' }} />
                                        </ListItemIcon>
                                        Change password
                                    </MenuItem>
                                </Link>
                                <MenuItem onClick={handleLogout} sx={{ fontSize: '1.5rem' }}>
                                    <ListItemIcon>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>

                            </Menu>
                        </>
                        )
                        :
                        (
                            <Link to='/login'>
                                <Avatar
                                    size="small"
                                    sx={{ ml: 2 }}
                                >
                                    <UserOutlined />
                                </Avatar>
                            </Link>
                        )
                }

            </div>

            <div className={cardOpen ? "shopping-cart active" : "shopping-cart"}>
                {cartItems.map((item, index) => (
                    <CartItems
                        key={index}
                        isbn={item.isbn}
                        img={item.img}
                        title={item.title}
                        newprice={item.newprice}
                        quantity={item.quantity}
                        totalPrice={item.totalPrice}
                    />
                ))}
                <div className='total'> Total : ${amountTotal}</div>
                <div href="#" className='btn' onClick={handleCheckout} >Go to Checkout page</div>
            </div>
        </div>
    );
}
export default Header;