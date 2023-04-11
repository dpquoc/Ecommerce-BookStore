import BookCard from "../book-card/BookCard";
import './ListProducts.scss'

function ListProducts({ products , title }) {

    const cardElements = products.map((card, index) => (
        <BookCard key={index} {...card} />
    ));
    return (
        <div className="list">
            {title? <h1 className="list-title">{title} Book<span>S</span></h1> : <></>}
            <div className="card-container">
                {cardElements}
            </div>
        </div>
    );
}

export default ListProducts;