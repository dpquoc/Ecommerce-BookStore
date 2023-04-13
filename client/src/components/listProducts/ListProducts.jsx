import BookCard from "../book-card/BookCard";
import './ListProducts.scss'

function ListProducts({ products, title, namelogo, hightlight }) {

    const cardElements = products.map((card, index) => (
        <BookCard key={index} {...card} />
    ));
    return (
        <div className="list">
            <h1 className="list-title">{title} <span>{hightlight}</span></h1>
            <div className="card-container">
                {cardElements}
            </div>
        </div>
    );
}

export default ListProducts;