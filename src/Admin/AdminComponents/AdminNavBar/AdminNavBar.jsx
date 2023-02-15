import React from 'react'
import { Link } from 'react-router-dom'
import './AdminNavBar.scss'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate   } from 'react-router-dom';

export default function AdminNavBar() {

  const navigator = useNavigate()
const Signout = ()=>{
  const auth = getAuth();
signOut(auth).then(() => {

  navigator.push('/')
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
}

  return (
    <div className='AdminNavBar'>
  <div className='icon-bar-admin'>  <i class="fa-solid fa-bars"></i></div>
    <Link to='/'><p>Back To Store</p></Link>
    <button onClick={()=>Signout()}>Logout</button>
    </div>
  )
}
