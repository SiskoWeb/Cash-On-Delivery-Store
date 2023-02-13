import React ,{useEffect,useState}from 'react'
import SideBar from '../../AdminComponents/SideBar/SideBar'
import { db } from '../../../FireBase/FireBase'
import { useDispatch, useSelector } from 'react-redux'
import { collection, getDocs } from "firebase/firestore";
import '../Add.scss'
import AdminOrderDetails from '../../AdminComponents/AdminOrderDetails/AdminOrderDetails';


export default function PageOrderDetails() {
  const [orders,setOrders]=useState([])
  const Products = useSelector(state => state.Products)

  
  return (
    <div className='admin-page'>
{/* ================== side bar start ====== */}
<SideBar/>
{/* ================== side bar End ====== */}


<AdminOrderDetails/>




    </div>


  )
}
