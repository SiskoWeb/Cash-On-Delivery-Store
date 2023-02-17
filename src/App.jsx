
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'

import NavBar from './Componants/NavBar/NavBar'
import ProductPage from './Componants/ProductPage/ProductPage'

import Thankyou from './Componants/ThankYou/Thankyou'
import Footer from './Componants/Footer/Footer'
import Test from './Componants/Cart/Test'

import Add from './Admin/AdminPages/PageAddProduct/Add'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import PageProducts from './Admin/AdminPages/PageProducts/PageProducts'

import PageOrders from './Admin/AdminPages/PageOrders/PageOrders'
import PageOrderDetails from './Admin/AdminPages/PageOrderDetails/PageOrderDetails'
import LoginAdmin from './Admin/AdminPages/LoginAdmin/LoginAdmin'
import { useDispatch, useSelector } from 'react-redux';
function App() {
  const Dispatch = useDispatch()
  const isAuth = useSelector(state => state.AdminReducer.isAuth)
  // <NavBar />

useEffect(()=>{
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {

Dispatch({
  type:'IS_AUTH',
  payload:true
})
      // ...
    } else {
      console.log('no admin login')
       Dispatch({
        type:'IS_AUTH',
         payload:false
       })
    }
  });



},[])

  
  return (
    <div className="App">

      <BrowserRouter>


     

       
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Test />} />
          <Route path='/thanks' element={<Thankyou />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='*' element={<h1>no page here go home</h1>} />
          <Route path='/addproduct' element={isAuth?<Add/>:<LoginAdmin/>} />
          <Route path='/admin' element={isAuth?<PageOrders/>:<LoginAdmin/>} />
          <Route path='/products' element={isAuth?<PageProducts/>:<LoginAdmin/>}/>
          <Route path='/orders/:id' element={isAuth?<PageOrderDetails/>:<LoginAdmin/>} />
          <Route path='/login' element={isAuth?<PageOrders/>:<LoginAdmin/>} />
       

          

        </Routes>
  
      </BrowserRouter>
      
    </div>

  )
}

export default App
