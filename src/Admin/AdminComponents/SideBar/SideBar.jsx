import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink} from 'react-router-dom'
import './SideBar.scss'
export default function SideBar() {
  return (
    <div className='new-sideBar mobile-sidebar'>
    <div className='title-sideBar'> Dashboard</div>

    <div className='list-Links-sideBar'> <ul>
    <li><Link className='link-item-sidebar-admin' to='/admin'><i class="fa-solid fa-file-invoice-dollar"></i><p>Orders</p></Link></li>
    <li><Link className='link-item-sidebar-admin' to='/products '><i class="fa-brands fa-product-hunt"></i><p>Products</p></Link></li>
    <li><Link className='link-item-sidebar-admin' to='/addproduct'><i class="fa-regular fa-square-plus"></i><p>Add Product</p></Link></li>
    
    </ul></div>
    </div>
  )
}
