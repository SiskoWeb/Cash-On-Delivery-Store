import React from 'react'
// import './Cart.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import empty from '../../Images/empty.png'
import { storage,db} from '../../FireBase/FireBase'
import { ref ,uploadBytes, getDownloadURL  } from "firebase/storage";
import { collection, addDoc, arrayUnion, updateDoc, doc , setDoc ,Timestamp,getDocs ,serverTimestamp } from "firebase/firestore"; 
import './Cart2.scss'
import axios from 'axios'
export default function Test() {


  const OrderSaved = useSelector(state => state.ReducerUser.Order)
  const ShippingInfoRedux = useSelector(state => state.ReducerUser.ShippingInfo)



  const [error, setError] = useState(false)


  const [name, setName] = useState(ShippingInfoRedux[0]?.name)
  const [adress, setAdress] = useState(ShippingInfoRedux[0]?.adress)
  const [phone, setPhone] = useState(ShippingInfoRedux[0]?.phone)
  const [city, setCity] = useState(ShippingInfoRedux[0]?.city)


  const [city1, setCity1] = useState()
  const [done, setDone] = useState(true)


  const carList = useSelector(state => state.ReducerUser.Cart)
  const Products = useSelector(state => state.ReducerUser.Products)
  const [cart, setCart] = useState(carList)
  const [shippingInfo, setShippingInfo] = useState(ShippingInfoRedux)
  const [update, setUpdate] = useState(false)

  const dispatcho = useDispatch()



  console.log(city1)
  const totalPrice = carList?.reduce((total, cartItem) => {
    const item = Products?.find((i) => i.id === cartItem.id);
    return Math.floor(total + (item?.price || 0) * cartItem.quntity * 1)
  }, 0)



  useEffect(() => {
    setCart(carList)


  }, [update])



  const navigate = useNavigate()

  const AddItem = (id) => {
    dispatcho({
      type: 'INCRESS_COUNTERW',
      payload: id
    })

    setUpdate(!update)

  }

  const MiItem = (id) => {
    dispatcho({
      type: 'D_COUNTERW',
      payload: id
    })

    setUpdate(!update)

  }

  const remove = (id) => {
    dispatcho({
      type: 'REMOVE_CART',
      payload: id
    })

    setUpdate(!update)

  }


  const shippingPrice = 0;


  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(carList));
  }, [AddItem,MiItem,remove]);
  


  //add Infromation to array with order
  const addAdress = (e) => {

    e.preventDefault()
    if (name.length >= 3 || adress.length >= 5 || phone.length >= 5 || city.length >= 3) {
      dispatcho({
        type: 'SHIPPING',
        payload: {
          name,
          adress,
          phone,
          city,
        }
        

        

      }
      )
localStorage.setItem('Shipping-Info',ShippingInfoRedux)
      setUpdate(!update)
      setError(false)
      setDone(true)

    }
    else {
      setError(true)
    }


  }

//-------- checkout -----------------
const onUpload = async (e) => {
  e.preventDefault();

  if (ShippingInfoRedux.length >= 1 & cart.length >= 1) {
    const data2 = await getDocs(collection(db, "Products"));
    const ProductinDb2 = data2.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

    const data = await getDocs(collection(db, "Orders"));
    const ProductinDb = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    const docRef = await addDoc(collection(db, 'Orders'), {
      OrderId:ProductinDb.length + 1,
      shippingInfo: JSON.parse(localStorage.getItem("Shipping-Info")),
      Products: cart,
      totalOrder: totalPrice,
      dateOrder: serverTimestamp(), 
      status:'Processing'
    })

    await Promise.all(
  
      cart?.map((itemStock) => {
     
const isHrer = ProductinDb2?.find((i)=> i.id === itemStock.id)


if(isHrer){

  updateDoc(doc(db, "Products", itemStock.id), {
    stock: isHrer.stock - itemStock.quntity
 })
}

  //update colication and add image to it {map if theres many images}
 }),  
 console.log('remove cart'),
 carList.length = 0,
 localStorage.removeItem("shopping-cart"),
 setUpdate(!update) ,
 setError(false),
 setDone(true),navigate("/thanks")
 
 )

  }
  else{
    setError(true)
  }


};



//--------------end checkout============














  //get data order and adress from local storage
  useEffect(() => {
    localStorage.setItem("Order", JSON.stringify(OrderSaved));
  }, [onUpload]);

  //get data order and adress from local storage
  useEffect(() => {
    localStorage.setItem("Shipping-Info", JSON.stringify(ShippingInfoRedux));
    setShippingInfo(null)
  }, [addAdress]);



  //edit adress
  const EditAdress = (e) => {



    ShippingInfoRedux.length = 0

    console.log(ShippingInfoRedux.length)
    setUpdate(!update)

  }
  console.log(shippingInfo)
  const adressCheck = ShippingInfoRedux?.length >= 1
  console.log(ShippingInfoRedux?.length)

  return (
   
      <div className='cart-page' >
        <h3>Your Cart</h3>

        <div className='containerCart'>







          {/*Adress Side */}
          <div className='Adress-side'>
            <p>Shipping Detail</p>
            {error ? <p className='errorMSG'>Add Address first</p> : null}


            {adressCheck ? <div className='displayInfo'>
              <div className='text-adress-info'><div>Change Address: <i onClick={(e) => EditAdress(e)} class="edit-adress fa-regular fa-pen-to-square"></i></div></div>
              <div className='shipping-details'>

                <div className='info'>
                  <p>Your name</p>
                  <p>{ShippingInfoRedux[0]?.name}</p>
                </div>

                <div className='info'>
                  <p>Phone Number</p>
                  <p>{ShippingInfoRedux[0]?.phone}</p>
                </div>

                <div className='info'>
                  <p>City</p>
                  <p>{ShippingInfoRedux[0]?.city}</p>
                </div>
                <div className='info'>
                  <p>Shipping Adress</p>
                  <p>{ShippingInfoRedux[0]?.adress}</p>
                </div>
              </div>

            </div> : <form onSubmit={(e) => addAdress(e)}>
            <p className='errorMSG-Checkout'>Please fill out the form to complete the request</p>
              <input required onChange={(e) => setName(e.target.value)} value={name || ''} type='text' placeholder='Full Name'></input>
              <input required onChange={(e) => setPhone(e.target.value)} value={phone || ''} type='text' placeholder='Phone Number'></input>
              <input required onChange={(e) => setCity(e.target.value)}  value={city || ''} type='text' placeholder='City'></input>
              <textarea required onChange={(e) => setAdress(e.target.value)}  value={adress || ''} className='adressInput' type='text' placeholder='Add Yur Adress'></textarea>

              <input value='Add Adress' className='submit-btn' type='submit'></input>
            </form>}


          </div>

          {/* ========== End ====================*/}


          {/*Prices Side */}
          <div className='Prices-side'>
            <p>ORDER DETAILS</p>
            <div className='containerPrices'>



              {carList?.length >= 1 ? carList?.map((i) => {
             const item =   Products.find((p)=>p.id === i.id)

             if(item){
              return (



                <div key={item.id} className='itemCart2'>

                  {/*Image Side */}

                  <div className='part1'>
                    <img src={item?.image[0]}></img>
                    <div>
                      <Link to={`/product/${item.id}`}> <p className='title-cart'>{item.title}</p></Link>
                      <button onClick={() => remove(item.id)}>Remove</button>
                    </div>
                  </div>



                  {/*Quantity Side */}
                  <div className='part3'>
                    <div className='quantity'><i onClick={() => MiItem(i.id)} className="icon-count2 fa-solid fa-minus"></i>
                      <p>{i.quntity}</p>
                      <i onClick={() => AddItem(i.id)} className="icon-count2 fa-solid fa-plus"></i></div>
                  </div>

                  {/*Total Side */}
                  <div className='part4'>
           
                    <p>       {Math.round(item.price * i.quntity * 1).toFixed(2)}</p>
                  </div>
                </div>






              )
             }
              
              }) : <div className='emptyCart'><p> EMPTY CART </p> <img src={empty}></img> </div>}

            </div>


            <div className='Price-Detailes'>

           
              <p class="shipping-costs">SubTotal: <b class="ship">${Math.round(totalPrice * 1).toFixed(2)}</b></p>
              <p class="shipping-costs">Shipping: <b class="ship">Free</b></p>
              <p class="shipping-costs">Total <b class="ship">$ {Math.round(totalPrice + shippingPrice * 1).toFixed(2)}</b></p>


            </div>
            <div className='btn-confirme'>
              <button onClick={(e) => onUpload(e)} >Confirme</button>
            </div>
          </div>

        </div>






      </div>

  )
}
