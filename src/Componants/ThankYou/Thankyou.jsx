import React from 'react'
import { useEffect ,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import './Thankyou.css'
import Card from '../CardProduct/Card'
export default function Thankyou() {
const Order = useSelector(state=> state.Order)


const Pro = JSON.parse(localStorage.getItem("Products"))
const [update,setUpdate]=useState(false)

console.log(Order[0].Orders.InfoShipping[0].Adress.name)

// <h3>You Can Buy Also these Products
// </h3>
// <div className='list-thankYou'>{Pro?.map((i)=><Card  Products={i} setUpdate={setUpdate} update={update}/>)}
// </div>
  return (
    <div className='container'>
    <div className='thankyou'>
    <div className='thanksIcon'><i class="fa-solid fa-check"></i></div>
    <h2>Thank You <span style={{color:'green'}}>{Order[1]?.Orders.InfoShipping[0]?.Adress.name}</span></h2>
   <p>Your request has been registered. <br></br>We will contact you within 24 hours to confirm your request.
   Thanks !!!</p>

    </div>
    </div>
  )
}
