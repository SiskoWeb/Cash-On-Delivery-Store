import React from 'react'
import { Link } from 'react-router-dom'
import './AdminNavBar.scss'
export default function AdminNavBar() {
  return (
    <div className='AdminNavBar'>
  <div className='icon-bar-admin'>  <i class="fa-solid fa-bars"></i></div>
    <Link to='/'><p>Back To Store</p></Link>
    
    </div>
  )
}
