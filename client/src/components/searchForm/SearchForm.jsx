import './SearchForm.scss'
import { Select, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'

function SearchForm() {
    return (
        <>
            <div className='search-form'>
                <input className="search__input" type="text" placeholder="Search book, author, blog..." />
                <a href="" className='btn'><SearchOutlined /><p>Search</p>  </a>
            </div>
        </>
    );
}

export default SearchForm;

