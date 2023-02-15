import axios from 'axios'
import React ,{useState,useEffect,createContext, useContext} from 'react'


import 'react-toastify/dist/ReactToastify.css';

import './Home.scss'
import  JsonData  from '../products.json'



import { collection, addDoc, Timestamp,getDocs ,arrayUnion, query, orderBy, onSnapshot,  } from "firebase/firestore"; 
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../FireBase/FireBase'

import Card2 from '../Componants/Card2/Card2';
import NavBar from '../Componants/NavBar/NavBar';
export default function Home() {

const [update,setUpdate]=useState(false)

const dispatcho = useDispatch()


const [products,setProducts]=useState([])

const [loading,setLoading]=useState(false)
  const [ProductsAdmin,setProductsAdmin]=useState([])



const Dispatch = useDispatch()




  


useEffect(()=>{

  const getFromFire = async ()=>{
    try{
      const ordersRef =  collection(db, "Products");

      const q = query(ordersRef,orderBy('date', 'desc'))
    const unsbscribe = onSnapshot(q,(querySnapshot)=>{
    
      setProductsAdmin(querySnapshot.docs.map(doc =>({...doc.data(), id: doc.id, Timestamp:doc.data().Timestamp?.toDate().getTime() })))
    
    }); return  unsbscribe
    
  
    }
    catch(e){
     console.log(e)
    
    }
   }
   getFromFire()
},[])


useEffect(() => {
  dispatcho({
    type: 'GET_PRODUCTS',
    payload:ProductsAdmin
  })
  localStorage.setItem("Products", JSON.stringify(ProductsAdmin));
}, [ProductsAdmin]);





console.log(ProductsAdmin)
  return (
<>

<NavBar />
<main>
<div className='home'>

    <h2>New</h2>
    <p>Latest products added to the site</p>

   <div className='list-Products'>  

  { ProductsAdmin?.map((i)=> <Card2 setUpdate={setUpdate} update={update} data={i} imgp={i.image[0]}/>)}


   </div>

   </div>
   </main>
</>

  )
}
