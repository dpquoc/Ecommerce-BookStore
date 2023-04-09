import React from 'react'

function Products() {
    return (
        <section id="content">
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>DashBoard</h1>
                    </div>
                </div>
                <ul className="box-info">
                    <li>
                        <i className='bx bxs-calendar-check'></i>
                        <span className="text">
                            <h3>1020</h3>
                            <p>New Order</p>
                        </span>
                    </li>
                    <li>
                        <i className='bx bxs-group'></i>
                        <span className="text">
                            <h3>2834</h3>
                            <p>Visitors</p>
                        </span>
                    </li>
                    <li>
                        <i className='bx bxs-dollar-circle' ></i>
                        <span className="text">
                            <h3>$2543</h3>
                            <p>Total Sales</p>
                        </span>
                    </li>
                </ul>
                <div className="table-data">
                    <div className="order">
                        <div className="head">
                            <h3>Recent Orders</h3>
                            <i className='bx bx-search' ></i>
                            <i className='bx bx-filter' ></i>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Date Order</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <img src="img/people.png" />
                                        <p>John Doe</p>
                                    </td>
                                    <td>01-10-2021</td>
                                    <td><span className="status completed">Completed</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="img/people.png" />
                                        <p>John Doe</p>
                                    </td>
                                    <td>01-10-2021</td>
                                    <td><span className="status pending">Pending</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="img/people.png" />
                                        <p>John Doe</p>
                                    </td>
                                    <td>01-10-2021</td>
                                    <td><span className="status process">Process</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="img/people.png" />
                                        <p>John Doe</p>
                                    </td>
                                    <td>01-10-2021</td>
                                    <td><span className="status pending">Pending</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="img/people.png" />
                                        <p>John Doe</p>
                                    </td>
                                    <td>01-10-2021</td>
                                    <td><span className="status completed">Completed</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            {/* <!-- MAIN --> */}
        </section>
    )
}
export default Products
