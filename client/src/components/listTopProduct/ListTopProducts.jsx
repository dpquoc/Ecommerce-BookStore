import './ListTopProducts.scss'

import React from 'react'
import TopCard from '../topCard/TopCard';

export default function ListTopProducts(props) {
  const { topProducts } = props;
  return (
    <div className='list-top-products'>
      <h4 className='title-topProducts'>Top products</h4>
      {
        topProducts.map((product,index) => (
          <TopCard key={index} {...product} />
        ))
      }
    </div >
  )
}
