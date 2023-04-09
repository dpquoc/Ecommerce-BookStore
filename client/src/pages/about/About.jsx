import './About.scss'

import { TeamOutlined } from '@ant-design/icons';
import Teamwork from '../../components/imgs/Team-work.png'
import BannerBg from '../../components/imgs/slider-bg.png'

function About() {
    return (
        <>
            <div className="About">
                <div className="About_header">
                    <img src={BannerBg} className="img-bg" alt="" />
                    <div className="Img"><img src={ Teamwork} alt="" /></div>
                    <div className="Introduce">
                        <span>ABOUT US</span>
                        <p>OUR SUCCESS IS NOT ONLY DUE TO QUALITY OF OUT WORK; IT'S DOWN TO ATTITUDE,
                            OUR APPROACH AND THE WAY WE TREAT OUR CLIENTS. </p>
                    </div>
                </div>

                <div className="About_content">
                    <div className="member">
                        <div className="number">01</div>
                        
                        <div className="Circle">
                            <TeamOutlined style={{color: '#45B39D'}} />
                        </div>
                        <div className="name">LÊ TRUNG ĐỨC</div>
                        
                        <div className="member_info">
                            Thiết kế component News-card. Thiết kế giao diện cho News page và About page.
                        </div>
                    </div>
                    <div className="member">
                        <div className="number">02</div>
                        
                        <div className="Circle">
                            <TeamOutlined style={{color: '#DE3163'}} />
                        </div>
                        <div className="name">LÊ BÁ DŨNG</div>
                        
                        <div className="member_info">
                            Thiết kế component News-card. Thiết kế giao diện cho News page và About page.
                        </div>
                    </div>
                    <div className="member">
                        <div className="number">03</div>
                        
                        <div className="Circle">
                            <TeamOutlined style={{color: '#40E0D0'}} />
                        </div>
                        <div className="name">HOÀNG NHẬT QUÂN</div>
                        
                        <div className="member_info">
                            Thiết kế component News-card. Thiết kế giao diện cho News page và About page.
                        </div>
                    </div>
                    <div className="member">
                        <div className="number">04</div>
                        
                        <div className="Circle">
                            <TeamOutlined style={{color: '#F1C40F'}} />
                        </div>
                        <div className="name">ĐẶNG PHÚ QUỐC</div>
                        
                        <div className="member_info">
                            Thiết kế component News-card. Thiết kế giao diện cho News page và About page.
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    );
}

export default About;