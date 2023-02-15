import React from 'react'
import'./LoginAdmin.scss'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function LoginAdmin() {
const [email,setEmail]= useState()
const [password,setPassword]= useState()
const Dispatch = useDispatch()
const isAuth = useSelector(state => state.AdminReducer.isAuth)
const navigator = useNavigate()

const login = (e)=>{
    e.preventDefault()
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user.email)
        Dispatch({
            type:'IS_AUTH',
            payload:true
        })
        navigator('/admin')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('wrong email')
      });
      console.log('lohinks')

}
console.log(isAuth)
  return (
    <div>

    <form >
    
    <p>Login</p>
    <input onChange={(e)=>setEmail(e.target.value)} className='input-data' type='email'></input>
    <input onChange={(e)=>setPassword(e.target.value)}  type='password'></input>
    <input onClick={(e)=>login(e)} className='input-btn' type='submit'></input>
    </form>
    <p>
    Email: admin@yassine.info = Password: 123456
    </p>
    </div>
  )
}
