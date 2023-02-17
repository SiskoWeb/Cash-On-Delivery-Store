import React from 'react'
import { Link } from 'react-router-dom'
import './AdminNavBar.scss'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
export default function AdminNavBar() {

  const Dispatch = useDispatch()
  const navigator = useNavigate()

  const [toggle,setToggle]=useState(false)


  const Signout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {

      navigator.push('/')
      Dispatch({
        type:'IS_AUTH',
        payload:false
      })
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  const toggleFun =()=>{
    toggle? document.getElementById('new-sideBar').classList.add('mobile-sidebar'): document.getElementById('new-sideBar').classList.remove('mobile-sidebar')  
    setToggle(!toggle)
    console.log('toggle')
  
    }
  


  return (

    <div className='AdminNavBar'>
      <div className='icon-bar-admin'>  <i onClick={()=>toggleFun()} class="toggle-admin fa-solid fa-bars"></i></div>

      <button onClick={() => Signout()}>Logout</button>
    </div>
  )
}
