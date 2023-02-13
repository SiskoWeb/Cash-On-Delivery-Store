
import React, { useEffect, useState } from 'react'
import './AdminOrders.scss'
import { GetOrders } from '../../../Redux/Actions/getPrroducts'
import { useDispatch, useSelector } from 'react-redux'
import AdminNavBar from '../AdminNavBar/AdminNavBar'
import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from '../../../FireBase/FireBase'
import { Link } from 'react-router-dom'
export default function AdminOrders() {
    const [update, setUpdate] = useState(false)
    const OrdersAdmin = useSelector(state => state.AdminReducer.OrderAdmin)
    const Dispatch = useDispatch()

    useEffect(() => {

        Dispatch(GetOrders())



    }, [OrdersAdmin, update])

    const removeProduct = async (id) => {
        const pathimg = doc(db, "Orders", id)
        await deleteDoc(pathimg)

        setUpdate(!update)
    }

    return (
        <div className='admin-content-side'>
            <AdminNavBar />
            <div className='card-order-admin'>
                <CardOrder orderNumber={OrdersAdmin?.length} />


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
                            {OrdersAdmin.length >= 1 ? OrdersAdmin?.map((i) => {
                                return (
                                    <tr>
                                        <td><Link to={`/orders/${i.OrderId}`}>#{i.OrderId}</Link></td>
                                        <td>{i.shippingInfo[0].name}</td>
                                        <td>${i.totalOrder}</td>
                                        <td>21/3/23</td>
                                        <td>{i.statue === 'Processing' ? <p className='shipped-statue'>Shipped</p> : <p className='Processing-statue'>Processing</p>}</td>
                                        <td><i onClick={() => removeProduct(i.id)} class=" remove-order-admin fa-solid fa-trash"></i> <i class=" edit-order-admin fa-regular fa-pen-to-square"></i></td>
                                    </tr>
                                )

                            }) : <p>no orders</p>}



                        </tbody>


                    </table>
                </div>


            </div>
        </div>
    )
}


function CardOrder({ orderNumber }) {


    return (



        <div className='card-order-info' style={{ background: 'white' }}>
            <div className='card-order-text'>
                <p>Order Recive</p>
                <h2>{orderNumber}</h2>
            </div>

        </div>



    )
}