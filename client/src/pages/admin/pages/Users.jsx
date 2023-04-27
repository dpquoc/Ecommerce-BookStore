import React from 'react'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../../utils/apiURL';

import { useRef } from 'react';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';
import { SearchOutlined, EyeOutlined, EditFilled, DeleteFilled, PlusOutlined, WarningFilled } from '@ant-design/icons';
import {
    Space, Table, Select, Input, Button, Tag, Modal,
    DatePicker,
    Form,

} from 'antd';
import dayjs from 'dayjs';


function Users() {
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
    const data = [];
    let count = 0;
    const filteredUsers = users.filter(user => user.role === "user");
    for (let i = filteredUsers.length - 1; i >= 0; i--) {
        const user = filteredUsers[i];
        const item = {
            key: user.id,
            num: ++count,
            name: user.fullname.toString(),
            avt: user.avt_url,
            bday: user.bday,
            username: user.username,
            email: user.email,
            role: user.role,
        };
        data.push(item);
    }
    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    const [modal3Open, setModal3Open] = useState(false);

    const [selectedEdit, setSelectedEdit] = useState(null);
    const [selectedDelete, setSelectedDelete] = useState(null);

    const handleEdit = async (id) => {
        try {
            await axios.get(`${BASE_URL}user/${id}`, { withCredentials: true })
                .then(res => {
                    setSelectedEdit(res.data.data)
                    setModal2Open(true);
                });
        }
        catch (err) {
            setSelectedEdit({})
        }
    }

    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [bday, setBday] = useState("");
    const [password, setPassword] = useState("");
    const [img, setImg] = useState("");

    //api img 
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

    const handleAddUser = async () => {
        const newUser = {
            fullname: fullname.toString(),
            username: username.toString(),
            email: email.toString(),
            bday: bday,
            password: password.toString(),
            avt_url: img,
        }
        try {
            axios.post(`${BASE_URL}auth/register`, newUser,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                })
                .then(res => {
                    console.log(res.data.message)
                    setModal1Open(false);
                })

        }
        catch (err) {
            console.log(err)
        }
        console.log(newUser)
    }
    const handleUpdateUser = async () => {
        const updateUser = {
            fullname: selectedEdit.fullname.toString(),
            bday: selectedEdit.bday,
            avt_url: selectedEdit.avt_url,
        }
        try{
            await axios.patch(`${BASE_URL}user/${selectedEdit.id}`, updateUser, { withCredentials: true })
            .then(res => {
                console.log(res.data.message)
                setModal2Open(false);
            })
        }
        catch(err){
            console.log(err)
        }
    }
    const handleDeleteUser = async (id) => {
        try{
            await axios.delete(`${BASE_URL}user/${id}`, { withCredentials: true })
            .then(res => {
                console.log(res.data.message)
                setModal3Open(false);
            })
        }
        catch(err){
            console.log(err)
        }
    }
    const handleSelectedEditChange = (field, value) => {
        setSelectedEdit(prevState => ({
            ...prevState,
            [field]: value
        }));
    }
    useEffect(() => {
        if (img) {
            handleSelectedEditChange("avt_url", img);
        }
    }, [img]);

    const columns = [
        {
            title: 'Num',
            dataIndex: 'num',
            key: 'num',
            width: '5%',
        },
        {
            title: 'Avatar',
            dataIndex: 'avt',
            key: 'avt',
            width: '5%',
            render: (img) => (
                <img src={img} alt="" style={{ width: '50px', height: '50px' }} />
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Birthday',
            dataIndex: 'bday',
            key: 'bday',
            width: '10%',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            width: '10%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '10%',

        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: '8%',
            render: (role) => (
                <Tag color='geekblue'>
                    {role.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: '8%',
            render: (record) => <div>
                <div style={{ display: 'inline' }}
                    onClick={() => handleEdit(record.key)}
                ><EditFilled className='icon-edit' style={{ fontSize: '2.5rem', marginRight: '20px' }} />
                </div>
                <DeleteFilled
                    onClick={() => { setSelectedDelete(record.key); setModal3Open(true) }}
                    className='icon-delete'
                    style={{ fontSize: '2.3rem' }} />
            </div>,
        },

    ];
    useEffect(() => {
        fetchUser()
    }, [users])
    return (
        <section id="content">
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Users</h1>
                    </div>
                </div>
                <div className="table-data">
                    <div className="order">
                        <div className="head">
                            <div className='head-title'>Recent User <span>({filteredUsers.length ?? 0} users)</span></div>
                            <div className='add-product' onClick={() => setModal1Open(true)}><PlusOutlined /> Add</div>
                        </div>
                        <Table columns={columns} dataSource={data} />
                        <Modal
                            centered
                            title="Add User"
                            style={{
                                left: 170,
                            }}
                            open={modal1Open}
                            onOk={handleAddUser}
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
                                <Form.Item label="Fullname">
                                    <Input onChange={(e) => setFullname(e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Email">
                                    <Input placeholder='exampl@gmail' onChange={(e) => setEmail(e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Birthday">
                                    <DatePicker onChange={(e) => setBday(dayjs(e).format('YYYY-MM-DD'))} />
                                </Form.Item>
                                <Form.Item label="Avatar">
                                    <input accept="image/*" type="file" onChange={fetchImg} />
                                </Form.Item>
                                <Form.Item label="Username">
                                    <Input onChange={(e) => setUsername(e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Password">
                                    <Input onChange={(e) => setPassword(e.target.value)} />
                                </Form.Item>
                            </Form>
                        </Modal>
                        <Modal
                            title="Update User"
                            style={{
                                left: 170,
                            }}
                            open={modal2Open}
                            onOk={handleUpdateUser}
                            onCancel={() => setModal2Open(false)}
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
                                <Form.Item label="Fullname">
                                    <Input
                                        value={selectedEdit?.fullname}
                                        onChange={(e) => setSelectedEdit(prevState => ({ ...prevState, fullname: e.target.value }))}
                                    />
                                </Form.Item>
                                <Form.Item label="Email">
                                    <Input
                                        value={selectedEdit?.email}
                                        readOnly
                                    />
                                </Form.Item>
                                <Form.Item label="Birthday">
                                    <DatePicker
                                        value={dayjs(selectedEdit?.bday?? new Date())}
                                        onChange={(e) => setSelectedEdit(prevState => ({ ...prevState, bday: dayjs(e).format('YYYY-MM-DD') }))} />
                                </Form.Item>
                                <Form.Item label="Avatar" >
                                    <img src={selectedEdit?.avt_url} alt="Default Image" width="200" height="250" />
                                    <input accept="image/*" type="file" onChange={fetchImg} />
                                </Form.Item>
                                <Form.Item label="Username">
                                    <Input
                                        readOnly
                                        value={selectedEdit?.username}
                                    />
                                </Form.Item>

                            </Form>
                        </Modal>
                        <Modal
                            centered
                            style={{
                                left: 170,
                            }}
                            open={modal3Open}
                            onOk={() => handleDeleteUser(selectedDelete)}
                            onCancel={() => setModal3Open(false)}
                        >
                            <h1><WarningFilled style={{ color: 'red' }} /> Warning </h1>
                            <h2>Are you sure you want to delete this user?</h2>
                        </Modal>
                    </div>
                </div>
            </main>
        </section >
    )
}

export default Users