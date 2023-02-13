import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminNavBar from '../AdminNavBar/AdminNavBar'
import { GetProducts } from '../../../Redux/Actions/getPrroducts'
import testimg from '../../../Images/knife/0ef49d73be7e60dfe9a754a852df76ef.jpg'
import { collection, addDoc ,deleteDoc,doc,getDocs} from "firebase/firestore";
import { db } from '../../../FireBase/FireBase'

import './AllProducts.scss'
export default function AllProducts() {
  const [update, setUpdate] = useState(false)


  const Products = useSelector(state => state.ReducerUser.Products)

const Dispatch = useDispatch()


useEffect(()=>{

Dispatch(GetProducts())

},[update])


  return (
    <div className='admin-content-side'>

      <AdminNavBar />

      <div className='list-prodcuts-admin'>
<div className='title-list-prodcuts-admin'>      <h2 class="mini-title-add-product"><i class="zmdi zmdi-info-outline mr-10"></i>about product</h2>
<hr class="light-grey-hr"></hr></div>
      <div className='list-card-products'>
      {Products?.length >= 1 ? Products?.map((i) => <CardProductAdmin dataCard={i} setUpdate={setUpdate} update={update}  />) : <p>noo Products</p>}
      </div>


      </div>
    </div>
  )
}



function CardProductAdmin({dataCard,update,setUpdate}) {

  const removeProduct = async (id) => {
    const pathimg = doc(db, "Products", id)
    await deleteDoc(pathimg)
  console.log(id)
    setUpdate(!update)
}


  return (
    <div className='card-product-admin' >

      <div className='img-card-product-admin'>
        <div className='actions-card-product-admin'><a onClick={()=>removeProduct(dataCard.id)}>Remove</a> <a>Edit</a></div>

        <img src={dataCard.image[0]}></img>
      </div>

      <div className='text-card-product-admin'>
        <p>{dataCard.title}</p>
        <p className='price-card-product-admin'>${dataCard.price}</p>
      </div>

    </div>
  )
}