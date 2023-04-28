import './About.scss'

import { TeamOutlined } from '@ant-design/icons';
import Teamwork from '../../components/imgs/Team-work.png'
import BannerBg from '../../components/imgs/slider-bg.png'

import admin1 from '../../components/imgs/admin1.jpg'
import admin2 from '../../components/imgs/admin2.jpg'
import admin3 from '../../components/imgs/admin3.jpg'
import admin4 from '../../components/imgs/admin4.jpg'
function About() {
    return (
        <>
            <div className="About">
                <div className="About_header">
                    <img src={BannerBg} className="img-bg" alt="" />
                    <div className="Img"><img src={Teamwork} alt="" /></div>
                    <div className="Introduce">
                        <span>ABOUT US</span>
                        <p>Our bookshop was established at beginning of 2023 by four enthusiastic, talent person. The general mission is to provide you with an alternative haven to buy the books you love for the approriate prices. We offer over 10 million books and provide free delivery to over 100 countries.</p>
                    </div>
                </div>

                <div className="About_content">
                    <div className="member">
                        <div className="number">01</div>

                        <div className="Circle">
                            <img src={admin1} style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '50%' }} />
                        </div>
                        <div className="name">LÊ TRUNG ĐỨC</div>

                        <div className="member_info">
                        Frontend<br></br>Thiết kế và hiện thực giao diện responsive cho các trang và thành phần, đảm bảo trải nghiệm người dùng tối ưu trên mọi thiết bị.
                        </div>
                    </div>
                    <div className="member">
                        <div className="number">02</div>

                        <div className="Circle">
                            <img src={admin2} style={{ maxWidth: '150px', height: '150px', borderRadius: '50% ' }} />
                        </div>
                        <div className="name">LÊ BÁ DŨNG</div>

                        <div className="member_info">
                            Frontend<br></br>Thiết kế và hiện thực giao diện responsive cho các trang và thành phần, đảm bảo trải nghiệm người dùng tối ưu trên mọi thiết bị.
                        </div>
                    </div>
                    <div className="member">
                        <div className="number">03</div>

                        <div className="Circle">
                            <img src={admin3} style={{ width: '150px', height: '150px', borderRadius: '50% 50%' }} />
                        </div>
                        <div className="name">HOÀNG NHẬT QUÂN</div>

                        <div className="member_info">
                            Front end<br></br>Hiện thực kết nối các API từ backend, hỗ trợ hiện thực giao diện và triển khai các tính năng cho giao diện người dùng.
                        </div>
                    </div>
                    <div className="member">
                        <div className="number">04</div>

                        <div className="Circle">
                            <img src={admin4} style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '50% ' }} />
                        </div>
                        <div className="name">ĐẶNG PHÚ QUỐC</div>

                        <div className="member_info">
                            Back end<br></br>Hiện thực các API cho backend và cơ sở dữ liệu, đảm bảo dữ liệu được truy vấn, cập nhật và bảo mật một cách hiệu quả.
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default About;