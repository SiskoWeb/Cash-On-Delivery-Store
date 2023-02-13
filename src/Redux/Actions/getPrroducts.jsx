import axios from 'axios'

import { collection, addDoc, Timestamp,getDocs ,arrayUnion, query, orderBy, onSnapshot,  } from "firebase/firestore"; 
import { db} from '../../FireBase/FireBase'
export const getProducts  = ()=>{


 
}

export const GetProducts = ( ) =>{
    return async(dispatch)=>{
        try{
            const ordersRef =  collection(db, "Products");
      
            const q = query(ordersRef,orderBy('date', 'desc'))
          const unsbscribe = onSnapshot(q,(querySnapshot)=>{
            dispatch({
                type: 'GET_PRODUCTS',
                payload:querySnapshot.docs.map(doc =>({...doc.data(), id: doc.id, Timestamp:doc.data().Timestamp?.toDate().getTime() }))
              })
              localStorage.setItem("Products", JSON.stringify(querySnapshot.docs.map(doc =>({...doc.data(), id: doc.id, Timestamp:doc.data().Timestamp?.toDate().getTime() }))));

          
          }); return  unsbscribe
          
        
          }
          catch(e){
           console.log(e)
          
          }
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