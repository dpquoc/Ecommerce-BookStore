import './Contact.scss'

import { Button, Form, Input, Select, Radio, Card, Col, Row, Space } from 'antd';
import {
  HomeOutlined,
  LoadingOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined, EnvironmentFilled, MailTwoTone, PhoneTwoTone, ClockCircleTwoTone
} from '@ant-design/icons';
import HeroBanner from '../../components/heroBanner/HeroBanner';

import pageHeaderProduct from '../../components/imgs/banner2.jpg'
import SearchForm from '../../components/searchForm/SearchForm';

import avt from '../../components/imgs/avt.png'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
  console.log(values);
};
function Contact() {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };
  const handleChange = () => {
    form.setFieldsValue({
      sights: [],
    });
  };
  //prefix for phone number
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );
  return (
    <>
      <div className="container-contact">
        <HeroBanner
          title="#contact"
          summary="Brings you news about books and authors along with our picks for great reads!"
          srcImg={pageHeaderProduct}
        />

        <div className="mid0">
          <div className="info">
            <section >
              <div >
                <h1>GET IN TOUCH</h1>
                <br></br>
                <h1 style={{ fontSize: '250%' }}>Visit one of our agency location or contact us today</h1>
                <br></br>
                <h3>Head Office</h3>
                <br></br>
                <div style={{ fontSize: '150%' }}>
                  <br></br>
                  <EnvironmentFilled />
                  &nbsp;
                    268 Ly Thuong Kiet, phuong 14 , quan 10, Thanh pho HCM  

                  <br></br>
                  <br></br>
                  <MailTwoTone />
                  &nbsp;
                  contact@example.com
                  <br></br>
                  <br></br>
                  <PhoneTwoTone />
                  &nbsp;
                  0332 460 567
                  <br></br>
                  <br></br>
                  <ClockCircleTwoTone />
                  &nbsp;
                  Monday to Friday: 8.00 AM to 16.00 PM


                </div>
              </div>
              
            </section>
          </div>
          <div className="maps">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.511579557386!2d106.65571311432022!3d10.772074992324471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec3c161a3fb%3A0xef77cd47a1cc691e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBCw6FjaCBraG9hIC0gxJDhuqFpIGjhu41jIFF14buRYyBnaWEgVFAuSENN!5e0!3m2!1svi!2s!4v1680513438326!5m2!1svi!2s" width="100%" height="500" ></iframe>
                {/* width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" */}
              
          </div>
        </div>
        <div className="mid1">
          <div className="form1"><h1>We love to hear from you</h1>
            <br></br>
            <Form {...layout} name="nest-messages" onFinish={onFinish} style={{ maxWidth: 600 }} validateMessages={validateMessages}>
              <input type="text" placeholder="Your Name" />
              <br></br>
              <br></br>
              <input type="text" placeholder="E-mail" />
              <br></br>
              <br></br>
              <input type="text" placeholder="E-mail" />
              <br></br>
              <br></br>
              <textarea name="" id="" cols="30" rows="10" placeholder="Your Message"></textarea>
              <br></br>
              <br></br>
              <button className="normal" >Submit</button>
            </Form>
          </div>
          <div className="contacts">
            <div className="tag1">
              <div className="img1">
                <img src={avt}   />
                {/* acbbb */}
              </div>
              <div className="rate">
                <h1>Harry Potter</h1>

                <br></br>

                <h2>Senior Marketing Manager <br></br> Phone: +000 123 000 77 88 <br></br> Email: contact@examole.com</h2>
              </div>
            </div>
            <div className="tag1">
              <div className="img1">
                <img src={avt}  />
                {/* acbbb */}
              </div>
              <div className="rate">
                <h1>Harry Potter</h1>

                <br></br>

                <h2>Senior Marketing Manager <br></br> Phone: +000 123 000 77 88 <br></br> Email: contact@examole.com</h2>
              </div>
            </div>
            <div className="tag1">
              <div className="img1">
                <img src={avt}  />
                {/* acbbb */}
              </div>
              <div className="rate">
                <h1>Harry Potter</h1>

                <br></br>

                <h2>Senior Marketing Manager <br></br> Phone: +000 123 000 77 88 <br></br> Email: contact@examole.com</h2>
              </div>
            </div>
            
          </div>

        </div>
        {/* <div className="FAQs">
          <h1>FAQs</h1>
          <Row gutter={50}>
            <Col span={8}>
              <Card title="How to notify new info from web immediately?" bordered={false} >
                ...........
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Card title" bordered={false}  >
                .......
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Card title" bordered={false}  >
                .......
              </Card>
            </Col>

          </Row>

        </div> */}
      </div>
    </>
  );
}

export default Contact;
