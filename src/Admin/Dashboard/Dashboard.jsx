import React ,{useEffect,useState}from 'react'
import SideBar from '../SideBar/SideBar'
import { db } from '../../FireBase/FireBase'

import { collection, getDocs } from "firebase/firestore";
export default function Dashboard() {
  const [orders,setOrders]=useState([])

  useEffect(()=>{
  
    const getFromFire = async ()=>{
      try{
        const data = await getDocs(collection(db, "Orders"));
        setOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))),
        localStorage.setItem("Orders", JSON.stringify(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
      }
      catch(e){
       console.log(e)
      
      }
     }
     getFromFire()
  },[])

  
  return (
    <div>
    <SideBar/>
<div>{orders.length >=1?orders?.map((i)=><p>{i.order[0].priceItem}</p>):<p>No Order yet</p>}</div>
    
    </div>
  )
}
