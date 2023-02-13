
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
    const [income, setIncome] = useState(0)
    const OrdersAdmin = useSelector(state => state.AdminReducer.OrderAdmin)
    const Dispatch = useDispatch()

    useEffect(() => {
        /// get data orders from redux firbease
        Dispatch(GetOrders())



    }, [OrdersAdmin, update])


    // remove order 
    const removeProduct = async (id) => {
        const pathimg = doc(db, "Orders", id)
        await deleteDoc(pathimg)

        setUpdate(!update)
    }


    useEffect(() => {

        // sum total all orders
        setIncome(OrdersAdmin.reduce(
            (accumulator, currentValue) => accumulator + currentValue.totalOrder,
            0
        ))


    }, [OrdersAdmin])

    return (
        <div className='admin-content-side'>
            <AdminNavBar />
            <div className='card-order-admin'>
                <div className='card-order-info' style={{ background: 'white' }}>
                    <div className='card-order-text'>
                        <p>Orders recive</p>
                        <h2>{OrdersAdmin?.length}</h2>
                    </div>

                </div>
                <div className='card-order-info' style={{ background: 'white' }}>
                    <div className='card-order-text'>
                        <p>Income</p>
                        <h2>${income}</h2>
                    </div>

                </div>



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

                                        <td>${Math.round(i.totalOrder * 1).toFixed(2)}</td>
                                        <td>21/3/23</td>
                                        <td> {i.status === 'Canceld' ? <p className='Canceld-statue'>Canceld</p> : i.status === 'Shipped' ? <p className='shipped-statue'>Shipped</p> : <p className='Processing-statue'>Processing</p>}</td>
                                        <td><i onClick={() => removeProduct(i.id)} class=" remove-order-admin fa-solid fa-trash"></i> <Link to={`/orders/${i.OrderId}`}><i class=" edit-order-admin fa-regular fa-pen-to-square"></i></Link></td>
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


