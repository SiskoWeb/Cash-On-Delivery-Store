import React ,{useState}from 'react'
import { Link } from 'react-router-dom'
import { NavLink} from 'react-router-dom'
import './SideBar.scss'
export default function SideBar() {
  const [toggle,setToggle]=useState(false)
  const toggleFun =()=>{
    toggle? document.getElementById('new-sideBar').classList.add('mobile-sidebar'): document.getElementById('new-sideBar').classList.remove('mobile-sidebar')  
    setToggle(!toggle)
    console.log('toggle')
  
    }
  

  return (
    <div className='new-sideBar ' id='new-sideBar'>
    <div className='title-sideBar'><p> Dashboard    </p>   <div className='icon-bar-admin'>  <i onClick={()=>toggleFun()} class="fa-solid fa-bars"></i></div>
    </div>

    <div className='list-Links-sideBar'> <ul>
    <li><Link className='link-item-sidebar-admin' to='/admin'><i class="fa-solid fa-file-invoice-dollar"></i><p>Orders</p></Link></li>
    <li><Link className='link-item-sidebar-admin' to='/products '><i class="fa-brands fa-product-hunt"></i><p>Products</p></Link></li>
    <li><Link className='link-item-sidebar-admin' to='/addproduct'><i class="fa-regular fa-square-plus"></i><p>Add Product</p></Link></li>
   </ul></div>
    </div>
  )
}
