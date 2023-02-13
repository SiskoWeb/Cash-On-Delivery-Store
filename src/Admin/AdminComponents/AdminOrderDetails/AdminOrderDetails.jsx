import React from 'react'
import AdminNavBar from '../AdminNavBar/AdminNavBar'
import './AdminOrderDetails.scss'
import testorder from '../../../Images/knife/0ef49d73be7e60dfe9a754a852df76ef.jpg'
import { db } from '../../../FireBase/FireBase'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, arrayUnion, updateDoc, doc, setDoc, Timestamp, getDocs, serverTimestamp } from "firebase/firestore";
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { GetOrders } from '../../../Redux/Actions/getPrroducts'

export default function AdminOrderDetails() {
    const [statusOrder, setStatusOrder] = useState("");
    const [statusOrderText, setStatusOrderText] = useState("Processing");
    const [oneOrderbyID, setOneOrderbyID] = useState([]);

    const [itemOrder, setItemsOrder] = useState();
    const Dispatch = useDispatch()
    const [update, setUpdate] = useState(false)

    const idOrder = useParams()

    useEffect(() => {

        Dispatch(GetOrders())



    }, [update])

    const OrdersAdmin = useSelector(state => state.AdminReducer.OrderAdmin)

    useEffect(() => {


        setOneOrderbyID(OrdersAdmin.find(i => i.OrderId !== idOrder.id));


    }, [OrdersAdmin])




    //-------- Update Status -----------------
    const updateSTATUS = async (e) => {
        e.preventDefault();

        updateDoc(doc(db, "Orders", oneOrderbyID?.id), {
            status: statusOrder
        })
        setUpdate(!update)
    };




    return (

        <div className='admin-content-side'>
            <AdminNavBar />
            <div className='order-detail'>


                {/*========= Ordered Items  START   */}
                <div className='ordered-items'>
                    <div className='title-cards'>  <h2 class="mini-title-add-product">Ordered <span>#{oneOrderbyID?.OrderId}</span></h2>
                        <h2 class="mini-title-add-product status-order">

                         {oneOrderbyID?.status === 'Canceld' ?<p className='Canceld-statue'>Canceld</p> : oneOrderbyID?.status === 'Shipped' ?<p className='shipped-statue'>Shipped</p>: <p  className='Processing-statue'>Processing</p>}
                                </h2></div>
                    <hr class="light-grey-hr"></hr>


                    <div className='items-ordered'>
                        <table className='table'>

                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Total</th>

                                </tr>
                            </thead>
                            <tbody>
{oneOrderbyID?.Products?.length >= 1? oneOrderbyID?.Products?.map((i)=><CardOrderItem  data={i}/> ):<p>there is no items</p>}
                                
                     

                            </tbody>
                        </table>
                    </div>
                    <div className='total-price-order-detailes'>
                        <div>Total:</div> <div>${Math.round(oneOrderbyID?.totalOrder * 1).toFixed(2)}</div>

                    </div>

                </div>

                {/*========= Ordered Items  END   */}


                {/*========= Ordered History  START   */}


                <div className='order-history'>
                    <div className='title-cards'>  <h2 class="mini-title-add-product"><i class="zmdi zmdi-info-outline mr-10"></i>Order history</h2></div>
                    <hr class="light-grey-hr"></hr>
                    <label htmlFor="status">ORDER STATUS:</label>
                    <select className='drop-custom-status' required name="status" id="status" value={statusOrder} onChange={(e) => setStatusOrder(e.target.value)}>
                        <option className='drop-custom-option-status' selected disabled value="">--ORDER STATUS--</option>
                        <option>Shipped</option>
                        <option>Canceld</option>


                    </select>
                    <button onClick={((e) => updateSTATUS(e))} className='change-status'>Confirme</button>

                </div>
                {/*========= Ordered History  END   */}



                {/*========= Ordered Address  Start--*/}
                <div className='delivery-address'>
                    <div className='title-cards'>  <h2 class="mini-title-add-product"><i class="zmdi zmdi-info-outline mr-10"></i>Customer Detailes</h2></div>
                    <hr class="light-grey-hr"></hr>

                    <div className='customer-detailes'>
                        <p><i class="fa-solid fa-user"></i> {OrdersAdmin[0]?.shippingInfo[0]?.name}</p>
                        <p><i class="fa-solid fa-phone-flip"></i> {OrdersAdmin[0]?.shippingInfo[0]?.phone}</p>

                        <p><i class="fa-solid fa-tree-city"></i> {OrdersAdmin[0]?.shippingInfo[0]?.city}</p>
                        <p><i class="fa-solid fa-location-dot"></i> {OrdersAdmin[0]?.shippingInfo[0]?.adress}</p>

                    </div>
                </div>

                {/*========= Ordered Address  END   */}

            </div>

        </div>
    )
}



function CardOrderItem({data}) {
    return (
        <tr key={data.Cart.id}>
            <td className='img-items-ordered'><img src={data?.Cart.image[0]}></img></td>
            <td className=''><p>{data?.Cart.name}</p></td>

            <td className=''><p>${Math.round(data?.Cart.price * 1).toFixed(2)} x {data?.quntity}   </p></td>

    
            <td className=''><p>$        {Math.round(data?.Cart.price * data?.quntity * 1).toFixed(2)} </p></td>

        </tr>
    )
}