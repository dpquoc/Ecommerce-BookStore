import { Avatar } from '@mui/material';
import './CardReview.scss'
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';

function CardReview({ book_isbn, title, fullname, avt_url, rating, review }) {
    return (
        <>
            <div className="review_item">
                <div className="author">
                    <Avatar
                        variant="square" src={avt_url ?? ''}
                        sx={{ fontSize: '3rem' }}
                    >
                        {avt_url ? <></> : (fullname && fullname.charAt(0).toUpperCase())}
                    </Avatar>
                    <h4>{fullname}</h4>
                    <Rating name="read-only" value={parseInt(rating)} readOnly />
                </div>
                <div className="review_words">
                    <p>{review}</p>

                </div>
                <div className="review-books">Review <Link to={`/products/${book_isbn}`}>{title} </Link></div>
            </div>
        </>
    );
}

export default CardReview;