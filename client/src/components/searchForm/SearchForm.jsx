import './SearchForm.scss'
import { Select, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function SearchForm() {
    const [searchForm, setSearchForm] = useState("");
    return (
        <>
            <div className='search-form'>
                <input
                    className="search__input"
                    type="text"
                    placeholder="Search book, author..."
                    onChange={(e) => setSearchForm(e.target.value)}
                />
                <Link to={`/search/${searchForm}`}  className='btn' ><SearchOutlined /><p>Search</p> </Link>
            </div>
        </>
    );
}

export default SearchForm;

