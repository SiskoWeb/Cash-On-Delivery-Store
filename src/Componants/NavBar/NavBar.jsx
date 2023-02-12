import React from 'react'
import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import './NavBar.scss'
import Logo from '../../Images/Logo.jpg'
import {Link} from 'react-router-dom'
import Bar from './Bar'

export default function NavBar() {


const [word,setWord]=useState()
  const cartList = useSelector(state => state.ReducerUser.Cart)
  const WishList = useSelector(state => state.ReducerUser.WishList)
  return (
    <>
    <Bar/>
    
   
    <div className='navbar'>

    <nav >
    
    <Link className='logo' to='/'><img src={Logo}></img></Link>

   <div  className='cartIcon' > <Link to='/cart' className='cartBTN'><i className="fa fa-shopping-basket"></i></Link> {cartList?.length}</div>

    </nav>
    </div>
    </>
  )
}
