import { Link } from 'react-router-dom';
import './NewsCard.scss'
import { CalendarOutlined } from '@ant-design/icons';
function NewsCard() {
    return (
        <>
            
            <div class="news-card">
                <div class="title-content">
                    <h1><Link to="/detailsNews">Title Here</Link></h1>
                    <div class="author"> Author here </div>
                </div>
                <div class="card-content">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim... 
                    <Link to="/detailsNews">Countinue Reading →</Link>
                </div>
                
                <div class="card-date"><CalendarOutlined/> March 26 2023</div>
                <div class="gradient-overlay"></div>
                <div class="color-overlay"></div>
            </div>
            
        </>
    );
}

export default NewsCard;