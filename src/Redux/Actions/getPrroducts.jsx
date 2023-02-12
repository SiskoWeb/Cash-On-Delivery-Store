import axios from 'axios'

import { collection, addDoc, Timestamp,getDocs ,arrayUnion, query, orderBy, onSnapshot,  } from "firebase/firestore"; 
import { db} from '../../FireBase/FireBase'
export const getProducts  = ()=>{


 
}

export const cartProducts = ( ) =>{
    return async(dispatch)=>{

 const carts =       await axios.get(`https://fakestoreapi.com/carts`)
        dispatch({type:'ADD_CART', Cart:carts})
    }
}





export const GetOrders = ()=>{
    return async(dispatch)=>{
        

              try{
                const data = await getDocs(collection(db, "Orders"));
                dispatch({type:"GET_ORDERS_ADMIN",payload:data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))}),
                localStorage.setItem("OrdersAdmin", JSON.stringify(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
              }
              catch(e){
               console.log(e)
              
              }
           
      
        
    }
}