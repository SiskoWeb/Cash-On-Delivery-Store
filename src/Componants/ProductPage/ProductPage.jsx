import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import  JsonData  from '../../products.json'

import './ProductPage.scss'



export default function ProductPage() {


  let userId = useParams();
  const [update, setUpdate] = useState(false)
  const [mainImg, setMainImg] = useState(0)


  const productFromRedux = useSelector(state =>state.ReducerUser.Products)

  const dispatcho = useDispatch()
  // const Products = useSelector(state => state.Products)

  const [loading,setLoading]=useState(false)

  const [product, setProduct] = useState();


  useEffect(() => {
    setProduct(productFromRedux.find(p => p.id === userId.id));
  }, [userId.id, JsonData]);


  //f fuction to add product to cart using redux 
  const addCart = () => {
    dispatcho({
      type: 'ADD_CART',
      payload: {
        id: product.id,
        quntity: 1,
        items: product


      }

    })
    console.log('add to cart')
    setUpdate(!update)
    //  setQuntity(1)

  }

console.log(product)



const chnageIMG = (index)=>{
  setMainImg(index)
}
  return (

    
<div className='newProduct'>

<div className='Porudct-Page'>
<div className='imgBorder' ><img className='main-img-product' src={product?.image[mainImg]}></img> 
<div className='list-img-product-detaile'>
{product?.image.map((i,index)=><img onClick={()=>chnageIMG(index)} className='mini-img' src={i}></img>)}
</div>
</div>

<div className='Text-Product2'>
{loading?<p className='title'>Loading</p>:<p className='title'>{product?.title}</p>}
{loading?<p className='price'>Loading</p>:<p className='price'><span>Price:</span><br></br> ${product?.price}</p>}

{product?.stock === 0?<button disabled={true}  style={{opacity:'.3'}} className="buybtn">Out Of Stock</button>:<button onClick={() => addCart(product)} className="buybtn">ADD TO CART</button>}


<div className='discrip'>
<p>{product?.description}</p>
</div>


</div>
</div>

    <div className='productPage'>



 
    </div>

    </div>

  )
}
