import React from 'react'
import { Link } from 'react-router-dom'
import './AdminNavBar.scss'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
export default function AdminNavBar() {
  const Dispatch = useDispatch()
  const navigator = useNavigate()
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




  return (

    <div className='AdminNavBar'>
      <div className='icon-bar-admin'>  <i class="fa-solid fa-bars"></i></div>

      <button onClick={() => Signout()}>Logout</button>
    </div>
  )
}
