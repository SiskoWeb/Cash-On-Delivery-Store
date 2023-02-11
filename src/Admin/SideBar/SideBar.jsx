import React from 'react'
import { NavLink} from 'react-router-dom'
import './SideBar.scss'
export default function SideBar() {
  return (
    <div className='sidebar'>
    <ul>   
    <li><NavLink to='/admin'><i class="fa-solid fa-house"></i> Home</NavLink></li>
    <li><NavLink  to='/addproduct'><i class="fa-brands fa-product-hunt"></i> Add Product</NavLink></li>
    <li><NavLink  to='/products'><i class="fa-solid fa-border-all"></i> All Product</NavLink></li>
    </ul>
       </div>
  )
}
