import React from 'react'
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import notify from '../../hook/useNotifcation'
import 'react-toastify/dist/ReactToastify.css';
import './CardProduct.scss'
import { useDispatch,useSelector } from 'react-redux'
import { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
export default function Card({Products,setUpdate,update}) {
    const cartList = useSelector(state => state.Cart)

    const dispatcho = useDispatch()


    const WishList = useSelector(state => state.WishList)

const addCart = ()=>{

  
    dispatcho({type:'ADD_CART',
               payload:  {
                id:Products.id,
                quntity:1,
              
             
               }  
              
              })
               console.log('add to cart')
               setUpdate(!update)
     
               notify('Item Added',)
            
}

const addWishList = ()=>{

  
  dispatcho({type:'WISHLIST',
             payload: Products.id
            
            })
       
             setUpdate(!update)
   
             notify('wishList  Added',)
          
}


useEffect(() => {
  localStorage.setItem("shopping-cart", JSON.stringify(cartList));
}, [addCart]);




  return (


<div className='icard' >


<Link  to={`/product/${Products.id}`} className='card-product'>
<div className='img-card'>

<img  src={Products.image}></img>
</div>



<div className='text'>
<p>{Products.title}</p>

<h3>${Products.price}</h3>




</div>
</Link>

<button onClick={()=>addCart(Products)}  className="buy">Buy</button>

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
