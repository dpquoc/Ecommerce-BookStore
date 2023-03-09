import './HeroBanner.scss'


function HeroBanner(props) {
    return (
        <>
            <section id="page-header" style={{backgroundImage: `url(${props.srcImg})`}}>
                <h2>{props.title}</h2>
                <p>{props.summary}</p>
            </section>
        </>
    );
}

export default HeroBanner;