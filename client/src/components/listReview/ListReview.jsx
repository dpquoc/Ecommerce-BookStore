import CardReview from '../cardReview/CardReview';
import './ListReview.scss'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper";

function ListReview({ reviews, title }) {

    return (
        <>
            <div className='review'>
                <h1 className="title-review">{title} Book<span>S</span></h1>
                <div className='list-review'>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        freeMode={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[FreeMode, Pagination]}
                        className="mySwiper"
                        style={{height: "300px" }}
                    >
                        {reviews.map((card, index) => (
                            <SwiperSlide key={index}>
                                <CardReview   {...card} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
}

export default ListReview;