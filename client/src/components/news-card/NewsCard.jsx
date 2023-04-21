import { Link } from 'react-router-dom';
import './NewsCard.scss'
import { CalendarOutlined } from '@ant-design/icons';
import axios from 'axios';
import { BASE_URL } from '../../utils/apiURL';
import { useEffect, useState } from 'react';

function NewsCard({id, title, banner_url, publish_date}) {

    const [contentBlog, setContentBlog] = useState([]);
    const summary = contentBlog?.content?.split(' ').slice(0, 20).join(' ') + '...';
    useEffect(() => {
        fetchContentBlog()
    }, []);
    const fetchContentBlog = async () => {
        await axios.get(`${BASE_URL}blog/${id}`, { withCredentials: true })
            .then(res => {
                setContentBlog(res.data.data)
            })
            .catch(err => {
                console.log(err)
                setContentBlog([])
            })
    }

    return (
        <>
            <div className="news-card" style={{background:`url(${banner_url})`,backgroundSize: 'cover'}}>
                <div className="title-content">
                    <h1><Link to={`/detailsNews/${id}`}>{title}</Link></h1>
                    <div className="author"> BookS  </div>
                </div>
                <div className="card-content">
                    {summary}
                    <Link to={`/detailsNews/${id}`}>Countinue Reading →</Link>
                </div>
                
                <div className="card-date"><CalendarOutlined/> {publish_date}</div>
                <div className="gradient-overlay"></div>
                <div className="color-overlay"></div>
            </div>
            
        </>
    );
}

export default NewsCard;