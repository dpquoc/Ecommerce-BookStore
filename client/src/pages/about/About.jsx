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
                        Front end<br></br>Thiết kế component, giao diện và reponsive  cho các page.
                        </div>
                    </div>
                    <div className="member">
                        <div className="number">02</div>

                        <div className="Circle">
                            <img src={admin2} style={{ maxWidth: '150px', height: '150px', borderRadius: '50% ' }} />
                        </div>
                        <div className="name">LÊ BÁ DŨNG</div>

                        <div className="member_info">
                            Front end<br></br>Thiết kế component, giao diện và reponsive  cho các page.
                        </div>
                    </div>
                    <div className="member">
                        <div className="number">03</div>

                        <div className="Circle">
                            <img src={admin3} style={{ width: '150px', height: '150px', borderRadius: '50% 50%' }} />
                        </div>
                        <div className="name">HOÀNG NHẬT QUÂN</div>

                        <div className="member_info">
                            Back end<br></br>Viết API kết nối giữa các hệ thống
                        </div>
                    </div>
                    <div className="member">
                        <div className="number">04</div>

                        <div className="Circle">
                            <img src={admin4} style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '50% ' }} />
                        </div>
                        <div className="name">ĐẶNG PHÚ QUỐC</div>

                        <div className="member_info">
                            Back end<br></br>Viết API kết nối giữa các hệ thống
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default About;