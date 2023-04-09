
import HeroBanner from '../../components/heroBanner/HeroBanner';
import SearchForm from '../../components/searchForm/SearchForm';

import pageHeaderProduct from '../../components/imgs/banner-01.jpg'
import ListProducts from '../../components/listProducts/ListProducts';
import './Products.scss'

import { Slider,Rate } from 'antd';

import React, { useState } from 'react'

import book1 from '../../components/imgs/book1.jpg'
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
const marks = {
  0: '0$',
  20: '10$',
  40: '20$',
  60: '30$',
  80: '40$',
  100: {
    style: {
      color: '#f50',
    },
    label: <strong>50$</strong>,
  },
};
const products = [
  {
    id: 123,
    cover: "https://hostacmee.space/demo/bookchoix/wp-content/uploads/2021/03/mastering-the-kitchen-572x764-1.jpg",
    category: "Food",
    title: "Mastering the Kitchen Series",
    author: "Ellie Thomson, Harry",
    rating: 4,
    price: 21,
    sale: 0
  },
  {
    id: 456,
    cover: "https://hostacmee.space/demo/bookchoix/wp-content/uploads/2021/03/mastering-the-kitchen-572x764-1.jpg",
    category: "Food",
    title: "Mastering the Kitchen Series",
    author: "Ellie Thomson, Harry",
    rating: 4,
    price: 21,
    sale: 15
  },
  {
    id: 789,
    cover: "https://hostacmee.space/demo/bookchoix/wp-content/uploads/2021/03/mastering-the-kitchen-572x764-1.jpg",
    category: "Food",
    title: "Mastering the Kitchen Series",
    author: "Ellie Thomson, Harry",
    rating: 4,
    price: 21,
    sale: 15
  },
  {
    id: 23,
    cover: "https://hostacmee.space/demo/bookchoix/wp-content/uploads/2021/03/mastering-the-kitchen-572x764-1.jpg",
    category: "Food",
    title: "Mastering the Kitchen Series",
    author: "Ellie Thomson, Harry",
    rating: 4,
    price: 21,
    sale: 15
  },
  {
    id: 13,
    cover: "https://hostacmee.space/demo/bookchoix/wp-content/uploads/2021/03/mastering-photography-572x764-1.jpg",
    category: "Food",
    title: "Mastering the Kitchen Series",
    author: "Ellie Thomson, Harry",
    rating: 4,
    price: 21,
    sale: 15
  },
  {
    id: 13,
    cover: "https://hostacmee.space/demo/bookchoix/wp-content/uploads/2021/03/mastering-photography-572x764-1.jpg",
    category: "Food",
    title: "Mastering the Kitchen Series",
    author: "Ellie Thomson, Harry",
    rating: 4,
    price: 21,
    sale: 15
  },
  {
    id: 13,
    cover: "https://hostacmee.space/demo/bookchoix/wp-content/uploads/2021/03/mastering-photography-572x764-1.jpg",
    category: "Food",
    title: "Mastering the Kitchen Series",
    author: "Ellie Thomson, Harry",
    rating: 4,
    price: 21,
    sale: 15
  },
  {
    id: 13,
    cover: "https://hostacmee.space/demo/bookchoix/wp-content/uploads/2021/03/mastering-photography-572x764-1.jpg",
    category: "Food",
    title: "Mastering the Kitchen Series",
    author: "Ellie Thomson, Harry",
    rating: 4,
    price: 21,
    sale: 15
  },
  {
    id: 13,
    cover: "https://hostacmee.space/demo/bookchoix/wp-content/uploads/2021/03/mastering-photography-572x764-1.jpg",
    category: "Food",
    title: "Mastering the Kitchen Series",
    author: "Ellie Thomson, Harry",
    rating: 4,
    price: 21,
    sale: 15
  },
];

function Products() {
  const [disabled, setDisabled] = useState(false);
  const onChange = (checked) => {
    setDisabled(checked);
  };
  const [value, setValue] = useState(3)
  return (
    <>
      <div className="container-products">

        <HeroBanner
          title="#products"
          summary="A place where you can find the books you need!"
          srcImg={pageHeaderProduct}
        />
        <SearchForm />
        <div>
          
          <div className="right">
            <div className="filter">
              <h2>FILTER BY PRICE</h2>
              <Slider range marks={marks} defaultValue={[26, 50]} />
              <button className="but1"> Filter</button>
              
            </div>
            <br></br>
            
            <div className="top-rate">
              <h2 className="pad">TOP RATED PRODUCTS</h2>
              <br></br>
              
              <div className="tag2"> 
                <div className="img2">
                  <img src={book1} style={{ width: '150%' }} />
                  {/* acbbb */}
                </div>
                <div className="rate2">
                  <h3>Harry Potter</h3>
                  {/* <br></br> */}
                    {/* <Rate tooltips={desc} onChange={setValue} value={value} />
                    {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}  */}
                    <Rate disabled defaultValue={products[0].rating}/>
                    
                    <br></br>
                    <br></br>
                    <h4 >${products[0].price*(100-products[0].sale)/100}</h4>
                </div>
              </div>
              <div className="tag2"> 
                <div className="img2">
                  <img src={book1} style={{ width: '150%' }} />
                  {/* acbbb */}
                </div>
                <div className="rate2">
                  <h3>Harry Potter</h3>
                  {/* <br></br> */}
                  <Rate disabled defaultValue={products[1].rating}/>
                    <br></br>
                    <br></br>
                    <h4 >${products[1].price*(100-products[1].sale)/100}</h4>
                </div>
                
              </div>
              <div className="tag2"> 
                <div className="img2">
                  <img src={book1} style={{ width: '150%' }} />
                  {/* acbbb */}
                </div>
                <div className="rate2">
                  <h3>Harry Potter</h3>
                  {/* <br></br> */}
                  <Rate disabled defaultValue={products[2].rating}/>
                    <br></br>
                    <br></br>
                  <h4 >${products[2].price*(100-products[2].sale)/100}</h4>
                </div>
                
              </div>
              <div className="tag2"> 
                <div className="img2">
                  <img src={book1} style={{ width: '150%' }} />
                  {/* acbbb */}
                </div>
                <div className="rate2">
                  <h3>Harry Potter</h3>
                  {/* <br></br> */}
                  <Rate disabled defaultValue={products[3].rating}/>
                    <br></br>
                    <br></br>
                    <h4 >${products[3].price*(100-products[3].sale)/100}</h4>
                </div>
                
              </div>
              <div className="tag2"> 
                <div className="img2">
                  <img src={book1} style={{ width: '150%' }} />
                  {/* acbbb */}
                </div>
                <div className="rate2">
                  <h3>Harry Potter</h3>
                  {/* <br></br> */}
                  <Rate disabled defaultValue={products[4].rating}/>
                    <br></br>
                    <br></br>
                    <h4 >${products[4].price*(100-products[4].sale)/100}</h4>
                    <h4>
                    {/* {sale ? (
                                <>
                                    ${products[4].price - products[4].price * products[4].sale/ 100} <span>${products[4].price}</span>
                                </>
                            ) : (<>${products[4].price}</>)} */}
                    </h4>
                </div>
                
              </div>
                    
              
              
              
              
              
              
              
              
            </div>
          </div>
          <div className="main-product">
            <ListProducts products={products} />

          </div>
        </div>




      </div>

    </>
  );
}

export default Products;
