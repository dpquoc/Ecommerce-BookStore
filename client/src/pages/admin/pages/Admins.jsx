import React from 'react'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../../utils/apiURL';
import { PlusOutlined, SearchOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag } from 'antd';
import { useRef } from 'react';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';




function Admins() {
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
    const filteredAdmins = users.filter(user => user.role === "admin");
    let count = 0;
    for (let i = 0; i < filteredAdmins.length; i++) {
        const user = filteredAdmins[i];
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
                <Tag color='volcano'>
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
                /* onClick={() => handleEdit(record.key)}  */
                ><EditFilled className='icon-edit' style={{ fontSize: '2.5rem', marginRight: '20px' }} />
                </div>
                <DeleteFilled
                    /* onClick={() => { setSelectedDelete(record.key); setModal4Open(true) }} */
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
                        <h1>Admins</h1>
                    </div>
                </div>
                <div className="table-data">
                    <div className="order">
                        <div className="head">
                            <div className='head-title'>Recent Admin <span>({filteredAdmins.length} admins)</span></div>
                            <div className='add-product' onClick={() => setModal1Open(true)}><PlusOutlined /> Add</div>
                        </div>
                        <Table columns={columns} dataSource={data} />;
                    </div>
                </div>
            </main>
        </section >
    )
}

export default Admins