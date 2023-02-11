import axios from 'axios'

export const getProducts  = ()=>{


 
}

export const cartProducts = ( ) =>{
    return async(dispatch)=>{

 const carts =       await axios.get(`https://fakestoreapi.com/carts`)
        dispatch({type:'ADD_CART', Cart:carts})
    }
}

