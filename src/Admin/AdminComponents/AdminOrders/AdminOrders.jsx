
import React, { useEffect, useState } from 'react'
import './AdminOrders.scss'
import { GetOrders } from '../../../Redux/Actions/getPrroducts'
import { useDispatch, useSelector } from 'react-redux'
import AdminNavBar from '../AdminNavBar/AdminNavBar'
export default function AdminOrders() {

    const OrdersAdmin = useSelector(state => state.AdminReducer.OrderAdmin)
    const Dispatch = useDispatch()

    useEffect(() => {

        Dispatch(GetOrders())



    }, [OrdersAdmin])


    return (
        <div className='admin-content-side'>
            <AdminNavBar />
<div className='card-order-admin'>
<CardOrder/>
<CardOrder/>
<CardOrder/>
<CardOrder/>

</div>
            <div className='admin-Order'>





                <div className='table-orders'>

                    <table className='table'>

                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Order ID</th>
                                <th>Total</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
<tbody>
{OrdersAdmin.length >= 1?OrdersAdmin?.map((i)=>{
return(
    <tr>
    <td>#{i.OrderId}</td>
    <td>{i.shippingInfo[0].name}</td>
    <td>${i.totalOrder}</td>
    <td>21/3/23</td>
    <td>{i.statue === 'Processing'?<p className='shipped-statue'>Shipped</p>:<p className='Processing-statue'>Processing</p>}</td>
    <td><i class=" remove-order-admin fa-solid fa-trash"></i> <i class=" edit-order-admin fa-regular fa-pen-to-square"></i></td>
    </tr>
)

}):<p>no orders</p>}



</tbody>


                    </table>
                </div>


            </div>
        </div>
    )
}

// <tr>
// <td className='id-table-order'>{i.OrderId}</td>
// <td>{i.shippingInfo[0].name}</td>
// <td>{2023/25/25}</td>

// <td>{i.statue === 'Processing'?<p className='shipped-statue'>Shipped</p>:<p className='Processing-statue'>Processing</p>}</td>
// <td>${i.totalOrder}</td>
// <td className='remove-btn-order'>Remove</td>
// </tr>


function CardOrder() {
    return (



        <div className='card-order-info' style={{ background: 'white' }}>
            <div className='card-order-text'>
                <p>Order Recive</p>
                <h2>26</h2>
            </div>
            <i class="fa-solid fa-clock-rotate-left"></i>
        </div>



    )
}