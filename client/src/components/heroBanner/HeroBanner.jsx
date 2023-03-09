import './HeroBanner.scss'
import pageHeaderProduct from '../imgs/banner-01.jpg'

function HeroBanner(props) {
    return (
        <>
            <section id="page-header" style={{backgroundImage: `url(${pageHeaderProduct})`}}>
                <h2>{props.title}</h2>
                <p>{props.summary}</p>
            </section>
        </>
    );
}

export default HeroBanner;