import React ,{useEffect,useState}from 'react'

import SideBar from '../SideBar/SideBar'
import { db } from '../../FireBase/FireBase'
import { collection, getDocs } from "firebase/firestore";
import './AllProducts.scss'
export default function AllProducts() {


    const [Products,setProducts]=useState([])


    useEffect(()=>{
  
      const getFromFire = async ()=>{
        try{
          const data = await getDocs(collection(db, "Products"));
          setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

        }
        catch(e){
         console.log(e)
        
        }
       }
       getFromFire()
    },[])
  
  return (
    <div>
    <SideBar/>

    <div className='mainbody' ><div className='maino'>{Products.length >= 1?Products?.map((i,index)=>{
        return(
            <div className='list-allproducts'>
            <div><p>{index+1}</p></div>
            <div><p>{i.title}</p></div>
            <div><p>{i.Price}</p></div>
  
            <div><img src={i.image[0]}></img></div>
            <div><p>Shipped</p></div>
            <div><p>Remove</p></div>
            </div>
        )
    }):<p>No Products</p>}</div></div>
    </div>
  )
}
