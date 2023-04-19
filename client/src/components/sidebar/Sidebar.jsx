import React from 'react'
import './Sidebar.scss'

export default function Sidebar(props) {
    const { categorys } = props;
    return (

        <div className='categorys'>
            <h2 className='title-category'>Category</h2>
            <div className='list-categorys'>
                {
                    categorys.map((category) => {
                        return (
                            <div key={category.id} className='category'>
                                {category.name}
                            </div>
                        )
                    })
                }
            </div>

        </div >

    )
}
