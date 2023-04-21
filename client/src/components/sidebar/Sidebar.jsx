import React from 'react'
import './Sidebar.scss'
import { Link } from 'react-router-dom'

export default function Sidebar(props) {
    const { categorys } = props;
    return (

        <div className='categorys'>
            <h2 className='title-category'>Category</h2>
            <div className='list-categorys'>
                {
                    categorys.map((category) => {
                        return (
                            <Link key={category.id} className='category' to={`/category/${category.name}`}>
                                {category.name}
                            </Link>
                        )
                    })
                }
            </div>

        </div >

    )
}
