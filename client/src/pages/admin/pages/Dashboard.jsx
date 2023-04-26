import React from 'react'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import Avatar from '@mui/material/Avatar';
import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
const items = [
    {
        key: '1',
        label: 'Action 1',
    },
    {
        key: '2',
        label: 'Action 2',
    },
];

import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../../utils/apiURL';
import {
    Select,
} from 'antd';
function Dashboard() {
    //api order
    const [orders, setOrders] = useState([])
    const fetchOrder = async () => {
        try {
            const res = await axios.get(`${BASE_URL}order`, { withCredentials: true })
            setOrders(res?.data.data)
        }
        catch (err) {
            setOrders({})
        }
    }


    //api user
    const [users, setUsers] = useState([])
    const fetchUser = async () => {
        try {
            const res = await axios.get(`${BASE_URL}user`, { withCredentials: true })
            setUsers(res?.data.data)
        }
        catch (err) {
            setUsers({})
        }
    }

    //api product
    const [books, setBooks] = useState([])
    const fetchProduct = async () => {
        try {
            const res = await axios.get(`${BASE_URL}book`, { withCredentials: true })
            setBooks(res?.data.data)
        }
        catch (err) {
            setBooks({})
        }
    }


    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        const user = users.find(user => user.id === order.user_id);
        if (user) {
            order.fullname = user.fullname;
        }
        for (let j = 0; j < order.items.length; j++) {
            const item = order.items[j];
            const book = books.find(book => book.isbn === item.book_isbn);
            if (book) {
                item.title = book.title;
            }
        }
    }
    console.log(orders);

    useEffect(() => {
        fetchProduct()
        fetchOrder()
        fetchUser()
    }, [])
    //api review
    const [reviews, setReviews] = useState([])
    const fetchReview = async () => {
        try {
            const res = await axios.get(`${BASE_URL}review`, { withCredentials: true })
            setReviews(res?.data.data)
        }
        catch (err) {
            setReviews({})
        }
    }
    useEffect(() => {
        fetchReview()
    }, [])


    //api order

    const expandedRowRender = (record) => {
        const columns = [
            {
                title: 'Num',
                dataIndex: 'num',
                key: 'num',
            },
            {
                title: 'Books',
                dataIndex: 'books',
                key: 'books',
            },
            {
                title: 'Quantity',
                dataIndex: 'quantity',
                key: 'quantity',
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
            },
        ];
        const itemData = record.items.map((item, index) => ({
            key: `${record.id}-${index}`,
            num: index + 1,
            books: item.title,
            quantity: item.quantity,
            price: item.price,
        }));

        return <Table columns={columns} dataSource={itemData} pagination={false} />;
    };
    const [valueSelect, setValueSelect] = useState('Pending')
    console.log(valueSelect);
    const columns = [
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            width: 120,

        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 120,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 110,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: 200,
        },
        {
            title: 'Telephone',
            dataIndex: 'telephone',
            key: 'telephone',
            width: 150
        },

        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 150
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            width: 120
        },
        {
            title: 'Status',
            key: 'state',
            width: 160,
            render: () => (
                <>
                
                    {/* {valueSelect === 'Pending' ? <Badge status="warning" style={{marginRight:'8px'}} /> : <></> } 
                    {valueSelect === 'Done' ? <Badge status="success" style={{marginRight:'8px'}} /> : <></> } 
                    {valueSelect === 'Cancell' ? <Badge status="error" style={{marginRight:'8px'}} /> : <></> }  */}
                    <Space size="middle">
                        <Select
                            onChange={(value) => setValueSelect(value)}
                            defaultValue={valueSelect}
                            style={{ width: 100 }}
                            options={[
                                { value: 'Pending', label: 'Pending' },
                                { value: 'Done', label: 'Done' },
                                { value: 'Cancell', label: 'Cancell'}
                            ]}
                        />
                    </Space>
                </>),
        },
    ];
    // const data = [];
    // for (let i = 0; i < orders.length; i++) {
    //     const order = orders[i];
    //     data.push({
    //         key: (order.id).toString(),
    //         name: order.name,
    //         user: order.fullname,
    //         email: order.email,
    //         address: order.address,
    //         telephone: order.telephone,
    //         totalPrice: order.price,
    //     });
    // }
    const data = orders.map((order) => ({
        key: order.id,
        name: order.name,
        user: order.fullname,
        email: order.email,
        address: order.address,
        telephone: order.telephone,
        totalPrice: order.price,
        items: order.items,
    }));
    return (
        <section id="content">
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>DashBoard</h1>
                    </div>
                </div>
                <ul className="box-info">
                    <li>
                        <ShoppingCartIcon className='bx' />
                        <span className="text">
                            <h3>{orders.length}</h3>
                            <p>Orders</p>
                        </span>
                    </li>
                    <li>
                        <PeopleAltIcon className='bx' />
                        <span className="text">
                            <h3>{users.length}</h3>
                            <p>Users</p>
                        </span>
                    </li>
                    <li>
                        <LocalAtmIcon className='bx' />
                        <span className="text">
                            <h3>${orders.reduce((total, item) => {
                                return total + parseFloat(item.price);
                            }, 0)}</h3>
                            <p>Earning</p>
                        </span>
                    </li>
                    <li>
                        <ReviewsIcon className='bx' />
                        <span className="text">
                            <h3>{reviews.length}</h3>
                            <p>Reviews</p>
                        </span>
                    </li>
                </ul>
                <div className="table-data">
                    <div className="order">
                        <div className="head">
                            <h3>Recent Orders</h3>
                        </div>
                        <Table
                            columns={columns}
                            expandable={{
                                expandedRowRender,

                            }}
                            dataSource={data}
                        />

                    </div>
                </div>
            </main>
        </section >
    )
}

export default Dashboard