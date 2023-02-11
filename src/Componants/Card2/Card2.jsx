import React from 'react'
import './Card2.scss'
import { ToastContainer, toast } from 'react-toastify';
import notify from '../../hook/useNotifcation'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch,useSelector } from 'react-redux'
import { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';


export default function Card2({data,setUpdate,update}) {
    const dispatcho = useDispatch()
    const carList = useSelector(state => state.Cart)
    const addCart = ()=>{

  
        dispatcho({type:'ADD_CART',
                   payload:  {
                    id:data.id,
                    quntity:1,
                 
                   }  
                  
                  })
                   console.log('add to cart')
                   setUpdate(!update)
         
                   notify('Item Added',)
                
    }
    useEffect(() => {
        localStorage.setItem("shopping-cart", JSON.stringify(carList));
      }, [addCart]);
      
  return (

    <div className='card2'>
    
    <div className='card2-img'>
    <img src={data.image[0]}></img>
    </div>
<div className='card2-text'>    <div >
<Link  to={`/product/${data.id}`} >
<p className='itemCardName'>{data.title}</p>
</Link>
<p className='itemCardPrice'>${data.price}</p>
</div>

{data.stock === 0?<div className='itemCardBuybtnDisabled'><i   class="fa-solid fa-cart-plus"></i></div>:<div className='itemCardBuybtn'><i  onClick={()=>addCart(data)} class="fa-solid fa-cart-plus"></i></div>}
</div>
<ToastContainer
position="top-center"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </div>
  
  )
}
