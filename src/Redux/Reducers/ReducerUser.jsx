
const INITIAL_STATE = {
Cart:localStorage.getItem("shopping-cart")
? JSON.parse(localStorage.getItem("shopping-cart"))
: [],
Products:localStorage.getItem("shopping-cart")?JSON.parse(localStorage.getItem("Products")):[],
Counter:1,
Order:localStorage.getItem("Order")
? JSON.parse(localStorage.getItem("Order"))
: [],
ShippingInfo:localStorage.getItem("Shipping-Info")
? JSON.parse(localStorage.getItem("Shipping-Info"))
: {},
WishList:localStorage.getItem("WishList")
? JSON.parse(localStorage.getItem("WishList"))
: [],
}

export const ReducerUser = (state = INITIAL_STATE , action)=>{


    switch (action.type) {
        case 'ADD_CART':
           const exist = state.Cart.find((i)=> i.id === action.payload.id);
           if(exist){
             state.Cart.map((item)=>{
                if(item.id === action.payload.id){
                    console.log('adde quntyty')
                    return  item.quntity = item.quntity + 1
                  
                }
                else{
                    console.log('no quntyty')
                    return {  ...state, Cart: [action.payload, ...state.Cart]}
                }
           })}
           else{
            return {  ...state, Cart: [action.payload, ...state.Cart] ,}
      
           }

          
           case 'INCRESS_COUNTERW':
        
              state.Cart.map((item)=>{
                if(item.id === action.payload){
                  const stocko =   state.Products.find((i)=> i.id === item.id)
                  if(stocko.stock >= item.quntity + 1){
                    console.log('adde quntyty')
                    return  item.quntity = item.quntity + 1
                  }else{
                    console.log('out of stock')
                    return state
                  }
                  
                  
                }
                else{
                    console.log('no quntyty')
                    return state
                }
              })
            

            case 'INCRESS_COUNTER':
                return {
                    ...state, Counter: state.Counter + action.payload 
                };
           
                case 'D_COUNTERW':
        
                state.Cart.map((it)=>{
                  if(it.id === action.payload){
                      console.log('minus quntyty')
                      if(it.quntity === 1 ){
                        console.log('9al mn 1 remove')
                        const postion = state.Cart.indexOf(it)
                        return 
                           
                            state
                        
                      }
                      else{
                        return  it.quntity = it.quntity - 1
                      }
                     
                    
                  }
                  else{
                      console.log('no quntyty')
                      return state
                  }
                })
                 
                case 'DECREAS_COUNTER':
                    return {
                        ...state, Counter: state.Counter - action.payload 
                    };
        case 'REMOVE_CART':
            return {
                ...state,
                Cart: state.Cart.filter((i) => i.id !== action.payload)
            }
    
         case'GET_PRODUCTS':
         return{
            ...state,
            Products:action.payload
         }
         case'SHIPPING':
         return{
            ...state,
            ShippingInfo:[action.payload]
         }
         case'ORDERS':
         return{
            ...state,
            Order:[action.payload , ...state.Order]
         }
         case'WISHLIST':
         return{
            ...state,
            WishList:[action.payload , ...state.WishList]
         }
 
     default:
        return state;
        
    }

  
       
       
}

