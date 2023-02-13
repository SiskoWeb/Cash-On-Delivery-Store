import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminNavBar from '../AdminNavBar/AdminNavBar'
import testimg from '../../../Images/knife/0ef49d73be7e60dfe9a754a852df76ef.jpg'
import { collection, addDoc ,deleteDoc,doc,getDocs} from "firebase/firestore";
import { db } from '../../../FireBase/FireBase'

import './AllProducts.scss'
export default function AllProducts() {
  const [update, setUpdate] = useState(false)


  const Products = useSelector(state => state.ReducerUser.Products)







  return (
    <div className='admin-content-side'>

      <AdminNavBar />

      <div className='list-prodcuts-admin'>
        {Products?.length >= 1 ? Products?.map((i) => <CardProductAdmin dataCard={i} setUpdate={setUpdate} update={update}  />) : <p>noo Products</p>}


      </div>
    </div>
  )
}



function CardProductAdmin({dataCard,update,setUpdate}) {

  const removeProduct = async (id) => {
    const pathimg = doc(db, "Products", id)
    await deleteDoc(pathimg)
  
    setUpdate(!update)
}


  return (
    <div className='card-product-admin' >

      <div className='img-card-product-admin'>
        <div className='actions-card-product-admin'><a onClick={()=>removeProduct(dataCard.id)}>Remove</a> <a>Edit</a></div>

        <img src={dataCard.image}></img>
      </div>

      <div className='text-card-product-admin'>
        <p>{dataCard.title}</p>
        <p className='price-card-product-admin'>${dataCard.price}</p>
      </div>

    </div>
  )
}