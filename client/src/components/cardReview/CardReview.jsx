import './CardReview.scss'
import Rating from '@mui/material/Rating';

function CardReview({ id, name, cover, rating, review }) {
    return (
        <>
            <div className="review_item">
                <div className="author">
                    <img src={cover} alt="Reviewer 1" />
                    <h4>{name}</h4>
                    <Rating name="read-only" value={rating} readOnly/>
                </div>
                <div className="review_words"><p>{review}</p> </div>
            </div>
        </>
    );
}

export default CardReview;