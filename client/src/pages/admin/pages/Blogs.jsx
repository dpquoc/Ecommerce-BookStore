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
  Form
} from 'antd';
import dayjs from 'dayjs';




function Blogs() {
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
  const [blogs, setBlogs] = useState([])
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}blog`, { withCredentials: true })
      setBlogs(res?.data.data)
    }
    catch (err) {
      setBlogs({})
    }
  }
  const data = [];

  let count = 0;
  for (let i = blogs.length - 1; i >= 0; i--) {
    const blog = blogs[i];
    const item = {
      key: blog.id,
      num: ++count,
      title: blog.title.toString(),
      banner_url: blog.banner_url,
      publish_date: blog.publish_date,
      tags: blog.tag,
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
      await axios.get(`${BASE_URL}blog/${id}`, { withCredentials: true })
        .then(res => {
          setSelectedEdit(res.data.data)
          setModal2Open(true);
        });
    }
    catch (err) {
      setSelectedEdit({})
    }
  }

  const [title, setTitle] = useState("")
  const [publishDate, setPublishDate] = useState("")
  const [content, setContent] = useState("")
  const [img, setImg] = useState("")

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

  const handleAddBlog = async () => {
    const newBlog = {
      title : title,
      publish_date: publishDate,
      content: content,
      banner_url: img,
    }
    try {
      axios.post(`${BASE_URL}blog`, newBlog,
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
    console.log(newBlog)
  }

  const handleUpdateUser = async () => {
    const updateBlog = {
      title: selectedEdit.title,
      publish_date: selectedEdit.publish_date,
      content: selectedEdit.content,
      banner_url: selectedEdit.banner_url,
    }
    try {
      await axios.patch(`${BASE_URL}blog/${selectedEdit.id}`, updateBlog, { withCredentials: true })
        .then(res => {
          console.log(res.data.message)
          setModal2Open(false);
        })
    }
    catch (err) {
      console.log(err)
    }
  }
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${BASE_URL}blog/${id}`, { withCredentials: true })
        .then(res => {
          console.log(res.data.message)
          setModal3Open(false);
        })
    }
    catch (err) {
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
      handleSelectedEditChange("banner_url", img);
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '20%',
      ...getColumnSearchProps('title'),
    },
    {
      title: 'Banner',
      dataIndex: 'banner_url',
      key: 'banner_url',
      width: '10%',
      render: (img) => (
        <img src={img} alt="" style={{ width: '150px', height: '100px' }} />
      )
    },
    {
      title: 'Publish Date',
      dataIndex: 'publish_date',
      key: 'publish_date',
      width: '10%',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      width: '10%',
      render: (tags) => (
        <>
          {tags.split(", ").map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      )
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: '8%',
      render: (record) => <div>
        <div style={{ display: 'inline' }}
          onClick={() => handleEdit(record.key)}
        >
          <EditFilled className='icon-edit' style={{ fontSize: '2.5rem', marginRight: '20px' }} />

        </div><DeleteFilled
          onClick={() => { setSelectedDelete(record.key); setModal3Open(true) }}
          className='icon-delete'
          style={{ fontSize: '2.3rem' }} />
      </div>,
    },

  ];
  useEffect(() => {
    fetchUser()
  }, [blogs])
  return (
    <section id="content">
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Blogs</h1>
          </div>
        </div>
        <div className="table-data">
          <div className="order">
            <div className="head">
              <div className='head-title'>Recent Blogs <span>({blogs.length?? 0} blogs)</span></div>
              <div className='add-product' onClick={() => setModal1Open(true)}><PlusOutlined /> Add</div>
            </div>
            <Table columns={columns} dataSource={data} />
            <Modal
              centered
              title="Add Blogs"
              style={{
                left: 170,
              }}
              open={modal1Open}
              onOk={handleAddBlog}
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
                <Form.Item label="Publish Date">
                  <DatePicker onChange={(e) => setPublishDate(dayjs(e).format('YYYY-MM-DD'))} />
                </Form.Item>
                <Form.Item label="Banner">
                  <input accept="image/*" type="file" onChange={fetchImg} />
                </Form.Item>
                <Form.Item label="Content">
                  <TextArea rows={4} onChange={(e) => setContent(e.target.value)} />
                </Form.Item>
              </Form>
            </Modal>
            <Modal
              title="Update Blogs"
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
                <Form.Item label="Title">
                  <Input
                    value={selectedEdit?.title}
                    onChange={(e) => setSelectedEdit(prevState => ({ ...prevState, title: e.target.value }))}
                  />
                </Form.Item>
                
                <Form.Item label="Publish Date">
                  <DatePicker
                    value={dayjs(selectedEdit?.publish_date ?? new Date())}
                    onChange={(e) => setSelectedEdit(prevState => ({ ...prevState, publish_date: dayjs(e).format('YYYY-MM-DD') }))} />
                </Form.Item>
                <Form.Item label="Banner" >
                  <img src={selectedEdit?.banner_url} alt="Default Image" width="300" height="220" />
                  <input accept="image/*" type="file" onChange={fetchImg} />
                </Form.Item>
                <Form.Item label="Content">
                  <TextArea rows={4} 
                  value={selectedEdit?.content}
                  onChange={(e) => setSelectedEdit(prevState => ({ ...prevState, content: e.target.value }))} />
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
              <h2>Are you sure you want to delete this blog?</h2>
            </Modal>

          </div>
        </div>
      </main>
    </section >
  )
}

export default Blogs