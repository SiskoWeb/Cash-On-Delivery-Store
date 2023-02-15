import React from 'react'
import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import './NavBar.scss'
import Logo from '../../Images/Logo.jpg'
import {Link} from 'react-router-dom'
import Bar from './Bar'

export default function NavBar() {



  const cartList = useSelector(state => state.ReducerUser.Cart)

  return (
    <>
    <Bar/>
    
   
    <div className='navbar'>

    <nav >
    
    <Link className='logo' to='/'><img src={Logo}></img></Link>

   <div  className='cartIcon' > <Link to='/cart' className='cartBTN'><i className="icon-cart-navbar fa-solid fa-cart-shopping"></i> {cartList?.length >= 1?<div className='cart-number-item-added'>{cartList?.length}</div>:null}</Link></div>

    </nav>
    </div>
    </>
  )
}
