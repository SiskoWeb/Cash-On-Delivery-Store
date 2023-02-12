import React ,{useEffect,useState}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminNavBar from '../AdminNavBar/AdminNavBar'
import testimg from '../../../Images/knife/0ef49d73be7e60dfe9a754a852df76ef.jpg'

import './AllProducts.scss'
export default function AllProducts() {



    const Products = useSelector(state => state.ReducerUser.Products)

  
  return (
    <div className='admin-content-side'>
  
<AdminNavBar/>

<div className='list-prodcuts-admin'>
<CardProductAdmin/>
<CardProductAdmin/>
<CardProductAdmin/>
<CardProductAdmin/>
<CardProductAdmin/>
<CardProductAdmin/>
<CardProductAdmin/>
<CardProductAdmin/>
</div>
    </div>
  )
}



function CardProductAdmin(){

  return(
    <div className='card-product-admin' >

<div className='img-card-product-admin'> 
<div className='actions-card-product-admin'><i class="fa-solid fa-xmark"></i> <i class="fa-solid fa-pencil"></i></div>

<img src={testimg}></img>
</div>

<div className='text-card-product-admin'>
<p>Name product</p>
<p className='price-card-product-admin'>$25</p>
</div>

</div>
  )
}