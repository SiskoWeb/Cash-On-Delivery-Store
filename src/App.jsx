
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

import PageProducts from './Admin/AdminPages/PageProducts/PageProducts'

import PageOrders from './Admin/AdminPages/PageOrders/PageOrders'
function App() {


  // <NavBar />

  return (
    <div className="App">

      <BrowserRouter>


  

        
        <Routes>
  <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Test />} />
          <Route path='/thanks' element={<Thankyou />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='*' element={<h1>no page here go home</h1>} />
          <Route path='/addproduct' element={<Add/>} />
          <Route path='/admin' element={<PageOrders/>} />
          <Route path='/products' element={<PageProducts/>} />

       

        </Routes>
 
      </BrowserRouter>
      
    </div>

  )
}

export default App
