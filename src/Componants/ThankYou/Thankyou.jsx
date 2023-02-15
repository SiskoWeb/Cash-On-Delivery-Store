import React from 'react'
import { useEffect ,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import './Thankyou.css'

export default function Thankyou() {
const Order = useSelector(state=> state.Order)


const orderdata = JSON.parse(localStorage.getItem("Shipping-Info"))
const [update,setUpdate]=useState(false)
const cartList = useSelector(state => state.ReducerUser.Cart)
const dispatch = useDispatch()
useEffect(()=>{
  cartList.length = 0;
},[])


  return (
    <div className='container'>
    <div className='thankyou'>
    <div className='thanksIcon'><i class="fa-solid fa-check"></i></div>
    <h2>Thank You <span style={{color:'green'}}>{orderdata[0]?.name}</span></h2>
   <p>Your request has been registered. <br></br>We will contact you within 24 hours to confirm your request.
   Thanks !!!</p>

    </div>
    </div>
  )
}
