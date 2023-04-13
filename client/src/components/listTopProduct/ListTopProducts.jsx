import './ListTopProducts.scss'
import Rating from '@mui/material/Rating';
import React from 'react'

export default function ListTopProducts(props) {
  const { topProducts } = props;
  return (
    <div className='list-top-products'>
      <h4 className='title-topProducts'>Top products</h4>
      {
        topProducts.map((product) => {
          return (
            <div key={product.id}>
              {
                product.rating == 5 && (
                  <div className='card-topProducts'>
                    <img src={product.cover} alt={product.cover} width={100} />
                    <div className='product-info'>    
                      <h4>{product.title}</h4>
                      <h3>by <a href="">{product.author}</a></h3>
                      <Rating name="read-only" value={product.rating} readOnly size="large" />
                      <p className='price'>${product.price - product.price * product.sale / 100}</p>
                    </div>
                  </div>
                )
              }
            </div>
          )
        })
      }
    </div >
  )
}
