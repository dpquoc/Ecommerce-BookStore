import React from 'react'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import Avatar from '@mui/material/Avatar';
import { DownOutlined, SearchOutlined, EyeOutlined, EditFilled, DeleteFilled, PlusOutlined, WarningFilled } from '@ant-design/icons';
import {
    Badge, Dropdown, Space, Table, Select, Input, Button, Tag, Modal,
    Cascader,
    Checkbox,
    DatePicker,
    Form,
    InputNumber,
    Radio,
    Switch,
    TreeSelect,
    Upload,
} from 'antd';

import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../../utils/apiURL';
import Highlighter from 'react-highlight-words';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import dayjs from 'dayjs';
const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 24,
        }}
        spin
    />
);
const options = [
    {
        label: 'Drama',
        value: 'Drama',
    },
    {
        label: 'Inspiration',
        value: 'Inspiration',
    },
    {
        label: 'Life Style',
        value: 'Life Style',
    },
    {
        label: 'Love Story',
        value: 'Love Story',
    },
    {
        label: 'Business',
        value: 'Business',
    },
    {
        label: 'Culture',
        value: 'Culture',
    },
    {
        label: 'Science',
        value: 'Science',
    },
];
const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <Tag
            color={value}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{
                marginRight: 3,
            }}
        >
            {label}
        </Tag>
    );
};

function Products() {
    const { TextArea } = Input;
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    //api order
    const [orders, setOrders] = useState([])
    const fetchOrder = async () => {
        try {
            const res = await axios.get(`${BASE_URL}order`, { withCredentials: true })
            setOrders(res?.data.data)
        }
        catch (err) {
            setOrders([])
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
            setBooks([])
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
    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    const [modal3Open, setModal3Open] = useState(false);
    const [modal4Open, setModal4Open] = useState(false);
    //data table
    const data = books.map((book, index) => ({
        key: book.isbn,
        num: index + 1,
        title: (book.title).toString(),
        price: book.price,
        sale: book.onsale,
        img: book.img,
        author: book.author_id,
        categories: book.categories,
    }));

    useEffect(() => {
        fetchProduct()
        fetchOrder()
        fetchUser()
        fetchReview()
    }, [])

    const [selectedEdit, setSelectedEdit] = useState(null);
    const [selectedEditCategory, setSelectedEditCategory] = useState(null);
    const [selectedDelete, setSelectedDelete] = useState(null);
    const handleEdit = async (isbn) => {
        try {
            await axios.get(`${BASE_URL}book/${isbn}`, { withCredentials: true })
                .then(res => {
                    setSelectedEdit(res.data.data)
                    setModal3Open(true);
                });
            await axios.get(`${BASE_URL}category/${isbn}`, { withCredentials: true })
                .then(res => {
                    setSelectedEditCategory(res.data.data)
                });
        }
        catch (err) {
            setSelectedEdit({})
        }
    }



    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: 'Num',
            dataIndex: 'num',
            key: 'num',
            width: '5%',

        },
        {
            title: 'Image',
            dataIndex: 'img',
            key: 'img',
            width: '10%',
            render: (img) => (
                <img src={img} alt="" style={{ width: '80px', height: '100px' }} />
            )
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: '30%',
            ...getColumnSearchProps('book'),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: '8%',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Sale',
            dataIndex: 'sale',
            key: 'sale',
            width: '5%',

        },
        {
            title: 'Categories',
            dataIndex: 'categories',
            key: 'categories',
            render: (categories) => (
                <>
                    {categories.map((tag) => (
                        <Tag color="blue" key={tag}>
                            {tag}
                        </Tag>
                    ))}
                </>
            )
        },
        {
            title: 'Reviews',
            dataIndex: 'reviews',
            key: 'reviews',
            width: '8%',
            fixed: 'right',
            render: () => <a onClick={() => setModal2Open(true)}
                style={{ display: 'flex', justifyContent: 'center', fontSize: '2rem' }}>
                <EyeOutlined />
            </a>,
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: '8%',
            render: (record) => <div>
                <div style={{ display: 'inline' }} onClick={() => handleEdit(record.key)} ><EditFilled className='icon-edit' style={{ fontSize: '2.5rem', marginRight: '20px' }} /></div>
                <DeleteFilled 
                onClick={() => handleDeleteProduct(record.key)}
                className='icon-delete' 
                style={{ fontSize: '2.3rem' }} />
            </div>,
        },
    ];
    //api post book 


    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [price, setPrice] = useState('')
    const [sale, setSale] = useState('')
    const [categories, setCategories] = useState([])
    const [description, setDescription] = useState('')
    const [img, setImg] = useState('')
    const [cover_designed, setCover_designed] = useState('')
    const [pages, setPages] = useState('')
    const [publisher, setPublisher] = useState('')
    const [language, setLanguage] = useState('')
    const [released, setReleased] = useState('')


    const presetKey = "rg4c9vsl"
    const cloudName = "dgmlu00dr"

    const fetchImg = async (e) => {
        const file = e.target && e.target.files && e.target.files[0] ? e.target.files[0] : null;
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", presetKey)
        await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
            .then(res => {
                setImg(res.data.secure_url);
                //update user
            })
            .catch(err => {
                console.log(err)
            });
    }


    const handleAddProduct = async () => {
        const data = {
            title: title,
            price: price,
            on_sale: sale,
            image_url: img,
            author_id: author,
            cover_designer: cover_designed,
            pages: pages,
            publisher: publisher,
            lang: language,
            released: released,
            description: description,
        }
        const dataCategories = {
            categories: categories
        }
        try {
            await axios.post(`${BASE_URL}book`, data, { withCredentials: true })
                .then(res => {
                    console.log(res.data.message)
                    console.log(res.data.isbn)
                    for (const element of dataCategories.categories) {
                        try {
                            axios.post(`${BASE_URL}category/${res.data.isbn}`, { category: element }, { withCredentials: true })
                                .then(respon => {
                                    console.log(respon.data.message)
                                    setModal1Open(false)
                                    window.location.reload()
                                })
                        } catch (err) {
                            console.log(err);
                        }
                    }
                });
        }
        catch (err) {
            console.log(err)
        }
    }
    const handleUpdateProduct = async () => {
        const dataUpdate = {
            title: selectedEdit.title,
            price: selectedEdit.price,
            on_sale: selectedEdit.on_sale,
            image_url: selectedEdit.image_url,
            author_id: selectedEdit.author_id,
            cover_designer: selectedEdit.cover_designer,
            pages: selectedEdit.pages,
            publisher: selectedEdit.publisher,
            lang: selectedEdit.lang,
            released: selectedEdit.released,
            description: selectedEdit.description,
        }
        const updateCategories = {
            categories: selectedEditCategory
        }
        try {
            await axios.patch(`${BASE_URL}book/${selectedEdit.isbn}`, dataUpdate, { withCredentials: true })
                .then(res => {
                    console.log(res.data.message)
                    setModal3Open(false)
                    window.location.reload()
                    /* for (const element of updateCategories.categories) {
                        try {
                            axios.post(`${BASE_URL}category/${selectedEdit.isbn}`, { category: element }, { withCredentials: true })
                            .then(respon => {
                                console.log(respon.data.message)
                                setModal3Open(false)
                                window.location.reload()
                            })
                        } catch (err) {
                            console.log(err);
                        }
                    } */
                });
        }
        catch (err) {
            console.log(err)
        }
    }
    const handleDeleteProduct = async (isbn) => {
        try {
            await axios.delete(`${BASE_URL}book/${isbn}`, { withCredentials: true })
                .then(res => {
                    console.log(res.data.message)
                    setModal4Open(false)
                    window.location.reload()
                });
        }
        catch (err) {
            console.log(err)
        }
    }

    /* const dataUpdate = {
        title: selectedEdit.title,
        price: selectedEdit.price,
        on_sale: selectedEdit.on_sale,
        image_url: selectedEdit.image_url,
        author_id: selectedEdit.author_id,
        cover_designer: selectedEdit.cover_designer,
        pages: selectedEdit.pages,
        publisher: selectedEdit.publisher,
        lang: selectedEdit.lang,
        released: selectedEdit.released,
        description: selectedEdit.description,
    }
    console.log(dataUpdate) */
    /* useEffect(() => {
        
        setPages(selectedEdit.pages || ''); // Cập nhật giá trị của pages khi book thay đổi
        setPublisher(selectedEdit.publisher || '');
        setLanguage(selectedEdit.language || '');
        setReleased(selectedEdit.released || '');
        setCover_designed(selectedEdit.cover_designed || '');
        setImg(selectedEdit.image_url || '');
        setDescription(selectedEdit.description || '');
        setCategories(selectedEdit.categories || []);
        setPrice(selectedEdit.price || '');
        setSale(selectedEdit.on_sale || '');
        setAuthor(selectedEdit.author_id || '');
        setTitle(selectedEdit.title || '');

    }, [selectedEdit]); */
    const handleSelectedEditChange = (field, value) => {
        setSelectedEdit(prevState => ({
            ...prevState,
            [field]: value
        }));
    }

    useEffect(() => {
        if (img) {
            handleSelectedEditChange("image_url", img);
            setImg('')
        }
    }, [img]);
    return (
        <section id="content">
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Products</h1>
                    </div>
                </div>
                <div className="table-data">
                    <div className="order">
                        <div className="head">
                            <h3>List Books</h3>
                            <div className='add-product' onClick={() => setModal1Open(true)}><PlusOutlined /> Add</div>

                        </div>
                        <Table
                            columns={columns}
                            dataSource={data}
                        />
                        <Modal
                            title="Add Product"
                            style={{
                                left: 170,

                            }}
                            open={modal1Open}
                            onOk={handleAddProduct}
                            onCancel={() => setModal1Open(false)}
                        >
                            <Form
                                labelCol={{
                                    span: 6,
                                }}
                                wrapperCol={{
                                    span: 14,
                                }}
                                layout="horizontal"

                                style={{
                                    maxWidth: 600,
                                    marginTop: 20,
                                }}
                            >
                                <Form.Item label="Title">
                                    <Input onChange={(e) => setTitle(e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Price">
                                    <Input placeholder='E.g 10.99' onChange={(e) => setPrice(e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Sale">
                                    <Input placeholder='If not sale, e.g 0' onChange={(e) => setSale(e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Image">
                                    <input accept="image/*" type="file" onChange={fetchImg} />
                                </Form.Item>
                                <Form.Item label="Author">
                                    <Select
                                        style={{
                                            width: '100%',
                                        }}
                                        onChange={(e) => setAuthor(e)}
                                        options={[
                                            {
                                                value: 1,
                                                label: 'Sarfaraz',
                                            },
                                            {
                                                value: 2,
                                                label: 'Saifudin A.',
                                            },
                                            {
                                                value: 3,
                                                label: 'Brian O Well',
                                            },
                                            {
                                                value: 4,
                                                label: 'Atkia',
                                            },
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item label="Categories">
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        style={{
                                            width: '100%',
                                        }}
                                        onChange={(e) => setCategories(e)}
                                        placeholder="Please select"
                                        options={options}
                                    />
                                </Form.Item>
                                <Form.Item label="Cover Designer">
                                    <Input onChange={(e) => setCover_designed(e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Pages">
                                    <Input onChange={(e) => setPages(e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Publisher">
                                    <Input onChange={(e) => setPublisher(e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Language">
                                    <Input onChange={(e) => setLanguage(e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Released">
                                    <DatePicker onChange={(e) => setReleased(e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Description">
                                    <TextArea rows={4} onChange={(e) => setDescription(e.target.value)} />
                                </Form.Item>
                            </Form>
                        </Modal>
                        <Modal
                            title="Update Product"
                            style={{
                                left: 170,
                            }}
                            open={modal3Open}
                            onOk={handleUpdateProduct}
                            onCancel={() => setModal3Open(false)}
                        >
                            <Form
                                labelCol={{
                                    span: 6,
                                }}
                                wrapperCol={{
                                    span: 14,
                                }}
                                layout="horizontal"

                                style={{
                                    maxWidth: 600,
                                    marginTop: 20,
                                }}
                            >
                                <Form.Item label="Title">
                                    <Input
                                        value={selectedEdit?.title}
                                        onChange={(e) => setSelectedEdit(prevState => ({ ...prevState, title: e.target.value }))}
                                    />
                                </Form.Item>
                                <Form.Item label="Price">
                                    <Input
                                        value={selectedEdit?.price}
                                        placeholder='E.g 10.99'
                                        onChange={(e) => setSelectedEdit(prevState => ({ ...prevState, price: e.target.value }))} />
                                </Form.Item>
                                <Form.Item label="Sale">
                                    <Input
                                        value={selectedEdit?.on_sale}
                                        placeholder='If not sale, e.g 0'
                                        onChange={(e) => setSelectedEdit(prevState => ({ ...prevState, on_sale: e.target.value }))} />
                                </Form.Item>
                                <Form.Item label="Image" >
                                    <img src={selectedEdit?.image_url} alt="Default Image" width="200" height="300" />
                                    <input accept="image/*" type="file" onChange={fetchImg} />
                                </Form.Item>
                                <Form.Item label="Author">
                                    <Select
                                        value={parseInt(selectedEdit?.author_id)}
                                        style={{
                                            width: '100%',
                                        }}
                                        onChange={(e) => setSelectedEdit(prevState => ({ ...prevState, author_id: parseInt(e) }))}
                                        options={[
                                            {
                                                value: 1,
                                                label: 'Sarfaraz',
                                            },
                                            {
                                                value: 2,
                                                label: 'Saifudin A.',
                                            },
                                            {
                                                value: 3,
                                                label: 'Brian O Well',
                                            },
                                            {
                                                value: 4,
                                                label: 'Atkia',
                                            },
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item label="Categories">
                                    <Select
                                        value={selectedEditCategory}
                                        mode="multiple"
                                        allowClear
                                        style={{
                                            width: '100%',
                                        }}
                                        onChange={(e) => setSelectedEditCategory(e)}
                                        placeholder="Please select"
                                        options={options}
                                    />
                                </Form.Item>
                                <Form.Item label="Cover Designer">
                                    <Input
                                        value={selectedEdit?.cover_designer}
                                        onChange={(e) => setSelectedEdit(prevState => ({ ...prevState, cover_designer: e.target.value }))} />
                                </Form.Item>
                                <Form.Item label="Pages">
                                    <Input
                                        value={selectedEdit?.pages}
                                        onChange={(e) => setSelectedEdit(prevState => ({ ...prevState, pages: e.target.value }))} />
                                </Form.Item>
                                <Form.Item label="Publisher">
                                    <Input
                                        value={selectedEdit?.publisher}
                                        onChange={(e) => setSelectedEdit(prevState => ({ ...prevState, publisher: e.target.value }))} />
                                </Form.Item>
                                <Form.Item label="Language">
                                    <Input
                                        value={selectedEdit?.lang}
                                        onChange={(e) => setSelectedEdit(prevState => ({ ...prevState, lang: e.target.value }))} />
                                </Form.Item>
                                <Form.Item label="Released">
                                    <DatePicker
                                        value={dayjs(selectedEdit?.released)}
                                        onChange={(e) => setSelectedEdit(prevState => ({ ...prevState, released: dayjs(e).format('YYYY-MM-DD') }))} />
                                </Form.Item>
                                <Form.Item label="Description">
                                    <TextArea value={selectedEdit?.description} rows={4}
                                        onChange={(e) => setSelectedEdit(prevState => ({ ...prevState, description: e.target.value }))} />
                                </Form.Item>
                            </Form>
                        </Modal>
                        <Modal
                            title="Vertically centered modal dialog"
                            centered
                            style={{
                                left: 170,

                            }}
                            open={modal2Open}
                            onOk={() => setModal2Open(false)}
                            onCancel={() => setModal2Open(false)}
                        >
                            <p>some contents...</p>
                            <p>some contents...</p>
                            <p>some contents...</p>
                        </Modal>
                        <Modal
                            centered
                            style={{
                                left: 170,
                            }}
                            open={modal4Open}
                            onOk={() => setModal4Open(false)}
                            onCancel={() => setModal4Open(false)}
                        >
                            <h1><WarningFilled style={{color:'red'}}/> Warning </h1>
                            <h2>Are you sure you want to delete this product?</h2>
                        </Modal>

                    </div>
                </div>
            </main>
        </section >
    )
}
export default Products
