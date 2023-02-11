
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
import AddProduct from './Admin/AddProduct/AddProduct'
import Dashboard from './Admin/Dashboard/Dashboard'
import AllProducts from './Admin/AllProducts/AllProducts'
function App() {




  return (
    <div className="App">

      <BrowserRouter>
      <NavBar />

     <main>

        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Test />} />
          <Route path='/thanks' element={<Thankyou />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='*' element={<h1>no page here go home</h1>} />
          <Route path='/addproduct' element={<AddProduct/>} />
          <Route path='/admin' element={<Dashboard/>} />
          <Route path='/products' element={<AllProducts/>} />



        </Routes>
        </main>
      </BrowserRouter>
    </div>

  )
}

export default App
