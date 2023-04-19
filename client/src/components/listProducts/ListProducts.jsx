import BookCard from "../book-card/BookCard";
import './ListProducts.scss'


function ListProducts({ products, title, liked }) {

    const cardElements = products.map((card, index) => (
        <BookCard key={index} {...card} liked= {liked}  />
    ));
    const cardElementsSale = products.filter((card) => (card.onsale > 0)).map((card, index) => (
        <BookCard key={index} {...card} />
    ));
    return (
        <div className="list">
            {title ? <h1 className="list-title">{title} Book<span>S</span></h1> : <></>}
            {title === "Sale" ?
                <div className="card-container">
                    {cardElementsSale}
                </div>
                :
                <div className="card-container">
                    {cardElements}
                </div>
            }

        </div>
    );
}

export default ListProducts;