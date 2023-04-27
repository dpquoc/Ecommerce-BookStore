import React from 'react'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../../utils/apiURL';

import { useRef } from 'react';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';
import { SearchOutlined, EyeOutlined, EditFilled, DeleteFilled, PlusOutlined, WarningFilled } from '@ant-design/icons';
import {
  Space, Table, Radio, Input, Button, Tag, Modal,

} from 'antd';
import dayjs from 'dayjs';


function Contact() {
  const { TextArea } = Input;
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

  //api blogs
  const [contacts, setContacts] = useState([])
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}contact`, { withCredentials: true })
      setContacts(res?.data.data)
    }
    catch (err) {
      setContacts({})
    }
  }
  const data = [];

  let count = 0;
  for (let i = contacts.length - 1; i >= 0; i--) {
    const contact = contacts[i];
    const item = {
      key: contact.id,
      num: ++count,
      title: contact.title.toString(),
      name: contact.fullname,
      email: contact.email,
      message: contact.message,
    };
    data.push(item);
  }
  const [modal3Open, setModal3Open] = useState(false);

  const [selectedDelete, setSelectedDelete] = useState(null);



  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${BASE_URL}contact/${id}`, { withCredentials: true })
        .then(res => {
          console.log(res.data.message)
          setModal3Open(false);
        })
    }
    catch (err) {
      console.log(err)
    }
  }
  const [value, setValue] = useState(0);

  const handleChange = (id) => {
    console.log(id)
  }
  const columns = [
    {
      title: 'Num',
      dataIndex: 'num',
      key: 'num',
      width: '5%',
    },

    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
      ...getColumnSearchProps('name'),
    },

    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '15%',
      ...getColumnSearchProps('title'),
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '10%',
    },
    {
      title: 'Resolved',
      key: 'operation',
      width: '8%',
      render: (record) =>
      (<div style={{ display: 'flex', marginLeft: '30px' }}> 
        <Radio value={1}></Radio>
      </div>)

    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: '8%',
      render: (record) => <div style={{ display: 'flex', marginLeft: '10px' }}>
        <DeleteFilled
          onClick={() => { setSelectedDelete(record.key); setModal3Open(true) }}
          className='icon-delete'
          style={{ fontSize: '2.3rem' }} />
      </div>,
    },

  ];
  useEffect(() => {
    fetchUser()
  }, [contacts])
  return (
    <section id="content">
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Contacts</h1>
          </div>
        </div>
        <div className="table-data">
          <div className="order">
            <div className="head">
              <div className='head-title'>Recent contacts <span>({contacts.length?? 0} contacts)</span></div>
            </div>
            <Table columns={columns} dataSource={data} />
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
              <h2>Are you sure you want to delete this contact?</h2>
            </Modal>

          </div>
        </div>
      </main>
    </section >
  )
}

export default Contact