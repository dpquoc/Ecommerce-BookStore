import { Link } from 'react-router-dom';
import './NewsCard.scss'
import { CalendarOutlined } from '@ant-design/icons';
function NewsCard() {
    return (
        <>
            
            <div className="news-card">
                <div className="title-content">
                    <h1><Link to="/detailsNews">Title Here</Link></h1>
                    <div className="author"> Author here </div>
                </div>
                <div className="card-content">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim... 
                    <Link to="/detailsNews">Countinue Reading →</Link>
                </div>
                
                <div className="card-date"><CalendarOutlined/> March 26 2023</div>
                <div className="gradient-overlay"></div>
                <div className="color-overlay"></div>
            </div>
            
        </>
    );
}

export default NewsCard;